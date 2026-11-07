import { persistentAtom } from "@nanostores/persistent";

export const $englishToolkitEnabled = persistentAtom(
  "english-toolkit-enabled",
  false,
  {
    encode: JSON.stringify,
    decode: (value) => value === "true",
  },
);

export const resetEnglishToolkit = () => $englishToolkitEnabled.set(false);
