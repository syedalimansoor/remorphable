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

  return (
    <div className="flex flex-col gap-4 items-center group">
      <span>{label}</span>
      <div
        ref={setNodeRef}
        className={cn(
          "border border-foreground not-group-first:border-l-0 group-first:rounded-l-lg group-last:rounded-r-lg p-5 text-7xl text-muted-foreground",
          {
            "bg-green-500": isOver && activeAffix?.type === affixType,
          }
        )}
      >
        {placedAffix ? placedAffix.value : "..."}
      </div>
    </div>
  );
}
export default WordBreakdownItem;
