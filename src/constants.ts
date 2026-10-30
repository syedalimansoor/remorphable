export const PAGES = {
  morphology: "morphology",
  morphemes: "morphemes",
  inflectionAndDerivation: "inflection-and-derivation",
  allomorphy: "allomorphy",
  suppletionAndLexemes: "suppletion-and-lexemes",
  conclusion: "conclusion",
} as const;

export type Page = (typeof PAGES)[keyof typeof PAGES];
