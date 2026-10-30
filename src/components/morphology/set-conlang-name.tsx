import { useStore } from "@nanostores/react";
import { persistentAtom } from "@nanostores/persistent";
import { KeyReturnIcon } from "@phosphor-icons/react";
import type { SubmitEvent } from "react";
import { PAGES } from "../../constants";
import { $progress } from "../../stores/progress";
import { Button } from "../button";
import { InteractiveBlock } from "../interactive-block";

const $conlangName = persistentAtom("interactive-conlang-name", "");
export const resetConlangName = () => $conlangName.set("");

export function SetConlangName() {
  const conlangName = useStore($conlangName);

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    $progress.setKey(PAGES.morphology, 1);
  };

  return (
    <InteractiveBlock>
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
          <KeyReturnIcon weight="duotone" />
        </Button>
      </form>
      <p className="text-xs italic text-foreground-400 text-center mb-1">
        You can always change this later.
      </p>
    </InteractiveBlock>
  );
}
