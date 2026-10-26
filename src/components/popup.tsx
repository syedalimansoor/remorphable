import {
  offset,
  safePolygon,
  useFloating,
  useHover,
  useInteractions,
  useTransitionStyles,
} from "@floating-ui/react";
import { cn } from "cn";
import { useState, type ReactNode } from "react";

export function Popup({
  children,
  triggerText,
}: {
  children: ReactNode;
  triggerText: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "top",
    middleware: [offset(8)],
  });

  const hover = useHover(context, {
    delay: { open: 50, close: 0 },
    handleClose: safePolygon(),
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  const { isMounted, styles } = useTransitionStyles(context, {
    initial: ({}) => ({
      opacity: 0,
      translate: "0 10px",
    }),
  });

  return (
    <span>
      <span
        ref={refs.setReference}
        {...getReferenceProps()}
        className={cn(
          "text-teal-500 font-bold underline decoration-dotted cursor-pointer hover:bg-teal-100",
          isOpen && "bg-teal-100",
        )}
      >
        {triggerText}
      </span>
      {isMounted && (
        <span
          ref={refs.setFloating}
          style={{ ...floatingStyles, ...styles }}
          {...getFloatingProps()}
          className="bg-background-100 border rounded-md p-4 text-xs max-w-72 flex flex-col gap-2"
        >
          {children}
        </span>
      )}
    </span>
  );
}
