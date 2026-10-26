export const PAGES = {
  morphology: "morphology",
} as const;

export type Page = keyof typeof PAGES;
