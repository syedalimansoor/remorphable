import { cn } from "@/lib/utils";
import Panel from "./panel";

type Props = {
  className?: string;
};

function AffixPanels({ className }: Props) {
  return (
    <div className={cn("grid grid-cols-subgrid grid-rows-subgrid", className)}>
      <Panel
        className="col-start-1 row-span-2 mt-12"
        title="Prefixes"
        message="Hover over a prefix to learn more about it. Drag and drop it to the word builder to form words!"
      />
      <Panel
        className="col-start-2 row-start-2"
        title="Roots"
        message="Hover over a root to learn more about it. Drag and drop it to the word builder to form words!"
      />
      <Panel
        className="col-start-3 row-span-2 mt-12"
        title="Suffixes"
        message="Hover over a suffix to learn more about it. Drag and drop it to the word builder to form words!"
      />
    </div>
  );
}
export default AffixPanels;
