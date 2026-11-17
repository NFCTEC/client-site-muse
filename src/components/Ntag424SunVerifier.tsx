import { useMemo, useState } from "react";
import { CheckCircle2, CircleAlert, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Locale } from "@/lib/locale";
import {
  sampleSunDemo,
  verifySun,
  type FileKeyMode,
  type MacInputMode,
  type PiccMode,
  type SunVerifyResult,
} from "@/lib/ntag424-sun";
import { assertAesCmacSelfCheck } from "@/lib/aes-128";

type Props = { locale: Locale };

const fieldClass =
  "flex h-10 w-full rounded-xl border border-border bg-background/60 px-3 py-2 font-mono text-sm shadow-none";

export function Ntag424SunVerifier({ locale }: Props) {
  const isZh = locale === "zh";
  const demo = useMemo(() => sampleSunDemo(), []);
  const [url, setUrl] = useState("");
  const [metaKey, setMetaKey] = useState("");
  const [fileKey, setFileKey] = useState("");
  const [piccMode, setPiccMode] = useState<PiccMode>("encrypted");
  const [fileKeyMode, setFileKeyMode] = useState<FileKeyMode>("as-is");
  const [macInputMode, setMacInputMode] = useState<MacInputMode>("empty");
  const [customMacInput, setCustomMacInput] = useState("");
  const [result, setResult] = useState<SunVerifyResult | null>(null);
  const [cryptoOk, setCryptoOk] = useState<string | null>(null);

  const copy = isZh
    ? {
        title: "浏览器内 SUN 校验",
        lead: "Windows 工具负责写卡。这里只验已经生成的 SUN URL：粘贴链接，输入 SDM 密钥，按 AN12196 解开 UID / 计数器并核对截断 CMAC。密钥只留在本机，不会上传。",
        url: "SUN URL 或 p + m",
        urlPh: "https://example.com/v?p=…&m=…",
        meta: "SDM MetaRead 密钥（16 字节 hex）",
        file: "SDM FileRead 密钥（16 字节 hex）",
        picc: "PICC 数据 p",
        enc: "加密（AES-CBC，IV=0）",
        plain: "明文镜像",
        fileMode: "FileRead 密钥",
        asIs: "标签上的密钥（已分散或不分散）",
        div: "主密钥，按 AN10922 用 UID 分散（0x01 || UID）",
        macIn: "CMAC 输入（SDMMACInputOffset → SDMMACOffset）",
        empty: "空（两个偏移相同，最常见）",
        ascii: "p 的 ASCII hex（镜像写进 NDEF 的那 32 个字符）",
        custom: "自定义 hex",
        customPh: "MAC 输入 hex",
        verify: "校验",
        load: "填入实验室示例",
        clear: "清空",
        match: "CMAC 匹配",
        mismatch: "CMAC 不匹配",
        uid: "UID",
        ctr: "SDMReadCtr",
        piccPlain: "PICC 明文",
        session: "KSesSDMFileReadMAC",
        computed: "计算得到的 SDMMAC",
        claimed: "URL 中的 m",
        fileUsed: "实际用于 CMAC 的 FileRead 密钥",
        note: "MAC 输入",
        hint: "计数器重放检查要在服务器做：同一条合法 URL 会一直通过 CMAC，直到你按 UID 记下上次的计数器。",
      }
    : {
        title: "In-browser SUN check",
        lead: "The Windows tool writes the tag. This form only checks a SUN URL you already have: paste the link, enter the SDM keys, then decode UID / counter and verify the truncated CMAC per AN12196. Keys stay in the browser.",
        url: "SUN URL or p + m",
        urlPh: "https://example.com/v?p=…&m=…",
        meta: "SDM MetaRead key (16-byte hex)",
        file: "SDM FileRead key (16-byte hex)",
        picc: "PICC data p",
        enc: "Encrypted (AES-CBC, IV = 0)",
        plain: "Plaintext mirror",
        fileMode: "FileRead key",
        asIs: "Key as stored on the tag",
        div: "Master key, AN10922 diversify with UID (0x01 || UID)",
        macIn: "CMAC input (SDMMACInputOffset → SDMMACOffset)",
        empty: "Empty (offsets equal — usual case)",
        ascii: "ASCII hex of p (the 32 NDEF characters)",
        custom: "Custom hex",
        customPh: "MAC input hex",
        verify: "Verify",
        load: "Load lab sample",
        clear: "Clear",
        match: "CMAC matches",
        mismatch: "CMAC does not match",
        uid: "UID",
        ctr: "SDMReadCtr",
        piccPlain: "PICC plaintext",
        session: "KSesSDMFileReadMAC",
        computed: "Computed SDMMAC",
        claimed: "m from URL",
        fileUsed: "FileRead key used for CMAC",
        note: "MAC input",
        hint: "Replay protection belongs on the server: a captured URL keeps a valid CMAC forever until you store the last counter per UID.",
      };

  function onVerify(event: React.FormEvent) {
    event.preventDefault();
    try {
      assertAesCmacSelfCheck();
      setCryptoOk(isZh ? "AES-128 / CMAC 自检通过" : "AES-128 / CMAC self-check passed");
    } catch (err) {
      setCryptoOk(err instanceof Error ? err.message : String(err));
    }
    setResult(
      verifySun({
        url,
        metaReadKeyHex: metaKey,
        fileReadKeyHex: fileKey,
        piccMode,
        fileKeyMode,
        macInputMode,
        customMacInputHex: customMacInput,
      }),
    );
  }

  function loadSample() {
    setUrl(demo.url);
    setMetaKey(demo.metaReadKeyHex);
    setFileKey(demo.fileReadKeyHex);
    setPiccMode("encrypted");
    setFileKeyMode("as-is");
    setMacInputMode("empty");
    setCustomMacInput("");
    setResult(null);
  }

  return (
    <section className="rounded-2xl border border-primary/30 bg-card-gradient p-7">
      <div className="flex items-start gap-3 mb-3">
        <ShieldCheck className="text-primary mt-1 shrink-0" size={22} />
        <div>
          <h2 className="font-display text-2xl">{copy.title}</h2>
          <p className="mt-2 text-muted-foreground leading-relaxed">{copy.lead}</p>
        </div>
      </div>

      <form onSubmit={onVerify} className="mt-6 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="sun-url">{copy.url}</Label>
          <Textarea
            id="sun-url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={copy.urlPh}
            className={`${fieldClass} min-h-[88px]`}
            autoComplete="off"
            spellCheck={false}
          />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="sun-meta">{copy.meta}</Label>
            <Input
              id="sun-meta"
              value={metaKey}
              onChange={(e) => setMetaKey(e.target.value)}
              className={fieldClass}
              autoComplete="off"
              spellCheck={false}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sun-file">{copy.file}</Label>
            <Input
              id="sun-file"
              value={fileKey}
              onChange={(e) => setFileKey(e.target.value)}
              className={fieldClass}
              autoComplete="off"
              spellCheck={false}
            />
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <FieldSelect
            label={copy.picc}
            value={piccMode}
            onChange={(v) => setPiccMode(v as PiccMode)}
            options={[
              { value: "encrypted", label: copy.enc },
              { value: "plaintext", label: copy.plain },
            ]}
          />
          <FieldSelect
            label={copy.fileMode}
            value={fileKeyMode}
            onChange={(v) => setFileKeyMode(v as FileKeyMode)}
            options={[
              { value: "as-is", label: copy.asIs },
              { value: "an10922", label: copy.div },
            ]}
          />
          <FieldSelect
            label={copy.macIn}
            value={macInputMode}
            onChange={(v) => setMacInputMode(v as MacInputMode)}
            options={[
              { value: "empty", label: copy.empty },
              { value: "picc-ascii", label: copy.ascii },
              { value: "custom", label: copy.custom },
            ]}
          />
        </div>
        {macInputMode === "custom" && (
          <div className="space-y-2">
            <Label htmlFor="sun-macin">{copy.custom}</Label>
            <Input
              id="sun-macin"
              value={customMacInput}
              onChange={(e) => setCustomMacInput(e.target.value)}
              placeholder={copy.customPh}
              className={fieldClass}
              autoComplete="off"
              spellCheck={false}
            />
          </div>
        )}
        <div className="flex flex-wrap gap-3">
          <Button type="submit">{copy.verify}</Button>
          <Button type="button" variant="outline" onClick={loadSample}>
            {copy.load}
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setUrl("");
              setMetaKey("");
              setFileKey("");
              setResult(null);
              setCryptoOk(null);
            }}
          >
            {copy.clear}
          </Button>
        </div>
      </form>

      {cryptoOk && <p className="mt-4 text-xs text-muted-foreground">{cryptoOk}</p>}

      {result && (
        <div className="mt-6 rounded-xl border border-border bg-background/40 p-5 space-y-3">
          {result.error ? (
            <p className="flex items-start gap-2 text-sm text-destructive">
              <CircleAlert size={16} className="mt-0.5 shrink-0" />
              {result.error}
            </p>
          ) : (
            <>
              <p className="flex items-center gap-2 text-sm font-medium">
                {result.macMatch ? (
                  <CheckCircle2 size={16} className="text-primary" />
                ) : (
                  <CircleAlert size={16} className="text-destructive" />
                )}
                {result.macMatch ? copy.match : copy.mismatch}
              </p>
              <ResultRow label={copy.uid} value={result.uidHex} />
              <ResultRow
                label={copy.ctr}
                value={result.counterHex ? `${result.counterHex} (${result.counter})` : undefined}
              />
              <ResultRow label={copy.piccPlain} value={result.piccPlainHex} />
              <ResultRow label={copy.claimed} value={result.macHex} />
              <ResultRow label={copy.computed} value={result.computedMacHex} />
              <ResultRow label={copy.session} value={result.sessionKeyHex} />
              <ResultRow label={copy.fileUsed} value={result.fileKeyUsedHex} />
              <ResultRow label={copy.note} value={result.macInputNote} />
            </>
          )}
        </div>
      )}
      <p className="mt-4 text-xs text-muted-foreground leading-relaxed">{copy.hint}</p>
    </section>
  );
}

function FieldSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${fieldClass} h-auto min-h-10 py-2`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function ResultRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="font-mono text-sm break-all">{value}</div>
    </div>
  );
}
