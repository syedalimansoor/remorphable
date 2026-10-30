import { ArrowCounterClockwiseIcon } from "@phosphor-icons/react";
import { resetSuffixConnections } from "./inflection-and-derivation/match-suffixes";
import { resetNegativePrefixes } from "./allomorphy/negative-prefix";
import { resetPluralSounds } from "./allomorphy/plural-sounds";
import { resetFreeAndBoundMorphemes } from "./morphemes/classify-free-and-bound-morphemes";
import { resetUnbreakable } from "./morphemes/separate-unbreakable";
import { resetSentenceAnswer } from "./morphology/complete-sentence";
import { resetConlangName } from "./morphology/set-conlang-name";
import { resetLexemeSort } from "./suppletion/lexeme-sort";
import { resetPastTense } from "./suppletion/past-tense";
import { $progress, initialProgress } from "../stores/progress";

export function ResetProgressButton() {
  return (
    <button
      className="text-xs text-foreground-400 cursor-pointer p-1 inline-flex gap-2 items-center"
      onClick={() => {
        $progress.set(initialProgress);
        resetConlangName();
        resetSentenceAnswer();
        resetUnbreakable();
        resetFreeAndBoundMorphemes();
        resetSuffixConnections();
        resetNegativePrefixes();
        resetPluralSounds();
        resetPastTense();
        resetLexemeSort();
      }}
    >
      <ArrowCounterClockwiseIcon />
      Reset progress
    </button>
  );
}
