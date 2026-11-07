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
import { shuffle } from "../../utils/shuffle-array";
import { InteractiveBlock } from "../interactive-block";

const groups = {
  be: ["am", "was", "were", "is", "being", "been"],
  good: ["good", "best", "better"],
  mouse: ["mouse", "mice"],
};
const words = shuffle(Object.values(groups).flat());
const $placedLexemes = persistentMap<Record<string, string>>(
  "interactive-lexeme-sort",
  {},
  { encode: JSON.stringify, decode: (value) => JSON.parse(value) },
);
export const resetLexemeSort = () => {
  clearPersistentMap("interactive-lexeme-sort");
  $placedLexemes.set({});
};
function Word({ value }: { value: string }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: value,
  });
  return (
    <button
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="rounded-md bg-teal-100 px-2 py-1 text-sm text-teal-500 cursor-grab touch-none"
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
function LexemeBox({ id, values }: { id: string; values: string[] }) {
  const { isOver, setNodeRef } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      className={`min-h-24 flex-1 rounded-md bg-background-100 p-3 ${isOver ? "ring-2 ring-teal-500" : ""}`}
    >
      <p className="mb-2 text-sm font-medium text-teal-500 uppercase">{id}</p>
      <div className="flex flex-wrap gap-2">
        {values.map((word) => (
          <Word key={word} value={word} />
        ))}
      </div>
    </div>
  );
}
export function LexemeSort() {
  const placed = useStore($placedLexemes);
  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || !(over.id in groups)) return;
    const value = String(active.id);
    const category = String(over.id);
    $placedLexemes.setKey(value, category);
    const next = { ...placed, [value]: category };
      if (
        words.every(
          (word) =>
            next[word] ===
            Object.keys(groups).find((key) =>
              groups[key as keyof typeof groups].includes(word),
            ),
        )
      )
        $progress.setKey(PAGES.suppletionAndLexemes, 2);
    
  };
  return (
    <InteractiveBlock>
      <p className="mb-4 font-medium text-blue-500">
        Drag the following word forms into the box of their correct lexeme.
      </p>
      <DndContext onDragEnd={onDragEnd}>
        <div className="not-empty:mb-4 flex flex-wrap gap-2">
          {words
            .filter((word) => !placed[word])
            .map((word) => (
              <Word key={word} value={word} />
            ))}
        </div>
        <div className="flex gap-2 mb-1">
          {Object.keys(groups).map((id) => (
            <LexemeBox
              key={id}
              id={id}
              values={words.filter((word) => placed[word] === id)}
            />
          ))}
        </div>
      </DndContext>
    </InteractiveBlock>
  );
}
