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

type Props = {
  className?: string;
};

function AffixPanels({ className }: Props) {
  return (
    <div className={cn("grid grid-cols-subgrid grid-rows-subgrid", className)}>
      <Panel
        className="col-start-1 row-span-2 mt-12 h-128 self-end"
        title="Prefixes"
        message="Hover over a prefix to learn more about it. Drag and drop it to the word builder to form words!"
        placeholder="Search for a prefix..."
        affixStore={$prefixes}
        filterAffixes={filterPrefixes}
      />
      <Panel
        className="col-start-2 row-start-2 h-96 self-end"
        title="Roots"
        message="Hover over a root to learn more about it. Drag and drop it to the word builder to form words!"
        placeholder="Search for a root..."
        affixStore={$roots}
        filterAffixes={filterRoots}
      />
      <Panel
        className="col-start-3 row-span-2 mt-12 h-128 self-end"
        title="Suffixes"
        message="Hover over a suffix to learn more about it. Drag and drop it to the word builder to form words!"
        placeholder="Search for a suffix..."
        affixStore={$suffixes}
        filterAffixes={filterSuffixes}
      />
    </div>
  );
}
export default AffixPanels;
