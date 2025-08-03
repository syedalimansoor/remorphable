import { Affix as AffixType } from "@/features/affix";
import Affix from "./affix";
import { useDraggable } from "@dnd-kit/core";

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

  const style = {
    opacity: isDragging ? 0.5 : 1,
    cursor: isDragging ? "grabbing" : "grab",
  };

  return (
    <Affix
      affix={props.affix}
      ref={setNodeRef}
      style={style}
      className="focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[box-shadow]"
      {...attributes}
      {...listeners}
    />
  );
}
