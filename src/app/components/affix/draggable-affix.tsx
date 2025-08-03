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
      type: props.affix.type,
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
      {...attributes}
      {...listeners}
    />
  );
}
