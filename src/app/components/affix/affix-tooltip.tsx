import { Affix } from "@/features/affix";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { ComponentProps } from "react";

type Props = ComponentProps<"div"> & {
  affix: Affix;
};

function AffixTooltip({ className, affix, ...props }: Props) {
  return (
    <div {...props} className="pointer-events-none">
      <motion.div
        layout="position"
        transition={{ type: "spring", duration: 0.5 }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={cn(
          "bg-background text-foreground border-2 border-popover-border py-2 px-3 rounded-sm max-w-96 flex flex-col gap-2 shadow-lg",
          className
        )}
      >
        <span className="font-display font-bold">{affix.label}</span>
        <div>
          <div>{affix.definition}</div>
          <div className="italic">eg: {affix.examples.join(", ")}</div>
        </div>
      </motion.div>
    </div>
  );
}
export default AffixTooltip;
