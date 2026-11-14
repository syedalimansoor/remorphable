import { BinocularsIcon, MagnifyingGlassIcon } from "@phosphor-icons/react";
import { cn } from "cn";
import type {
  ConlangMorpheme,
  ConlangWord,
} from "../../stores/conlang-builder";
import type { Bank } from "./types";

export function BankBrowser({
  bank,
  words,
  morphemes,
  morphemeCount,
  totalItems,
  query,
  onQueryChange,
  selectedWordId,
  selectedMorphemeId,
  onSelectWord,
  onSelectMorpheme,
}: {
  bank: Bank;
  words: ConlangWord[];
  morphemes: ConlangMorpheme[];
  morphemeCount: number;
  totalItems: number;
  query: string;
  onQueryChange: (value: string) => void;
  selectedWordId: string | null;
  selectedMorphemeId: string | null;
  onSelectWord: (word: ConlangWord) => void;
  onSelectMorpheme: (morpheme: ConlangMorpheme) => void;
}) {
  const isWordBank = bank === "words";
  const visibleItems = isWordBank ? words : morphemes;

  if (totalItems === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-5 text-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-blue-600 text-blue-300">
          <BinocularsIcon size={26} />
        </span>
        <p className="mt-3 text-sm font-bold text-blue-100">
          No {isWordBank ? "words" : "morphemes"} here yet.
        </p>
        <p className="text-xs text-blue-200">
          {isWordBank
            ? morphemeCount > 0
              ? "Choose meaningful parts below to build your first word."
              : "Add meaningful parts to your Morpheme Bank first, then combine them into words."
            : "Create a part below or add the starter examples above."}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4 shrink-0">
      <label className="relative block">
        <span className="sr-only">
          Search for a {isWordBank ? "word" : "morpheme"}
        </span>
        <input
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder={`Search for a ${isWordBank ? "word" : "morpheme"}...`}
          className="w-full rounded bg-blue-700 py-2 pl-3 pr-10 text-sm text-blue-100 outline-none placeholder:text-blue-400 focus:ring-2 focus:ring-yellow-500"
        />
        <MagnifyingGlassIcon
          aria-hidden="true"
          size={16}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300"
        />
      </label>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {isWordBank
          ? words.map((word) => (
              <BankItem
                key={word.id}
                label={word.spelling}
                example={word.source === "starter"}
                selected={selectedWordId === word.id}
                onClick={() => onSelectWord(word)}
              />
            ))
          : morphemes.map((morpheme) => (
              <BankItem
                key={morpheme.id}
                label={`${morpheme.role === "affix" && !morpheme.spelling.startsWith("-") ? "-" : ""}${morpheme.spelling}`}
                example={morpheme.source === "starter"}
                selected={selectedMorphemeId === morpheme.id}
                onClick={() => onSelectMorpheme(morpheme)}
              />
            ))}
        {visibleItems.length === 0 && (
          <p className="text-sm text-blue-300">
            No matching entries. Try another search.
          </p>
        )}
      </div>
    </div>
  );
}

function BankItem({
  label,
  example = false,
  selected,
  onClick,
}: {
  label: string;
  example?: boolean;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      aria-label={example ? `Example: ${label}` : label}
      title={example ? "Starter example" : undefined}
      className={cn(
        "cursor-pointer rounded px-2 py-1 text-xs transition-colors sm:text-sm",
        selected
          ? "bg-yellow-500 text-blue-800"
          : example
            ? "border border-dashed border-blue-200/60 bg-blue-600 text-blue-100 hover:bg-blue-400 hover:text-blue-800"
            : "bg-blue-400 text-blue-100 hover:bg-blue-300 hover:text-blue-800",
      )}
    >
      {label}
      {example && (
        <span className="ml-1 text-[9px] uppercase tracking-wide opacity-75">
          sample
        </span>
      )}
    </button>
  );
}
