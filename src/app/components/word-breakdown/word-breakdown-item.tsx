type Props = {
  label: string;
};

function WordBreakdownItem({ label }: Props) {
  return (
    <div className="flex flex-col gap-4 items-center group">
      <span>{label}</span>
      <div className="border border-foreground not-group-first:border-l-0 group-first:rounded-l-lg group-last:rounded-r-lg p-5 text-7xl text-muted-foreground">
        struct
      </div>
    </div>
  );
}
export default WordBreakdownItem;
