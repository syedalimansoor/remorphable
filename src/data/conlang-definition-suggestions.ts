import type { MorphemeRole } from "../stores/conlang-builder";

export const wordDefinitionSuggestions = [
  { partOfSpeech: "Noun", definition: "a person who teaches" },
  { partOfSpeech: "Noun", definition: "more than one small animal that purrs" },
  { partOfSpeech: "Verb", definition: "to move on foot" },
  { partOfSpeech: "Verb", definition: "to move on foot before now" },
  { partOfSpeech: "Adjective", definition: "like a cat" },
  { partOfSpeech: "Adjective", definition: "full of light" },
  { partOfSpeech: "Adverb", definition: "in a slow way" },
] as const;

export const morphemeDefinitionSuggestions: {
  label: string;
  role: MorphemeRole;
  definition: string;
}[] = [
  {
    label: "Noun root",
    role: "root",
    definition: "a small animal that purrs",
  },
  {
    label: "Verb root",
    role: "root",
    definition: "to move on foot",
  },
  {
    label: "Adjective root",
    role: "root",
    definition: "full of light",
  },
  {
    label: "Plural ending",
    role: "affix",
    definition: "marks more than one",
  },
  {
    label: "Past-time ending",
    role: "affix",
    definition: "shows an action happened before now",
  },
  {
    label: "Future-time ending",
    role: "affix",
    definition: "shows an action will happen later",
  },
  {
    label: "Person ending",
    role: "affix",
    definition: "makes a word for a person who does an action",
  },
  {
    label: "Noun-to-adjective ending",
    role: "affix",
    definition: "turns a noun into an adjective",
  },
] as const;
