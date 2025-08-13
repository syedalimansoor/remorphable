import { Affix as AffixType } from "@/features/affix";
import Affix from "./affix";
import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { setHoveringAffix } from "@/app/stores/hovering-affix";

type DraggableProps = {
  affix: AffixType;
};

export function DraggableAffix(props: DraggableProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: props.affix.id,
    data: {
      type: "affix",
      affix: props.affix,
    },
  });

  return (
    <Affix
      affix={props.affix}
      ref={setNodeRef}
      className={cn(
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[background-color,box-shadow]",
        {
          "cursor-grabbing opacity-50": isDragging,
          "cursor-grab opacity-100": !isDragging,
        }
      )}
      whileHover={{ scale: 1.1 }}
      onHoverStart={() => setHoveringAffix(props.affix)}
      onHoverEnd={() => setHoveringAffix(null)}
      {...attributes}
      {...listeners}
    />
  );
}
