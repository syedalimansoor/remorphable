"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import { type Affix as AffixType } from "@/features/affix";
import Affix from "./affix";
import { ChangeEvent, useMemo, useState } from "react";
import { v4 as uuid } from "uuid";

type Props = {
  className?: string;
  title: string;
  message: string;
  placeholder: string;
  affixes: AffixType[];
};

function Panel({ className, title, message, placeholder, affixes }: Props) {
  const [searchValue, setSearchValue] = useState("");

  const filteredAffixes = useMemo(() => {
    return affixes.filter((affix) =>
      affix.value.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue, affixes]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
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
          {filteredAffixes.map((affix) => (
            <Affix key={uuid()} affix={affix} />
          ))}
        </div>
      </ScrollArea>
      <p className="mt-auto mr-4 text-sm">{message}</p>
    </div>
  );
}
export default Panel;
