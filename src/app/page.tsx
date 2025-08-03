"use client";

import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import AffixPanels from "./components/affix-panels";
import BeginningTip from "./components/beginning-tip";
import Logo from "./components/logo";
import Tagline from "./components/tagline";
import WordBreakdown from "./components/word-breakdown";
import WordInfo from "./components/word-info";
import { useMemo, useState } from "react";
import {
  type Affix as AffixType,
  prefixList,
  rootList,
  suffixList,
} from "@/features/affix";
import Affix from "./components/affix/affix";
import { $isWordComplete, placeAffix } from "./stores/placed-affixes";
import { useStore } from "@nanostores/react";

const affixList = [...prefixList, ...rootList, ...suffixList];

export default function Home() {
  const [draggingAffixId, setDraggingAffixId] = useState<string | null>(null);
  const draggingAffix = useMemo(() => {
    if (!draggingAffixId) return null;
    return affixList.find((affix) => affix.id === draggingAffixId) ?? null;
  }, [draggingAffixId]);

  const isWordComplete = useStore($isWordComplete);

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="h-svh grid grid-cols-[2fr_3fr_2fr] grid-rows-[auto_auto_1fr] gap-20 pt-12">
        <div className="col-span-full place-self-center flex flex-col items-center gap-16">
          <div className="flex flex-col items-center gap-2">
            <Logo />
            <Tagline />
          </div>
          <div className="flex flex-col items-center gap-8">
            <WordBreakdown />
            {!isWordComplete && <BeginningTip />}
          </div>
        </div>
        <AffixPanels className="row-start-2 row-span-2 col-span-full grid grid-rows-subgrid grid-cols-subgrid" />
        <div className="row-start-2 col-start-2 place-items-center empty:h-24">
          <WordInfo />
        </div>
      </div>

      <DragOverlay dropAnimation={null} className="cursor-grabbing">
        {draggingAffix ? <Affix affix={draggingAffix} /> : null}
      </DragOverlay>
    </DndContext>
  );

  function handleDragStart(event: DragStartEvent) {
    const affixId = event.active.id as string;
    setDraggingAffixId(affixId);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && over.data.current?.type === "droppable") {
      const affix = active.data.current?.affix as AffixType;

      if (affix.type === over.data.current.affixType) {
        setTimeout(() => placeAffix(affix.type, affix), 0);
      }
    }

    setDraggingAffixId(null);
  }
}
