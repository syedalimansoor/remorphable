import { $englishToolkitEnabled } from "../../stores/english-toolkit";

export function EnableEnglishToolkitButton() {
  return (
    <button
      type="button"
      className="cursor-pointer font-bold underline"
      onClick={() => $englishToolkitEnabled.set(true)}
    >
      Click here
    </button>
  );
}
