import WordBreakdownItem from "./word-breakdown-item";

function WordBreakdown() {
  return (
    <div className="flex">
      <WordBreakdownItem label="PRE" />
      <WordBreakdownItem label="ROOT" />
      <WordBreakdownItem label="SUF" />
    </div>
  );
}
export default WordBreakdown;
