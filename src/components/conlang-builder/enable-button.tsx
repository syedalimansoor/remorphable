import { showConlangBuilder } from "../../stores/conlang-builder";

export function EnableConlangBuilderButton() {
  return (
    <button
      type="button"
      className="cursor-pointer font-bold underline"
      onClick={showConlangBuilder}
    >
      Click here
    </button>
  );
}
