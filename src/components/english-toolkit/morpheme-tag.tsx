import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
  useTransitionStyles,
} from "@floating-ui/react";
import { useState } from "react";
import type { MorphemeTag } from "../../data/english-words";

const tagDefinitions: Record<MorphemeTag, string> = {
  BOUND:
    "A bound morpheme cannot stand alone as an independent word and must be attached to another morpheme to convey meaning.",
  FREE: "A free morpheme can stand alone as an independent word and carry meaning.",
  PREFIX: "A prefix is a bound morpheme attached to the beginning of a base.",
  BASE: "A base is the central part of a word that carries its core meaning.",
  SUFFIX: "A suffix is a bound morpheme attached to the end of a base.",
  INFLECTIONAL:
    "An inflectional morpheme adds grammatical information without changing a word's core meaning or part of speech.",
  DERIVATIONAL:
    "A derivational morpheme creates a new word or changes its meaning or part of speech.",
};

export function MorphemeTagBadge({
  tag,
  label,
  icon,
}: {
  tag: MorphemeTag;
  label: string;
  icon: string;
}) {
  const [open, setOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: "top",
    middleware: [offset(12), flip(), shift({ padding: 12 })],
    whileElementsMounted: autoUpdate,
  });
  const hover = useHover(context);
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);
  const { isMounted, styles } = useTransitionStyles(context, {
    initial: { opacity: 0, translate: "0 10px" },
  });

  return (
    <>
      <span
        ref={refs.setReference}
        {...getReferenceProps()}
        tabIndex={0}
        className="inline-flex cursor-help items-center gap-1 rounded-sm bg-teal-500 px-1.5 py-1 text-xs font-bold leading-none text-teal-100"
      >
        <img src={icon} alt="" aria-hidden="true" className="size-4" />
        {label}
      </span>
      {isMounted && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={{ ...floatingStyles, ...styles }}
            {...getFloatingProps()}
            className="z-50 max-w-xs rounded-xl border-2 border-background-600 bg-background-700 px-3 py-2 text-left text-xs leading-snug text-white shadow-lg"
          >
            {tagDefinitions[tag]}
          </div>
        </FloatingPortal>
      )}
    </>
  );
}
