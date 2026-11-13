import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { ArrowCounterClockwiseIcon } from "@phosphor-icons/react";
import { navigate } from "astro:transitions/client";
import { useState } from "react";
import { resetConceptBank } from "../stores/concept-bank";
import { resetConlangBuilder } from "../stores/conlang-builder";
import { resetConlangName } from "../stores/conlang-name";
import { resetCurrentPage } from "../stores/current-page";
import { resetEnglishToolkit } from "../stores/english-toolkit";
import { resetProgress } from "../stores/progress";
import { withBase } from "../utils/url";
import { resetNegativePrefixes } from "./allomorphy/negative-prefix";
import { resetPluralSounds } from "./allomorphy/plural-sounds";
import { resetSuffixConnections } from "./inflection-and-derivation/match-suffixes";
import { resetFreeAndBoundMorphemes } from "./morphemes/classify-free-and-bound-morphemes";
import { resetUnbreakable } from "./morphemes/separate-unbreakable";
import { resetSentenceAnswer } from "./morphology/complete-sentence";
import { resetLexemeSort } from "./suppletion/lexeme-sort";
import { resetPastTense } from "./suppletion/past-tense";

export function ResetProgressButton() {
  const [open, setOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: "bottom",
    middleware: [offset(8), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });
  const hover = useHover(context, { delay: 0 });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  return (
    <>
      <button
        ref={refs.setReference}
        {...getReferenceProps()}
        className="text-xs text-foreground-400 cursor-pointer p-1 inline-flex gap-2 items-center"
        onClick={() => {
          if (
            !window.confirm(
              "Reset all progress and saved data? This cannot be undone.",
            )
          ) {
            return;
          }

          resetProgress();
          resetEnglishToolkit();
          resetConlangBuilder();
          resetCurrentPage();
          resetConlangName();
          resetConceptBank();
          resetSentenceAnswer();
          resetUnbreakable();
          resetFreeAndBoundMorphemes();
          resetSuffixConnections();
          resetNegativePrefixes();
          resetPluralSounds();
          resetPastTense();
          resetLexemeSort();
          navigate(withBase("/morphology"));
        }}
      >
        <ArrowCounterClockwiseIcon />
        Reset progress
      </button>
      {open && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className="z-50 max-w-xs rounded-md border bg-background-100 p-3 text-xs shadow-sm"
          >
            Heads up! This permanently resets you back to the first page and
            erases any data you entered in the exercises and the conlang
            builder.
          </div>
        </FloatingPortal>
      )}
    </>
  );
}
