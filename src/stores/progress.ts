import { persistentMap } from "@nanostores/persistent";
import type { Page } from "../constants";
import { clearPersistentMap } from "./reset-persistent";

export const initialProgress: Record<Page, number> = {
  morphology: 0,
  morphemes: 0,
  "inflection-and-derivation": 0,
  allomorphy: 0,
  "suppletion-and-lexemes": 0,
  conclusion: 0,
};

export const $progress = persistentMap<Record<Page, number>>(
  "progress",
  initialProgress,
  {
    encode: JSON.stringify,
    decode: (value) => {
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    },
  },
);

export const resetProgress = () => {
  clearPersistentMap("progress");
  $progress.set(initialProgress);
};
