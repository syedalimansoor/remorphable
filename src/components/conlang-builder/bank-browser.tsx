import { MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react";
import { cn } from "cn";
import type {
  ConlangMorpheme,
  ConlangWord,
} from "../../stores/conlang-builder";
import { WordDetails } from "./word-details";

type WordEntry = {
  word: ConlangWord;
  spelling: string;
};

export function BankBrowser({
  words,
  query,
  successMessage,
  selectedWord,
  selectedWordMorphemes,
  onQueryChange,
  onCreateWord,
  onSelectWord,
  onDeleteWord,
  onDismissSuccess,
}: {
  words: WordEntry[];
  query: string;
  successMessage: string;
  selectedWord: WordEntry | null;
  selectedWordMorphemes: ConlangMorpheme[];
  onQueryChange: (value: string) => void;
  onCreateWord: () => void;
  onSelectWord: (wordId: string) => void;
  onDeleteWord: (wordId: string) => void;
  onDismissSuccess: () => void;
}) {
  return (
    <div className="mt-8 flex min-h-0 flex-1 flex-col gap-4">
      {successMessage && (
        <div className="flex items-start justify-between gap-4 rounded-xl bg-blue-700 px-4 py-3">
          <div>
            <p className="text-sm font-bold text-yellow-500">
              {successMessage}
            </p>
            <p className="mt-1 text-xs text-blue-300">
              Keep making more words to build your language, and{" "}
              <strong>try to reuse morphemes</strong> from existing words.
            </p>
          </div>
          <button
            type="button"
            onClick={onDismissSuccess}
            aria-label="Dismiss message"
            className="cursor-pointer text-blue-300 hover:text-blue-100"
          >
            <XIcon size={16} />
          </button>
        </div>
      )}

      <section
        aria-label="Browse words"
        className="flex min-h-0 flex-1 flex-col rounded-xl bg-blue-700 p-5"
      >
        <div className="flex gap-3">
          <label className="relative min-w-0 flex-1">
            <span className="sr-only">Find a word</span>
            <input
              type="search"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Find a word..."
              className="w-full rounded bg-blue-600 py-2 pl-3 pr-9 text-sm text-blue-100 outline-none placeholder:text-blue-400 focus:ring-2 focus:ring-yellow-500"
            />
            <MagnifyingGlassIcon
              aria-hidden="true"
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300"
            />
          </label>
          <button
            type="button"
            onClick={onCreateWord}
            className="shrink-0 cursor-pointer rounded bg-yellow-500 px-4 py-2 text-sm font-bold text-blue-700 transition-colors hover:bg-yellow-400"
          >
            Create word
          </button>
        </div>

        <div className="mt-4 mb-4 min-h-0 flex-1 overflow-y-auto overscroll-contain scrollbar-track-blue-700 scrollbar-thumb-blue-300">
          <div className="flex flex-wrap content-start gap-1.5">
            {words.map(({ word, spelling }) => (
              <button
                type="button"
                key={word.id}
                onClick={() => onSelectWord(word.id)}
                aria-pressed={selectedWord?.word.id === word.id}
                className={cn(
                  "cursor-pointer rounded px-2 py-1 text-sm transition-colors",
                  selectedWord?.word.id === word.id
                    ? "bg-yellow-500 text-blue-800"
                    : "bg-blue-800 text-blue-300 hover:bg-blue-600 hover:text-blue-100",
                )}
              >
                {spelling}
              </button>
            ))}
            {words.length === 0 && (
              <p className="text-sm text-blue-300">
                No matching words. Try another search.
              </p>
            )}
          </div>
        </div>
        {selectedWord && (
          <WordDetails
            key={selectedWord.word.id}
            word={selectedWord.word}
            spelling={selectedWord.spelling}
            morphemes={selectedWordMorphemes}
            onDelete={() => onDeleteWord(selectedWord.word.id)}
          />
        )}
      </section>
    </div>
  );
}
