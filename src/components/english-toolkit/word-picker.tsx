import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { cn } from "cn";
import type { EnglishWord } from "../../data/english-words";

type WordPickerProps = {
  words: EnglishWord[];
  query: string;
  onQueryChange: (query: string) => void;
  selectedWord: EnglishWord | null;
  onSelectWord: (word: EnglishWord) => void;
};

export function WordPicker({
  words,
  query,
  onQueryChange,
  selectedWord,
  onSelectWord,
}: WordPickerProps) {
  return (
    <>
      <label className="relative mt-7 block">
        <span className="sr-only">Search for a word</span>
        <input
          type="search"
          placeholder="Search for a word..."
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          className="w-full rounded bg-background-600 py-2 pl-3 pr-10 text-sm text-white outline-none placeholder:text-foreground-200 focus:ring-2 focus:ring-yellow-500"
        />
        <MagnifyingGlassIcon
          aria-hidden="true"
          size={16}
          className="absolute right-3 top-1/2 -translate-y-1/2"
          weight="duotone"
        />
      </label>

      <div className="mt-4 flex flex-wrap gap-2">
        {words.map((word) => (
          <button
            type="button"
            key={word.spelling}
            onClick={() => onSelectWord(word)}
            aria-pressed={selectedWord?.spelling === word.spelling}
            className={cn(
              "rounded-md px-2.5 py-1.5 text-sm transition-colors cursor-pointer",
              selectedWord?.spelling === word.spelling
                ? "bg-yellow-500 text-yellow-900"
                : "bg-background-600 text-foreground-100 hover:bg-background-800",
            )}
          >
            {word.spelling}
          </button>
        ))}
        {words.length === 0 && (
          <p className="text-sm text-foreground-200">
            No matching words. Try another search.
          </p>
        )}
      </div>
    </>
  );
}
