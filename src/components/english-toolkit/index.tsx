import { useStore } from "@nanostores/react";
import { ArrowLineRightIcon, ArrowsLeftRightIcon } from "@phosphor-icons/react";
import { useEffect, useMemo, useState } from "react";
import { englishWords, type EnglishWord } from "../../data/english-words";
import {
  $activeTool,
  $conlangBuilderEnabled,
  hideActiveTool,
  showConlangBuilder,
} from "../../stores/conlang-builder";
import { $englishToolkitEnabled } from "../../stores/english-toolkit";
import { WordDetails } from "./word-details";
import { WordPicker } from "./word-picker";

export function EnglishToolkit() {
  const isEnabled = useStore($englishToolkitEnabled);
  const conlangBuilderEnabled = useStore($conlangBuilderEnabled);
  const activeTool = useStore($activeTool);
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

  if (!hasMounted || !isEnabled || activeTool !== "english") return null;

  return (
    <aside
      aria-label="English toolkit"
      className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-xl bg-background-700 px-6 py-5 text-foreground-100 selection:bg-yellow-500! selection:text-yellow-900!"
    >
      <header className="relative flex h-6 shrink-0 items-center justify-between text-foreground-200">
        <button
          type="button"
          onClick={hideActiveTool}
          className="absolute left-0 cursor-pointer rounded p-1 transition-colors hover:text-white"
          aria-label="Collapse English toolkit"
          title="Collapse English toolkit"
        >
          <ArrowLineRightIcon size={16} weight="duotone" />
        </button>
        <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-1">
          <h2 className="text-xs font-bold">ENGLISH TOOLKIT</h2>
          {conlangBuilderEnabled && (
            <button
              type="button"
              onClick={showConlangBuilder}
              className="cursor-pointer rounded p-1 transition-colors hover:bg-background-600 hover:text-white"
              aria-label="Switch to Conlang Builder"
              title="Switch to Conlang Builder"
            >
              <ArrowsLeftRightIcon size={14} weight="duotone" />
            </button>
          )}
        </div>
      </header>

      <div className="mt-10 min-h-0 w-full self-center max-w-2xl overflow-y-auto px-4 pb-5">
        {selectedWord ? (
          <WordDetails key={selectedWord.spelling} word={selectedWord} />
        ) : (
          <>
            <h3 className="font-display text-2xl text-yellow-500">
              Select an English word to understand its morphological structure.
            </h3>
            <p className="mt-3 text-sm text-foreground-200">
              <strong>Note:</strong> This is not a dictionary and does not aim
              to represent all words in English.
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
    </aside>
  );
}
