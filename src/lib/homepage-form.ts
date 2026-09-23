import { asCategories, asGroups, asItems, asSteps, contentText } from "@/lib/utils";

export function ctaValue(content: unknown, key: string) {
  return contentText(content, key);
}

export function categoriesText(content: unknown) {
  return asCategories(content).map((item) => `${item.key} | ${item.title} | ${item.text}`).join("\n");
}

export function itemsText(content: unknown) {
  return asItems(content).map((item) => `${item.title} | ${item.text}`).join("\n");
}

export function stepsText(content: unknown) {
  return asSteps(content).join("\n");
}

export function groupsText(content: unknown) {
  return asGroups(content)
    .map((group) => [`${group.title} | ${group.href}`, ...group.items].join("\n"))
    .join("\n---\n");
}
