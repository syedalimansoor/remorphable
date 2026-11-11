import {
  ArrowClockwiseIcon,
  CheckIcon,
  MagnifyingGlassIcon,
  NumberCircleOneIcon,
  NumberCircleTwoIcon,
} from "@phosphor-icons/react";
import { cn } from "cn";
import { useRef, useState, type FormEvent } from "react";
import {
  morphemeDefinitionSuggestions,
  wordDefinitionSuggestions,
} from "../../data/conlang-definition-suggestions";
import type { ConlangMorpheme } from "../../stores/conlang-builder";
import type { Bank, CreationStep } from "./types";

type CreationFormProps = {
  bank: Bank;
  definition: string;
  onDefinitionChange: (value: string) => void;
  spelling: string;
  onSpellingChange: (value: string) => void;
  step: CreationStep;
  onStepChange: (step: CreationStep) => void;
  morphemes: ConlangMorpheme[];
  morphemeCount: number;
  selectedMorphemeIds: string[];
  onToggleMorpheme: (id: string) => void;
  morphemeQuery: string;
  onMorphemeQueryChange: (value: string) => void;
  composedSpelling: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function CreationForm({
  bank,
  definition,
  onDefinitionChange,
  spelling,
  onSpellingChange,
  step,
  onStepChange,
  morphemes,
  morphemeCount,
  selectedMorphemeIds,
  onToggleMorpheme,
  morphemeQuery,
  onMorphemeQueryChange,
  composedSpelling,
  onSubmit,
}: CreationFormProps) {
  const isWord = bank === "words";
  const suggestionPool = isWord
    ? wordDefinitionSuggestions
    : morphemeDefinitionSuggestions;
  const [suggestions, setSuggestions] = useState<string[]>(() =>
    suggestionPool.slice(0, 3),
  );
  const definitionInputRef = useRef<HTMLInputElement>(null);

  const refreshSuggestions = () => {
    const currentSuggestions = new Set(suggestions);
    const shuffledSuggestions = suggestionPool.filter(
      (suggestion) => !currentSuggestions.has(suggestion),
    );

    for (let index = shuffledSuggestions.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [shuffledSuggestions[index], shuffledSuggestions[randomIndex]] = [
        shuffledSuggestions[randomIndex],
        shuffledSuggestions[index],
      ];
    }

    setSuggestions(shuffledSuggestions.slice(0, 3));
  };

  return (
    <div>
      <header>
        <p className="font-bold px-4 text-xs py-3 text-blue-100 uppercase">
          Create a {isWord ? "word" : "morpheme"}
        </p>
      </header>
      <form
        onSubmit={onSubmit}
        className="rounded-lg bg-blue-700 p-5"
        aria-label={`Create a ${isWord ? "word" : "morpheme"}`}
      >
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-yellow-500">
              {step === "define" ? (
                <NumberCircleOneIcon weight="duotone" size={20} />
              ) : (
                <NumberCircleTwoIcon weight="duotone" size={20} />
              )}
            </span>
            <h4 className="text-xl font-semibold leading-none text-yellow-500">
              {step === "define" ? "Define" : "Spell"}
            </h4>
          </div>
          <div className="flex items-end">
            <div className="text-xs leading-tight text-blue-300">
              {step === "define" ? (
                <>
                  <p>What does your {isWord ? "word" : "morpheme"} mean?</p>
                  <p>
                    Choose from these options or create your own definition.
                  </p>
                </>
              ) : isWord ? (
                "How is your word spelled? Choose morphemes from the bank to build up your word."
              ) : (
                "How is your morpheme written?"
              )}
            </div>
            {step === "define" && (
              <button
                type="button"
                onClick={refreshSuggestions}
                className="ml-auto flex cursor-pointer items-center gap-2 text-xs text-blue-300 hover:text-blue-100"
                aria-label="Refresh suggestions"
                title="Refresh suggestions"
              >
                <ArrowClockwiseIcon />
                <span>Refresh suggestions</span>
              </button>
            )}
          </div>
        </div>
        {step === "define" ? (
          <div className="space-y-1.5">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => {
                  onDefinitionChange(suggestion);
                  definitionInputRef.current?.focus();
                }}
                aria-pressed={definition === suggestion}
                className={cn(
                  "block w-full cursor-pointer rounded px-2 py-1.5 text-left text-sm transition-colors",
                  definition === suggestion
                    ? "bg-yellow-500 text-blue-800"
                    : "bg-blue-600 text-blue-100 hover:bg-blue-400",
                )}
              >
                {suggestion}
              </button>
            ))}
            <div className="flex gap-1">
              <input
                ref={definitionInputRef}
                value={definition}
                onChange={(event) => onDefinitionChange(event.target.value)}
                placeholder={`Enter the definition of your ${isWord ? "word" : "morpheme"}...`}
                aria-label={`${isWord ? "Word" : "Morpheme"} definition`}
                className="w-full rounded bg-blue-600 px-2 py-1.5 pr-10 text-sm text-blue-100 outline-none placeholder:text-blue-400 focus:ring-2 focus:ring-yellow-500"
              />
              <button
                type="button"
                disabled={!definition.trim()}
                onClick={() => onStepChange("spell")}
                className="ml-auto flex size-8 cursor-pointer items-center justify-center rounded bg-blue-100 p-1.5 text-blue-500 transition-colors hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Continue to spelling"
              >
                <CheckIcon size={16} weight="bold" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            {isWord ? (
              <>
                <label className="relative mb-3 block">
                  <span className="sr-only">Search for a morpheme</span>
                  <input
                    type="search"
                    value={morphemeQuery}
                    onChange={(event) =>
                      onMorphemeQueryChange(event.target.value)
                    }
                    placeholder="Search for a morpheme..."
                    className="w-full rounded bg-blue-600 py-1.5 pl-2 pr-8 text-sm text-blue-100 outline-none placeholder:text-blue-400 focus:ring-2 focus:ring-yellow-500"
                  />
                  <MagnifyingGlassIcon
                    size={14}
                    aria-hidden="true"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-300"
                  />
                </label>
                <div className="mb-3 flex max-h-20 flex-wrap gap-1.5 overflow-y-auto">
                  {morphemeCount === 0 ? (
                    <p className="text-xs text-yellow-500 font-bold">
                      No morphemes found! Create some morphemes in the Morpheme
                      Bank first.
                    </p>
                  ) : morphemes.length > 0 ? (
                    morphemes.map((morpheme) => (
                      <button
                        type="button"
                        key={morpheme.id}
                        onClick={() => onToggleMorpheme(morpheme.id)}
                        aria-pressed={selectedMorphemeIds.includes(morpheme.id)}
                        className={cn(
                          "cursor-pointer rounded px-2 py-1 text-xs transition-colors",
                          selectedMorphemeIds.includes(morpheme.id)
                            ? "bg-yellow-500 text-blue-800"
                            : "bg-blue-100 text-blue-500 hover:bg-blue-300",
                        )}
                      >
                        {morpheme.spelling}
                      </button>
                    ))
                  ) : (
                    <p className="text-xs text-blue-300">
                      No matching morphemes.
                    </p>
                  )}
                </div>
              </>
            ) : null}
            {isWord ? (
              <>
                <div className="flex min-h-12 items-center gap-2 rounded border-2 border-dashed border-blue-400 bg-blue-600 px-3 py-2 ">
                  <p className="text-sm text-blue-100">
                    {composedSpelling || (
                      <span className="text-blue-400">
                        Your word gets built here
                      </span>
                    )}
                  </p>
                </div>
                {definition.trim() && (
                  <span className="mt-2 inline-block mb-0 max-w-full truncate text-xs text-blue-300 font-bold">
                    {definition}
                  </span>
                )}
                <div className="mt-2 flex justify-between">
                  <button
                    type="button"
                    onClick={() => onStepChange("define")}
                    className="cursor-pointer text-xs text-blue-300 underline hover:text-blue-100"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={
                      !composedSpelling.trim() ||
                      !selectedMorphemeIds.length ||
                      !definition.trim()
                    }
                    className="cursor-pointer rounded bg-blue-100 p-1.5 text-blue-500 transition-colors hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label="Create word"
                  >
                    <CheckIcon size={16} weight="bold" />
                  </button>
                </div>
              </>
            ) : (
              <input
                autoFocus
                value={spelling}
                onChange={(event) => onSpellingChange(event.target.value)}
                placeholder="Spell out your morpheme..."
                aria-label="Morpheme spelling"
                className="w-full rounded bg-blue-600 px-2 py-2 text-sm text-blue-100 outline-none placeholder:text-blue-400 focus:ring-2 focus:ring-yellow-500"
              />
            )}
            {!isWord && (
              <div className="mt-2 flex justify-between">
                <button
                  type="button"
                  onClick={() => onStepChange("define")}
                  className="cursor-pointer text-xs text-blue-300 underline hover:text-blue-100"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={!spelling.trim() || !definition.trim()}
                  className="cursor-pointer rounded bg-blue-100 p-1.5 text-blue-500 transition-colors hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Create morpheme"
                >
                  <CheckIcon size={16} weight="bold" />
                </button>
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
}
