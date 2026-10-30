import { cn } from "cn";
import { useState } from "react";
import { $progress } from "../../stores/progress";
import { InteractiveBlock } from "../interactive-block";

export function SeparateUnbreakable() {
  const [isSeparated, setIsSeparated] = useState(false);

  const handleClick = () => {
    setIsSeparated((prev) => !prev);
    $progress.setKey("morphemes", 1);
  };

  return (
    <InteractiveBlock>
      <p className="font-medium text-blue-500 mb-4">
        Click on the word to separate it into its morphemes.
      </p>
      <button
        className="flex flex-col gap-2 items-center mx-auto cursor-pointer mb-1"
        onClick={handleClick}
      >
        <span
          className={cn(
            "inline-grid grid-flow-col gap-y-2",
            isSeparated && "gap-x-5",
          )}
        >
          <span
            className={cn(
              "px-2 py-1 bg-teal-100 text-teal-500 rounded-lg font-bold text-lg justify-self-end",
              !isSeparated && "pr-0! rounded-r-none!",
            )}
          >
            un
          </span>
          <span
            className={cn(
              "px-2 py-1 bg-teal-100 text-teal-500 rounded-lg font-bold text-lg justify-self-center",
              !isSeparated && "px-0! rounded-none!",
            )}
          >
            break
          </span>
          <span
            className={cn(
              "px-2 py-1 bg-teal-100 text-teal-500 rounded-lg font-bold text-lg justify-self-start",
              !isSeparated && "pl-0! rounded-l-none!",
            )}
          >
            able
          </span>

          {isSeparated && (
            <span className="col-start-1 row-start-2 col-span-3 grid grid-cols-subgrid text-sm">
              <span className="text-foreground-400">not, opposite of</span>
              <span className="text-foreground-400">separate into pieces</span>
              <span className="text-foreground-400">capable of being</span>
            </span>
          )}
        </span>
        {!isSeparated && (
          <span className="block col-span-3 col-start-1 row-start-2 text-foreground-400 text-sm">
            impossible to break
          </span>
        )}
      </button>
    </InteractiveBlock>
  );
}
