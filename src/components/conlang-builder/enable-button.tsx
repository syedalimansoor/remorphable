import { showConlangBuilder } from "../../stores/conlang-builder";

export function EnableConlangBuilderButton() {
  return (
    <button
      type="button"
      className="cursor-pointer font-bold underline"
      onClick={showConlangBuilder}
    >
      Open the Conlang Builder
    </button>
  );
}
