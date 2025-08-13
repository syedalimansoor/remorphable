"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import { AffixType, type Affix as TAffix } from "@/features/affix";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { DraggableAffix } from "@/app/components/affix/draggable-affix";
import { useStore } from "@nanostores/react";
import { type Atom } from "nanostores";
import { Button } from "@/components/ui/button";

type Props = {
  className?: string;
  title: string;
  placeholder: string;
  affixStore: Atom<TAffix[]>;
  filterAffixes: (search: string) => void;
} & (
  | { combined?: false }
  | {
      combined: true;
      affixType: AffixType;
      setAffixType: (type: AffixType) => void;
    }
);

function Panel(props: Props) {
  const { className, title, placeholder, affixStore, filterAffixes } = props;

  const affixes = useStore(affixStore);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value);
      filterAffixes(event.target.value);
    },
    [filterAffixes]
  );

  const setAffixType = (type: AffixType) => {
    if (props.combined) {
      props.setAffixType(type);
    }
  };

  useEffect(() => {
    filterAffixes(searchValue);
  }, [searchValue, filterAffixes, props.combined && props.affixType]);

  return (
    <div
      className={cn(
        "bg-foreground text-background p-6 lg:p-8 pb-0! flex flex-col gap-6 rounded-t-2xl md:first:rounded-tl-none md:last:rounded-tr-none",
        className
      )}
    >
      <header className="flex flex-col gap-6">
        <div className="flex justify-between items-center gap-4">
          <h2 className="text-xl lg:text-2xl">{title}</h2>
          {props.combined && (
            <div className="flex gap-4">
              <Button
                className={cn(
                  "bg-foreground text-background ring hover:bg-prefix hover:text-foreground",
                  {
                    "bg-prefix text-foreground ring-prefix":
                      props.affixType === "prefix",
                  }
                )}
                onClick={() => setAffixType("prefix")}
              >
                PRE
              </Button>
              <Button
                className={cn(
                  "bg-foreground text-background ring hover:bg-root hover:text-foreground",
                  {
                    "bg-root text-foreground ring-root":
                      props.affixType === "root",
                  }
                )}
                onClick={() => setAffixType("root")}
              >
                ROOT
              </Button>
              <Button
                className={cn(
                  "bg-foreground text-background ring hover:bg-suffix hover:text-foreground",
                  {
                    "bg-suffix text-foreground ring-suffix":
                      props.affixType === "suffix",
                  }
                )}
                onClick={() => setAffixType("suffix")}
              >
                SUF
              </Button>
            </div>
          )}
        </div>
        <Input
          placeholder={placeholder}
          icon={<Search size={16} />}
          value={searchValue}
          onChange={handleSearchChange}
        />
      </header>
      <ScrollArea className="overflow-auto min-h-24">
        <div className="flex gap-3 flex-wrap p-1 pb-6">
          {affixes.map((affix) => (
            <DraggableAffix key={affix.id} affix={affix} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

export default Panel;
