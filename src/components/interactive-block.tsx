import { cn } from "cn";
import type { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  isCompleted?: boolean;
  isCorrect?: boolean;
  feedbackMessage?: string;
};

export function InteractiveBlock({
  children,
  isCompleted = false,
  isCorrect = true,
  feedbackMessage,
}: Props) {
  const showFeedback = isCompleted && !isCorrect && feedbackMessage;

  return (
    <section className="my-8 animate-slide-in">
      <div
        className={cn(
          "rounded-xl bg-background-200 px-6 py-5 transition-all outline-rose-400",
          {
            "outline-2 outline-rose-400 shadow-md shadow-rose-200 animate-wiggle":
              isCompleted && !isCorrect,
          },
        )}
      >
        {children}
      </div>
      {showFeedback && (
        <p
          className="mt-5 rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-900"
          role="status"
        >
          Try again! Here's a hint: {feedbackMessage}
        </p>
      )}
    </section>
  );
}
