import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { cn } from "cn";
import type { FormEvent } from "react";
import {
  morphemeDefinitionSuggestions,
  wordDefinitionSuggestions,
} from "../../data/conlang-definition-suggestions";
import type {
  ConlangMorpheme,
  MorphemeRole,
} from "../../stores/conlang-builder";
import type { Bank } from "./types";

type CreationFormProps = {
  bank: Bank;
  definition: string;
  onDefinitionChange: (value: string) => void;
  spelling: string;
  onSpellingChange: (value: string) => void;
  role: MorphemeRole;
  onRoleChange: (value: MorphemeRole) => void;
  morphemes: ConlangMorpheme[];
  morphemeCount: number;
  selectedMorphemeIds: string[];
  onToggleMorpheme: (id: string) => void;
  morphemeQuery: string;
  onMorphemeQueryChange: (value: string) => void;
  composedSpelling: string;
  onCreateMorpheme: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function CreationForm({
  bank,
  definition,
  onDefinitionChange,
  spelling,
  onSpellingChange,
  role,
  onRoleChange,
  morphemes,
  morphemeCount,
  selectedMorphemeIds,
  onToggleMorpheme,
  morphemeQuery,
  onMorphemeQueryChange,
  composedSpelling,
  onCreateMorpheme,
  onSubmit,
}: CreationFormProps) {
  const isWord = bank === "words";
  const canCreate = Boolean(
    definition.trim() &&
      (isWord
        ? composedSpelling.trim() && selectedMorphemeIds.length > 0
        : spelling.trim()),
  );
  const submitHint = isWord
    ? morphemeCount > 0 &&
      (!selectedMorphemeIds.length || !definition.trim())
      ? "Choose one or more parts and add a meaning."
      : ""
    : !spelling.trim() || !definition.trim()
      ? "Add a spelling and what it means or does."
      : "";

  return (
    <section>
      <h4 className="mb-2 px-2 text-xs font-bold uppercase text-blue-100">
        Create a {isWord ? "word" : "morpheme"}
      </h4>
      <form
        onSubmit={onSubmit}
        className="rounded-lg bg-blue-700 p-4 sm:p-5"
        aria-label={`Create a ${isWord ? "word" : "morpheme"}`}
      >
        {isWord ? (
          <div className="space-y-3">
            {morphemeCount > 0 ? (
              <>
                <p className="text-xs leading-relaxed text-blue-200">
                  Choose meaningful parts to build your word. Try two parts to
                  see how their meanings combine.
                </p>
                <label className="relative block">
                  <span className="sr-only">Search morphemes</span>
                  <input
                    type="search"
                    value={morphemeQuery}
                    onChange={(event) =>
                      onMorphemeQueryChange(event.target.value)
                    }
                    placeholder="Find a part..."
                    className="w-full rounded bg-blue-600 py-2 pl-3 pr-9 text-sm text-blue-100 outline-none placeholder:text-blue-300 focus:ring-2 focus:ring-yellow-500"
                  />
                  <MagnifyingGlassIcon
                    size={15}
                    aria-hidden="true"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300"
                  />
                </label>
                <div className="flex max-h-28 flex-wrap gap-1.5 overflow-y-auto">
                  {morphemes.length > 0 ? (
                    morphemes.map((morpheme) => {
                      const selected = selectedMorphemeIds.includes(
                        morpheme.id,
                      );
                      return (
                        <button
                          type="button"
                          key={morpheme.id}
                          onClick={() => onToggleMorpheme(morpheme.id)}
                          aria-pressed={selected}
                          aria-label={`${morpheme.spelling}, ${morpheme.role ?? "root"}: ${morpheme.definition}`}
                          title={morpheme.definition}
                          className={cn(
                            "cursor-pointer rounded px-2.5 py-1.5 text-left text-xs transition-colors",
                            selected
                              ? "bg-yellow-500 font-semibold text-blue-900"
                              : "bg-blue-100 text-blue-700 hover:bg-blue-200",
                          )}
                        >
                          <span className="block">
                            {morpheme.role === "affix" &&
                            !morpheme.spelling.startsWith("-")
                              ? "-"
                              : ""}
                            {morpheme.spelling}
                            <span className="ml-1 opacity-70">
                              {" · "}
                              {morpheme.role ?? "root"}
                            </span>
                          </span>
                          {selected && (
                            <span className="mt-1 block max-w-48 text-[10px] font-normal leading-snug">
                              {morpheme.definition}
                            </span>
                          )}
                        </button>
                      );
                    })
                  ) : (
                    <p className="text-xs text-blue-200">
                      No matching parts. Try a different search.
                    </p>
                  )}
                </div>
                <div
                  className="min-h-12 rounded border border-dashed border-blue-400 bg-blue-600 px-3 py-2"
                  aria-live="polite"
                >
                  <p className="font-display text-lg font-semibold text-yellow-400">
                    {composedSpelling || (
                      <span className="text-sm font-normal text-blue-300">
                        Your word will appear here
                      </span>
                    )}
                  </p>
                  {selectedMorphemeIds.length === 1 && (
                    <p className="mt-1 text-xs text-blue-200">
                      Add another part to see how combining meanings builds a
                      word. One-part words are also allowed.
                    </p>
                  )}
                </div>
              </>
            ) : (
              <div className="rounded bg-blue-600 p-3">
                <p className="text-sm text-blue-100">
                  First, add a meaningful part to your Morpheme Bank.
                </p>
                <button
                  type="button"
                  onClick={onCreateMorpheme}
                  className="mt-2 cursor-pointer text-sm font-semibold text-yellow-400 underline underline-offset-2"
                >
                  Create a morpheme
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs leading-relaxed text-blue-200">
              A morpheme is a meaningful part. A root carries a core meaning;
              an affix adds to or changes meaning.
            </p>
            <div
              className="grid grid-cols-2 gap-1 rounded bg-blue-800 p-1"
              role="group"
              aria-label="Morpheme type"
            >
              {(["root", "affix"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={role === option}
                  onClick={() => onRoleChange(option)}
                  className={cn(
                    "cursor-pointer rounded px-2 py-1.5 text-xs font-semibold capitalize",
                    role === option
                      ? "bg-yellow-500 text-blue-800"
                      : "text-blue-200 hover:bg-blue-600",
                  )}
                >
                  {option === "root" ? "Root · teach" : "Affix · -er"}
                </button>
              ))}
            </div>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-blue-100">
                Spelling
              </span>
              <input
                autoFocus
                value={spelling}
                onChange={(event) => onSpellingChange(event.target.value)}
                placeholder={role === "affix" ? "e.g. -er" : "e.g. teach"}
                aria-label="Morpheme spelling"
                className="w-full rounded bg-blue-600 px-3 py-2 text-sm text-blue-100 outline-none placeholder:text-blue-300 focus:ring-2 focus:ring-yellow-500"
              />
            </label>
            <div>
              <label
                htmlFor="conlang-morpheme-definition"
                className="mb-1 block text-xs font-semibold text-blue-100"
              >
                What it means or does
              </label>
              <input
                id="conlang-morpheme-definition"
                value={definition}
                onChange={(event) => onDefinitionChange(event.target.value)}
                placeholder={
                  role === "affix"
                    ? "e.g. marks more than one"
                    : "e.g. to teach"
                }
                className="w-full rounded bg-blue-600 px-3 py-2 text-sm text-blue-100 outline-none placeholder:text-blue-300 focus:ring-2 focus:ring-yellow-500"
              />
              <details className="mt-2 text-xs text-blue-200">
                <summary className="w-fit cursor-pointer underline underline-offset-2">
                  Need an idea?
                </summary>
                <div className="mt-2 grid gap-1.5">
                  {morphemeDefinitionSuggestions.map((suggestion) => (
                    <button
                      key={suggestion.label}
                      type="button"
                      onClick={() => {
                        onRoleChange(suggestion.role);
                        onDefinitionChange(suggestion.definition);
                      }}
                      className="rounded bg-blue-600 px-2.5 py-2 text-left hover:bg-blue-500"
                    >
                      <span className="font-semibold text-blue-100">
                        {suggestion.label}
                      </span>
                      <span className="ml-1">{suggestion.definition}</span>
                    </button>
                  ))}
                </div>
              </details>
            </div>
          </div>
        )}

        {isWord && morphemeCount > 0 && (
          <div className="mt-3">
            <label
              htmlFor="conlang-word-definition"
              className="mb-1 block text-xs font-semibold text-blue-100"
            >
              What does this word mean?
            </label>
            <input
              id="conlang-word-definition"
              value={definition}
              onChange={(event) => onDefinitionChange(event.target.value)}
              placeholder="e.g. a person who teaches"
              className="w-full rounded bg-blue-600 px-3 py-2 text-sm text-blue-100 outline-none placeholder:text-blue-300 focus:ring-2 focus:ring-yellow-500"
            />
            <details className="mt-2 text-xs text-blue-200">
              <summary className="w-fit cursor-pointer underline underline-offset-2">
                Try a meaning
              </summary>
              <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
                {wordDefinitionSuggestions.map((suggestion) => (
                  <button
                    key={`${suggestion.partOfSpeech}-${suggestion.definition}`}
                    type="button"
                    onClick={() => onDefinitionChange(suggestion.definition)}
                    className="rounded bg-blue-600 px-2.5 py-2 text-left hover:bg-blue-500"
                  >
                    <span className="mr-1.5 text-[10px] font-bold uppercase text-yellow-400">
                      {suggestion.partOfSpeech}
                    </span>
                    {suggestion.definition}
                  </button>
                ))}
              </div>
            </details>
          </div>
        )}

        {submitHint && (
          <p aria-live="polite" className="mt-3 text-xs text-blue-200">
            {submitHint}
          </p>
        )}
        {(!isWord || morphemeCount > 0) && (
          <button
            type="submit"
            disabled={!canCreate}
            className="mt-4 w-full cursor-pointer rounded bg-yellow-500 px-3 py-2 text-sm font-bold text-blue-900 transition-colors hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Create {isWord ? "word" : "morpheme"}
          </button>
        )}
      </form>
    </section>
  );
}
