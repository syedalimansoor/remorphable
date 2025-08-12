import WordBreakdownItem from "./word-breakdown-item";

function WordBreakdown() {
  return (
    <div className="flex flex-wrap justify-center">
      <WordBreakdownItem label="PRE" affixType="prefix" />
      <WordBreakdownItem label="ROOT" affixType="root" />
      <WordBreakdownItem label="SUF" affixType="suffix" />
    </div>
  );
}
export default WordBreakdown;
