import { InteractiveBlock } from "./interactive-block";

type Props = {
  term: string;
  category: string;
  ipa: string;
  definition: string;
};

export function Definition({ term, category, ipa, definition }: Props) {
  return (
    <InteractiveBlock>
      <div className="flex gap-2">
        <b className="text-blue-500">{term}</b>
        <i>{category}</i>
      </div>
      <span className="text-foreground-400 mb-2 block">/{ipa}/</span>
      <p>{definition}</p>
    </InteractiveBlock>
  );
}
