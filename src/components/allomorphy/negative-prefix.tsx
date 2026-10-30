import { cn } from "cn";
import { useEffect, useState } from "react";
import { PAGES } from "../../constants";
import { $progress } from "../../stores/progress";
import { InteractiveBlock } from "../interactive-block";

const answers: Record<string, string> = {
  tolerant: "in",
  possible: "im",
  legal: "il",
};

export function NegativePrefix() {
  const [values, setValues] = useState<Record<string, string>>({});
  const complete = Object.entries(answers).every(
    ([word, answer]) => values[word] === answer,
  );
  useEffect(() => {
    if (complete) $progress.setKey(PAGES.allomorphy, 1);
  }, [complete]);
  return (
    <InteractiveBlock>
      <p className="mb-4 font-medium text-blue-500">
        Fill in the missing prefixes to create words that mean the opposite of
        the base.
      </p>
      <div className="space-y-2">
        {Object.keys(answers).map((word) => {
          const value = values[word] ?? "";
          const isCorrect = value === answers[word];

          return (
            <label key={word} className="flex items-center gap-2 text-sm">
              <input
                aria-label={`Prefix for ${word}`}
                className={cn(
                  "w-16 rounded-md bg-background-100 px-2 py-1 outline-none transition-shadow ring-teal-100 focus:ring-3",
                  isCorrect && "text-teal-500 ring-2 ring-teal-100",
                )}
                disabled={isCorrect}
                value={value}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    [word]: event.target.value,
                  }))
                }
              />
              <span>+</span>
              <span className="rounded-md bg-background-100 px-2 py-1">
                {word}
              </span>
              <span>=</span>
              <span
                className={`rounded-md px-2 py-1 ${
                  isCorrect
                    ? "bg-teal-100 font-bold text-teal-500"
                    : "bg-background-100"
                }`}
              >
                {isCorrect ? `${value}${word}` : "???"}
              </span>
            </label>
          );
        })}
      </div>
    </InteractiveBlock>
  );
}
