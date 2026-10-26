import { ArrowCounterClockwiseIcon } from "@phosphor-icons/react";
import { $progress, initialProgress } from "../stores/progress";

export function ResetProgressButton() {
  return (
    <button
      className="text-xs text-foreground-400 cursor-pointer p-1 inline-flex gap-2 items-center"
      onClick={() => $progress.set(initialProgress)}
    >
      <ArrowCounterClockwiseIcon />
      Reset progress
    </button>
  );
}
