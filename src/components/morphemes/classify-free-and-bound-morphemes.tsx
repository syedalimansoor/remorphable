import {
  DndContext,
  type DragEndEvent,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { persistentMap } from "@nanostores/persistent";
import { useStore } from "@nanostores/react";
import { PAGES } from "../../constants";
import { $progress } from "../../stores/progress";
import { clearPersistentMap } from "../../stores/reset-persistent";
import { InteractiveBlock } from "../interactive-block";

const MORPHEMES = [
  "un-",
  "break",
  "cat",
  "the",
  "-ness",
  "-ful",
  "quick",
  "re-",
  "-ing",
];
const FREE = new Set(["break", "cat", "the", "quick"]);
const $placedMorphemes = persistentMap<Record<string, string>>(
  "interactive-free-bound-morphemes",
  {},
  { encode: JSON.stringify, decode: (value) => JSON.parse(value) },
);
export const resetFreeAndBoundMorphemes = () => {
  clearPersistentMap("interactive-free-bound-morphemes");
  $placedMorphemes.set({});
};

function Morpheme({ value }: { value: string }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: value,
  });

  return (
    <button
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="touch-none rounded-md bg-teal-100 px-2 py-1 text-sm text-teal-500 cursor-grab active:cursor-grabbing"
      style={
        transform
          ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
          : undefined
      }
    >
      {value}
    </button>
  );
}

function Category({
  id,
  title,
  values,
}: {
  id: string;
  title: string;
  values: string[];
}) {
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`min-h-24 flex-1 rounded-md bg-background-100 p-3 transition-colors ${isOver ? "ring-2 ring-teal-500" : ""}`}
    >
      <p className="mb-2 text-sm font-medium text-teal-500">{title}</p>
      <div className="flex flex-wrap gap-2">
        {values.map((value) => (
          <Morpheme key={value} value={value} />
        ))}
      </div>
    </div>
  );
}

export function ClassifyFreeAndBoundMorphemes() {
  const placed = useStore($placedMorphemes);

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || !["free", "bound"].includes(String(over.id))) return;

    const value = String(active.id);
    const category = String(over.id);

    $placedMorphemes.setKey(value, category);

    if (
      MORPHEMES.every((item) =>
        item === value
          ? category === (FREE.has(item) ? "free" : "bound")
          : placed[item] === (FREE.has(item) ? "free" : "bound"),
      )
    )
      $progress.setKey(PAGES.morphemes, 2);
  };

  return (
    <InteractiveBlock>
      <p className="mb-4 font-medium text-blue-500">
        Classify the following English morphemes into free and bound status.
      </p>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="not-empty:mb-4 flex flex-wrap gap-2">
          {MORPHEMES.filter((value) => !placed[value]).map((value) => (
            <Morpheme key={value} value={value} />
          ))}
        </div>
        <div className="flex gap-2">
          <Category
            id="free"
            title="Free morphemes"
            values={MORPHEMES.filter((value) => placed[value] === "free")}
          />
          <Category
            id="bound"
            title="Bound morphemes"
            values={MORPHEMES.filter((value) => placed[value] === "bound")}
          />
        </div>
      </DndContext>
    </InteractiveBlock>
  );
}
