import { persistentAtom } from "@nanostores/persistent";
import { useStore } from "@nanostores/react";
import { CheckIcon, KeyReturnIcon } from "@phosphor-icons/react";
import type { SubmitEvent } from "react";
import { useEffect, useState } from "react";
import { PAGES } from "../../constants";
import { $progress } from "../../stores/progress";
import { Button } from "../button";
import { InteractiveBlock } from "../interactive-block";

const $sentenceAnswer = persistentAtom<string>(
  "interactive-sentence-answer",
  "",
);
export const resetSentenceAnswer = () => $sentenceAnswer.set("");

export function CompleteSentence() {
  const inputValue = useStore($sentenceAnswer);
  const [submitted, setSubmitted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const isCorrect = inputValue.trim().toLowerCase().includes("splinch");

  useEffect(() => {
    if (!submitted) return;
    const timeout = window.setTimeout(() => setSubmitted(false), 2000);
    return () => window.clearTimeout(timeout);
  }, [submitted]);

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    setIsCompleted(true);
    if (isCorrect) $progress.setKey(PAGES.morphology, 2);
    setSubmitted(true);
  };

  return (
    <InteractiveBlock
      isCompleted={isCompleted}
      isCorrect={isCorrect}
      feedbackMessage="Use the context: the burglar did something to the broken window. Enter a verb that fits the story."
    >
      <p className="leading-loose">
        Last night, the clumsy burglar{" "}
        <form className="inline-block relative mx-1" onSubmit={handleSubmit}>
          <input
            className="leading-normal w-36 bg-background-100 px-2 py-1 rounded-md outline-none outline-transparent transition-shadow ring-teal-100 focus:ring-3 selection:bg-teal-500"
            value={inputValue}
            onChange={(e) => $sentenceAnswer.set(e.target.value)}
          />
          <Button
            className="absolute inset-y-1 right-1 rounded-sm px-2"
            variant="teal"
          >
            {submitted ? (
              <CheckIcon weight="bold" size={12} />
            ) : (
              <KeyReturnIcon weight="duotone" size={12} />
            )}
          </Button>
        </form>{" "}
        on a broken window pane, leaving a trail of bloody footprints across the
        floor.
      </p>
    </InteractiveBlock>
  );
}
