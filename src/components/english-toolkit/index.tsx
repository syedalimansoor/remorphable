import { useStore } from "@nanostores/react";
import {
  ArrowLineRightIcon,
  BriefcaseIcon,
} from "@phosphor-icons/react";
import { cn } from "cn";
import { useEffect, useMemo, useState } from "react";
import {
  englishWords,
  type EnglishWord,
} from "../../data/english-words";
import { $englishToolkitEnabled } from "../../stores/english-toolkit";
import { WordDetails } from "./word-details";
import { WordPicker } from "./word-picker";

export function EnglishToolkit() {
  const isEnabled = useStore($englishToolkitEnabled);
  const [isOpen, setIsOpen] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedWord, setSelectedWord] = useState<EnglishWord | null>(null);

  useEffect(() => setHasMounted(true), []);

  const filteredWords = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return englishWords.filter((entry) =>
      entry.spelling.toLowerCase().includes(normalizedQuery),
    );
  }, [query]);

  if (!hasMounted || !isEnabled) return null;

  return (
    <aside
      aria-label="English toolkit"
      className={cn(
        isOpen
          ? "relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-xl bg-background-700 px-6 py-5 text-foreground-100 selection:bg-yellow-500! selection:text-yellow-900!"
          : "absolute right-3 top-3 z-10",
      )}
    >
      {isOpen ? (
        <>
          <header className="relative flex h-6 shrink-0 items-center justify-center text-foreground-200">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute left-0 cursor-pointer rounded p-1 transition-colors hover:text-white"
              aria-label="Hide English toolkit"
              title="Hide English toolkit"
            >
              <ArrowLineRightIcon size={16} weight="duotone" />
            </button>
            <h2 className="text-xs font-bold">ENGLISH TOOLKIT</h2>
          </header>

          <div className="mt-10 min-h-0 w-full self-center overflow-y-auto px-4 pb-5 max-w-2xl">
            {selectedWord ? (
              <WordDetails key={selectedWord.spelling} word={selectedWord} />
            ) : (
              <>
                <h3 className="font-display text-2xl text-yellow-500">
                  Select an English word to understand its morphological
                  structure.
                </h3>
                <p className="mt-3 text-sm text-foreground-200">
                  <strong>Note:</strong> This is not a dictionary and does not
                  aim to represent all words in English.
                </p>
              </>
            )}

            <WordPicker
              words={filteredWords}
              query={query}
              onQueryChange={setQuery}
              selectedWord={selectedWord}
              onSelectWord={setSelectedWord}
            />
          </div>
        </>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="inline-flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm text-foreground-400 transition-colors hover:text-foreground-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          aria-label="Show English toolkit"
          title="Show English toolkit"
        >
          <BriefcaseIcon size={14} weight="regular" />
          English toolkit
        </button>
      )}
    </aside>
  );
}
