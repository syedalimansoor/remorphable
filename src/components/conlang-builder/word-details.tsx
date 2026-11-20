import { TrashIcon } from "@phosphor-icons/react";
import { cn } from "cn";
import { useState } from "react";
import type {
  ConlangMorpheme,
  ConlangWord,
} from "../../stores/conlang-builder";

export function WordDetails({
  word,
  spelling,
  morphemes,
  onDelete,
}: {
  word: ConlangWord;
  spelling: string;
  morphemes: ConlangMorpheme[];
  onDelete: () => void;
}) {
  const [selectedMorphemeId, setSelectedMorphemeId] = useState(
    morphemes[0]?.id ?? null,
  );
  const selectedMorpheme =
    morphemes.find((morpheme) => morpheme.id === selectedMorphemeId) ?? null;

  return (
    <section
      aria-label={`${spelling} word details`}
      className="mt-auto rounded-lg bg-blue-800 p-4 sm:p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-display text-2xl font-semibold leading-tight text-yellow-500">
              {spelling}
            </h3>
            <span className="rounded bg-blue-700 px-2 py-1 text-xs text-blue-300">
              {word.partOfSpeech}
            </span>
          </div>
          <p className="mt-2 text-sm leading-snug text-blue-100">
            {word.definition}
          </p>
        </div>
        <button
          type="button"
          onClick={onDelete}
          aria-label={`Delete ${spelling}`}
          title="Delete word"
          className="shrink-0 cursor-pointer rounded p-2 text-blue-300 transition-colors hover:bg-blue-700 hover:text-rose-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500"
        >
          <TrashIcon size={18} />
        </button>
      </div>

      <div className="mt-4 rounded-lg bg-blue-700 p-3">
        <p className="mb-2 text-xs font-bold text-blue-300">MORPHEMES</p>
        {morphemes.length > 0 ? (
          <>
            <div className="flex flex-wrap gap-1.5">
              {morphemes.map((morpheme, index) => (
                <button
                  type="button"
                  key={`${morpheme.id}-${index}`}
                  onClick={() => setSelectedMorphemeId(morpheme.id)}
                  aria-pressed={selectedMorphemeId === morpheme.id}
                  className={cn(
                    "cursor-pointer rounded px-2 py-1 text-xs transition-colors",
                    selectedMorphemeId === morpheme.id
                      ? "bg-yellow-500 text-blue-800"
                      : "bg-blue-800 text-blue-100 hover:bg-blue-600",
                  )}
                >
                  {morpheme.spelling}
                </button>
              ))}
            </div>
            {selectedMorpheme && (
              <div className="mt-3 rounded bg-blue-600 px-3 py-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="font-display text-lg font-semibold text-yellow-500">
                    {selectedMorpheme.spelling}
                  </h4>
                  <span className="rounded bg-blue-800 px-2 py-1 text-xs text-blue-300">
                    {selectedMorpheme.category}
                  </span>
                </div>
                <p className="mt-1 text-sm text-blue-100">
                  {selectedMorpheme.definition || "No definition added yet."}
                </p>
              </div>
            )}
          </>
        ) : (
          <p className="text-sm text-blue-300">
            No morphemes are available for this word.
          </p>
        )}
      </div>
    </section>
  );
}
