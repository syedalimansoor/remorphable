import { cn } from "@/lib/utils";
import { useDroppable } from "@dnd-kit/core";

type Props = {
  label: string;
};

function WordBreakdownItem({ label }: Props) {
  const { isOver, setNodeRef } = useDroppable({
    id: label,
  });

  return (
    <div className="flex flex-col gap-4 items-center group">
      <span>{label}</span>
      <div
        ref={setNodeRef}
        className={cn(
          "border border-foreground not-group-first:border-l-0 group-first:rounded-l-lg group-last:rounded-r-lg p-5 text-7xl text-muted-foreground",
          {
            "bg-green-500": isOver,
          }
        )}
      >
        struct
      </div>
    </div>
  );
}
export default WordBreakdownItem;
