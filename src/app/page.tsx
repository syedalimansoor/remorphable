"use client";

import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import AffixPanels from "./components/affix-panels";
import Tip from "./components/tip";
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
import { flip, offset, shift, useFloating } from "@floating-ui/react";
import { $hoveredAffix } from "./stores/hovered-affix";
import AffixTooltip from "./components/affix/affix-tooltip";
import { AnimatePresence } from "motion/react";

const affixList = [...prefixList, ...rootList, ...suffixList];

export default function Home() {
  const [draggedAffixId, setDraggedAffixId] = useState<string | null>(null);

  const draggedAffix = useMemo(() => {
    if (!draggedAffixId) return null;
    return affixList.find((affix) => affix.id === draggedAffixId) ?? null;
  }, [draggedAffixId]);

  const isWordComplete = useStore($isWordComplete);

  const hoveredAffix = useStore($hoveredAffix);
  const { refs, floatingStyles } = useFloating({
    elements: {
      reference: hoveredAffix?.element,
    },
    middleware: [offset(5), shift(), flip()],
  });

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="min-h-lvh grid md:grid-cols-[2fr_3fr_2fr] grid-rows-[auto_auto_auto] gap-12 lg:gap-x-20 pt-12">
        <div className="col-span-full justify-self-center flex flex-col items-center justify-between gap-16">
          <div className="flex flex-col items-center gap-2 text-center px-8">
            <Logo />
            <Tagline />
          </div>
          <div className="flex flex-col items-center gap-8 px-8">
            <WordBreakdown />
            {!isWordComplete && <Tip />}
          </div>
        </div>
        <div className="row-start-2 md:col-start-2 place-items-center empty:h-0 md:empty:h-24 px-8">
          <WordInfo />
        </div>
        <AffixPanels className="md:row-start-2 md:row-span-2 col-span-full grid grid-rows-subgrid grid-cols-subgrid" />
      </div>

      <DragOverlay dropAnimation={null} className="cursor-grabbing">
        <AnimatePresence>
          {draggedAffix ? (
            <Affix affix={draggedAffix} className="cursor-grabbing" dragging />
          ) : null}
        </AnimatePresence>
      </DragOverlay>

      <div className="absolute top-0 left-0 h-screen w-screen pointer-events-none overflow-clip">
        <AnimatePresence>
          {!!hoveredAffix && (
            <AffixTooltip
              affix={hoveredAffix.affix}
              ref={refs.setFloating}
              style={floatingStyles}
            />
          )}
        </AnimatePresence>
      </div>
    </DndContext>
  );

  function handleDragStart(event: DragStartEvent) {
    const affixId = event.active.id as string;
    setDraggedAffixId(affixId);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && over.data.current?.type === "droppable") {
      const affix = active.data.current?.affix as AffixType;

      if (affix.type === over.data.current.affixType) {
        setTimeout(() => placeAffix(affix.type, affix), 0);
      }
    }

    setDraggedAffixId(null);
  }
}
