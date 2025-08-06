import { cn } from "@/lib/utils";
import Panel from "./panel";
import {
  $prefixes,
  $roots,
  $suffixes,
  filterPrefixes,
  filterRoots,
  filterSuffixes,
} from "@/app/stores/affixes";
import { useMediaQuery } from "@/app/hooks/use-media-query";
import { AffixType } from "@/features/affix";
import { useState } from "react";

type Props = {
  className?: string;
};

function AffixPanels({ className }: Props) {
  const multiColumnLayout = useMediaQuery("(min-width: 768px)");
  const [affixType, setAffixType] = useState<AffixType>("prefix");

  if (multiColumnLayout)
    return (
      <div
        className={cn("grid grid-cols-subgrid grid-rows-subgrid", className)}
      >
        <Panel
          className="col-start-1 row-span-2 mt-12 h-128 self-end"
          title="Prefixes"
          placeholder="Search for a prefix..."
          affixStore={$prefixes}
          filterAffixes={filterPrefixes}
        />
        <Panel
          className="col-start-2 row-start-2 h-96 self-end"
          title="Roots"
          placeholder="Search for a root..."
          affixStore={$roots}
          filterAffixes={filterRoots}
        />
        <Panel
          className="col-start-3 row-span-2 mt-12 h-128 self-end"
          title="Suffixes"
          placeholder="Search for a suffix..."
          affixStore={$suffixes}
          filterAffixes={filterSuffixes}
        />
      </div>
    );

  let title;
  let placeholder;
  let affixStore;
  let filterAffixes;

  switch (affixType) {
    case "prefix":
      title = "Prefixes";
      placeholder = "Search for a prefix...";
      affixStore = $prefixes;
      filterAffixes = filterPrefixes;
      break;
    case "root":
      title = "Roots";
      placeholder = "Search for a root...";
      affixStore = $roots;
      filterAffixes = filterRoots;
      break;
    case "suffix":
      title = "Suffixes";
      placeholder = "Search for a suffix...";
      affixStore = $suffixes;
      filterAffixes = filterSuffixes;
      break;
  }

  return (
    <div className={cn("px-8", className)}>
      <Panel
        className="h-96 self-end"
        title={title}
        placeholder={placeholder}
        affixStore={affixStore}
        filterAffixes={filterAffixes}
        combined
        affixType={affixType}
        setAffixType={setAffixType}
      />
    </div>
  );
}
export default AffixPanels;
