# Conlang Builder Usability Report

## Executive summary

The builder has the underlying pieces for creating morphemes and composing words, but it expects beginners to infer the intended workflow from two separate banks and a form that hides spelling or definition depending on the current step. The initial state is empty, the word bank can be opened before any morphemes exist, and the suggestions offer little help with common building blocks. After a learner completes a morpheme, nothing guides them toward using it in a word or creating another morpheme.

The result is a gap between the lesson's promise—experiment with morphemes and build words—and the builder's actual interaction. Improve that gap with a guided first-use flow, a clearly explained and browsable starter kit, a single-page creation form, friendlier examples, and contextual next steps. Keep advanced freedom: teach a multi-morpheme word first without permanently banning one-morpheme words or whole-word roots.

## Findings and evidence

| Usability issue | What the implementation currently does | Likely learner impact |
| --- | --- | --- |
| The morpheme-to-word relationship is implicit | The builder opens on the Morpheme Bank, but there is no overview of the relationship between a morpheme, a word, and the two banks. The lesson describes “creating morphemes and fusing them,” while the interface labels the tabs only “Morpheme Bank” and “Word Bank.” | Learners can miss that morphemes are the parts used to build words, or treat the two banks as unrelated destinations. |
| The first action is unclear | Both banks begin empty. The empty-state copy for the Word Bank says to create a word below even though word creation cannot proceed without morphemes; the actual warning appears only after switching to the word form. | A learner can enter a dead end or spend time exploring a form they cannot yet use. |
| The form teaches the wrong interaction model | `CreationForm` puts definition and spelling on separate “Define” and “Spell” steps. The word definition is entered before the learner selects morphemes, and the morpheme spelling is entered on a separate step from its definition. | Learners may think these are separate stages of a linguistic process rather than fields that describe one creation. The extra transition also obscures the relationship between the meaning and written form. |
| Creating an entire word as a morpheme is easy | A morpheme has only spelling and definition fields; it has no beginner-facing indication of whether it is a root or an affix. There are no examples or guardrails to show how a root differs from a composed word. | Learners can enter a complete lexical item as a morpheme, then not understand what to do with it. Note: a root can legitimately be a complete word in a language, so rejecting every whole-word root would teach a false rule. |
| One-part words can satisfy the first composition | Word creation checks that at least one morpheme is selected, then permits submission. | Learners can finish the first word without seeing how combining parts changes meaning. A one-morpheme word is linguistically valid, but it is a weak demonstration of the builder's core composition mechanic. |
| Suggestions are difficult to operationalize | Word suggestions are mostly abstract, nuanced concepts; morpheme suggestions are mostly complex discourse or evidential meanings. Suggestions are presented as plain text with no part-of-speech or morpheme-role labels. | Learners lack familiar first examples such as a noun root, a verb root, a plural marker, or a “person who does X” ending. The user-proposed mix of nouns, verbs, adjectives, and adverbs is not evident in the current suggestion pool. |
| There is no momentum after a creation | After an item is created, it is selected in its bank. The builder does not suggest the next useful action, show progress toward a first example word, or celebrate completion of a beginner sequence. | Learners may stop after one or two morphemes and one word, with no clear next step. |
| The bank view prioritizes browsing over building | Search and bank entries are prominent; the creation form is lower in the scrollable panel. Creation guidance and feedback are inside that form. | The builder's main purpose can be less visible, especially on constrained screens or when the bank grows. |

### Relevant implementation locations

- The builder state, initial bank selection, bank switching, creation logic, and minimum-one-morpheme check are in [`src/components/conlang-builder/index.tsx`](../src/components/conlang-builder/index.tsx).
- The two-step form, suggestions, and morpheme selection UI are in [`src/components/conlang-builder/creation-form.tsx`](../src/components/conlang-builder/creation-form.tsx).
- Empty-bank messaging and bank browsing are in [`src/components/conlang-builder/bank-browser.tsx`](../src/components/conlang-builder/bank-browser.tsx).
- Definitions and relationships between saved entries are shown in [`src/components/conlang-builder/definition-panels.tsx`](../src/components/conlang-builder/definition-panels.tsx).
- Persistent conlang data currently stores only word spelling, definition, and morpheme IDs, and morpheme spelling and definition, in [`src/stores/conlang-builder.ts`](../src/stores/conlang-builder.ts).
- The builder is introduced and unlocked from [`src/pages/inflection-and-derivation.astro`](../src/pages/inflection-and-derivation.astro); it is mounted across lesson pages by [`src/layouts/section.astro`](../src/layouts/section.astro).
- Existing definition suggestions are in [`src/data/conlang-definition-suggestions.ts`](../src/data/conlang-definition-suggestions.ts).

