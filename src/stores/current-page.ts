import { persistentAtom } from "@nanostores/persistent";
import type { Page } from "../constants";

export const $currentPage = persistentAtom<Page>("currentPage", "morphology");
