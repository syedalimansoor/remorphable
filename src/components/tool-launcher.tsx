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
      className="absolute right-4 top-4 z-10 flex flex-col items-end gap-2"
    >
      {englishEnabled && (
        <button
          type="button"
          onClick={showEnglishToolkit}
          className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-background-300 px-3 py-2 text-sm font-semibold text-foreground-500 transition-colors hover:bg-background-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500"
          aria-label="Show English toolkit"
        >
          English toolkit
          <BriefcaseIcon size={18} weight="duotone" />
        </button>
      )}
      {conlangEnabled && (
        <button
          type="button"
          onClick={showConlangBuilder}
          className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-blue-100 px-3 py-2 text-sm font-semibold text-blue-500 transition-colors hover:bg-blue-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500"
          aria-label="Show conlang builder"
        >
          Conlang builder
          <PencilRulerIcon size={18} weight="duotone" />
        </button>
      )}
    </nav>
  );
}
