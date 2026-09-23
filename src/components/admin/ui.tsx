import Link from "next/link";

export function Notice({ saved, error }: { saved?: string; error?: string }) {
  if (saved) return <p className="mb-4 rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-800">已保存</p>;
  if (error) return <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-800">{error}</p>;
  return null;
}

export function Field({
  label,
  name,
  defaultValue,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="font-medium text-zinc-800">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue ?? ""}
        className="h-10 rounded-md border border-zinc-300 bg-white px-3"
      />
    </label>
  );
}

export function Area({
  label,
  name,
  defaultValue,
  rows = 5,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  rows?: number;
}) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="font-medium text-zinc-800">{label}</span>
      <textarea name={name} rows={rows} defaultValue={defaultValue ?? ""} className="rounded-md border border-zinc-300 bg-white px-3 py-2" />
    </label>
  );
}

export function SelectField({
  label,
  name,
  defaultValue,
  options,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="font-medium text-zinc-800">{label}</span>
      <select name={name} defaultValue={defaultValue} className="h-10 rounded-md border border-zinc-300 bg-white px-3">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function Check({ label, name, defaultChecked }: { label: string; name: string; defaultChecked?: boolean }) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} />
      {label}
    </label>
  );
}

export const statusOptions = [
  { value: "DRAFT", label: "草稿" },
  { value: "REVIEW", label: "审核" },
  { value: "PUBLISHED", label: "已发布" },
  { value: "ARCHIVED", label: "归档" },
];

export function statusLabel(status: string) {
  return statusOptions.find((item) => item.value === status)?.label || status;
}

export function DataTable({
  title,
  createHref,
  headers,
  rows,
}: {
  title: string;
  createHref?: string;
  headers: string[];
  rows: { href: string; cells: string[] }[];
}) {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-zinc-900">{title}</h1>
        {createHref ? (
          <Link href={createHref} className="rounded-md bg-teal-800 px-3 py-2 text-sm text-white">
            新建
          </Link>
        ) : null}
      </div>
      <div className="overflow-x-auto rounded-lg border border-zinc-200 bg-white">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b bg-zinc-50 text-zinc-500">
            <tr>
              {headers.map((header) => (
                <th key={header} className="px-3 py-2 font-medium">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.href} className="border-b last:border-0">
                {row.cells.map((cell, index) => (
                  <td key={`${row.href}-${index}`} className="px-3 py-2">
                    {index === 0 ? (
                      <Link href={row.href} className="font-medium text-teal-900">
                        {cell}
                      </Link>
                    ) : (
                      cell
                    )}
                  </td>
                ))}
              </tr>
            ))}
            {!rows.length ? (
              <tr>
                <td className="px-3 py-6 text-zinc-500" colSpan={headers.length}>
                  还没有内容
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Relations({
  title,
  name,
  options,
  selected,
}: {
  title: string;
  name: string;
  options: { id: string; label: string }[];
  selected: string[];
}) {
  return (
    <fieldset>
      <legend className="text-sm font-medium">{title}</legend>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        {options.map((option) => (
          <label key={option.id} className="flex gap-2 text-sm">
            <input type="checkbox" name={name} value={option.id} defaultChecked={selected.includes(option.id)} />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function nameOf(translations: { locale: string; name?: string; title?: string; label?: string }[], fallback = "") {
  const zh = translations.find((item) => item.locale === "zh");
  const en = translations.find((item) => item.locale === "en");
  return zh?.name || zh?.title || zh?.label || en?.name || en?.title || en?.label || fallback;
}

export function textOf(translations: { locale: string; name?: string; title?: string; slug?: string }[], locale: "en" | "zh", key: "name" | "title" | "slug") {
  return translations.find((item) => item.locale === locale)?.[key] || "";
}
