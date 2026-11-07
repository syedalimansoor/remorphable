import { useStore } from "@nanostores/react";
import { cn } from "cn";
import { useState } from "react";
import type { EnglishWord, MorphemeTag } from "../../data/english-words";
import { $progress } from "../../stores/progress";

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
  const progress = useStore($progress);
  const [selectedMorpheme, setSelectedMorpheme] = useState(
    word.spelling === "deconstruction" ? 1 : 0,
  );
  const [allomorphSelection, setAllomorphSelection] = useState<{
    morphemeIndex: number;
    allomorphIndex: number;
  } | null>(null);
  const morpheme = word.morphemes[selectedMorpheme];
  const hasReachedInflectionAndDerivation =
    progress["inflection-and-derivation"] >= 1;
  const allomorphs = progress.allomorphy >= 2 ? morpheme.allomorphs : undefined;
  const lexemeMembers =
    progress["suppletion-and-lexemes"] >= 2
      ? morpheme.lexeme?.members
      : undefined;
  const [lexemeSelection, setLexemeSelection] = useState<{
    morphemeIndex: number;
    memberIndex: number;
  } | null>(null);
  const selectedAllomorphIndex =
    allomorphSelection?.morphemeIndex === selectedMorpheme
      ? allomorphSelection.allomorphIndex
      : Math.max(
          0,
          allomorphs?.findIndex(
            (allomorph) => allomorph.spelling === morpheme.spelling,
          ) ?? 0,
        );
  const selectedAllomorph = allomorphs?.[selectedAllomorphIndex];
  const selectedLexemeMemberIndex =
    lexemeSelection?.morphemeIndex === selectedMorpheme
      ? lexemeSelection.memberIndex
      : Math.max(
          0,
          lexemeMembers?.findIndex(
            (member) => member.spelling === morpheme.spelling,
          ) ?? 0,
        );
  const selectedLexemeMember = lexemeMembers?.[selectedLexemeMemberIndex];

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
          <div className="flex flex-wrap justify-end gap-1">
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

      <div className="mt-7 flex min-h-32 overflow-hidden rounded-lg bg-background-900 text-center">
        {lexemeMembers && selectedLexemeMember && (
          <aside
            aria-label="Lexeme members"
            className="flex w-28 shrink-0 flex-col bg-background-900 px-3 py-3 text-left"
          >
            <h5 className="mb-2 text-[10px] font-medium text-foreground-200">
              LEXEME MEMBERS
            </h5>
            <div className="flex flex-wrap content-start gap-1">
              {lexemeMembers.map((member, index) => {
                const isSelected = index === selectedLexemeMemberIndex;
                return (
                  <button
                    type="button"
                    key={`${member.spelling}-${index}`}
                    onClick={() =>
                      setLexemeSelection({
                        morphemeIndex: selectedMorpheme,
                        memberIndex: index,
                      })
                    }
                    aria-pressed={isSelected}
                    className={cn(
                      "cursor-pointer rounded px-1.5 py-1 text-xs leading-none transition-colors",
                      isSelected
                        ? "bg-white text-foreground-500"
                        : "bg-background-700 text-foreground-100 hover:text-white",
                    )}
                  >
                    {member.spelling}
                  </button>
                );
              })}
            </div>
            <p className="mt-auto pt-3 text-[10px] font-medium text-foreground-200">
              {morpheme.lexeme?.name}
            </p>
          </aside>
        )}
        <div className="flex min-w-0 flex-1 flex-col items-center rounded-lg justify-center px-5 py-4 bg-background-800">
          <h4 className="text-xl font-semibold text-white">
            {selectedLexemeMember?.spelling ??
              selectedAllomorph?.spelling ??
              morpheme.spelling}
          </h4>
          <p className="mt-2 text-sm text-foreground-200">
            {selectedLexemeMember?.pronunciation ??
              selectedAllomorph?.pronunciation ??
              morpheme.pronunciation}
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-2">
            {morpheme.tags
              .filter(
                (tag) =>
                  hasReachedInflectionAndDerivation ||
                  (tag !== "INFLECTIONAL" && tag !== "DERIVATIONAL"),
              )
              .map((tag) => (
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
        {allomorphs && selectedAllomorph && (
          <aside
            aria-label="Allomorphs"
            className="w-24 shrink-0 bg-background-900 px-3 py-3 text-left"
          >
            <h5 className="mb-2 text-[10px] font-medium text-foreground-200">
              ALLOMORPHS
            </h5>
            <div className="flex flex-wrap gap-1.5">
              {allomorphs.map((allomorph, index) => {
                const isSelected = index === selectedAllomorphIndex;
                return (
                  <button
                    type="button"
                    key={`${allomorph.spelling}-${index}`}
                    onClick={() =>
                      setAllomorphSelection({
                        morphemeIndex: selectedMorpheme,
                        allomorphIndex: index,
                      })
                    }
                    aria-pressed={isSelected}
                    className={cn(
                      "cursor-pointer rounded px-1.5 py-1 text-xs leading-none transition-colors",
                      isSelected
                        ? "bg-white text-foreground-500"
                        : "bg-background-700 text-foreground-100 hover:text-white",
                    )}
                  >
                    {allomorph.spelling}
                  </button>
                );
              })}
            </div>
          </aside>
        )}
      </div>
    </section>
  );
}
