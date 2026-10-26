import { persistentMap } from "@nanostores/persistent";
import type { Page } from "../constants";

export const initialProgress: Record<Page, number> = {
  morphology: 0,
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
