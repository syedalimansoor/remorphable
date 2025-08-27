import { KeyframeResolverParameters } from "@dnd-kit/core/dist/components/DragOverlay/hooks/useDropAnimation";
import { media } from "../stores/media";

/** Custom drop animation which animates the drag overlay:
 * 1. to the center of the droppable container being dropped over, scaling it up and fading it out
 * 2. back to its initial position if not dropped over a droppable container */
export function createDropAnimationKeyframeResolver({
  active,
  dragOverlay,
  droppableContainers,
  transform: { initial },
}: KeyframeResolverParameters): Keyframe[] {
  // Find the droppable container being dropped over
  const overContainer = droppableContainers.toArray().find((container) => {
    if (!container.rect.current) {
      return false;
    }

    // Return found if the center of the drag overlay is within the bounds of
    // the droppable container, with some margin for better UX
    const centerX = dragOverlay.rect.left + dragOverlay.rect.width / 2;
    const centerY = dragOverlay.rect.top + dragOverlay.rect.height / 2;
    const MARGIN = 15;

    return (
      centerX >= container.rect.current.left - MARGIN &&
      centerX <= container.rect.current.right + MARGIN &&
      centerY >= container.rect.current.top - MARGIN &&
      centerY <= container.rect.current.bottom + MARGIN
    );
  });

  // Animate back to the initial position if not over a droppable container
  if (!overContainer)
    return [{}, { transform: "translate3d(0,0,0) scale(0.7)" }];

  // Animate back to the initial position if over a droppable container
  // not of the same type as the affix being dragged
  if (
    overContainer.data.current?.affixType !== active.data.current?.affix.type
  ) {
    return [{}, { transform: "translate3d(0,0,0) scale(0.7)" }];
  }

  const overRect = overContainer.rect.current;
  if (!overRect) return [{}, {}];

  // Animate the drag overlay to the center of the droppable container
  // and scale it to the same size as the droppable container
  // 1. Calculate the center position of the droppable container
  const x = overRect.left + overRect.width / 2;
  const y = overRect.top + overRect.height / 2;

  // 2. Calculate the offset needed to move the drag overlay to the center of the droppable container
  const offsetX = x - (dragOverlay.rect.left + dragOverlay.rect.width / 2);
  const offsetY = y - (dragOverlay.rect.top + dragOverlay.rect.height / 2);

  // 3. Add this offset to the initial transform of the drag overlay
  const finalX = initial.x + offsetX;
  const finalY = initial.y + offsetY;

  let scale = 3;
  if (media.get().isTablet) scale = 2.5;
  if (media.get().isMobile) scale = 1.5;

  return [
    {},
    {
      composite: "replace",
      transform: `translate3d(${finalX}px, ${finalY}px, 0) scale(${scale})`,
      opacity: 0,
    },
  ];
}
