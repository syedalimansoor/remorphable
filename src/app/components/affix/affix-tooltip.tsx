import { $hoveringAffix } from "@/app/stores/hovering-affix";
import {
  autoUpdate,
  flip,
  offset,
  shift,
  useClientPoint,
  useFloating,
  useInteractions,
} from "@floating-ui/react";
import { useStore } from "@nanostores/react";
import { motion } from "motion/react";

function AffixTooltip() {
  const hoveringAffix = useStore($hoveringAffix);

  const { refs, floatingStyles, context } = useFloating({
    open: true,
    middleware: [offset(15), shift(), flip()],
    whileElementsMounted: autoUpdate,
  });

  const clientPoint = useClientPoint(context);
  const { getFloatingProps } = useInteractions([clientPoint]);

  if (!hoveringAffix) return null;

  return (
    <motion.div
      ref={refs.setFloating}
      className="pointer-events-none bg-background border border-popover-border py-2 px-3 rounded-xs max-w-96 flex flex-col gap-2 shadow-lg"
      style={floatingStyles}
      {...getFloatingProps()}
    >
      <span className="font-display font-bold">{hoveringAffix.label}</span>
      <span>{hoveringAffix.definition}</span>
      <span className="italic">eg: {hoveringAffix.examples.join(", ")}</span>
    </motion.div>
  );
}
export default AffixTooltip;
