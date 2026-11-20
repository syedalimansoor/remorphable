import {
  ArrowLeftIcon,
  MinusCircleIcon,
  PlusCircleIcon,
  ShuffleIcon,
  XIcon,
} from "@phosphor-icons/react";
import { cn } from "cn";
import {
  partsOfSpeech,
  type CreationStep,
  type MorphemeCategory,
  type PartOfSpeech,
} from "./types";

type CreationFormProps = {
  step: CreationStep;
  firstWord: boolean;
  spelling: string;
  definition: string;
  partOfSpeech: PartOfSpeech;
  segments: string[];
  describedMorphemes: string[];
  boundaries: number[];
  selectedMorpheme: string;
  morphemeCategory: MorphemeCategory;
  morphemeDefinition: string;
  validationMessage: string;
  onStepChange: (step: CreationStep) => void;
  onCreateWord: () => void;
  onSpellingChange: (value: string) => void;
  onDefinitionChange: (value: string) => void;
  onPartOfSpeechChange: (value: PartOfSpeech) => void;
  onGenerateRandomWord: () => void;
  onToggleBoundary: (position: number) => void;
  onSelectMorpheme: (spelling: string) => void;
  onMorphemeCategoryChange: (value: MorphemeCategory) => void;
  onMorphemeDefinitionChange: (value: string) => void;
  onClearValidation: () => void;
  onCancelCreation: () => void;
  onCreateSingleMorpheme: () => void;
  onComplete: () => void;
};

const categories: MorphemeCategory[] = ["prefix", "base", "suffix"];

