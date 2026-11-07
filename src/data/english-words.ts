export type MorphemeTag =
  | "BOUND"
  | "FREE"
  | "PREFIX"
  | "BASE"
  | "SUFFIX"
  | "INFLECTIONAL"
  | "DERIVATIONAL";

export type Morpheme = {
  spelling: string;
  pronunciation: string;
  definition: string;
  tags: MorphemeTag[];
  allomorphs?: { spelling: string; pronunciation: string }[];
};

export type EnglishWord = {
  spelling: string;
  pronunciation: string;
  definition: string;
  partOfSpeech: string;
  morphemes: Morpheme[];
};

const freeBase = (
  spelling: string,
  pronunciation: string,
  definition: string,
): Morpheme => ({
  spelling,
  pronunciation,
  definition,
  tags: ["FREE", "BASE"],
});

const boundBase = (
  spelling: string,
  pronunciation: string,
  definition: string,
): Morpheme => ({
  spelling,
  pronunciation,
  definition,
  tags: ["BOUND", "BASE"],
});

const prefix = (
  spelling: string,
  pronunciation: string,
  definition: string,
  allomorphs?: Morpheme["allomorphs"],
): Morpheme => ({
  spelling,
  pronunciation,
  definition,
  tags: ["BOUND", "PREFIX", "DERIVATIONAL"],
  ...(allomorphs ? { allomorphs } : {}),
});

const negativePrefixAllomorphs = [
  { spelling: "in-", pronunciation: "/ɪn/" },
  { spelling: "im-", pronunciation: "/ɪm/" },
  { spelling: "il-", pronunciation: "/ɪl/" },
  { spelling: "ir-", pronunciation: "/ɪr/" },
];

const suffix = (
  spelling: string,
  pronunciation: string,
  definition: string,
  type: "INFLECTIONAL" | "DERIVATIONAL" = "DERIVATIONAL",
): Morpheme => ({
  spelling,
  pronunciation,
  definition,
  tags: ["BOUND", "SUFFIX", type],
});

