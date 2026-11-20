export type CreationStep = "define" | "split" | "describe";

export type MorphemeCategory = "prefix" | "base" | "suffix";

export type PartOfSpeech =
  | "noun"
  | "pronoun"
  | "verb"
  | "adjective"
  | "preposition"
  | "conjunction"
  | "adverb"
  | "interjection"
  | "article";

export const partsOfSpeech: PartOfSpeech[] = [
  "noun",
  "pronoun",
  "verb",
  "adjective",
  "preposition",
  "conjunction",
  "adverb",
  "interjection",
  "article",
];
