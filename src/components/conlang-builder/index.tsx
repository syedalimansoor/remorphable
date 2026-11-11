import { useStore } from "@nanostores/react";
import { cn } from "cn";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import type {
  ConlangMorpheme,
  ConlangWord,
} from "../../stores/conlang-builder";
import {
  $activeTool,
  $conlangBuilderEnabled,
  $conlangData,
  hideActiveTool,
} from "../../stores/conlang-builder";
import { $conlangName } from "../../stores/conlang-name";
import { $englishToolkitEnabled } from "../../stores/english-toolkit";
import { BankBrowser } from "./bank-browser";
import { BuilderHeader } from "./builder-header";
import { CreationForm } from "./creation-form";
import { MorphemeDetails, WordDetails } from "./definition-panels";
import type { Bank, CreationStep } from "./types";

export function ConlangBuilder() {
  const [hasMounted, setHasMounted] = useState(false);
  const isEnabled = useStore($conlangBuilderEnabled);
  const englishToolkitEnabled = useStore($englishToolkitEnabled);
  const activeTool = useStore($activeTool);
  const data = useStore($conlangData);
  const conlangName = useStore($conlangName);
  const [activeBank, setActiveBank] = useState<Bank>("morphemes");
  const [query, setQuery] = useState("");
  const [selectedWordId, setSelectedWordId] = useState<string | null>(null);
  const [selectedMorphemeId, setSelectedMorphemeId] = useState<string | null>(
    null,
  );
  const [creationStep, setCreationStep] = useState<CreationStep>("define");
  const [definition, setDefinition] = useState("");
  const [spelling, setSpelling] = useState("");
  const [selectedMorphemeIds, setSelectedMorphemeIds] = useState<string[]>([]);
  const [morphemeQuery, setMorphemeQuery] = useState("");
  const [editingName, setEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState(conlangName);

  useEffect(() => setHasMounted(true), []);

  const words = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return data.words.filter((word) =>
      word.spelling.toLowerCase().includes(normalizedQuery),
    );
  }, [data.words, query]);
  const morphemes = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return data.morphemes.filter((morpheme) =>
      morpheme.spelling.toLowerCase().includes(normalizedQuery),
    );
  }, [data.morphemes, query]);
  const availableMorphemes = useMemo(() => {
    const normalizedQuery = morphemeQuery.trim().toLowerCase();
    return data.morphemes.filter((morpheme) =>
      morpheme.spelling.toLowerCase().includes(normalizedQuery),
    );
  }, [data.morphemes, morphemeQuery]);
  const selectedWord =
    data.words.find((word) => word.id === selectedWordId) ?? null;
  const selectedMorpheme =
    data.morphemes.find((morpheme) => morpheme.id === selectedMorphemeId) ??
    null;
  const selectedWordMorphemes =
    selectedWord?.morphemeIds
      .map((id) => data.morphemes.find((morpheme) => morpheme.id === id))
      .filter(
        (morpheme): morpheme is ConlangMorpheme => morpheme !== undefined,
      ) ?? [];
  const composedSpelling = selectedMorphemeIds
    .map(
      (id) => data.morphemes.find((morpheme) => morpheme.id === id)?.spelling,
    )
    .filter((value): value is string => value !== undefined)
    .join("");

  if (!hasMounted || !isEnabled || activeTool !== "conlang") return null;

  const resetCreation = () => {
    setCreationStep("define");
    setDefinition("");
    setSpelling("");
    setSelectedMorphemeIds([]);
    setMorphemeQuery("");
  };

  const chooseBank = (bank: Bank) => {
    setActiveBank(bank);
    setQuery("");
    setSelectedWordId(null);
    setSelectedMorphemeId(null);
    resetCreation();
  };

  const selectWord = (word: ConlangWord) => {
    setSelectedWordId(word.id);
    setSelectedMorphemeId(null);
  };

  const selectMorpheme = (morpheme: ConlangMorpheme) => {
    setSelectedMorphemeId(morpheme.id);
    setSelectedWordId(null);
  };

  const createItem = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedSpelling = (
      activeBank === "words" ? composedSpelling : spelling
    ).trim();
    const trimmedDefinition = definition.trim();
    if (
      !trimmedSpelling ||
      !trimmedDefinition ||
      (activeBank === "words" && !selectedMorphemeIds.length)
    ) {
      return;
    }

    const id = crypto.randomUUID();
    if (activeBank === "words") {
      const word: ConlangWord = {
        id,
        spelling: trimmedSpelling,
        definition: trimmedDefinition,
        morphemeIds: [...selectedMorphemeIds],
      };
      $conlangData.set({ ...data, words: [...data.words, word] });
      setSelectedWordId(id);
    } else {
      const morpheme: ConlangMorpheme = {
        id,
        spelling: trimmedSpelling,
        definition: trimmedDefinition,
      };
      $conlangData.set({ ...data, morphemes: [...data.morphemes, morpheme] });
      setSelectedMorphemeId(id);
    }
    setDefinition("");
    setSpelling("");
    setSelectedMorphemeIds([]);
    setMorphemeQuery("");
  };

  const deleteWord = (wordId: string) => {
    $conlangData.set({
      ...data,
      words: data.words.filter((word) => word.id !== wordId),
    });
    setSelectedWordId(null);
  };

  const deleteMorpheme = (morphemeId: string) => {
    $conlangData.set({
      words: data.words.map((word) => ({
        ...word,
        morphemeIds: word.morphemeIds.filter((id) => id !== morphemeId),
      })),
      morphemes: data.morphemes.filter(
        (morpheme) => morpheme.id !== morphemeId,
      ),
    });
    setSelectedMorphemeId(null);
  };

  const saveName = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = nameDraft.trim();
    if (trimmedName) $conlangName.set(trimmedName);
    setEditingName(false);
  };

  return (
    <aside
      aria-label="Conlang builder"
      className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-xl bg-blue-500 px-6 py-5 pb-10 text-blue-100 selection:bg-yellow-500! selection:text-blue-800 sm:px-6"
    >
      <BuilderHeader
        conlangName={conlangName}
        nameDraft={nameDraft}
        editingName={editingName}
        englishToolkitEnabled={englishToolkitEnabled}
        onNameDraftChange={setNameDraft}
        onEditName={() => {
          setNameDraft(conlangName);
          setEditingName(true);
        }}
        onSaveName={saveName}
        onCollapse={hideActiveTool}
      />

      <div className="mx-auto mt-10 flex min-h-0 w-full max-w-2xl flex-1 flex-col overflow-y-auto px-4">
        <h3 className="font-display text-2xl font-semibold leading-tight text-yellow-500 sm:text-3xl">
          Build the morphology of {conlangName || "your language"}!
        </h3>

        <div
          className="mt-4 grid shrink-0 grid-cols-2 gap-1 rounded bg-blue-700 p-1"
          role="group"
          aria-label="Conlang banks"
        >
          <button
            type="button"
            aria-pressed={activeBank === "morphemes"}
            onClick={() => chooseBank("morphemes")}
            className={cn(
              "cursor-pointer rounded px-2 py-1.5 text-xs font-bold transition-colors sm:text-sm",
              activeBank === "morphemes"
                ? "bg-yellow-500 text-blue-500"
                : "text-blue-300 hover:bg-blue-600 hover:text-blue-100",
            )}
          >
            Morpheme Bank
          </button>
          <button
            type="button"
            aria-pressed={activeBank === "words"}
            onClick={() => chooseBank("words")}
            className={cn(
              "cursor-pointer rounded px-2 py-1.5 text-xs font-bold transition-colors sm:text-sm",
              activeBank === "words"
                ? "bg-yellow-500 text-blue-500"
                : "text-blue-300 hover:bg-blue-600 hover:text-blue-100",
            )}
          >
            Word Bank
          </button>
        </div>

        <BankBrowser
          bank={activeBank}
          words={words}
          morphemes={morphemes}
          totalItems={
            activeBank === "words" ? data.words.length : data.morphemes.length
          }
          query={query}
          onQueryChange={setQuery}
          selectedWordId={selectedWordId}
          selectedMorphemeId={selectedMorphemeId}
          onSelectWord={selectWord}
          onSelectMorpheme={selectMorpheme}
        />

        <section className="mt-auto pt-6">
          {selectedWord ? (
            <WordDetails
              word={selectedWord}
              morphemes={selectedWordMorphemes}
              onClose={() => setSelectedWordId(null)}
              onSelectMorpheme={(morpheme) => {
                setActiveBank("morphemes");
                setSelectedWordId(null);
                setSelectedMorphemeId(morpheme.id);
                setQuery("");
              }}
              onDelete={() => deleteWord(selectedWord.id)}
            />
          ) : selectedMorpheme ? (
            <MorphemeDetails
              morpheme={selectedMorpheme}
              words={data.words.filter((word) =>
                word.morphemeIds.includes(selectedMorpheme.id),
              )}
              onClose={() => setSelectedMorphemeId(null)}
              onSelectWord={(word) => {
                setActiveBank("words");
                setSelectedMorphemeId(null);
                setSelectedWordId(word.id);
                setQuery("");
              }}
              onDelete={() => deleteMorpheme(selectedMorpheme.id)}
            />
          ) : (
            <CreationForm
              key={activeBank}
              bank={activeBank}
              definition={definition}
              onDefinitionChange={setDefinition}
              spelling={spelling}
              onSpellingChange={setSpelling}
              step={creationStep}
              onStepChange={setCreationStep}
              morphemes={availableMorphemes}
              morphemeCount={data.morphemes.length}
              selectedMorphemeIds={selectedMorphemeIds}
              onToggleMorpheme={(id) =>
                setSelectedMorphemeIds((current) =>
                  current.includes(id)
                    ? current.filter((value) => value !== id)
                    : [...current, id],
                )
              }
              morphemeQuery={morphemeQuery}
              onMorphemeQueryChange={setMorphemeQuery}
              composedSpelling={composedSpelling}
              onSubmit={createItem}
            />
          )}
        </section>
      </div>
    </aside>
  );
}
