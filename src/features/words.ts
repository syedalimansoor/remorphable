type Word = {
  form: string;
  affixes: {
    prefixId: string;
    rootId: string;
    suffixId: string;
  };
  ipa: string;
  partsOfSpeech: string[];
  definition: string;
};

export const wordList: Word[] = [
  {
    form: "destruction",
    affixes: {
      prefixId: "f95927da-bba3-49df-beea-5693bfb2cc8f", // -de
      rootId: "82c34a68-c42d-4f32-9959-b6d4413a4a31", // struct
      suffixId: "191bc595-cd66-4dd6-960f-890960891e74", // -tion
    },
    ipa: "/dəˈstrəkSH(ə)n/",
    partsOfSpeech: ["noun"],
    definition:
      "the action or process of causing so much damage to something that it no longer exists or cannot be repaired",
  },
  {
    form: "information",
    affixes: {
      prefixId: "a9ef5f2e-d40b-44b8-8e7a-65a70f0209ea", // in-
      rootId: "ce949f8e-5dac-4e5f-8eea-59814ffc43cf", // form
      suffixId: "7107e20f-ed33-4c35-a13d-63e44ad392e4", // -ation
    },
    ipa: "/ˌinfərˈmāSH(ə)n/",
    partsOfSpeech: ["noun"],
    definition:
      "facts provided or learned about something or someone; knowledge communicated or received concerning a particular fact or circumstance",
  },
  {
    form: "inaudible",
    affixes: {
      prefixId: "a9ef5f2e-d40b-44b8-8e7a-65a70f0209ea", // in-
      rootId: "fa8680d1-c239-4a46-808e-0f9d938e30ff", // aud
      suffixId: "56081d31-5632-4e1b-bd4e-e52ad73157e1", // -ible
    },
    ipa: "/ˌinˈôdəb(ə)l/",
    partsOfSpeech: ["adjective"],
    definition: "unable to be heard",
  },
];
