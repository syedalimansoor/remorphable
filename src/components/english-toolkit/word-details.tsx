import { useState } from "react";
import { cn } from "cn";
import type { EnglishWord, MorphemeTag } from "../../data/english-words";

const tagLabels: Record<MorphemeTag, string> = {
  BOUND: "BOUND",
  FREE: "FREE",
  PREFIX: "PREFIX",
  BASE: "BASE",
  SUFFIX: "SUFFIX",
  INFLECTIONAL: "INFLECTIONAL",
  DERIVATIONAL: "DERIVATIONAL",
};

export function WordDetails({ word }: { word: EnglishWord }) {
  const [selectedMorpheme, setSelectedMorpheme] = useState(
    word.spelling === "deconstruction" ? 1 : 0,
  );
  const morpheme = word.morphemes[selectedMorpheme];

  return (
    <section aria-label={`${word.spelling} word details`} className="mb-7">
      <div className="flex gap-4 items-end justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-display text-3xl font-semibold leading-tight text-yellow-500">
              {word.spelling}
            </h3>
            <span className="rounded-sm bg-yellow-900 px-2 py-1 text-[10px] text-yellow-500">
              {word.partOfSpeech}
            </span>
          </div>
          <p className="mt-1 text-sm text-foreground-200">
            {word.pronunciation}
          </p>
          <p className="mt-2 max-w-sm text-white leading-snug">
            {word.definition}
          </p>
        </div>

        <div className="shrink-0 sm:pt-8">
          <p className="mb-2 text-right text-[10px] leading-tight text-foreground-200">
            Select a morpheme to
            <br />
            learn more about it
          </p>
          <div className="flex flex-wrap justify-center gap-1">
            {word.morphemes.map((item, index) => (
              <button
                type="button"
                key={`${item.spelling}-${index}`}
                onClick={() => setSelectedMorpheme(index)}
                aria-pressed={selectedMorpheme === index}
                className={cn(
                  "rounded-sm px-2 py-1 text-xs transition-colors cursor-pointer",
                  selectedMorpheme === index
                    ? "bg-yellow-500 text-yellow-900"
                    : "bg-background-600 text-foreground-100 hover:bg-background-800",
                )}
              >
                {item.spelling.replaceAll("-", "")}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-7 flex min-h-32 flex-col items-center justify-center rounded-lg bg-background-800 px-5 py-4 text-center">
        <h4 className="text-xl font-semibold text-white">
          {morpheme.spelling}
        </h4>
        <p className="mt-2 text-sm text-foreground-200">
          {morpheme.pronunciation}
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-1">
          {morpheme.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-sm bg-teal-500 px-2 py-0.5 text-[10px] font-medium text-teal-100"
            >
              {tagLabels[tag]}
            </span>
          ))}
        </div>
        <p className="mt-2 text-sm text-white">{morpheme.definition}</p>
      </div>
    </section>
  );
}
