import { useStore } from "@nanostores/react";
import type { ReactNode } from "react";
import type { Page } from "../constants";
import { $progress } from "../stores/progress";

export function WaitUntil({
  progress,
  page,
  children,
}: {
  progress: number;
  page: Page;
  children?: ReactNode;
}) {
  const currentProgress = useStore($progress)[page];

  if (currentProgress < progress) return null;

  return <>{children}</>;
}
