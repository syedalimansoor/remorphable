import { KeyReturnIcon } from "@phosphor-icons/react";
import { useState, type SubmitEvent } from "react";
import { PAGES } from "../../constants";
import { $progress } from "../../stores/progress";
import { Button } from "../button";
import { InteractiveBlock } from "../interactive-block";

export function CompleteSentence() {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    if (!inputValue.trim().toLowerCase().includes("splinch")) return;
    $progress.setKey(PAGES.morphology, 2);
  };

  return (
    <InteractiveBlock>
      <p className="leading-loose">
        Last night, the clumsy burglar{" "}
        <form className="inline-block relative mx-1" onSubmit={handleSubmit}>
          <input
            className="leading-normal w-36 bg-background-100 px-2 py-1 rounded-md outline-none outline-transparent transition-shadow ring-teal-100 focus:ring-3 selection:bg-teal-500"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button
            className="absolute inset-y-1 right-1 rounded-sm px-2"
            variant="teal"
          >
            <KeyReturnIcon weight="duotone" size={12} />
          </Button>
        </form>{" "}
        on a broken window pane, leaving a trail of bloody footprints across the
        floor.
      </p>
    </InteractiveBlock>
  );
}
