import { ArrowCounterClockwiseIcon } from "@phosphor-icons/react";
import { navigate } from "astro:transitions/client";
import { resetConceptBank } from "../stores/concept-bank";
import { resetCurrentPage } from "../stores/current-page";
import { resetEnglishToolkit } from "../stores/english-toolkit";
import { resetProgress } from "../stores/progress";
import { resetNegativePrefixes } from "./allomorphy/negative-prefix";
import { resetPluralSounds } from "./allomorphy/plural-sounds";
import { resetSuffixConnections } from "./inflection-and-derivation/match-suffixes";
import { resetFreeAndBoundMorphemes } from "./morphemes/classify-free-and-bound-morphemes";
import { resetUnbreakable } from "./morphemes/separate-unbreakable";
import { resetSentenceAnswer } from "./morphology/complete-sentence";
import { resetConlangName } from "../stores/conlang-name";
import { resetLexemeSort } from "./suppletion/lexeme-sort";
import { resetPastTense } from "./suppletion/past-tense";

export function ResetProgressButton() {
  return (
    <button
      className="text-xs text-foreground-400 cursor-pointer p-1 inline-flex gap-2 items-center"
      onClick={() => {
        resetProgress();
        resetEnglishToolkit();
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
        navigate("/morphology");
      }}
    >
      <ArrowCounterClockwiseIcon />
      Reset progress
    </button>
  );
}
