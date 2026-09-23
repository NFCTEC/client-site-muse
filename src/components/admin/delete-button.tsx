"use client";

export function DeleteButton({ action, label = "删除" }: { action: (formData: FormData) => Promise<void>; label?: string }) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        if (!confirm("确认删除？此操作不能撤销。")) event.preventDefault();
      }}
    >
      <button type="submit" className="text-sm text-red-700">
        {label}
      </button>
    </form>
  );
}