export const englishWords: EnglishWord[] = [
  {
    spelling: "unhappiness",
    pronunciation: "/ʌnˈhæpinəs/",
    definition: "the state of being unhappy",
    partOfSpeech: "noun",
    morphemes: [
      prefix("un-", "/ʌn/", "not; opposite of"),
      freeBase("happy", "/ˈhæpi/", "feeling or showing pleasure"),
      suffix("-ness", "/nəs/", "forms a noun meaning a state or condition"),
    ],
  },
  {
    spelling: "reconstruction",
    pronunciation: "/ˌriːkənˈstrʌkʃən/",
    definition: "the act or process of building or forming something again",
    partOfSpeech: "noun",
    morphemes: [
      prefix("re-", "/riː/", "again; back"),
      freeBase("construct", "/kənˈstrʌkt/", "to build or form"),
      suffix("-ion", "/ʃən/", "forms a noun for an act or process"),
    ],
  },
  {
    spelling: "disagreement",
    pronunciation: "/ˌdɪsəˈɡriːmənt/",
    definition: "a lack of agreement or harmony",
    partOfSpeech: "noun",
    morphemes: [
      prefix("dis-", "/dɪs/", "not; opposite of"),
      freeBase("agree", "/əˈɡriː/", "to have the same opinion"),
      suffix("-ment", "/mənt/", "forms a noun describing a result or state"),
    ],
  },
  {
    spelling: "irresponsible",
    pronunciation: "/ˌɪrɪˈspɑːnsəbəl/",
    definition: "not showing a proper sense of responsibility",
    partOfSpeech: "adjective",
    morphemes: [
      prefix(
        "ir-",
        "/ɪr/",
        "not; a form of the negative prefix in-",
        negativePrefixAllomorphs,
      ),
      freeBase("responsible", "/rɪˈspɑːnsəbəl/", "having a duty to deal with something"),
    ],
  },
  {
    spelling: "prehistorical",
    pronunciation: "/ˌpriːhɪˈstɔːrɪkəl/",
    definition: "relating to the time before recorded history",
    partOfSpeech: "adjective",
    morphemes: [
      prefix("pre-", "/priː/", "before"),
      freeBase("history", "/ˈhɪstəri/", "the study or record of past events"),
      suffix("-ical", "/ɪkəl/", "forms an adjective meaning relating to"),
    ],
  },
  {
    spelling: "unbelievable",
    pronunciation: "/ˌʌnbɪˈliːvəbəl/",
    definition: "not able to be believed; extraordinary",
    partOfSpeech: "adjective",
    morphemes: [
      prefix("un-", "/ʌn/", "not; opposite of"),
      freeBase("believe", "/bɪˈliːv/", "to accept something as true"),
      suffix("-able", "/əbəl/", "able or suitable to be"),
    ],
  },
  {
    spelling: "nationalization",
    pronunciation: "/ˌnæʃənələˈzeɪʃən/",
    definition: "the act of bringing an industry or property under state ownership",
    partOfSpeech: "noun",
    morphemes: [
      freeBase("nation", "/ˈneɪʃən/", "a country or people"),
      suffix("-al", "/əl/", "forms an adjective meaning relating to"),
      suffix("-ize", "/aɪz/", "forms a verb meaning to make or become"),
      suffix("-ation", "/eɪʃən/", "forms a noun for an act or process"),
    ],
  },
  {
    spelling: "submarine",
    pronunciation: "/ˌsʌbməˈriːn/",
    definition: "a vessel capable of operating underwater",
    partOfSpeech: "noun",
    morphemes: [
      prefix("sub-", "/sʌb/", "under; below"),
      freeBase("marine", "/məˈriːn/", "relating to the sea"),
    ],
  },
  {
    spelling: "biodegradable",
    pronunciation: "/ˌbaɪoʊdɪˈɡreɪdəbəl/",
    definition: "capable of being broken down naturally by living organisms",
    partOfSpeech: "adjective",
    morphemes: [
      prefix("bio-", "/baɪoʊ/", "life; living organisms"),
      freeBase("degrade", "/dɪˈɡreɪd/", "to break down or deteriorate"),
      suffix("-able", "/əbəl/", "capable of being"),
    ],
  },
  {
    spelling: "telecommunication",
    pronunciation: "/ˌtɛləkəmjuːnɪˈkeɪʃən/",
    definition: "communication over a distance using electronic signals",
    partOfSpeech: "noun",
    morphemes: [
      prefix("tele-", "/tɛlə/", "at or over a distance"),
      freeBase("communicate", "/kəˈmjuːnɪkeɪt/", "to share or exchange information"),
      suffix("-ion", "/ʃən/", "forms a noun for an act or process"),
    ],
  },
  {
    spelling: "supernatural",
    pronunciation: "/ˌsuːpərˈnætʃərəl/",
    definition: "attributed to a force beyond the laws of nature",
    partOfSpeech: "adjective",
    morphemes: [
      prefix("super-", "/suːpər/", "above; beyond"),
      freeBase("nature", "/ˈneɪtʃər/", "the physical world and its phenomena"),
      suffix("-al", "/əl/", "forms an adjective meaning relating to"),
    ],
  },
  {
    spelling: "antidisestablishmentarianism",
    pronunciation: "/ˌæntaɪˌdɪsɪˌstæblɪʃmənˈtɛəriənɪzəm/",
    definition: "opposition to the disestablishment of a state church",
    partOfSpeech: "noun",
    morphemes: [
      prefix("anti-", "/æntaɪ/", "against; opposed to"),
      prefix("dis-", "/dɪs/", "reversal or removal"),
      freeBase("establish", "/ɪˈstæblɪʃ/", "to set up or put in place"),
      suffix("-ment", "/mənt/", "forms a noun describing a result or process"),
      suffix("-arian", "/ɛəriən/", "a person who supports or practices"),
      suffix("-ism", "/ɪzəm/", "a doctrine, system, or movement"),
    ],
  },
  {
    spelling: "misunderstanding",
    pronunciation: "/ˌmɪsʌndərˈstændɪŋ/",
    definition: "a failure to understand something correctly",
    partOfSpeech: "noun",
    morphemes: [
      prefix("mis-", "/mɪs/", "wrongly; badly"),
      freeBase("understand", "/ˌʌndərˈstænd/", "to know the meaning of"),
      suffix("-ing", "/ɪŋ/", "forms a noun describing an act or result"),
    ],
  },
  {
    spelling: "inflexible",
    pronunciation: "/ɪnˈflɛksəbəl/",
    definition: "unable or unwilling to change or bend",
    partOfSpeech: "adjective",
    morphemes: [
      prefix("in-", "/ɪn/", "not; opposite of", negativePrefixAllomorphs),
      freeBase("flex", "/flɛks/", "to bend"),
      suffix("-ible", "/əbəl/", "able or suitable to be"),
    ],
  },
  {
    spelling: "deconstruction",
    pronunciation: "/ˌdiː(k)ənˈstrʌkʃən/",
    definition:
      "the act of breaking something down into its separate parts in order to understand its meaning",
    partOfSpeech: "noun",
    morphemes: [
      prefix("de-", "/diː/", "to reverse, remove, or undo"),
      boundBase("con-", "/kən/", "together; with"),
      boundBase("struct", "/strʌkt/", "to build or arrange"),
      suffix("-ion", "/ʃən/", "forms a noun for an act or process"),
    ],
  },
  {
    spelling: "transformation",
    pronunciation: "/ˌtrænsfərˈmeɪʃən/",
    definition: "a thorough or dramatic change in form or appearance",
    partOfSpeech: "noun",
    morphemes: [
      prefix("trans-", "/træns/", "across; change"),
      freeBase("form", "/fɔːrm/", "shape or structure"),
      suffix("-ation", "/eɪʃən/", "forms a noun for an act or process"),
    ],
  },
  {
    spelling: "overproduction",
    pronunciation: "/ˌoʊvərprəˈdʌkʃən/",
    definition: "the production of more of something than is needed",
    partOfSpeech: "noun",
    morphemes: [
      prefix("over-", "/oʊvər/", "too much; excessively"),
      freeBase("produce", "/prəˈduːs/", "to make or create"),
      suffix("-tion", "/ʃən/", "forms a noun for an act or process"),
    ],
  },
  {
    spelling: "friendship",
    pronunciation: "/ˈfrɛndʃɪp/",
    definition: "the state of being friends",
    partOfSpeech: "noun",
    morphemes: [
      freeBase("friend", "/frɛnd/", "a person whom one knows and likes"),
      suffix("-ship", "/ʃɪp/", "forms a noun for a state or relationship"),
    ],
  },
  {
    spelling: "fearlessness",
    pronunciation: "/ˈfɪərləsnəs/",
    definition: "the quality of being without fear",
    partOfSpeech: "noun",
    morphemes: [
      freeBase("fear", "/fɪər/", "an unpleasant feeling caused by danger"),
      suffix("-less", "/ləs/", "without"),
      suffix("-ness", "/nəs/", "forms a noun meaning a state or quality"),
    ],
  },
  {
    spelling: "teacher",
    pronunciation: "/ˈtiːtʃər/",
    definition: "a person who teaches",
    partOfSpeech: "noun",
    morphemes: [
      freeBase("teach", "/tiːtʃ/", "to give instruction"),
      suffix("-er", "/ər/", "a person who performs an action"),
    ],
  },
  {
    spelling: "carelessness",
    pronunciation: "/ˈkɛərləsnəs/",
    definition: "a lack of attention or caution",
    partOfSpeech: "noun",
    morphemes: [
      freeBase("care", "/kɛər/", "attention or concern"),
      suffix("-less", "/ləs/", "without"),
      suffix("-ness", "/nəs/", "forms a noun meaning a state or quality"),
    ],
  },
  {
    spelling: "uncomfortable",
    pronunciation: "/ʌnˈkʌmfərtəbəl/",
    definition: "causing or feeling slight pain or physical unease",
    partOfSpeech: "adjective",
    morphemes: [
      prefix("un-", "/ʌn/", "not; opposite of"),
      freeBase("comfort", "/ˈkʌmfərt/", "a state of physical ease"),
      suffix("-able", "/əbəl/", "capable of being"),
    ],
  },
  {
    spelling: "impossible",
    pronunciation: "/ɪmˈpɑːsəbəl/",
    definition: "not able to occur, exist, or be done",
    partOfSpeech: "adjective",
    morphemes: [
      prefix(
        "im-",
        "/ɪm/",
        "not; a form of the negative prefix in-",
        negativePrefixAllomorphs,
      ),
      freeBase("possible", "/ˈpɑːsəbəl/", "able to be done or to happen"),
    ],
  },
  {
    spelling: "multiplication",
    pronunciation: "/ˌmʌltəplɪˈkeɪʃən/",
    definition: "the process or result of multiplying",
    partOfSpeech: "noun",
    morphemes: [
      freeBase("multiply", "/ˈmʌltəplaɪ/", "to increase in number"),
      suffix("-ication", "/ɪˈkeɪʃən/", "forms a noun for an act or process"),
    ],
  },
  {
    spelling: "nonconformist",
    pronunciation: "/ˌnɑːnkənˈfɔːrmɪst/",
    definition: "a person whose behavior or views do not conform to norms",
    partOfSpeech: "noun",
    morphemes: [
      prefix("non-", "/nɑːn/", "not"),
      freeBase("conform", "/kənˈfɔːrm/", "to follow accepted rules or standards"),
      suffix("-ist", "/ɪst/", "a person who practices or follows something"),
    ],
  },
  {
    spelling: "postponement",
    pronunciation: "/poʊstˈpoʊnmənt/",
    definition: "the act of arranging for something to happen at a later time",
    partOfSpeech: "noun",
    morphemes: [
      freeBase("postpone", "/poʊstˈpoʊn/", "to arrange for something to happen later"),
      suffix("-ment", "/mənt/", "forms a noun describing an act or result"),
    ],
  },
];
