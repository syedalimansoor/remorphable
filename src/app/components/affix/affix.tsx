import type { Affix as AffixType } from "@/features/affix";
import { ComponentProps } from "react";

type Props = ComponentProps<"span"> & {
  affix: AffixType;
};

function Affix({ affix, ...props }: Props) {
  return (
    <span
      className="block bg-background text-foreground px-2 py-1 rounded-sm select-none"
      {...props}
    >
      {affix.label}
    </span>
  );
}
export default Affix;
