import type { Affix as AffixType } from "@/features/affix";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

type Props = ComponentProps<"span"> & {
  affix: AffixType;
};

function Affix({ affix, className, ...props }: Props) {
  return (
    <span
      className={cn(
        "block bg-background text-foreground px-2 py-1 rounded-sm select-none",
        className
      )}
      {...props}
    >
      {affix.label}
    </span>
  );
}
export default Affix;
