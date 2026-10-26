import { $progress, initialProgress } from "../stores/progress";

export function ResetProgressButton() {
  return (
    <button
      className="text-xs text-foreground-400 cursor-pointer px-2 py-1"
      onClick={() => $progress.set(initialProgress)}
    >
      Reset progress
    </button>
  );
}
