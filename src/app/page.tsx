"use client";

import { DndContext, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import AffixPanels from "./components/affix-panels";
import BeginningTip from "./components/beginning-tip";
import Logo from "./components/logo";
import Tagline from "./components/tagline";
import WordBreakdown from "./components/word-breakdown";
import WordInfo from "./components/word-info";
import { useMemo, useState } from "react";
import { prefixList, rootList, suffixList } from "@/features/affix";
import Affix from "./components/affix/affix";

const affixList = [...prefixList, ...rootList, ...suffixList];

export default function Home() {
  const [draggingAffixId, setDraggingAffixId] = useState<string | null>(null);
  const draggingAffix = useMemo(() => {
    if (!draggingAffixId) return null;
    return affixList.find((affix) => affix.id === draggingAffixId) ?? null;
  }, [draggingAffixId]);

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
            <BeginningTip />
          </div>
        </div>
        <AffixPanels className="row-start-2 row-span-2 col-span-full grid grid-rows-subgrid grid-cols-subgrid" />
        <div className="row-start-2 col-start-2 place-items-center">
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

  function handleDragEnd() {
    setDraggingAffixId(null);
  }
}
