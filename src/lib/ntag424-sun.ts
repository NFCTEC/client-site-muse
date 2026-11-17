import { aesCbcDecryptNoPad, aesCbcEncryptNoPad, aesCmac, assertAesCmacSelfCheck } from "./aes-128";

export type PiccMode = "encrypted" | "plaintext";
export type MacInputMode = "empty" | "picc-ascii" | "custom";
export type FileKeyMode = "as-is" | "an10922";

export type SunVerifyInput = {
  url: string;
  metaReadKeyHex: string;
  fileReadKeyHex: string;
  piccMode: PiccMode;
  fileKeyMode: FileKeyMode;
  macInputMode: MacInputMode;
  customMacInputHex?: string;
};

export type SunVerifyResult = {
  ok: boolean;
  macMatch: boolean | null;
  error?: string;
  piccHex?: string;
  macHex?: string;
  piccPlainHex?: string;
  uidHex?: string;
  counter?: number;
  counterHex?: string;
  sessionKeyHex?: string;
  computedMacHex?: string;
  macInputNote?: string;
  fileKeyUsedHex?: string;
};

const ZERO_IV = new Uint8Array(16);

export function parseHex(input: string, label: string, expectedBytes?: number): Uint8Array {
  const clean = input.replace(/0x/gi, "").replace(/[\s:_-]/g, "").trim();
  if (!clean) throw new Error(`${label} is empty`);
  if (clean.length % 2) throw new Error(`${label} must be even-length hex`);
  if (!/^[0-9a-fA-F]+$/.test(clean)) throw new Error(`${label} is not hex`);
  if (expectedBytes != null && clean.length !== expectedBytes * 2) {
    throw new Error(`${label} must be ${expectedBytes} bytes (${expectedBytes * 2} hex chars)`);
  }
  const out = new Uint8Array(clean.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(clean.slice(i * 2, i * 2 + 2), 16);
  return out;
}

export function toHex(bytes: Uint8Array): string {
  return [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("").toUpperCase();
}

function queryValue(params: URLSearchParams, names: string[]): string | null {
  const want = new Set(names.map((n) => n.toLowerCase()));
  for (const [key, value] of params.entries()) {
    if (want.has(key.toLowerCase()) && value) return value;
  }
  return null;
}

/** AN10922 AES-128: CMAC(master, 0x01 || UID). */
export function diversifyAn10922(master: Uint8Array, uid: Uint8Array): Uint8Array {
  const m = new Uint8Array(1 + uid.length);
  m[0] = 0x01;
  m.set(uid, 1);
  return aesCmac(master, m);
}

export function parseSunFields(raw: string): { piccHex: string; macHex: string } {
  const trimmed = raw.trim();
  if (!trimmed) throw new Error("Paste a SUN URL");

  let params: URLSearchParams | null = null;
  try {
    const url = new URL(trimmed);
    params = url.searchParams;
  } catch {
    const q = trimmed.includes("?") ? trimmed.slice(trimmed.indexOf("?") + 1) : trimmed;
    if (q.includes("=")) params = new URLSearchParams(q);
  }

  if (params) {
    const picc = queryValue(params, ["p", "picc", "picc_data", "piccdata", "e", "enc"]);
    const mac = queryValue(params, ["m", "cmac", "c", "mac", "sdmmac"]);
    if (picc && mac) {
      return {
        piccHex: picc.replace(/[^0-9a-fA-F]/g, ""),
        macHex: mac.replace(/[^0-9a-fA-F]/g, ""),
      };
    }
  }

  const hex = trimmed.replace(/[^0-9a-fA-F]/g, "");
  if (hex.length === 48) {
    return { piccHex: hex.slice(0, 32), macHex: hex.slice(32) };
  }
  throw new Error("Could not find PICC data (p/e) and CMAC (m/c) in the URL");
}

function parsePiccPlain(plain: Uint8Array): { uid: Uint8Array; counter: number; counterBytes: Uint8Array } {
  if (plain.length < 11) throw new Error("PICC data is too short");
  const tag = plain[0];
  if (tag === 0xc7) {
    const uid = plain.subarray(1, 8);
    const counterBytes = plain.subarray(8, 11);
    const counter = counterBytes[0] | (counterBytes[1] << 8) | (counterBytes[2] << 16);
    return { uid, counter, counterBytes: Uint8Array.from(counterBytes) };
  }
  throw new Error(
    `PICC tag is 0x${tag.toString(16).padStart(2, "0")}, not 0xC7 (UID + SDMReadCtr). Check the meta-read key or set PICC data to plaintext.`,
  );
}

function sv2(uid: Uint8Array, counterBytes: Uint8Array): Uint8Array {
  const out = new Uint8Array(16);
  out.set([0x3c, 0xc3, 0x00, 0x01, 0x00, 0x80]);
  out.set(uid, 6);
  out.set(counterBytes, 13);
  return out;
}

/** AN12196: keep even-numbered CMAC bytes MSB-first = indices 1,3,5,7,9,11,13,15. */
export function truncateSdmMac(cmac: Uint8Array): Uint8Array {
  return new Uint8Array([cmac[1], cmac[3], cmac[5], cmac[7], cmac[9], cmac[11], cmac[13], cmac[15]]);
}

function macInputBytes(mode: MacInputMode, piccHex: string, customHex?: string): { data: Uint8Array; note: string } {
  if (mode === "empty") {
    return { data: new Uint8Array(0), note: "empty (SDMMACInputOffset = SDMMACOffset)" };
  }
  if (mode === "picc-ascii") {
    const ascii = new TextEncoder().encode(piccHex.toUpperCase());
    return { data: ascii, note: `ASCII of p (${ascii.length} bytes)` };
  }
  const data = parseHex(customHex ?? "", "MAC input");
  return { data, note: `custom (${data.length} bytes)` };
}

export function verifySun(input: SunVerifyInput): SunVerifyResult {
  try {
    const { piccHex, macHex } = parseSunFields(input.url);
    if (piccHex.length !== 32) {
      return { ok: false, macMatch: null, error: `PICC field p must be 16 bytes (32 hex chars), got ${piccHex.length}` };
    }
    if (macHex.length !== 16) {
      return { ok: false, macMatch: null, error: `CMAC field m must be 8 bytes (16 hex chars), got ${macHex.length}` };
    }

    const picc = parseHex(piccHex, "PICC data", 16);
    const claimedMac = parseHex(macHex, "CMAC", 8);
    const metaKey = parseHex(input.metaReadKeyHex, "SDM MetaRead key", 16);
    const fileKeyIn = parseHex(input.fileReadKeyHex, "SDM FileRead key", 16);

    const piccPlain =
      input.piccMode === "encrypted" ? aesCbcDecryptNoPad(metaKey, ZERO_IV, picc) : Uint8Array.from(picc);
    const { uid, counter, counterBytes } = parsePiccPlain(piccPlain);

    const fileKey = input.fileKeyMode === "an10922" ? diversifyAn10922(fileKeyIn, uid) : fileKeyIn;
    const sessionSv = sv2(uid, counterBytes);
    const sessionKey = aesCmac(fileKey, sessionSv);
    const { data: macIn, note } = macInputBytes(input.macInputMode, piccHex, input.customMacInputHex);
    const fullMac = aesCmac(sessionKey, macIn);
    const computed = truncateSdmMac(fullMac);
    const macMatch = computed.length === claimedMac.length && computed.every((b, i) => b === claimedMac[i]);

    return {
      ok: macMatch,
      macMatch,
      piccHex: piccHex.toUpperCase(),
      macHex: macHex.toUpperCase(),
      piccPlainHex: toHex(piccPlain),
      uidHex: toHex(uid),
      counter,
      counterHex: toHex(counterBytes),
      sessionKeyHex: toHex(sessionKey),
      computedMacHex: toHex(computed),
      macInputNote: note,
      fileKeyUsedHex: toHex(fileKey),
    };
  } catch (err) {
    return { ok: false, macMatch: null, error: err instanceof Error ? err.message : String(err) };
  }
}

/** Lab sample: empty MAC input, encrypted PICC, keys as stored on the tag. */
export function sampleSunDemo(): { url: string; metaReadKeyHex: string; fileReadKeyHex: string } {
  assertAesCmacSelfCheck();
  const meta = parseHex("00000000000000000000000000000001", "meta");
  const file = parseHex("00000000000000000000000000000002", "file");
  const uid = parseHex("04aabbccddee80", "uid");
  const counterBytes = parseHex("010000", "ctr");
  const piccPlain = new Uint8Array(16);
  piccPlain[0] = 0xc7;
  piccPlain.set(uid, 1);
  piccPlain.set(counterBytes, 8);
  const picc = aesCbcEncryptNoPad(meta, ZERO_IV, piccPlain);
  const sessionKey = aesCmac(file, sv2(uid, counterBytes));
  const mac = truncateSdmMac(aesCmac(sessionKey, new Uint8Array(0)));
  return {
    url: `https://example.com/v?p=${toHex(picc)}&m=${toHex(mac)}`,
    metaReadKeyHex: toHex(meta),
    fileReadKeyHex: toHex(file),
  };
}
