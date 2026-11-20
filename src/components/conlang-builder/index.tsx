import { useStore } from "@nanostores/react";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  $activeTool,
  $conlangBuilderEnabled,
  $conlangData,
  hideActiveTool,
  type ConlangMorpheme,
} from "../../stores/conlang-builder";
import { $conlangName } from "../../stores/conlang-name";
import { $englishToolkitEnabled } from "../../stores/english-toolkit";
import { BankBrowser } from "./bank-browser";
import { BuilderHeader } from "./builder-header";
import { CreationForm } from "./creation-form";
import type { CreationStep, MorphemeCategory, PartOfSpeech } from "./types";

type WordMode = "create" | "browse" | null;
type MorphemeDraft = {
  category: MorphemeCategory;
  definition: string;
};

const randomSyllables = [
  "ba",
  "da",
  "fa",
  "ga",
  "ka",
  "la",
  "ma",
  "na",
  "ra",
  "sa",
  "ta",
  "va",
  "za",
  "el",
  "in",
  "or",
  "ab",
  "ad",
  "am",
  "an",
  "ash",
  "ath",
  "auk",
  "ay",
  "be",
  "bi",
  "bo",
  "bu",
  "cha",
  "che",
  "chi",
  "cho",
  "chu",
  "cla",
  "cre",
  "dro",
  "du",
  "esh",
  "eth",
  "eu",
  "eya",
  "ge",
  "gi",
  "go",
  "gu",
  "ha",
  "he",
  "hi",
  "ho",
  "hu",
  "ja",
  "je",
  "jo",
  "ju",
  "kai",
  "kei",
  "kha",
  "khe",
  "kho",
  "kri",
  "kua",
  "lae",
  "le",
  "li",
  "lo",
  "lu",
  "ly",
  "mi",
  "mo",
  "mu",
  "nya",
  "nye",
  "oi",
  "ou",
  "pa",
  "pe",
  "pi",
  "po",
  "pu",
  "qua",
  "rai",
  "rei",
  "sha",
  "she",
  "shi",
  "shu",
  "skai",
  "sta",
  "swi",
  "tha",
  "the",
  "thi",
  "thu",
  "tra",
  "tse",
  "tshi",
  "ua",
  "ue",
  "ui",
  "ve",
  "vi",
  "vo",
  "vu",
  "wa",
  "we",
  "wi",
  "xa",
  "xe",
  "xo",
  "ya",
  "ye",
  "yo",
  "yu",
  "zha",
  "zho",
  "zri",
];

function getSegments(spelling: string, boundaries: number[]) {
  const letters = Array.from(spelling);
  const boundarySet = new Set(boundaries);
  const segments: string[] = [];
  let segment = "";
  letters.forEach((letter, index) => {
    segment += letter;
    if (boundarySet.has(index) || index === letters.length - 1) {
      segments.push(segment);
      segment = "";
    }
  });
  return segments;
}

function validateMorphemeOrder(categories: MorphemeCategory[]) {
  const firstBase = categories.indexOf("base");
  if (firstBase === -1) return "Make sure your word has at least one base!";
  const lastBase = categories.lastIndexOf("base");
  if (categories.slice(firstBase + 1).includes("prefix")) {
    return "Make sure all prefixes come before all bases!";
  }
  if (categories.slice(0, lastBase).includes("suffix")) {
    return "Make sure all suffixes come after all bases!";
  }
  return "";
}

