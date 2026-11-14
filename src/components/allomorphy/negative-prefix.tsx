import { persistentMap } from "@nanostores/persistent";
import { useStore } from "@nanostores/react";
import { CheckIcon } from "@phosphor-icons/react";
import { cn } from "cn";
import type { SubmitEvent } from "react";
import { useEffect, useState } from "react";
import { PAGES } from "../../constants";
import { $progress } from "../../stores/progress";
import { clearPersistentMap } from "../../stores/reset-persistent";
import { Button } from "../button";
import { InteractiveBlock } from "../interactive-block";

const answers: Record<string, string> = {
  tolerant: "in",
  possible: "im",
  legal: "il",
};
const $prefixAnswers = persistentMap<Record<string, string>>(
  "interactive-negative-prefixes",
  {},
  { encode: JSON.stringify, decode: (value) => JSON.parse(value) },
);
export const resetNegativePrefixes = () => {
  clearPersistentMap("interactive-negative-prefixes");
  $prefixAnswers.set({});
};

export function NegativePrefix() {
  const values = useStore($prefixAnswers);
  const [isCompleted, setIsCompleted] = useState(false);
  const isCorrect = Object.entries(answers).every(
    ([word, answer]) => values[word] === answer,
  );
  useEffect(() => {
    if (isCompleted && isCorrect) $progress.setKey(PAGES.allomorphy, 1);
  }, [isCompleted, isCorrect]);

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    setIsCompleted(true);
  };

  return (
    <InteractiveBlock
      isCompleted={isCompleted}
      isCorrect={isCorrect}
      feedbackMessage="The negative prefix changes form depending on the first letter of the base. Check the pattern across all three."
    >
      <p className="mb-4 font-medium text-blue-500">
        Fill in the missing prefixes to create words that mean the opposite of
        the base.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-end">
          <div className="space-y-2">
            {Object.keys(answers).map((word) => {
              const value = values[word] ?? "";
              const answerIsCorrect = value === answers[word];
              return (
                <label key={word} className="flex items-center gap-2 text-sm">
                  <input
                    aria-label={`Prefix for ${word}`}
                    className={cn(
                      "w-16 rounded-md bg-background-100 px-2 py-1 outline-none transition-shadow ring-teal-100 focus:ring-3",
                      answerIsCorrect && "text-teal-500 ring-2 ring-teal-100",
                    )}
                    disabled={answerIsCorrect}
                    value={value}
                    onChange={(event) => {
                      setIsCompleted(false);
                      $prefixAnswers.setKey(word, event.target.value);
                    }}
                  />
                  <span>+</span>
                  <span className="rounded-md bg-background-100 px-2 py-1">
                    {word}
                  </span>
                  <span>=</span>
                  <span
                    className={`rounded-md px-2 py-1 ${
                      answerIsCorrect
                        ? "bg-teal-100 font-bold text-teal-500"
                        : "bg-background-100"
                    }`}
                  >
                    {answerIsCorrect ? `${value}${word}` : "???"}
                  </span>
                </label>
              );
            })}
          </div>
          <Button type="submit" variant="teal" size="icon">
            <CheckIcon weight="bold" size={16} />
          </Button>
        </div>
      </form>
    </InteractiveBlock>
  );
}
