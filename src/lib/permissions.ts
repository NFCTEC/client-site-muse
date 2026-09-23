export type AppRole =
  | "SUPER_ADMIN"
  | "CONTENT_ADMIN"
  | "PRODUCT_MANAGER"
  | "EDITOR"
  | "SALES";

export type Module =
  | "dashboard"
  | "products"
  | "solutions"
  | "technologies"
  | "developer"
  | "blog"
  | "downloads"
  | "media"
  | "pages"
  | "leads"
  | "homepage"
  | "navigation"
  | "seo"
  | "redirects"
  | "settings"
  | "users";

const ALL: Module[] = [
  "dashboard",
  "products",
  "solutions",
  "technologies",
  "developer",
  "blog",
  "downloads",
  "media",
  "pages",
  "leads",
  "homepage",
  "navigation",
  "seo",
  "redirects",
  "settings",
  "users",
];

const MATRIX: Record<AppRole, Module[] | "*"> = {
  SUPER_ADMIN: "*",
  CONTENT_ADMIN: [
    "dashboard",
    "products",
    "solutions",
    "technologies",
    "developer",
    "blog",
    "downloads",
    "media",
    "pages",
    "homepage",
    "navigation",
    "seo",
    "redirects",
  ],
  PRODUCT_MANAGER: ["dashboard", "products", "technologies", "developer", "downloads", "media"],
  EDITOR: ["dashboard", "blog", "media", "pages"],
  SALES: ["dashboard", "leads"],
};

export function can(role: string | undefined, module: Module) {
  if (!role || !(role in MATRIX)) return false;
  const allowed = MATRIX[role as AppRole];
  if (allowed === "*") return true;
  return allowed.includes(module);
}

export function modulesFor(role: string | undefined): Module[] {
  if (!role || !(role in MATRIX)) return [];
  const allowed = MATRIX[role as AppRole];
  return allowed === "*" ? ALL : allowed;
}
