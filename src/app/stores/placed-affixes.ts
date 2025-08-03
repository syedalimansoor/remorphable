import { Affix, AffixType } from "@/features/affix";
import { useStore } from "@nanostores/react";
import { map } from "nanostores";

export const $placedAffixes = map({
  prefix: null as Affix | null,
  root: null as Affix | null,
  suffix: null as Affix | null,
});

export const placeAffix = (type: AffixType, affix: Affix) => {
  $placedAffixes.set({
    ...$placedAffixes.get(),
    [type]: affix,
  });
};

export const usePlacedAffix = (type: AffixType) => {
  return useStore($placedAffixes)[type];
};
