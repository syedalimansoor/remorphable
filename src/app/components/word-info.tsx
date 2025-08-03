import { BadgeCheck } from "lucide-react";

function WordInfo() {
  return (
    <div className="border border-foreground rounded-lg p-4 flex flex-col gap-4 max-w-128">
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center gap-2">
          <h3 className="text-xl">destruction</h3>
          <span className="text-sm italic ml-auto">tis a real word</span>
          <BadgeCheck size={16} />
        </div>
        <span className="font-display text-sm">/dəˈstrəkSH(ə)n/</span>
      </div>
      <div className="flex flex-col gap-2">
        <span className="bg-foreground text-background self-start px-2">
          noun
        </span>
        <p className="leading-snug">
          the action or process of causing so much damage to something that it
          no longer exists or cannot be repaired
        </p>
      </div>
    </div>
  );
}
export default WordInfo;
