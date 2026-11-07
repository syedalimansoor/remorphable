import {
  ArrowLineRightIcon,
  BriefcaseIcon,
  MagnifyingGlassIcon,
} from "@phosphor-icons/react";
import { cn } from "cn";
import { useMemo, useState } from "react";

type Morpheme = {
  form: string;
  role: "Prefix" | "Base" | "Suffix";
};

type WordEntry = {
  word: string;
  morphemes: Morpheme[];
};

const words: WordEntry[] = [
  {
    word: "unhappiness",
    morphemes: [
      { form: "un-", role: "Prefix" },
      { form: "happy", role: "Base" },
      { form: "-ness", role: "Suffix" },
    ],
  },
  {
    word: "reconstruction",
    morphemes: [
      { form: "re-", role: "Prefix" },
      { form: "construct", role: "Base" },
      { form: "-ion", role: "Suffix" },
    ],
  },
  {
    word: "disagreement",
    morphemes: [
      { form: "dis-", role: "Prefix" },
      { form: "agree", role: "Base" },
      { form: "-ment", role: "Suffix" },
    ],
  },
  {
    word: "irresponsible",
    morphemes: [
      { form: "ir-", role: "Prefix" },
      { form: "responsible", role: "Base" },
    ],
  },
  {
    word: "prehistorical",
    morphemes: [
      { form: "pre-", role: "Prefix" },
      { form: "history", role: "Base" },
      { form: "-ical", role: "Suffix" },
    ],
  },
  {
    word: "unbelievable",
    morphemes: [
      { form: "un-", role: "Prefix" },
      { form: "believe", role: "Base" },
      { form: "-able", role: "Suffix" },
    ],
  },
  {
    word: "nationalization",
    morphemes: [
      { form: "nation", role: "Base" },
      { form: "-al", role: "Suffix" },
      { form: "-ize", role: "Suffix" },
      { form: "-ation", role: "Suffix" },
    ],
  },
  {
    word: "submarine",
    morphemes: [
      { form: "sub-", role: "Prefix" },
      { form: "marine", role: "Base" },
    ],
  },
  {
    word: "biodegradable",
    morphemes: [
      { form: "bio-", role: "Prefix" },
      { form: "degrade", role: "Base" },
      { form: "-able", role: "Suffix" },
    ],
  },
  {
    word: "telecommunication",
    morphemes: [
      { form: "tele-", role: "Prefix" },
      { form: "communicate", role: "Base" },
      { form: "-ion", role: "Suffix" },
    ],
  },
  {
    word: "supernatural",
    morphemes: [
      { form: "super-", role: "Prefix" },
      { form: "nature", role: "Base" },
      { form: "-al", role: "Suffix" },
    ],
  },
  {
    word: "antidisestablishmentarianism",
    morphemes: [
      { form: "anti-", role: "Prefix" },
      { form: "dis-", role: "Prefix" },
      { form: "establish", role: "Base" },
      { form: "-ment", role: "Suffix" },
      { form: "-arian", role: "Suffix" },
      { form: "-ism", role: "Suffix" },
    ],
  },
  {
    word: "misunderstanding",
    morphemes: [
      { form: "mis-", role: "Prefix" },
      { form: "understand", role: "Base" },
      { form: "-ing", role: "Suffix" },
    ],
  },
  {
    word: "inflexible",
    morphemes: [
      { form: "in-", role: "Prefix" },
      { form: "flex", role: "Base" },
      { form: "-ible", role: "Suffix" },
    ],
  },
  {
    word: "deconstruction",
    morphemes: [
      { form: "de-", role: "Prefix" },
      { form: "construct", role: "Base" },
      { form: "-ion", role: "Suffix" },
    ],
  },
  {
    word: "transformation",
    morphemes: [
      { form: "trans-", role: "Prefix" },
      { form: "form", role: "Base" },
      { form: "-ation", role: "Suffix" },
    ],
  },
  {
    word: "overproduction",
    morphemes: [
      { form: "over-", role: "Prefix" },
      { form: "produce", role: "Base" },
      { form: "-tion", role: "Suffix" },
    ],
  },
  {
    word: "friendship",
    morphemes: [
      { form: "friend", role: "Base" },
      { form: "-ship", role: "Suffix" },
    ],
  },
  {
    word: "fearlessness",
    morphemes: [
      { form: "fear", role: "Base" },
      { form: "-less", role: "Suffix" },
      { form: "-ness", role: "Suffix" },
    ],
  },
  {
    word: "teacher",
    morphemes: [
      { form: "teach", role: "Base" },
      { form: "-er", role: "Suffix" },
    ],
  },
  {
    word: "carelessness",
    morphemes: [
      { form: "care", role: "Base" },
      { form: "-less", role: "Suffix" },
      { form: "-ness", role: "Suffix" },
    ],
  },
  {
    word: "uncomfortable",
    morphemes: [
      { form: "un-", role: "Prefix" },
      { form: "comfort", role: "Base" },
      { form: "-able", role: "Suffix" },
    ],
  },
  {
    word: "impossible",
    morphemes: [
      { form: "im-", role: "Prefix" },
      { form: "possible", role: "Base" },
    ],
  },
  {
    word: "multiplication",
    morphemes: [
      { form: "multiply", role: "Base" },
      { form: "-ication", role: "Suffix" },
    ],
  },
  {
    word: "nonconformist",
    morphemes: [
      { form: "non-", role: "Prefix" },
      { form: "conform", role: "Base" },
      { form: "-ist", role: "Suffix" },
    ],
  },
  {
    word: "postponement",
    morphemes: [
      { form: "post-", role: "Prefix" },
      { form: "pone", role: "Base" },
      { form: "-ment", role: "Suffix" },
    ],
  },
  {
    word: "deconstruction",
    morphemes: [
      { form: "de-", role: "Prefix" },
      { form: "construct", role: "Base" },
      { form: "-ion", role: "Suffix" },
    ],
  },
];

export function EnglishToolkit() {
  const [isOpen, setIsOpen] = useState(true);
  const [query, setQuery] = useState("");

  const filteredWords = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return words.filter((entry) =>
      entry.word.toLowerCase().includes(normalizedQuery),
    );
  }, [query]);

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
            <h3 className="font-display text-2xl text-yellow-500">
              Select an English word to understand its morphological structure.
            </h3>
            <p className="mt-3 text-sm text-foreground-200">
              <strong>Note:</strong> This is not a dictionary and does not aim
              to represent all words in English.
            </p>

            <label className="relative mt-7 block">
              <span className="sr-only">Search for a word</span>
              <input
                type="search"
                placeholder="Search for a word..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
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
              {filteredWords.map((entry, index) => (
                <span
                  key={`${entry.word}-${index}`}
                  className="rounded-md bg-background-600 px-2.5 py-1.5 text-sm"
                >
                  {entry.word}
                </span>
              ))}
              {filteredWords.length === 0 && (
                <p className="text-sm text-foreground-200">
                  No matching words. Try another search.
                </p>
              )}
            </div>
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
