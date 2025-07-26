import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Affix from "./affix";

type Props = {
  className?: string;
  title: string;
  message: string;
};

function Panel({ className, title, message }: Props) {
  return (
    <div
      className={cn(
        "bg-foreground text-background p-8 flex flex-col gap-6 rounded-t-2xl first:rounded-tl-none last:rounded-tr-none",
        className
      )}
    >
      <header className="flex flex-col gap-2">
        <h2 className="text-2xl">{title}</h2>
        <Input />
      </header>
      <div className="flex gap-3 flex-wrap">
        <Affix />
        <Affix />
        <Affix />
        <Affix />
        <Affix />
        <Affix />
      </div>
      <p className="mt-auto mr-4 text-sm">{message}</p>
    </div>
  );
}
export default Panel;
