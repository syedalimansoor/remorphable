import { Affix, prefixList, rootList, suffixList } from "@/features/affix";
import { atom } from "nanostores";

const createAffixStore = (initialAffixes: Affix[]) => {
  const store = atom<Affix[]>(initialAffixes);

  const get = store.get;

  const set = (affixUpdater: Affix[] | ((affixes: Affix[]) => Affix[])) => {
    if (typeof affixUpdater === "function") {
      store.set(affixUpdater(store.get()));
    } else {
      store.set(affixUpdater);
    }
  };

  const filter = (search: string) => {
    store.set(
      initialAffixes.filter((affix) =>
        affix.value.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  return {
    store,
    get,
    set,
    filter,
  };
};

export const {
  store: $prefixes,
  get: getPrefixes,
  set: setPrefixes,
  filter: filterPrefixes,
} = createAffixStore(prefixList);

export const {
  store: $roots,
  get: getRoots,
  set: setRoots,
  filter: filterRoots,
} = createAffixStore(rootList);

export const {
  store: $suffixes,
  get: getSuffixes,
  set: setSuffixes,
  filter: filterSuffixes,
} = createAffixStore(suffixList);
