import { useEffect, useState } from "react";
import { PAGES } from "../../constants";
import { $progress } from "../../stores/progress";
import { InteractiveBlock } from "../interactive-block";

const answers = { cats: "/s/", dogs: "/z/", buses: "/ɪz/" };
const descriptions = {
  "/s/": "as in “snake”",
  "/z/": "as in “zoo”",
  "/ɪz/": "as in “is”",
};

export function PluralSounds() {
  const [values, setValues] = useState<Record<string, string>>({});
  const complete = Object.entries(answers).every(
    ([word, answer]) => values[word] === answer,
  );
  useEffect(() => {
    if (complete) $progress.setKey(PAGES.allomorphy, 2);
  }, [complete]);
  return (
    <InteractiveBlock>
      <p className="mb-4 max-w-xl font-medium leading-snug text-blue-500">
        Select the exact sound that the plural “-s” or “-es” makes at the end of
        these words.
      </p>
      <div className="space-y-4">
        {Object.entries(answers).map(([word]) => (
          <fieldset key={word}>
            <legend className="mb-2 font-bold text-teal-500">{word}</legend>
            <div className="space-y-2">
              {Object.entries(descriptions).map(([sound, description]) => {
                const isSelected = values[word] === sound;

                return (
                  <label
                    key={sound}
                    className="flex items-center gap-2 text-sm"
                  >
                    <span
                      className={`rounded-md px-2 py-1 select-none cursor-pointer ${
                        isSelected
                          ? "bg-teal-100 font-bold text-teal-500"
                          : "bg-background-100"
                      }`}
                    >
                      <input
                        className="sr-only"
                        type="radio"
                        name={word}
                        checked={isSelected}
                        onChange={() =>
                          setValues((current) => ({
                            ...current,
                            [word]: sound,
                          }))
                        }
                      />
                      {sound}
                    </span>
                    <span>({description})</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>
    </InteractiveBlock>
  );
}