## Recommended experience

### 1. Explain the model before asking for input

Add a short, persistent orientation near the top of the builder:

> **Build words from parts.** Create morphemes (meaningful parts), then combine two or more to make your first word. A root carries a core meaning; an affix adds to or changes that meaning.

Show a concrete, visible example using the same sample items that appear in the starter kit, such as `teach` + `-er` → `teacher` (“a person who teaches”). Label each part's meaning and role. Avoid relying on linguistic terminology alone; provide plain-language explanations wherever terms such as *root*, *affix*, or *morpheme* appear.

Change empty states so the next valid action is explicit. For example, when the Word Bank is empty and there are no morphemes, explain that the learner should first add or explore parts in the Morpheme Bank and offer a direct action to do so. Do not invite them to create an unavailable word.

### 2. Offer a curated, optional starter kit

Give learners a small, ready-to-use set of example morphemes and example words, covering:

- Familiar roots for common nouns, verbs, and adjectives.
- A plural marker, a past- or future-time marker, and a “person who does X” marker.
- Several example words that reuse those same morphemes, so reuse and composition are immediately visible.
- A mix of word meanings and parts of speech, including at least one adverb if the word examples are intended to model that category.

Keep the starter kit visibly identified as examples and let learners inspect, use, or add it to their own banks. Prefer an explicit **Add starter set** / **Explore examples** choice over silently inserting sample content into a learner's personal bank. This preserves a clean personal workspace, avoids confusion about what the learner created, and still makes a usable first session possible. Include a way to undo or remove the set.

Use the same sample vocabulary in the orientation, starter set, and guided first-word activity; inconsistent examples would add avoidable translation work.

### 3. Put spelling and meaning in one creation form

Replace the “Define” → “Spell” sequence with a single form that keeps the key fields visible together:

- **Morpheme:** spelling, plain-language meaning, and a simple role such as root or affix.
- **Word:** composed spelling, meaning, and the selected morphemes displayed as individually removable parts.

For word creation, show the selected parts and the resulting spelling together, with an explicit instruction such as “Choose parts to build your word.” Keep the composed spelling read-only if words must strictly be assembled from bank entries; if later customization is supported, distinguish edits from the generated form rather than silently breaking that relationship.

Use friendly field examples (“Meaning, e.g. ‘rain’” or “Adds ‘more than one’”) and plain feedback next to disabled or incomplete actions. A disabled submit control without a reason is not sufficient guidance.

### 4. Guide the first few creations, then get out of the way

Add a lightweight first-use path, not a blocking tutorial:

1. Explore or add the starter set.
2. Create or choose a root.
3. Create or choose a second morpheme, such as a plural or “person who does X” ending.
4. Combine at least two parts into a first word.
5. Continue with a suggested next step, such as making a verb, adjective, or another word from an existing root.

Show progress and one relevant next action after each step (“Now use `-er` with a verb root to make a person-word”). Let learners skip, revisit examples, or dismiss guidance. After the first successful word, retain a small “Try next” area rather than keeping the entire interface in tutorial mode.

### 5. Clarify morpheme roles without enforcing a false rule

Offer a simple root/affix choice with plain-language examples, and show that role in the bank and detail view. Use this to teach the difference between a base and a word-building affix, not as a strict spelling or linguistic validator.

Do not ban a morpheme whose spelling and definition look like a complete word: free roots can be words by themselves. Instead, use examples and the guided activity to show that a morpheme is a meaningful part and that the learner can combine parts when practicing word formation. Avoid forcing every word to contain two parts in the long term.

### 6. Replace abstract first suggestions with usable starting points

