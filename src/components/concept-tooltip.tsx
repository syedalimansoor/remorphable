import {
  autoUpdate,
  offset,
  safePolygon,
  useFloating,
  useHover,
  useInteractions,
  useTransitionStyles,
} from "@floating-ui/react";
import { useState, type ReactNode } from "react";

export function ConceptTooltip({
  children,
  content,
  className,
}: {
  children: ReactNode;
  content: ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: "right",
    middleware: [offset(8)],
    whileElementsMounted: autoUpdate,
  });
  const hover = useHover(context, {
    delay: { open: 50, close: 0 },
    handleClose: safePolygon(),
  });
  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);
  const { isMounted, styles } = useTransitionStyles(context, {
    initial: { opacity: 0, translate: "-5px 0" },
  });

  return (
    <>
      <li
        ref={refs.setReference}
        {...getReferenceProps()}
        className={className}
      >
        {children}
      </li>
      {isMounted && (
        <span
          ref={refs.setFloating}
          style={{ ...floatingStyles, ...styles }}
          {...getFloatingProps()}
          className="z-10 flex w-52 flex-col gap-1 rounded-md border bg-background-100 p-3 text-xs shadow-sm"
        >
          {content}
        </span>
      )}
    </>
  );
}
