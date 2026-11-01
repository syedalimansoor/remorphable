import { useStore } from "@nanostores/react";
import { PlusIcon, XIcon } from "@phosphor-icons/react";
import { concepts as conceptCatalog } from "../data/concepts";
import { $conceptBank } from "../stores/concept-bank";
import { Button } from "./button";
import { ConceptTooltip } from "./concept-tooltip";

export function ConceptBank() {
  const concepts = useStore($conceptBank);
  const removeConcept = (conceptId: string) => {
    $conceptBank.set(concepts.filter((id) => id !== conceptId));
  };

  if (concepts.length === 0) return null;

  return (
    <aside className="w-56 shrink-0 rounded-lg border bg-background-100 p-4">
      <h2 className="font-display text-blue-500">Concept Bank</h2>

      <ul className="mt-3 flex flex-col gap-2 text-sm">
        {concepts.map((conceptId) => {
          const concept = conceptCatalog[conceptId];
          if (!concept) return null;
          return (
            <ConceptTooltip
              key={conceptId}
              content={
                <>
                  <p>{concept.definition}</p>
                  <p className="text-foreground-400">
                    Example: {concept.example}
                  </p>
                </>
              }
              className="group relative flex items-center justify-between gap-2 rounded-md border px-2 py-1"
            >
              <span className="cursor-help underline decoration-dotted">
                {concept.term}
              </span>
              <button
                type="button"
                className="cursor-pointer rounded-sm p-0.5 text-foreground-400 opacity-0 transition-opacity group-hover:opacity-100 hover:text-foreground-500"
                title={`Remove ${concept.term} from Concept Bank`}
                aria-label={`Remove ${concept.term} from Concept Bank`}
                onClick={() => removeConcept(conceptId)}
              >
                <XIcon weight="bold" size={14} />
              </button>
            </ConceptTooltip>
          );
        })}
      </ul>
    </aside>
  );
}

export function LessonConcepts({ concepts }: { concepts: string[] }) {
  const bank = useStore($conceptBank);

  if (concepts.length === 0) return null;

  return (
    <section className="mt-12 border-t pt-6">
      <h2 className="font-display text-blue-500 text-xl">
        Concepts from this lesson
      </h2>
      <p className="text-sm text-foreground-400 mt-1">
        Click on the plus button to save concepts to your Concept Bank to
        remember them for later.
      </p>
      <ul className="mt-5 flex flex-col gap-4">
        {concepts.map((conceptId) => {
          const concept = conceptCatalog[conceptId];
          if (!concept) return null;
          const isAdded = bank.includes(conceptId);
          return (
            <li
              key={conceptId}
              className="flex items-center justify-between gap-4"
            >
              <div className="min-w-0">
                <h3 className="font-medium text-blue-500">{concept.term}</h3>
                <p className="text-sm">{concept.definition}</p>
                <p className="text-sm text-foreground-400">
                  Example: {concept.example}
                </p>
              </div>
              <Button
                size="icon"
                variant="teal"
                className={
                  isAdded ? "border border-teal-500 bg-transparent" : undefined
                }
                title={
                  isAdded
                    ? `Remove ${concept.term} from Concept Bank`
                    : `Add ${concept.term} to Concept Bank`
                }
                aria-label={
                  isAdded
                    ? `Remove ${concept.term} from Concept Bank`
                    : `Add ${concept.term} to Concept Bank`
                }
                onClick={() =>
                  $conceptBank.set(
                    isAdded
                      ? bank.filter((id) => id !== conceptId)
                      : [...bank, conceptId],
                  )
                }
              >
                {isAdded ? (
                  <XIcon weight="bold" size={18} />
                ) : (
                  <PlusIcon weight="bold" size={18} />
                )}
              </Button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
