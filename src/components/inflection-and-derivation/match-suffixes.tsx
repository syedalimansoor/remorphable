import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent,
} from "react";
import { persistentMap } from "@nanostores/persistent";
import { useStore } from "@nanostores/react";
import { PAGES } from "../../constants";
import { $progress } from "../../stores/progress";
import { InteractiveBlock } from "../interactive-block";

type Source = "es" | "er";
type Target = "derivation" | "inflection";
type Point = { x: number; y: number };

const sourcePoints: Record<Source, Point> = {
  es: { x: 94, y: 30 },
  er: { x: 94, y: 110 },
};

const targetPoints: Record<Target, Point> = {
  derivation: { x: 220, y: 26 },
  inflection: { x: 220, y: 110 },
};

const correctConnections: Record<Source, Target> = {
  es: "inflection",
  er: "derivation",
};
const $suffixConnections = persistentMap<Record<Source, Target | null>>(
  "interactive-suffix-connections",
  { es: null, er: null },
  { encode: JSON.stringify, decode: (value) => JSON.parse(value) },
);
export const resetSuffixConnections = () =>
  $suffixConnections.set({ es: null, er: null });

function ConnectionPath({ from, to }: { from: Point; to: Point }) {
  const controlOffset = (to.x - from.x) * 0.45;
  return (
    <path
      d={`M ${from.x} ${from.y} C ${from.x + controlOffset} ${from.y}, ${to.x - controlOffset} ${to.y}, ${to.x} ${to.y}`}
      fill="none"
      stroke="#4b6f70"
      strokeWidth="2"
    />
  );
}

function ConnectionPoint({
  filled,
  side,
  pointRef,
}: {
  filled: boolean;
  side: "left" | "right";
  pointRef?: (element: HTMLSpanElement | null) => void;
}) {
  return (
    <span
      ref={pointRef}
      className={`${side === "left" ? "-left-1.25" : "-right-1.25 cursor-pointer"} absolute top-1/2 size-2.5 -translate-y-1/2 rounded-full border-2 border-foreground-500 ${
        filled ? "bg-foreground-500" : "bg-background-100"
      }`}
    />
  );
}

export function MatchSuffixes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pointRefs = useRef<Record<string, HTMLSpanElement | null>>({});
  const connections = useStore($suffixConnections);
  const [points, setPoints] = useState({
    es: sourcePoints.es,
    er: sourcePoints.er,
    derivation: targetPoints.derivation,
    inflection: targetPoints.inflection,
  });
  const [dragging, setDragging] = useState<Source | null>(null);
  const [pointer, setPointer] = useState<Point | null>(null);

  const isCorrect =
    connections.es === correctConnections.es &&
    connections.er === correctConnections.er;

  useEffect(() => {
    if (isCorrect) $progress.setKey(PAGES.inflectionAndDerivation, 1);
  }, [isCorrect]);

  useLayoutEffect(() => {
    const measurePoints = () => {
      const bounds = containerRef.current?.getBoundingClientRect();
      if (!bounds) return;
      const scaleX = 760 / bounds.width;
      const scaleY = 140 / bounds.height;
      const measured = Object.fromEntries(
        Object.entries(pointRefs.current).map(([key, element]) => {
          const pointBounds = element?.getBoundingClientRect();
          return [
            key,
            pointBounds
              ? {
                  x:
                    (pointBounds.left + pointBounds.width / 2 - bounds.left) *
                    scaleX,
                  y:
                    (pointBounds.top + pointBounds.height / 2 - bounds.top) *
                    scaleY,
                }
              : undefined,
          ];
        }),
      );
      setPoints((current) => ({ ...current, ...measured }));
    };

    measurePoints();
    const observer = new ResizeObserver(measurePoints);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const getPoint = (
    event: PointerEvent<HTMLDivElement | HTMLButtonElement>,
  ) => {
    const bounds = containerRef.current?.getBoundingClientRect();
    if (!bounds) return null;
    return {
      x: ((event.clientX - bounds.left) / bounds.width) * 760,
      y: ((event.clientY - bounds.top) / bounds.height) * 140,
    };
  };

  const startDragging = (
    source: Source,
    event: PointerEvent<HTMLButtonElement>,
  ) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    $suffixConnections.setKey(source, null);
    setDragging(source);
    setPointer(getPoint(event));
  };

  const finishDragging = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const point = getPoint(event);
    const target = (Object.entries(targetPoints) as [Target, Point][]).find(
      ([, targetPoint]) =>
        point &&
        Math.abs(point.x - targetPoint.x) < 30 &&
        Math.abs(point.y - targetPoint.y) < 24,
    )?.[0];

    if (target) {
      $suffixConnections.setKey(dragging, target);
    }
    setDragging(null);
    setPointer(null);
  };

  return (
    <InteractiveBlock>
      <p className="mb-5 font-medium text-blue-500">
        Match each suffix to the linguistic function it is performing.
      </p>
      <div
        ref={containerRef}
        className="relative h-33 touch-none select-none overflow-hidden"
        onPointerMove={(event) => {
          if (dragging) setPointer(getPoint(event));
        }}
        onPointerUp={finishDragging}
        onPointerCancel={finishDragging}
      >
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 760 140"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {(Object.entries(connections) as [Source, Target | null][])
            .filter(([, target]) => target !== null)
            .map(([source, target]) => (
              <ConnectionPath
                key={source}
                from={points[source]}
                to={points[target as Target]}
              />
            ))}
          {dragging && pointer && (
            <ConnectionPath from={points[dragging]} to={pointer} />
          )}
        </svg>

        <button
          className="absolute left-0 top-3 rounded-md bg-teal-100 px-3 py-2 text-base text-teal-500"
          onPointerDown={(event) => startDragging("es", event)}
          aria-label="Connect teaches"
        >
          teach<span className="font-bold">es</span>
          <ConnectionPoint
            filled={Boolean(connections.es)}
            side="right"
            pointRef={(element) => {
              pointRefs.current.es = element;
            }}
          />
        </button>
        <button
          className="absolute left-0 top-21 rounded-md bg-teal-100 px-3 py-2 text-base text-teal-500"
          onPointerDown={(event) => startDragging("er", event)}
          aria-label="Connect teacher"
        >
          teach<span className="font-bold">er</span>
          <ConnectionPoint
            filled={Boolean(connections.er)}
            side="right"
            pointRef={(element) => {
              pointRefs.current.er = element;
            }}
          />
        </button>

        <div className="absolute left-[29%] right-0 top-0 rounded-md bg-background-100 px-4 py-2 text-base leading-relaxed">
          <ConnectionPoint
            filled={Object.values(connections).includes("derivation")}
            side="left"
            pointRef={(element) => {
              pointRefs.current.derivation = element;
            }}
          />
          Changes the core meaning and creates a completely new word (a noun)
        </div>
        <div className="absolute left-[29%] right-0 top-21 rounded-md bg-background-100 px-4 py-2 text-base leading-relaxed">
          <ConnectionPoint
            filled={Object.values(connections).includes("inflection")}
            side="left"
            pointRef={(element) => {
              pointRefs.current.inflection = element;
            }}
          />
          Modifies the grammatical form of the existing verb
        </div>
      </div>
    </InteractiveBlock>
  );
}
