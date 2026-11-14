import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  safePolygon,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
  useTransitionStyles,
} from "@floating-ui/react";
import { PlusIcon, TrashIcon, XIcon } from "@phosphor-icons/react";
import { useState } from "react";
import type {
  ConlangMorpheme,
  ConlangWord,
} from "../../stores/conlang-builder";

export function WordDetails({
  word,
  morphemes,
  onClose,
  onSelectMorpheme,
  onDelete,
  onCreateWord,
}: {
  word: ConlangWord;
  morphemes: ConlangMorpheme[];
  onClose: () => void;
  onSelectMorpheme: (morpheme: ConlangMorpheme) => void;
  onDelete: () => void;
  onCreateWord: () => void;
}) {
  return (
    <section aria-label={`${word.spelling} word definition`}>
      <PanelHeading label="WORD DEFINITION" onClose={onClose} />
      <div className="rounded-lg bg-blue-700 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h4 className="font-display text-2xl font-semibold text-yellow-500">
              {word.spelling}
            </h4>
            {word.source === "starter" && (
              <span className="text-[10px] font-bold uppercase tracking-wide text-blue-300">
                Example
              </span>
            )}
          </div>
          <DeleteButton label="word" onDelete={onDelete} />
        </div>
        <p className="mt-1 text-sm text-blue-100">{word.definition}</p>
        <div className="mt-4 rounded bg-blue-800 p-3">
          {morphemes.length > 0 ? (
            <>
              <p className="mb-2 text-[10px] font-bold text-blue-300">
                MORPHEMES
              </p>
              <div className="flex flex-wrap gap-1.5">
                {morphemes.map((morpheme) => (
                  <DefinitionButton
                    key={morpheme.id}
                    label={morpheme.spelling}
                    definition={morpheme.definition}
                    onClick={() => onSelectMorpheme(morpheme)}
                    className="rounded bg-blue-600 px-2 py-1 text-xs font-semibold text-blue-100 hover:bg-yellow-500 hover:text-blue-800"
                  />
                ))}
              </div>
            </>
          ) : (
            <p className="text-sm text-blue-300">A single-morpheme word.</p>
          )}
        </div>
        <button
          type="button"
          onClick={onCreateWord}
          className="mt-3 inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-yellow-400 hover:text-yellow-300"
        >
          <PlusIcon size={14} weight="bold" />
          Create another word
        </button>
      </div>
    </section>
  );
}

export function MorphemeDetails({
  morpheme,
  words,
  onClose,
  onSelectWord,
  onDelete,
  onCreateWord,
}: {
  morpheme: ConlangMorpheme;
  words: ConlangWord[];
  onClose: () => void;
  onSelectWord: (word: ConlangWord) => void;
  onDelete: () => void;
  onCreateWord: () => void;
}) {
  return (
    <section aria-label={`${morpheme.spelling} morpheme definition`}>
      <PanelHeading label="MORPHEME DEFINITION" onClose={onClose} />
      <div className="rounded-lg bg-blue-700 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h4 className="font-display text-2xl font-semibold text-yellow-500">
              {morpheme.role === "affix" &&
              !morpheme.spelling.startsWith("-")
                ? "-"
                : ""}
              {morpheme.spelling}
            </h4>
            <span className="text-[10px] font-bold uppercase tracking-wide text-blue-300">
              {morpheme.source === "starter"
                ? `Example ${morpheme.role ?? "root"}`
                : morpheme.role ?? "root"}
            </span>
          </div>
          <DeleteButton label="morpheme" onDelete={onDelete} />
        </div>
        <p className="mt-1 text-sm text-blue-100">{morpheme.definition}</p>
        <div className="mt-4 rounded bg-blue-800 p-3">
          <p className="mb-2 text-[10px] font-bold text-blue-300">USED IN</p>
          <div className="flex flex-wrap gap-1.5">
            {words.length > 0 ? (
              words.map((word) => (
                <DefinitionButton
                  key={word.id}
                  label={word.spelling}
                  definition={word.definition}
                  onClick={() => onSelectWord(word)}
                  className="bg-blue-600 px-2 py-1 text-xs text-blue-100 hover:bg-yellow-500 hover:text-blue-800"
                />
              ))
            ) : (
              <p className="text-xs text-blue-300">
                This morpheme is not used in any words yet.
              </p>
            )}
          </div>
        </div>
        <button
          type="button"
          onClick={onCreateWord}
          className="mt-3 inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-yellow-400 hover:text-yellow-300"
        >
          <PlusIcon size={14} weight="bold" />
          Use in a word
        </button>
      </div>
    </section>
  );
}

function DeleteButton({
  label,
  onDelete,
}: {
  label: "word" | "morpheme";
  onDelete: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onDelete}
      className="shrink-0 cursor-pointer rounded p-1.5 text-blue-300 transition-colors hover:bg-blue-600 hover:text-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500"
      aria-label={`Delete ${label}`}
      title={`Delete ${label}`}
    >
      <TrashIcon size={18} />
    </button>
  );
}

function DefinitionButton({
  label,
  definition,
  onClick,
  className,
}: {
  label: string;
  definition: string;
  onClick: () => void;
  className: string;
}) {
  const [open, setOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: "top",
    middleware: [offset(8), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });
  const hover = useHover(context, {
    delay: { open: 100, close: 100 },
    handleClose: safePolygon(),
  });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);
  const { isMounted, styles } = useTransitionStyles(context, {
    initial: { opacity: 0, translate: "0 5px" },
  });

  return (
    <>
      <button
        type="button"
        ref={refs.setReference}
        {...getReferenceProps()}
        onClick={onClick}
        className={`cursor-pointer rounded transition-colors ${className}`}
      >
        {label}
      </button>
      {isMounted && (
        <FloatingPortal id="floating-ui-root">
          <div
            ref={refs.setFloating}
            style={{ ...floatingStyles, ...styles }}
            {...getFloatingProps()}
            className="pointer-events-auto z-50 max-w-xs rounded-lg border border-blue-400 bg-blue-800 px-3 py-2 text-sm leading-snug text-blue-100 shadow-lg"
          >
            {definition}
          </div>
        </FloatingPortal>
      )}
    </>
  );
}

function PanelHeading({
  label,
  onClose,
}: {
  label: string;
  onClose: () => void;
}) {
  return (
    <div className="mb-2 flex items-center justify-between px-2">
      <h4 className="text-xs font-bold text-blue-100">{label}</h4>
      <button
        type="button"
        onClick={onClose}
        className="cursor-pointer rounded p-1 text-blue-300 hover:text-blue-100"
        aria-label="Close definition"
      >
        <XIcon size={16} />
      </button>
    </div>
  );
}
