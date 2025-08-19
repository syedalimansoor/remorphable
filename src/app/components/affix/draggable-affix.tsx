import { Affix as AffixType } from "@/features/affix";
import Affix from "./affix";
import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { setHoveredAffixAndElement } from "@/app/stores/hovered-affix";
import { ReferenceType } from "@floating-ui/react";
import { useRef } from "react";

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
  const ref = useRef<ReferenceType | null>(null);

  const getRefs = (node: HTMLElement | null) => {
    setNodeRef(node);
    ref.current = node;
  };

  return (
    <Affix
      affix={props.affix}
      ref={getRefs}
      className={cn(
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[background-color,box-shadow]",
        "relative before:absolute before:-inset-1.5",
        {
          "cursor-grabbing opacity-50": isDragging,
          "cursor-grab opacity-100": !isDragging,
        }
      )}
      whileHover={{
        scale: 1.1,
      }}
      transition={{ type: "spring", duration: 0.3 }}
      onHoverStart={() =>
        setHoveredAffixAndElement({
          affix: props.affix,
          element: ref.current as HTMLElement,
        })
      }
      onHoverEnd={() => setHoveredAffixAndElement(null)}
      {...attributes}
      {...listeners}
    />
  );
}
