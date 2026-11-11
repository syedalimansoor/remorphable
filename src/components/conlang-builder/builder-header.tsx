import {
  ArrowLineRightIcon,
  CheckIcon,
  PencilSimpleIcon,
} from "@phosphor-icons/react";
import type { FormEvent } from "react";

export function BuilderHeader({
  conlangName,
  nameDraft,
  editingName,
  onNameDraftChange,
  onEditName,
  onSaveName,
  onCollapse,
}: {
  conlangName: string;
  nameDraft: string;
  editingName: boolean;
  onNameDraftChange: (value: string) => void;
  onEditName: () => void;
  onSaveName: (event: FormEvent<HTMLFormElement>) => void;
  onCollapse: () => void;
}) {
  return (
    <header className="relative flex h-6 shrink-0 items-center justify-between gap-2 text-blue-300">
      <button
        type="button"
        onClick={onCollapse}
        className="cursor-pointer rounded p-1 transition-colors hover:text-blue-100"
        aria-label="Collapse conlang builder"
        title="Collapse conlang builder"
      >
        <ArrowLineRightIcon size={16} weight="duotone" />
      </button>
      <h2 className="absolute left-1/2 -translate-x-1/2 text-xs font-bold">
        CONLANG BUILDER
      </h2>
      <div className="flex items-center gap-2">
        {editingName ? (
          <form onSubmit={onSaveName} className="flex items-center gap-1">
            <label className="sr-only" htmlFor="conlang-builder-name">
              Conlang name
            </label>
            <input
              id="conlang-builder-name"
              autoFocus
              value={nameDraft}
              onChange={(event) => onNameDraftChange(event.target.value)}
              className="w-28 rounded bg-blue-700 px-2 py-1 text-xs text-blue-100 outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button
              type="submit"
              aria-label="Save conlang name"
              className="cursor-pointer rounded p-1 hover:bg-blue-600"
            >
              <CheckIcon size={14} weight="bold" />
            </button>
          </form>
        ) : (
          <button
            type="button"
            onClick={onEditName}
            className="inline-flex cursor-pointer items-center gap-2 rounded px-1 py-1 text-xs font-bold uppercase text-blue-100 hover:bg-blue-600"
            aria-label="Edit conlang name"
          >
            <PencilSimpleIcon size={14} />
            <span>{conlangName || "Your language"}</span>
          </button>
        )}
      </div>
    </header>
  );
}
