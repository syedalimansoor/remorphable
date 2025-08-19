import { Affix } from "@/features/affix";
import { atom } from "nanostores";

export interface HoveredAffixState {
  affix: Affix;
  element: HTMLElement;
}

export const $hoveredAffix = atom<HoveredAffixState | null>(null);

let debounceTimer: ReturnType<typeof setTimeout> | null = null;

export function setHoveredAffixAndElement(
  options: {
    affix: Affix;
    element: HTMLElement;
  } | null
) {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
    debounceTimer = null;
  }
  if (options) {
    $hoveredAffix.set(options);
  } else {
    debounceTimer = setTimeout(() => {
      $hoveredAffix.set(null);
      debounceTimer = null;
    }, 300);
  }
}

// Non-debounced version for testing
// export function setHoveredAffixAndElement(options: HoveredAffixState | null) {
//   if (options) {
//     $hoveredAffix.set(options);
//   } else {
//     $hoveredAffix.set(null);
//   }
// }
