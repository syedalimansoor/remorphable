import { Affix, AffixType } from "@/features/affix";
import { useStore } from "@nanostores/react";
import { computed, map } from "nanostores";

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

export const usePlacedAffixes = () => {
  return useStore($placedAffixes);
};

export const usePlacedAffix = (type: AffixType) => {
  return useStore($placedAffixes)[type];
};

export const $isAnyAffixPlaced = computed($placedAffixes, (placedAffixes) => {
  return (
    placedAffixes.prefix !== null ||
    placedAffixes.root !== null ||
    placedAffixes.suffix !== null
  );
});

export const $isWordComplete = computed($placedAffixes, (placedAffixes) => {
  return (
    placedAffixes.prefix !== null &&
    placedAffixes.root !== null &&
    placedAffixes.suffix !== null
  );
});
