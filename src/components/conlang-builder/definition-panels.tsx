import { XIcon } from "@phosphor-icons/react";
import type {
  ConlangMorpheme,
  ConlangWord,
} from "../../stores/conlang-builder";

export function WordDetails({
  word,
  morphemes,
  onClose,
  onSelectMorpheme,
  onDelete,
}: {
  word: ConlangWord;
  morphemes: ConlangMorpheme[];
  onClose: () => void;
  onSelectMorpheme: (morpheme: ConlangMorpheme) => void;
  onDelete: () => void;
}) {
  return (
    <section aria-label={`${word.spelling} word definition`}>
      <PanelHeading label="WORD DEFINITION" onClose={onClose} />
      <div className="rounded-lg bg-blue-700 p-4 sm:p-5">
        <h4 className="font-display text-2xl font-semibold text-yellow-500">
          {word.spelling}
        </h4>
        <p className="mt-1 text-sm text-blue-100">{word.definition}</p>
        <div className="mt-4 rounded bg-blue-800 p-3">
          {morphemes.length > 0 ? (
            <>
              <p className="mb-2 text-[10px] font-bold text-blue-300">
                MORPHEMES
              </p>
              <div className="flex flex-wrap gap-1.5">
                {morphemes.map((morpheme) => (
                  <button
                    type="button"
                    key={morpheme.id}
                    onClick={() => onSelectMorpheme(morpheme)}
                    className="cursor-pointer rounded bg-blue-600 px-2 py-1 text-xs font-semibold text-blue-100 hover:bg-yellow-500 hover:text-blue-800"
                  >
                    {morpheme.spelling}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <p className="text-sm text-blue-300">A single-morpheme word.</p>
          )}
        </div>
        <button
          type="button"
          onClick={onDelete}
          className="mt-3 cursor-pointer text-xs text-blue-300 underline hover:text-blue-100"
        >
          Delete word
        </button>
      </div>
    </section>
  );
}

export function MorphemeDetails({
  morpheme,
  words,
  onClose,
  onSelectWord,
}: {
  morpheme: ConlangMorpheme;
  words: ConlangWord[];
  onClose: () => void;
  onSelectWord: (word: ConlangWord) => void;
}) {
  return (
    <section aria-label={`${morpheme.spelling} morpheme definition`}>
      <PanelHeading label="MORPHEME DEFINITION" onClose={onClose} />
      <div className="rounded-lg bg-blue-700 p-4 sm:p-5">
        <h4 className="font-display text-2xl font-semibold text-yellow-500">
          {morpheme.spelling}
        </h4>
        <p className="mt-1 text-sm text-blue-100">{morpheme.definition}</p>
        <div className="mt-4 rounded bg-blue-800 p-3">
          <p className="mb-2 text-[10px] font-bold text-blue-300">USED IN</p>
          <div className="flex flex-wrap gap-1.5">
            {words.length > 0 ? (
              words.map((word) => (
                <button
                  type="button"
                  key={word.id}
                  onClick={() => onSelectWord(word)}
                  className="cursor-pointer rounded bg-blue-600 px-2 py-1 text-xs text-blue-100 hover:bg-yellow-500 hover:text-blue-800"
                >
                  {word.spelling}
                </button>
              ))
            ) : (
              <p className="text-xs text-blue-300">
                This morpheme is not used in any words yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function PanelHeading({
  label,
  onClose,
}: {
  label: string;
  onClose: () => void;
}) {
  return (
    <div className="mb-2 flex items-center justify-between px-2">
      <h4 className="text-xs font-bold text-blue-100">{label}</h4>
      <button
        type="button"
        onClick={onClose}
        className="cursor-pointer rounded p-1 text-blue-300 hover:text-blue-100"
        aria-label="Close definition"
      >
        <XIcon size={16} />
      </button>
    </div>
  );
}
