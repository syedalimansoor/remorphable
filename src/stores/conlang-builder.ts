import { persistentAtom } from "@nanostores/persistent";
import { atom } from "nanostores";
import type {
  MorphemeCategory,
  PartOfSpeech,
} from "../components/conlang-builder/types";
import { $englishToolkitEnabled } from "./english-toolkit";

export type ActiveTool = "conlang" | "english" | null;
export const $activeTool = atom<ActiveTool>(null);

export type ConlangWord = {
  id: string;
  definition: string;
  partOfSpeech: PartOfSpeech;
  morphemeIds: string[];
};

export type ConlangMorpheme = {
  id: string;
  spelling: string;
  definition: string;
  category: MorphemeCategory;
};

type ConlangData = {
  words: ConlangWord[];
  morphemes: ConlangMorpheme[];
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isWord = (value: unknown): value is ConlangWord =>
  isRecord(value) &&
  typeof value.id === "string" &&
  typeof value.definition === "string" &&
  typeof value.partOfSpeech === "string" &&
  [
    "noun",
    "pronoun",
    "verb",
    "adjective",
    "preposition",
    "conjunction",
    "adverb",
    "interjection",
    "article",
  ].includes(value.partOfSpeech) &&
  Array.isArray(value.morphemeIds) &&
  value.morphemeIds.every((id) => typeof id === "string");

const isMorpheme = (value: unknown): value is ConlangMorpheme =>
  isRecord(value) &&
  typeof value.id === "string" &&
  typeof value.spelling === "string" &&
  typeof value.definition === "string" &&
  (value.category === "prefix" ||
    value.category === "base" ||
    value.category === "suffix");

const isConlangData = (value: unknown): value is ConlangData =>
  isRecord(value) &&
  Array.isArray(value.words) &&
  value.words.every(isWord) &&
  Array.isArray(value.morphemes) &&
  value.morphemes.every(isMorpheme);

const decodeConlangData = (value: string): ConlangData => {
  const parsed: unknown = JSON.parse(value);
  if (isConlangData(parsed)) return parsed;
  throw new Error("Saved conlang builder data has an invalid format.");
};

export const $conlangData = persistentAtom<ConlangData>(
  "conlang-builder-data-v3",
  { words: [], morphemes: [] },
  {
    encode: JSON.stringify,
    decode: decodeConlangData,
  },
);

export const $conlangBuilderEnabled = persistentAtom(
  "conlang-builder-enabled-v2",
  false,
  {
    encode: JSON.stringify,
    decode: (value) => value === "true",
  },
);

export function showConlangBuilder() {
  $conlangBuilderEnabled.set(true);
  $activeTool.set("conlang");
}

export function showEnglishToolkit() {
  $englishToolkitEnabled.set(true);
  $activeTool.set("english");
}

export function hideActiveTool() {
  $activeTool.set(null);
}

export function resetConlangBuilder() {
  $conlangData.set({ words: [], morphemes: [] });
  $conlangBuilderEnabled.set(false);
  $activeTool.set(null);
}
