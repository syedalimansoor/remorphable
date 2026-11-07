import { persistentMap } from "@nanostores/persistent";
import { useStore } from "@nanostores/react";
import { cn } from "cn";
import { useEffect, useState } from "react";
import { PAGES } from "../../constants";
import { $progress } from "../../stores/progress";
import { clearPersistentMap } from "../../stores/reset-persistent";
import { InteractiveBlock } from "../interactive-block";

const answers = { cats: "/s/", dogs: "/z/", buses: "/ɪz/" };
const descriptions = {
  "/s/": "as in “snake”",
  "/z/": "as in “zoo”",
  "/ɪz/": "as in “is”",
};
const $pluralAnswers = persistentMap<Record<string, string>>(
  "interactive-plural-sounds",
  {
    cats: "",
    dogs: "",
    buses: "",
  },
  { encode: JSON.stringify, decode: (value) => JSON.parse(value) },
);
export const resetPluralSounds = () => {
  clearPersistentMap("interactive-plural-sounds");
  $pluralAnswers.set({});
};

export function PluralSounds() {
  const values = useStore($pluralAnswers);
  const [isHydrated, setIsHydrated] = useState(false);
  const complete = Object.entries(answers).every(
    ([word, answer]) => values[word] === answer,
  );
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  useEffect(() => {
    if (isHydrated && complete) $progress.setKey(PAGES.allomorphy, 2);
  }, [complete, isHydrated]);
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
                const isSelected = isHydrated && values[word] === sound;

                return (
                  <label
                    key={sound}
                    className="flex items-center gap-2 text-sm"
                  >
                    <span
                      className={cn(
                        "rounded-md px-2 py-1 select-none cursor-pointer",
                        isSelected
                          ? "bg-teal-100 font-bold text-teal-500"
                          : "bg-background-100",
                      )}
                    >
                      <input
                        className="sr-only"
                        type="radio"
                        name={word}
                        checked={isSelected}
                        onChange={() =>
                          $pluralAnswers.setKey(word, sound)
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