export function ConlangBuilder() {
  const [hasMounted, setHasMounted] = useState(false);
  const isEnabled = useStore($conlangBuilderEnabled);
  const englishToolkitEnabled = useStore($englishToolkitEnabled);
  const activeTool = useStore($activeTool);
  const data = useStore($conlangData);
  const conlangName = useStore($conlangName);
  const [wordMode, setWordMode] = useState<WordMode>(null);
  const [step, setStep] = useState<CreationStep>("define");
  const [spelling, setSpelling] = useState("");
  const [definition, setDefinition] = useState("");
  const [partOfSpeech, setPartOfSpeech] = useState<PartOfSpeech>("noun");
  const [boundaries, setBoundaries] = useState<number[]>([]);
  const [selectedMorpheme, setSelectedMorpheme] = useState("");
  const [morphemeDrafts, setMorphemeDrafts] = useState<
    Record<string, MorphemeDraft>
  >({});
  const [validationMessage, setValidationMessage] = useState("");
  const [query, setQuery] = useState("");
  const [selectedWordId, setSelectedWordId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [editingName, setEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState(conlangName);

  useEffect(() => setHasMounted(true), []);
  useEffect(() => {
    if (hasMounted && wordMode === null) {
      setWordMode(data.words.length > 0 ? "browse" : "create");
    }
  }, [data.words.length, hasMounted, wordMode]);

  const wordEntries = useMemo(
    () =>
      data.words.map((word) => ({
        word,
        spelling: word.morphemeIds
          .map(
            (id) =>
              data.morphemes.find((morpheme) => morpheme.id === id)?.spelling,
          )
          .filter((value): value is string => value !== undefined)
          .join(""),
      })),
    [data.morphemes, data.words],
  );
  const visibleWords = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return wordEntries.filter(
      ({ word, spelling: wordSpelling }) =>
        wordSpelling.toLocaleLowerCase().includes(normalizedQuery) ||
        word.definition.toLocaleLowerCase().includes(normalizedQuery),
    );
  }, [query, wordEntries]);
  const selectedWord =
    wordEntries.find(({ word }) => word.id === selectedWordId) ?? null;
  const selectedWordMorphemes =
    selectedWord?.word.morphemeIds
      .map((id) => data.morphemes.find((morpheme) => morpheme.id === id))
      .filter(
        (morpheme): morpheme is ConlangMorpheme => morpheme !== undefined,
      ) ?? [];
  const isDuplicateWord = (candidate: string) => {
    const normalizedCandidate = candidate.trim().normalize("NFC").toLowerCase();
    return (
      normalizedCandidate.length > 0 &&
      wordEntries.some(
        ({ spelling: existingSpelling }) =>
          existingSpelling.normalize("NFC").toLowerCase() ===
          normalizedCandidate,
      )
    );
  };
  const segments = useMemo(
    () => getSegments(spelling, boundaries),
    [boundaries, spelling],
  );
  const selectedMorphemeData = data.morphemes.find(
    (morpheme) => morpheme.spelling === selectedMorpheme,
  );
  const selectedDraft = selectedMorpheme
    ? morphemeDrafts[selectedMorpheme]
    : undefined;
  const morphemeCategory =
    selectedDraft?.category ?? selectedMorphemeData?.category ?? "base";
  const morphemeDefinition =
    selectedDraft?.definition ?? selectedMorphemeData?.definition ?? "";
  const describedMorphemes = segments.filter((segment) => {
    const draft = morphemeDrafts[segment];
    const existing = data.morphemes.find(
      (morpheme) => morpheme.spelling === segment,
    );
    return (
      (draft ? draft.definition : (existing?.definition ?? "")).trim().length >
      0
    );
  });

  if (!hasMounted || !isEnabled || activeTool !== "conlang" || !wordMode) {
    return null;
  }

  const resetCreation = () => {
    setStep("define");
    setSpelling("");
    setDefinition("");
    setPartOfSpeech("noun");
    setBoundaries([]);
    setSelectedMorpheme("");
    setMorphemeDrafts({});
    setValidationMessage("");
  };

  const createAnotherWord = () => {
    resetCreation();
    setSelectedWordId(null);
    setSuccessMessage("");
    setWordMode("create");
  };

  const cancelCreation = () => {
    resetCreation();
    setWordMode("browse");
  };

  const deleteWord = (wordId: string) => {
    $conlangData.set({
      ...data,
      words: data.words.filter((word) => word.id !== wordId),
    });
    setSelectedWordId(null);
  };

  const continueToSplit = () => {
    if (isDuplicateWord(spelling)) {
      setValidationMessage("A word with this spelling already exists.");
      return;
    }
    setValidationMessage("");
    setStep("split");
  };

  const saveWord = (
    morphemeIds: string[],
    nextMorphemes: ConlangMorpheme[],
  ) => {
    const nextSpelling = morphemeIds
      .map((id) => nextMorphemes.find((morpheme) => morpheme.id === id)?.spelling)
      .filter((value): value is string => value !== undefined)
      .join("");
    if (isDuplicateWord(nextSpelling)) {
      setValidationMessage("A word with this spelling already exists.");
      setStep("define");
      return;
    }

    for (const existingWord of data.words) {
      const existingCategories = existingWord.morphemeIds
        .map((id) => nextMorphemes.find((morpheme) => morpheme.id === id))
        .filter(
          (morpheme): morpheme is ConlangMorpheme => morpheme !== undefined,
        )
        .map((morpheme) => morpheme.category);
      const existingWordError = validateMorphemeOrder(existingCategories);
      if (existingWordError) {
        setValidationMessage(existingWordError);
        return;
      }
    }

    $conlangData.set({
      words: [
        ...data.words,
        {
          id: crypto.randomUUID(),
          definition: definition.trim(),
          partOfSpeech,
          morphemeIds,
        },
      ],
      morphemes: nextMorphemes,
    });
    setSelectedWordId(null);
    setSuccessMessage(
      data.morphemes.length === 0
        ? "Awesome! You created your first word."
        : "",
    );
    setQuery("");
    setWordMode("browse");
    resetCreation();
  };

  const completeSingleMorphemeWord = () => {
    const morphemeSpelling = spelling.trim();
    const existingIndex = data.morphemes.findIndex(
      (morpheme) => morpheme.spelling === morphemeSpelling,
    );
    const morpheme: ConlangMorpheme = {
      id:
        existingIndex >= 0
          ? data.morphemes[existingIndex].id
          : crypto.randomUUID(),
      spelling: morphemeSpelling,
      definition: definition.trim(),
      category: "base",
    };
    const nextMorphemes = [...data.morphemes];
    if (existingIndex >= 0) {
      nextMorphemes[existingIndex] = morpheme;
    } else {
      nextMorphemes.push(morpheme);
    }

    saveWord([morpheme.id], nextMorphemes);
  };

  const completeWord = () => {
    const wordSegments = getSegments(spelling, boundaries);
    const nextMorphemes = [...data.morphemes];
    const morphemeIds: string[] = [];
    const categories: MorphemeCategory[] = [];

    for (const morphemeSpelling of wordSegments) {
      const current = nextMorphemes.find(
        (morpheme) => morpheme.spelling === morphemeSpelling,
      );
      const draft = morphemeDrafts[morphemeSpelling];
      const category = draft?.category ?? current?.category ?? "base";
      const morphemeDefinition = draft?.definition ?? current?.definition ?? "";
      categories.push(category);

      if (current) {
        const index = nextMorphemes.findIndex(
          (morpheme) => morpheme.id === current.id,
        );
        nextMorphemes[index] = {
          ...current,
          category,
          definition: morphemeDefinition,
        };
        morphemeIds.push(current.id);
      } else {
        const morpheme: ConlangMorpheme = {
          id: crypto.randomUUID(),
          spelling: morphemeSpelling,
          definition: morphemeDefinition,
          category,
        };
        nextMorphemes.push(morpheme);
        morphemeIds.push(morpheme.id);
      }
    }

    const orderError = validateMorphemeOrder(categories);
    if (orderError) {
      setValidationMessage(orderError);
      return;
    }

    saveWord(morphemeIds, nextMorphemes);
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
      className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-xl bg-blue-500 px-6 py-5 pb-10 text-blue-100 selection:bg-yellow-500! selection:text-blue-500! sm:px-6"
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

      <div
        className={`mx-auto mt-10 flex min-h-0 w-full max-w-3xl flex-1 flex-col px-2 sm:px-4 ${
          wordMode === "browse" ? "overflow-hidden" : "overflow-y-auto"
        }`}
      >
        <h3 className="font-display text-center text-2xl font-semibold leading-tight text-yellow-500 sm:text-3xl">
          Build the morphology of {conlangName || "your language"}!
        </h3>

        {wordMode === "create" ? (
          <CreationForm
            key={step}
            step={step}
            firstWord={data.morphemes.length === 0}
            spelling={spelling}
            definition={definition}
            partOfSpeech={partOfSpeech}
            segments={segments}
            describedMorphemes={describedMorphemes}
            boundaries={boundaries}
            selectedMorpheme={selectedMorpheme}
            morphemeCategory={morphemeCategory}
            morphemeDefinition={morphemeDefinition}
            validationMessage={validationMessage}
            onStepChange={setStep}
            onCreateWord={continueToSplit}
            onSpellingChange={(value) => {
              setSpelling(value);
              setBoundaries([]);
              setSelectedMorpheme("");
              setValidationMessage("");
            }}
            onDefinitionChange={setDefinition}
            onPartOfSpeechChange={setPartOfSpeech}
            onGenerateRandomWord={() => {
              const syllableCount = 2 + Math.floor(Math.random() * 2);
              const generated = Array.from(
                { length: syllableCount },
                () =>
                  randomSyllables[
                    Math.floor(Math.random() * randomSyllables.length)
                  ],
              ).join("");
              setSpelling(generated);
              setBoundaries([]);
              setSelectedMorpheme("");
              setValidationMessage("");
            }}
            onToggleBoundary={(position) => {
              setBoundaries((current) =>
                current.includes(position)
                  ? current.filter((value) => value !== position)
                  : [...current, position].sort((a, b) => a - b),
              );
              setValidationMessage("");
            }}
            onSelectMorpheme={(value) => {
              setSelectedMorpheme(value);
              setValidationMessage("");
            }}
            onMorphemeCategoryChange={(category) => {
              if (!selectedMorpheme) return;
              setMorphemeDrafts((current) => ({
                ...current,
                [selectedMorpheme]: {
                  category,
                  definition:
                    current[selectedMorpheme]?.definition ??
                    selectedMorphemeData?.definition ??
                    "",
                },
              }));
              setValidationMessage("");
            }}
            onMorphemeDefinitionChange={(value) => {
              if (!selectedMorpheme) return;
              setMorphemeDrafts((current) => ({
                ...current,
                [selectedMorpheme]: {
                  category:
                    current[selectedMorpheme]?.category ??
                    selectedMorphemeData?.category ??
                    "base",
                  definition: value,
                },
              }));
            }}
            onClearValidation={() => setValidationMessage("")}
            onCancelCreation={cancelCreation}
            onCreateSingleMorpheme={completeSingleMorphemeWord}
            onComplete={completeWord}
          />
        ) : (
          <BankBrowser
            words={visibleWords}
            query={query}
            successMessage={successMessage}
            selectedWord={selectedWord}
            selectedWordMorphemes={selectedWordMorphemes}
            onQueryChange={(value) => {
              setQuery(value);
              setSelectedWordId(null);
            }}
            onCreateWord={createAnotherWord}
            onSelectWord={setSelectedWordId}
            onDeleteWord={deleteWord}
            onDismissSuccess={() => setSuccessMessage("")}
          />
        )}
      </div>
    </aside>
  );
}
