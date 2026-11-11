import { persistentAtom } from "@nanostores/persistent";
import { atom } from "nanostores";
import { $englishToolkitEnabled } from "./english-toolkit";

export type ActiveTool = "conlang" | "english" | null;
export const $activeTool = atom<ActiveTool>("conlang");

export type ConlangWord = {
  id: string;
  spelling: string;
  definition: string;
  morphemeIds: string[];
};

export type ConlangMorpheme = {
  id: string;
  spelling: string;
  definition: string;
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
  typeof value.spelling === "string" &&
  typeof value.definition === "string" &&
  Array.isArray(value.morphemeIds) &&
  value.morphemeIds.every((id) => typeof id === "string");

const isMorpheme = (value: unknown): value is ConlangMorpheme =>
  isRecord(value) &&
  typeof value.id === "string" &&
  typeof value.spelling === "string" &&
  typeof value.definition === "string";

const isConlangData = (value: unknown): value is ConlangData =>
  isRecord(value) &&
  Array.isArray(value.words) &&
  value.words.every(isWord) &&
  Array.isArray(value.morphemes) &&
  value.morphemes.every(isMorpheme);

export const $conlangData = persistentAtom<ConlangData>(
  "conlang-builder-data",
  { words: [], morphemes: [] },
  {
    encode: JSON.stringify,
    decode: (value) => {
      const parsed: unknown = JSON.parse(value);
      if (!isConlangData(parsed)) {
        throw new Error("Saved conlang builder data has an invalid format.");
      }
      return parsed;
    },
  },
);

export const $conlangBuilderEnabled = persistentAtom(
  "conlang-builder-enabled",
  true,
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
  $conlangBuilderEnabled.set(true);
  $activeTool.set("conlang");
}
