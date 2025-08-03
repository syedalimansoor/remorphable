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
        {
          "hover:bg-prefix": affix.type === "prefix",
          "hover:bg-root": affix.type === "root",
          "hover:bg-suffix": affix.type === "suffix",
        },
        className
      )}
      {...props}
    >
      {affix.label}
    </span>
  );
}
export default Affix;
