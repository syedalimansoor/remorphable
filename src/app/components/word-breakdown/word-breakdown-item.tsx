import { usePlacedAffix } from "@/app/stores/placed-affixes";
import { Affix, AffixType } from "@/features/affix";
import { cn } from "@/lib/utils";
import { useDroppable } from "@dnd-kit/core";
import { useRef } from "react";
import { v4 as uuid } from "uuid";

type Props = {
  label: string;
  affixType: AffixType;
};

function WordBreakdownItem({ label, affixType }: Props) {
  const id = useRef(uuid()).current;
  const placedAffix = usePlacedAffix(affixType);

  const { isOver, setNodeRef, active } = useDroppable({
    id,
    data: {
      type: "droppable",
      affixType: affixType,
    },
  });

  const activeAffix = active?.data.current?.affix as Affix | undefined;
  const isValidDrop = activeAffix?.type === affixType;

  return (
    <div className="flex flex-col gap-4 items-center group">
      <span>{label}</span>
      <div
        ref={setNodeRef}
        className={cn(
          "border border-foreground not-group-first:border-l-0 group-first:rounded-l-sm group-last:rounded-r-sm md:group-first:rounded-l-lg md:group-last:rounded-r-lg p-2 md:p-5 text-4xl sm:text-6xl md:text-7xl text-muted-foreground transition-shadow",
          {
            "ring-foreground/50 ring-[3px]": isOver && isValidDrop,
            "z-10": isValidDrop,
          },
          placedAffix && {
            "text-foreground": true,
            "bg-prefix": affixType === "prefix",
            "bg-root": affixType === "root",
            "bg-suffix": affixType === "suffix",
          }
        )}
      >
        {placedAffix ? placedAffix.value : "..."}
      </div>
    </div>
  );
}
export default WordBreakdownItem;
