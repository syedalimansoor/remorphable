import { cn } from "cn";
import { useState } from "react";
import type { EnglishWord, MorphemeTag } from "../../data/english-words";

import baseIcon from "../../assets/morpheme-tags/base.svg?url";
import boundIcon from "../../assets/morpheme-tags/bound.svg?url";
import derivationalIcon from "../../assets/morpheme-tags/derivational.svg?url";
import freeIcon from "../../assets/morpheme-tags/free.svg?url";
import inflectionalIcon from "../../assets/morpheme-tags/inflectional.svg?url";
import prefixIcon from "../../assets/morpheme-tags/prefix.svg?url";
import suffixIcon from "../../assets/morpheme-tags/suffix.svg?url";
import { MorphemeTagBadge } from "./morpheme-tag";

const tagDetails: Record<MorphemeTag, { label: string; icon: string }> = {
  BOUND: { label: "BOUND", icon: boundIcon },
  FREE: { label: "FREE", icon: freeIcon },
  PREFIX: { label: "PREFIX", icon: prefixIcon },
  BASE: { label: "BASE", icon: baseIcon },
  SUFFIX: { label: "SUFFIX", icon: suffixIcon },
  INFLECTIONAL: { label: "INFLECTIONAL", icon: inflectionalIcon },
  DERIVATIONAL: { label: "DERIVATIONAL", icon: derivationalIcon },
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
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          {morpheme.tags.map((tag) => (
            <MorphemeTagBadge
              key={tag}
              tag={tag}
              label={tagDetails[tag].label}
              icon={tagDetails[tag].icon}
            />
          ))}
        </div>
        <p className="mt-2 text-sm text-white">{morpheme.definition}</p>
      </div>
    </section>
  );
}
