import { useEffect } from "react";
import { persistentMap } from "@nanostores/persistent";
import { useStore } from "@nanostores/react";
import { PAGES } from "../../constants";
import { $progress } from "../../stores/progress";
import { InteractiveBlock } from "../interactive-block";

const answers: Record<string, string> = {
  walk: "walked",
  teach: "taught",
  go: "went",
};
const $pastTenseAnswers = persistentMap<Record<string, string>>(
  "interactive-past-tense",
  {},
  { encode: JSON.stringify, decode: (value) => JSON.parse(value) },
);
export const resetPastTense = () => $pastTenseAnswers.set({});
export function PastTense() {
  const values = useStore($pastTenseAnswers);
  const complete = Object.entries(answers).every(
    ([word, answer]) => values[word]?.trim().toLowerCase() === answer,
  );
  useEffect(() => {
    if (complete) $progress.setKey(PAGES.suppletionAndLexemes, 1);
  }, [complete]);
  return (
    <InteractiveBlock>
      <p className="mb-4 font-medium text-blue-500">
        Enter the correct past tense form of each present tense verb.
      </p>
      <div className="grid max-w-xs grid-cols-[7rem_1fr] gap-y-3 text-sm mb-1">
        <b className="font-bold text-teal-500">present</b>
        <b className="font-bold text-teal-500">past</b>
        {Object.keys(answers).map((word) => {
          const value = values[word] ?? "";
          const isCorrect =
            value.trim().toLowerCase() ===
            answers[word as keyof typeof answers];

          return (
            <div key={word} className="contents">
              <span className="w-fit rounded-md bg-background-100 px-2 py-1">
                {word}
              </span>
              {isCorrect ? (
                <span className="w-fit rounded-md bg-teal-100 px-2 py-1 font-bold text-teal-500">
                  {value}
                </span>
              ) : (
                <input
                  aria-label={`Past tense of ${word}`}
                  className="w-36 rounded-md bg-background-100 px-2 py-1 outline-none transition-shadow ring-teal-100 focus:ring-3"
                  value={value}
                  onChange={(event) =>
                    $pastTenseAnswers.setKey(word, event.target.value)
                  }
                />
              )}
            </div>
          );
        })}
      </div>
    </InteractiveBlock>
  );
}
