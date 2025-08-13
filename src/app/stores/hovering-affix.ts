import { Affix } from "@/features/affix";
import { atom } from "nanostores";

export const $hoveringAffix = atom<Affix | null>(null);

let debounceTimer: ReturnType<typeof setTimeout> | null = null;

export function setHoveringAffix(affix: Affix | null) {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
    debounceTimer = null;
  }
  if (affix !== null) {
    $hoveringAffix.set(affix);
  } else {
    debounceTimer = setTimeout(() => {
      $hoveringAffix.set(null);
      debounceTimer = null;
    }, 200);
  }
}
