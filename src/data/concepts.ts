export type Concept = {
  term: string;
  definition: string;
  example: string;
};

export const concepts: Record<string, Concept> = {
  morphology: {
    term: `Morphology`,
    definition: `The study of word formation and structure.`,
    example: `Breaking the word "replayed" down into its prefix, base, and suffix.`,
  },
  morpheme: {
    term: `Morpheme`,
    definition: `The smallest unit of language that contains meaning.`,
    example: `The word "replayed" contains the morphemes "re-", "play", and "-ed".`,
  },
  "free morpheme": {
    term: `Free morpheme`,
    definition: `A morpheme that can stand alone as a word.`,
    example: `The word "break" can stand alone in the sentence "I break the glass."`,
  },
  "bound morpheme": {
    term: `Bound morpheme`,
    definition: `A morpheme that must attach to another morpheme.`,
    example: `The morpheme "-ness" must attach to another morpheme, as in the word "kindness".`,
  },
  base: {
    term: `Base`,
    definition: `The morpheme that provides a word's core meaning.`,
    example: `The morpheme "kind" is the base in the word "kindness".`,
  },
  affix: {
    term: `Affix`,
    definition: `A bound morpheme that attaches to a base.`,
    example: `The morpheme "-ness" is an affix in the word "kindness".`,
  },
  prefix: {
    term: `Prefix`,
    definition: `An affix attached to the beginning of a base.`,
    example: `The morpheme "re-" is a prefix in the word "rebuild".`,
  },
  suffix: {
    term: `Suffix`,
    definition: `An affix attached to the end of a base.`,
    example: `The morpheme "-ing" is a suffix in the word "painting".`,
  },
  polymorphemic: {
    term: `Polymorphemic`,
    definition: `Containing two or more morphemes.`,
    example: `The word "carelessness" is polymorphemic because it contains the morphemes "care", "-less", and "-ness".`,
  },
  monomorphemic: {
    term: `Monomorphemic`,
    definition: `Containing only one morpheme.`,
    example: `The word "tree" is monomorphemic because it contains only one morpheme, "tree".`,
  },
  inflection: {
    term: `Inflection`,
    definition: `A type of affixation that expresses a grammatical feature without changing a word's core meaning or category.`,
    example: `Adding the suffix "-s" to the word "cat" forms the inflected word "cats".`,
  },
  derivation: {
    term: `Derivation`,
    definition: `A type of affixation that changes a word's meaning or grammatical category.`,
    example: `Adding the suffix "-ful" to the word "hope" forms the derived word "hopeful".`,
  },
  affixation: {
    term: `Affixation`,
    definition: `The process of attaching an affix to a base.`,
    example: `Attaching the prefix "re-" to the word "write" is an example of affixation.`,
  },
  allomorphy: {
    term: `Allomorphy`,
    definition: `When one morpheme has different forms in different contexts.`,
    example: `The plural suffix appears as "s" in "cats", "z" in "dogs", or "ɪz" in "boxes".`,
  },
  allomorph: {
    term: `Allomorph`,
    definition: `A variant form of a morpheme.`,
    example: `The ending pronounced "ɪz" in the word "boxes" is an allomorph of the English plural suffix.`,
  },
  suppletion: {
    term: `Suppletion`,
    definition: `When an inflected form is phonologically unrelated to its base.`,
    example: `The word "better" is the comparative form of the word "good", even though their sounds are unrelated.`,
  },
  lexeme: {
    term: `Lexeme`,
    definition: `An abstract unit representing a complete set of inflected word forms.`,
    example: `The lexeme "WRITE" represents the word forms "write", "writes", "writing", and "wrote".`,
  },
};
