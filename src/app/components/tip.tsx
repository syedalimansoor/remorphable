import { useStore } from "@nanostores/react";
import { $isAnyAffixPlaced, $isWordComplete } from "../stores/placed-affixes";

function Tip() {
  const isWordComplete = useStore($isWordComplete);
  const isAnyAffixPlaced = useStore($isAnyAffixPlaced);

  if (isWordComplete) return null;

  return (
    <span className="text-center">
      {!isAnyAffixPlaced
        ? "Start building a word by dragging a prefix!"
        : "Keep adding affixes to complete your word."}
      <br />
    </span>
  );
}
export default Tip;
