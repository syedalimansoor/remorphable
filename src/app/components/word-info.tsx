import { BadgeCheck } from "lucide-react";
import { usePlacedAffixes } from "../stores/placed-affixes";
import { wordList } from "@/features/words";

function WordInfo() {
  const { prefix, root, suffix } = usePlacedAffixes();
  const isWordComplete = prefix && root && suffix;

  if (!isWordComplete) {
    return null;
  }

  const word = wordList.find(
    (w) =>
      w.affixes.prefixId === prefix.id &&
      w.affixes.rootId === root.id &&
      w.affixes.suffixId === suffix.id
  );

  if (!word) {
    return (
      <div className="border border-foreground rounded-lg p-4 flex flex-col gap-4 max-w-128">
        <h3 className="text-xl">
          {prefix.value}
          {root.value}
          {suffix.value}
        </h3>
        <p>That word does not exist.</p>
      </div>
    );
  }

  return (
    <div className="border border-foreground rounded-lg p-4 flex flex-col gap-4 min-w-96 max-w-128">
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center gap-2">
          <h3 className="text-xl">{word.form}</h3>
          <span className="text-sm italic ml-auto">tis a real word</span>
          <BadgeCheck size={16} />
        </div>
        <span className="font-display text-sm">{word.ipa}</span>
      </div>
      <div className="flex flex-col gap-2">
        <span className="bg-foreground text-background self-start px-2">
          {word.partsOfSpeech.join(", ")}
        </span>
        <p className="leading-snug">{word.definition}</p>
      </div>
    </div>
  );
}
export default WordInfo;
