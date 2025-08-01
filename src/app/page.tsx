import AffixPanels from "./components/affix-panels";
import BeginningTip from "./components/beginning-tip";
import Logo from "./components/logo";
import Tagline from "./components/tagline";
import WordBreakdown from "./components/word-breakdown";
import WordInfo from "./components/word-info";

export default function Home() {
  return (
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
  );
}
