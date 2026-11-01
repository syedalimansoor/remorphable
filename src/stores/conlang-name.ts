import { persistentAtom } from "@nanostores/persistent";

export const $conlangName = persistentAtom<string>("interactive-conlang-name", "");

export const resetConlangName = () => $conlangName.set("");
