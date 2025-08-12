import { useStore } from "@nanostores/react";
import { $isAnyAffixPlaced } from "../stores/placed-affixes";

function Tip() {
  const isAnyAffixPlaced = useStore($isAnyAffixPlaced);

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
