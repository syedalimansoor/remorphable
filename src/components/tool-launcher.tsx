import { useStore } from "@nanostores/react";
import { BriefcaseIcon, PencilRulerIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import {
  $activeTool,
  $conlangBuilderEnabled,
  showConlangBuilder,
  showEnglishToolkit,
} from "../stores/conlang-builder";
import { $englishToolkitEnabled } from "../stores/english-toolkit";

export function ToolLauncher() {
  const [hasMounted, setHasMounted] = useState(false);
  const activeTool = useStore($activeTool);
  const conlangEnabled = useStore($conlangBuilderEnabled);
  const englishEnabled = useStore($englishToolkitEnabled);

  useEffect(() => setHasMounted(true), []);

  if (
    !hasMounted ||
    activeTool !== null ||
    (!conlangEnabled && !englishEnabled)
  ) {
    return null;
  }

  return (
    <nav
      aria-label="Available toolkits"
      className="absolute right-4 top-4 z-10 flex flex-col items-end gap-1"
    >
      {englishEnabled && (
        <button
          type="button"
          onClick={showEnglishToolkit}
          className="inline-flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-xs text-foreground-400 transition-colors hover:text-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          aria-label="Show English toolkit"
        >
          English toolkit
          <BriefcaseIcon size={16} weight="duotone" />
        </button>
      )}
      {conlangEnabled && (
        <button
          type="button"
          onClick={showConlangBuilder}
          className="inline-flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-xs text-foreground-400 transition-colors hover:text-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          aria-label="Show conlang builder"
        >
          Conlang builder
          <PencilRulerIcon size={16} weight="duotone" />
        </button>
      )}
    </nav>
  );
}
