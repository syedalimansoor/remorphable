import type { Affix as AffixType } from "@/features/affix";

type Props = {
  affix: AffixType;
};

function Affix({ affix }: Props) {
  return (
    <span className="bg-background text-foreground px-2 py-1 rounded-sm">
      {affix.label}
    </span>
  );
}
export default Affix;
