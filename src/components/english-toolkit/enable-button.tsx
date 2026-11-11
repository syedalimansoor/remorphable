import { showEnglishToolkit } from "../../stores/conlang-builder";

export function EnableEnglishToolkitButton() {
  return (
    <button
      type="button"
      className="cursor-pointer font-bold underline"
      onClick={showEnglishToolkit}
    >
      Click here
    </button>
  );
}
