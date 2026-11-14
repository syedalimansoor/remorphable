import { useStore } from "@nanostores/react";
import { CheckIcon, KeyReturnIcon } from "@phosphor-icons/react";
import type { SubmitEvent } from "react";
import { useEffect, useState } from "react";
import { PAGES } from "../../constants";
import { $conlangName } from "../../stores/conlang-name";
import { $progress } from "../../stores/progress";
import { Button } from "../button";
import { InteractiveBlock } from "../interactive-block";

export function SetConlangName() {
  const conlangName = useStore($conlangName);
  const [submitted, setSubmitted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const isCorrect = Boolean(conlangName.trim());

  useEffect(() => {
    if (!submitted) return;
    const timeout = window.setTimeout(() => setSubmitted(false), 2000);
    return () => window.clearTimeout(timeout);
  }, [submitted]);

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    if (!isCorrect) return;
    $progress.setKey(PAGES.morphology, 1);
    setIsCompleted(true);
    setSubmitted(true);
  };

  return (
    <InteractiveBlock
      isCompleted={isCompleted}
      isCorrect={isCorrect}
      feedbackMessage="Enter at least one non-space character as your conlang's name."
    >
      <p className="font-medium text-blue-500 mb-3">
        Let’s get started by giving your conlang a name:
      </p>
      <form className="relative mb-3" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Doodleflorp..."
          className="w-full bg-background-100 p-3 rounded-md text-center outline-none outline-transparent transition-shadow ring-teal-100 focus:ring-3 selection:bg-teal-500"
          value={conlangName}
          onChange={(e) => $conlangName.set(e.target.value)}
        />
        <Button
          className="absolute inset-y-2 right-2 rounded-sm"
          variant="teal"
          disabled={conlangName.length === 0}
        >
          {submitted ? (
            <CheckIcon weight="bold" />
          ) : (
            <KeyReturnIcon weight="duotone" />
          )}
        </Button>
      </form>
      <p className="text-xs italic text-foreground-400 text-center mb-1">
        You can always change this later.
      </p>
    </InteractiveBlock>
  );
}