Retain imaginative concepts as an optional “Invent your own meaning” path, but lead with suggestions that are easy to turn into a spelling and use in composition. Label entries so learners can distinguish a word meaning from a morpheme function:

- Word cards: a familiar noun, action/verb, quality/adjective, and manner/adverb, with the part of speech shown.
- Morpheme cards: “marks more than one,” “shows an action happened in the past,” “shows an action will happen in the future,” “makes a person who does X,” and “makes a noun into an adjective,” with a short example for each.

Ensure wording is linguistically accurate: affixes do not all behave alike, and the example should make clear what kind of base an affix combines with. Refreshing suggestions should not be the only way to discover the basic examples.

### 7. Make reuse and progress visible

Keep the existing “used in” and “morphemes” relationships, but make them useful for the next action: offer **Use in a new word** from a morpheme detail and **Add another part** from a word or empty-state view. Show a modest count or checklist for the guided first-use milestones. Avoid imposing a target that implies a language is incomplete after an arbitrary number of entries.

## Actionable implementation plan

### Phase 1 — Fix the first-session path

1. Add the orientation text and a concrete composition example to the builder.
2. Correct the empty states so each one presents a valid next step; link directly between the banks when appropriate.
3. Add a small, curated and clearly labeled starter set, with add/undo behavior and example words that reuse its morphemes.
4. Add part-of-speech labels to word suggestions and plain-language role/function labels to morpheme suggestions.

**Acceptance checks**

- A new learner can tell, without relying on the lesson text, that morphemes are the parts used to make words.
- From an empty Word Bank, the next action is possible and clearly explained.
- A learner can compose at least one example word from the starter set and see which parts form it.
- Starter examples are distinguishable from learner-created entries and can be removed.

### Phase 2 — Simplify creation and teach composition

1. Replace the two-step form with the combined creation form.
2. Present word parts as visible, removable selections and explain the resulting spelling.
3. Add a non-blocking first-use checklist that encourages a multi-part first word and guides the learner to reuse existing morphemes.
4. Make incomplete form requirements and submit states understandable in text, not only through disabled buttons.
5. Add role labels for roots and affixes in creation, browsing, and detail views, while allowing free roots.

**Acceptance checks**

- A learner can view and complete the spelling and definition fields together.
- The first guided word clearly uses at least two morphemes and displays their contribution.
- One-morpheme words and standalone roots remain possible outside the guided first example.
- Guidance can be skipped or dismissed without blocking normal creation.

### Phase 3 — Validate, tune, and iterate

1. Test the first-use flow with beginners using the current reported failure modes as prompts: “What do you create first?”, “How would you make a word?”, and “What is the difference between this root and this word?”
2. Observe whether learners can create multiple morphemes and reuse them across words without moderator explanation.
3. Review suggestion comprehension and vocabulary mix; revise cards that learners cannot explain or use.
4. Check keyboard navigation, screen-reader labels, mobile layout, and persistent-data behavior when the starter set is added or removed.

## Success measures

Track first-session behaviors (with appropriate consent and privacy safeguards) or measure them in usability sessions:

- **Workflow comprehension:** learners correctly describe that morphemes are used to make words.
- **Time to first composed word:** time from opening the builder to creating a word from multiple morphemes.
- **Starter-set conversion:** proportion of learners who inspect/add examples and successfully use one to form a word.
- **Reuse:** proportion of created words that reuse a morpheme already used elsewhere.
- **Early abandonment:** proportion of learners who stop after one or two morphemes or one word.
- **Misclassification:** learners' ability to distinguish a root, an affix, and a composed word in a short task.

Compare against a baseline gathered before the redesign. Define numerical targets after collecting that baseline rather than inventing arbitrary thresholds.

## Product and implementation considerations

- Starter examples are optional and are copied into the banks only when requested. They are marked as samples; removing them deletes sample words and unused sample morphemes while preserving user-created words and any sample morphemes those words still use.
- Morpheme roles and item sources are persisted as optional fields. Existing saved entries without these fields remain valid and display as roots.
- Examples are teaching material: review their morphology and glosses for accuracy, consistency, and accessibility before release.
- Avoid using “more entries” as the goal by itself. Success is learners understanding composition and confidently continuing, not maximizing bank size.
