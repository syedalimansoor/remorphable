import { persistentAtom } from "@nanostores/persistent";

export const $conceptBank = persistentAtom<string[]>("concept-bank", [], {
  encode: JSON.stringify,
  decode: (value) => {
    try {
      return JSON.parse(value);
    } catch {
      return [];
    }
  },
});

export const resetConceptBank = () => $conceptBank.set([]);
