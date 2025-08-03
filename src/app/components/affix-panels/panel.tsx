"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import { type Affix as AffixType } from "@/features/affix";
import { ChangeEvent, useState } from "react";
import { DraggableAffix } from "@/app/components/affix/draggable-affix";
import { useStore } from "@nanostores/react";
import { type Atom } from "nanostores";

type Props = {
  className?: string;
  title: string;
  message: string;
  placeholder: string;
  affixStore: Atom<AffixType[]>;
  filterAffixes: (search: string) => void;
};

function Panel({
  className,
  title,
  message,
  placeholder,
  affixStore,
  filterAffixes,
}: Props) {
  const affixes = useStore(affixStore);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    filterAffixes(event.target.value);
  };

  return (
    <div
      className={cn(
        "bg-foreground text-background p-8 flex flex-col gap-6 rounded-t-2xl first:rounded-tl-none last:rounded-tr-none min-h-0",
        className
      )}
    >
      <header className="flex flex-col gap-2">
        <h2 className="text-2xl">{title}</h2>
        <Input
          placeholder={placeholder}
          icon={<Search size={16} />}
          value={searchValue}
          onChange={handleSearchChange}
        />
      </header>
      <ScrollArea className="overflow-auto">
        <div className="flex gap-3 flex-wrap">
          {affixes.map((affix) => (
            <DraggableAffix key={affix.id} affix={affix} />
          ))}
        </div>
      </ScrollArea>
      <p className="mt-auto mr-4 text-sm">{message}</p>
    </div>
  );
}

export default Panel;
