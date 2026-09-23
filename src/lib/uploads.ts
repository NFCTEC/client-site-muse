import { createHash } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import sharp from "sharp";

const STORAGE = path.join(process.cwd(), "storage");

const IMAGE_EXT: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/avif": ".avif",
};

export function assertInsideStorage(filePath: string) {
  const root = path.resolve(STORAGE);
  const resolved = path.resolve(filePath);
  if (!resolved.startsWith(root + path.sep) && resolved !== root) {
    throw new Error("Invalid storage path");
  }
  return resolved;
}

export async function saveImage(file: File) {
  if (!file || file.size === 0) throw new Error("Empty file");
  if (file.size > 8 * 1024 * 1024) throw new Error("Image must be 8 MB or smaller");
  const mime = file.type;
  if (!IMAGE_EXT[mime]) throw new Error("Use JPG, PNG, WEBP, GIF or AVIF");
  const ext = path.extname(file.name).toLowerCase();
  const allowedExt = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);
  if (ext && !allowedExt.has(ext)) throw new Error("File extension is not allowed");
  const input = Buffer.from(await file.arrayBuffer());
  const image = sharp(input, { failOn: "error", animated: false });
  const meta = await image.metadata();
  if (!meta.width || !meta.height) throw new Error("Image content is not valid");
  const webp = await image.rotate().webp({ quality: 82 }).toBuffer();
  const id = createHash("sha256").update(webp).digest("hex").slice(0, 24);
  const dir = path.join(STORAGE, "media");
  await mkdir(dir, { recursive: true });
  const storagePath = path.join(dir, `${id}.webp`);
  await writeFile(storagePath, webp);
  return {
    storagePath,
    mimeType: "image/webp",
    size: webp.length,
    width: meta.width,
    height: meta.height,
  };
}

const ATTACHMENT_EXT = new Set([".pdf", ".png", ".jpg", ".jpeg", ".webp", ".txt", ".zip"]);

export async function saveLeadAttachment(file: File) {
  if (!file || file.size === 0) return null;
  if (file.size > 8 * 1024 * 1024) throw new Error("Attachment must be 8 MB or smaller");
  const ext = path.extname(file.name).toLowerCase();
  if (!ATTACHMENT_EXT.has(ext)) throw new Error("Attachment type is not allowed");
  const buffer = Buffer.from(await file.arrayBuffer());
  if (!sniff(buffer, ext)) throw new Error("Attachment content does not match its type");
  const dir = path.join(STORAGE, "leads");
  await mkdir(dir, { recursive: true });
  const name = `${createHash("sha256").update(buffer).digest("hex").slice(0, 24)}${ext}`;
  const storagePath = path.join(dir, name);
  await writeFile(storagePath, buffer);
  return { storagePath, originalName: path.basename(file.name).slice(0, 180) };
}

const DOWNLOAD_EXT = new Set([".zip", ".pdf", ".bin", ".hex", ".img", ".png", ".jpg", ".jpeg", ".webp"]);

export async function saveDownloadFile(file: File) {
  if (!file || file.size === 0) return null;
  if (file.size > 32 * 1024 * 1024) throw new Error("File must be 32 MB or smaller");
  const ext = path.extname(file.name).toLowerCase();
  if (!DOWNLOAD_EXT.has(ext)) throw new Error("Download type is not allowed");
  const buffer = Buffer.from(await file.arrayBuffer());
  if (!sniff(buffer, ext) && ext !== ".bin" && ext !== ".hex" && ext !== ".img") {
    throw new Error("File content does not match its type");
  }
  const dir = path.join(STORAGE, "downloads");
  await mkdir(dir, { recursive: true });
  const stored = `${createHash("sha256").update(buffer).digest("hex").slice(0, 24)}${ext}`;
  const storagePath = path.join(dir, stored);
  await writeFile(storagePath, buffer);
  return {
    storagePath,
    fileName: path.basename(file.name).replace(/[^\w.\- ]+/g, "_").slice(0, 180),
    fileSize: buffer.length,
    checksum: createHash("sha256").update(buffer).digest("hex"),
  };
}

function sniff(buffer: Buffer, ext: string) {
  if (ext === ".pdf") return buffer.subarray(0, 4).toString() === "%PDF";
  if (ext === ".png") return buffer.subarray(0, 4).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47]));
  if (ext === ".jpg" || ext === ".jpeg") return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  if (ext === ".webp") return buffer.subarray(0, 4).toString() === "RIFF" && buffer.subarray(8, 12).toString() === "WEBP";
  if (ext === ".zip") return buffer[0] === 0x50 && buffer[1] === 0x4b;
  if (ext === ".txt") return !buffer.includes(0);
  if (ext === ".gif") return buffer.subarray(0, 3).toString() === "GIF";
  if (ext === ".avif") return buffer.subarray(4, 8).toString() === "ftyp";
  return false;
}