export function CreationForm({
  step,
  firstWord,
  spelling,
  definition,
  partOfSpeech,
  segments,
  describedMorphemes,
  boundaries,
  selectedMorpheme,
  morphemeCategory,
  morphemeDefinition,
  validationMessage,
  onStepChange,
  onCreateWord,
  onSpellingChange,
  onDefinitionChange,
  onPartOfSpeechChange,
  onGenerateRandomWord,
  onToggleBoundary,
  onSelectMorpheme,
  onMorphemeCategoryChange,
  onMorphemeDefinitionChange,
  onClearValidation,
  onCancelCreation,
  onCreateSingleMorpheme,
  onComplete,
}: CreationFormProps) {
  const letters = Array.from(spelling);

  const goTo = (nextStep: CreationStep) => {
    onClearValidation();
    onStepChange(nextStep);
  };

  if (step === "define") {
    return (
      <div className="mx-auto w-full max-w-lg animate-slide-in">
        <p className="mb-1 text-center text-base leading-tight text-blue-100">
          {firstWord ? (
            <>
              Let’s start by creating your <strong>first word</strong>
              <br />
              in this new, <i>imaginary</i> language.
            </>
          ) : (
            <>
              Let’s create another word for your
              <br />
              <i>imaginary</i> language.
            </>
          )}
        </p>
        <p className="mb-8 mt-2 text-center text-xs text-blue-300">
          Try to make a word that has <strong>multiple morphemes!</strong>
        </p>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (!spelling.trim() || !definition.trim()) return;
            onCreateWord();
          }}
          aria-label="Define your word"
        >
          <div className="rounded-xl bg-blue-700 p-5">
            <label
              className="mb-2 block text-sm text-blue-100"
              htmlFor="word-spelling"
            >
              How is your word spelt?
            </label>
            <div className="flex items-center rounded bg-blue-600 pr-1 focus-within:ring-2 focus-within:ring-yellow-500">
              <input
                id="word-spelling"
                required
                value={spelling}
                onChange={(event) =>
                  onSpellingChange(event.target.value.replace(/\s/g, ""))
                }
                placeholder="glazer"
                aria-label="Word spelling (no spaces)"
                className="min-w-0 flex-1 rounded bg-transparent px-3 py-2 text-2xl font-bold font-display text-yellow-500 outline-none placeholder:text-blue-400 "
              />
              <button
                type="button"
                onClick={onGenerateRandomWord}
                className="flex items-cetner gap-2 shrink-0 cursor-pointer px-3 py-2 text-xs text-blue-300 hover:text-blue-100"
              >
                <ShuffleIcon size={16} />
                Generate random word
              </button>
            </div>

            <div className="my-5 flex flex-wrap gap-2">
              {partsOfSpeech.map((part) => (
                <button
                  key={part}
                  type="button"
                  aria-pressed={partOfSpeech === part}
                  onClick={() => onPartOfSpeechChange(part)}
                  className={cn(
                    "cursor-pointer rounded px-2 py-1 text-xs transition-colors",
                    partOfSpeech === part
                      ? "bg-blue-100 text-blue-700"
                      : "bg-blue-800 text-blue-300 hover:bg-blue-600 hover:text-blue-100",
                  )}
                >
                  {part}
                </button>
              ))}
            </div>

            <label
              className="mb-2 block text-sm text-blue-100"
              htmlFor="word-definition"
            >
              What does your word mean?
            </label>
            <textarea
              id="word-definition"
              required
              value={definition}
              onChange={(event) => onDefinitionChange(event.target.value)}
              placeholder="Someone who excessively flatters another person."
              rows={3}
              className="w-full resize-none field-sizing-content max-h-24 min-h-24 rounded bg-blue-600 px-3 py-3 text-base text-blue-100 outline-none placeholder:text-blue-400 focus:ring-2 focus:ring-yellow-500"
            />
            {validationMessage && (
              <p role="alert" className="mt-3 text-xs text-rose-200">
                {validationMessage}
              </p>
            )}
          </div>

          <div
            className={`mt-8 flex items-center ${
              firstWord ? "justify-center" : "justify-between"
            }`}
          >
            {!firstWord && (
              <button
                type="button"
                onClick={onCancelCreation}
                className="flex items-center gap-2 cursor-pointer text-xs text-blue-300 hover:text-blue-100"
              >
                <ArrowLeftIcon size={12} />
                <span className="underline">Go back</span>
              </button>
            )}
            <button
              type="submit"
              disabled={!spelling.trim() || !definition.trim()}
              className="cursor-pointer rounded bg-yellow-500 px-4 py-2 text-sm font-bold text-blue-700 transition-colors hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Create word
            </button>
          </div>
        </form>
      </div>
    );
  }

  if (step === "split") {
    const morphemeCount = boundaries.length + 1;
    return (
      <div className="mx-auto w-full max-w-lg text-center animate-slide-in">
        <WordPreview
          spelling={spelling}
          definition={definition}
          partOfSpeech={partOfSpeech}
        />
        <p className="mt-8 text-base leading-tight text-blue-100">
          Nice! Now break your word down
          <br />
          into its different morphemes.
        </p>
        <p className="mt-2 text-xs text-blue-300">
          Choose boundaries between letters to split the word.
        </p>

        <div
          className="mx-auto mt-8 flex max-w-full items-center justify-center overflow-x-auto rounded-xl bg-blue-700 px-3 py-4"
          aria-label="Choose morpheme boundaries"
        >
          {letters.map((letter, index) => (
            <div
              key={`${index}-${letter}`}
              className="flex shrink-0 items-center"
            >
              <span className="flex size-8 items-center justify-center bg-blue-800 text-base text-blue-100 rounded-sm">
                {letter}
              </span>
              {index < letters.length - 1 && (
                <button
                  type="button"
                  aria-label={`${boundaries.includes(index) ? "Remove" : "Add"} boundary after ${letter}`}
                  aria-pressed={boundaries.includes(index)}
                  onClick={() => onToggleBoundary(index)}
                  className={cn(
                    "flex h-8 px-0.5 cursor-pointer items-center justify-center group relative before:absolute before:-inset-3",
                    "text-blue-400 hover:text-blue-100",
                    boundaries.includes(index) && "px-2",
                  )}
                >
                  {boundaries.includes(index) ? (
                    <MinusCircleIcon size={16} weight="fill" className="" />
                  ) : (
                    <PlusCircleIcon
                      size={16}
                      weight="fill"
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-50 absolute"
                    />
                  )}
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => goTo("define")}
            className="flex items-center gap-2 cursor-pointer text-xs text-blue-300 hover:text-blue-100"
          >
            <ArrowLeftIcon size={12} />
            <span className="underline">Go back</span>
          </button>
          <button
            type="button"
            onClick={() => {
              if (morphemeCount === 1) {
                onCreateSingleMorpheme();
                return;
              }
              onSelectMorpheme(segments[0] ?? spelling);
              goTo("describe");
            }}
            className="cursor-pointer rounded bg-yellow-500 px-4 py-2 text-sm font-bold text-blue-700 transition-colors hover:bg-yellow-400"
          >
            {morphemeCount === 1
              ? "My word only has one morpheme"
              : `Create ${morphemeCount} morphemes`}
          </button>
        </div>
      </div>
    );
  }

  const allMorphemesDefined =
    segments.length > 0 &&
    segments.every((segment) => describedMorphemes.includes(segment));

  return (
    <div className="mx-auto w-full max-w-lg text-center animate-slide-in">
      <WordPreview
        spelling={spelling}
        definition={definition}
        partOfSpeech={partOfSpeech}
      />
      <p className="mt-8 text-base leading-tight text-blue-100">
        Next, describe the attributes of
        <br />
        each of these morphemes.
      </p>
      <p className="mt-2 text-xs text-blue-300">
        Select a morpheme, then describe it below.
      </p>

      <form
        id="morpheme-description"
        onSubmit={(event) => {
          event.preventDefault();
          onComplete();
        }}
        className="mx-auto mt-8 rounded-xl bg-blue-700 p-5 text-left"
      >
        <div className="mb-4 flex flex-wrap gap-1.5">
          {segments.map((segment, index) => (
            <button
              key={`${segment}-${index}`}
              type="button"
              aria-pressed={selectedMorpheme === segment}
              onClick={() => onSelectMorpheme(segment)}
              className={cn(
                "cursor-pointer rounded px-2 py-1 text-sm transition-colors",
                selectedMorpheme === segment
                  ? "bg-blue-100 text-blue-700"
                  : "bg-blue-800 text-blue-300 hover:bg-blue-600 hover:text-blue-100",
              )}
            >
              {segment}
            </button>
          ))}
        </div>
        <div className="mb-4 flex items-center justify-between gap-3">
          <h4 className="font-display text-xl font-semibold text-yellow-500">
            {selectedMorpheme}
          </h4>
          <div className="flex gap-1">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                aria-pressed={morphemeCategory === category}
                onClick={() => onMorphemeCategoryChange(category)}
                className={cn(
                  "cursor-pointer rounded px-2 py-1 text-xs transition-colors",
                  morphemeCategory === category
                    ? "bg-blue-100 text-blue-700"
                    : "bg-blue-800 text-blue-300 hover:bg-blue-600 hover:text-blue-100",
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <label
          htmlFor="morpheme-definition"
          className="mb-2 block text-xs text-blue-100"
        >
          What does this morpheme mean?
        </label>
        <textarea
          id="morpheme-definition"
          value={morphemeDefinition}
          onChange={(event) => onMorphemeDefinitionChange(event.target.value)}
          placeholder={`Enter the meaning of “${selectedMorpheme}”`}
          className="w-full h-18 resize-none rounded bg-blue-600 px-3 py-3 text-sm text-blue-100 outline-none placeholder:text-blue-400 focus:ring-2 focus:ring-yellow-500"
        />
      </form>

      {validationMessage && (
        <div
          role="alert"
          className="mt-3 flex items-center justify-between gap-3 rounded border border-rose-300/50 bg-rose-900/20 px-3 py-2 text-left text-xs text-blue-100"
        >
          <span>{validationMessage}</span>
          <button
            type="button"
            onClick={onClearValidation}
            aria-label="Dismiss validation message"
            className="cursor-pointer text-blue-100 hover:text-white"
          >
            <XIcon />
          </button>
        </div>
      )}
      <div className="mt-6 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => goTo("split")}
          className="flex items-center gap-2 cursor-pointer text-xs text-blue-300 hover:text-blue-100"
        >
          <ArrowLeftIcon size={12} />
          <span className="underline">Go back</span>
        </button>
        <button
          type="submit"
          form="morpheme-description"
          disabled={!allMorphemesDefined}
          className="cursor-pointer rounded bg-yellow-500 px-4 py-2 text-sm font-bold text-blue-700 transition-colors hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
          title="Enter definitions for all morphemes to continue"
        >
          Complete
        </button>
      </div>
    </div>
  );
}

function WordPreview({
  spelling,
  definition,
  partOfSpeech,
}: {
  spelling: string;
  definition: string;
  partOfSpeech: PartOfSpeech;
}) {
  return (
    <section className="rounded-xl bg-blue-700 p-5 text-left">
      <div className="flex flex-wrap items-center gap-3">
        <h4 className="font-display text-xl font-semibold text-yellow-500">
          {spelling}
        </h4>
        <span className="rounded bg-blue-800 px-2 py-1 text-xs text-blue-300">
          {partOfSpeech}
        </span>
      </div>
      <p className="mt-2 text-sm leading-snug text-blue-100">{definition}</p>
    </section>
  );
}
