import { useStore } from "@nanostores/react";
import type { ReactNode } from "react";
import type { Page } from "../constants";
import { $progress } from "../stores/progress";
import { LessonConcepts } from "./concept-bank";

export function WaitUntil({
  progress,
  page,
  children,
  concepts,
}: {
  progress: number;
  page: Page;
  children?: ReactNode;
  concepts?: string[];
}) {
  const currentProgress = useStore($progress)[page];

  if (currentProgress < progress) return null;

  return (
    <>
      {concepts && <LessonConcepts concepts={concepts} />}
      {children}
    </>
  );
}
