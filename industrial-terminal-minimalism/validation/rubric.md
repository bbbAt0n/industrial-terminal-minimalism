# Product, visual, and implementation review rubric

Use these as independent review dimensions, not fixed layout formulas or a numerical style score. Evaluate the rendered interface and actual journeys against the product's design intent and [DNA](../STYLE.md). Supply an observation and evidence for each relevant dimension.

| Dimension | Review questions | Typical correction |
| --- | --- | --- |
| Composition and visual hierarchy | Does attention follow the requester's priorities? Are dominant regions/actions deserved and groups meaningful at each size? | Reorder, regroup, change emphasis or navigation; do not add a default hero/sidebar |
| Typography consistency | Do repeated roles share family, scale, weight, case, tracking, and line-height logic? Are project-selected reading/display and optional mono roles intentional, with shipped font stacks treated as defaults only? | Repair role assignments and the shared scale, rather than patching individual fonts |
| Spacing rhythm and alignment | Are within/between-group relationships clear? Do baselines, edges, and comparable values align without accidental near-misses? | Correct spacing roles/grid relationships and optical offsets |
| Negative space | Does empty space clarify grouping, focus, or pacing? Is anything stranded or padded without purpose? | Redistribute space according to reading/working sequence |
| Information density | Is the visible detail suitable for familiarity, frequency, decision complexity, and input mode? | Remove redundant chrome; adjust disclosure/density without shrinking essential text |
| Visual coherence and restraint | Do color, geometry, imagery, rules, and emphasis belong to one system? Does each decoration earn its place? Do character graphics have an intentional subject, scale and readable poster rather than functioning as tiny compliance stamps? | Reduce competing treatments; unify semantic roles |
| Interaction feedback quality | Are actions, focus, selection, progress, failure, and recovery perceivable, timely, truthful, and proportional? Are primary indicators synchronized immediately; does expressive motion support its artistic or functional purpose without competing with the task? | Align visuals/text with real state; correct timing and focus behavior |
| Aesthetic reference fidelity | Are project-derived material surfaces (default: warm neutral), clear hierarchy, precise alignment, flat selection, restrained technical character, and intentional ambient/reactive/interaction motion recognizable? | Restore visual relationships without reproducing a game layout or assets |
| Avoidance of generic AI-generated patterns | Does each region follow actual content/tasks, rather than stock card grids, badge clusters, fake metrics/proof, repeated generic sections, or retro ornament? | Rebuild the relevant content/composition decision from its purpose |

## Independent acceptance gates

Use **PASS / NEEDS CORRECTION / NOT CHECKED**, or **NOT APPLICABLE with reason**, independently per relevant dimension. Missing evidence is not checked; success elsewhere cannot compensate for a failed task. A narrow fix evaluates affected criteria only.

| Gate | Acceptance outcome | Procedure / evidence owner |
| --- | --- | --- |
| Direction and hierarchy | Approved direction realized; dominant object and stated display/body contrast for substantial work | [Composition](../reasoning/composition.md#three-creative-directions), [rendered QA](../execution/visual-qa.md) |
| Colour and themes | Project-derived palette in the ITM character (default: warm neutral), semantic meaning and legibility in both supported themes | [Palette derivation](../references/palette.md), [tokens](../tokens/README.md), [accessibility](../references/accessibility.md) |
| Responsive | Content priorities, order and operation survive reflow; no page overflow or clipped text | [Frontend contract](../execution/frontend.md#responsive-and-platform-behavior), [rendered QA](../execution/visual-qa.md) |
| Wide-screen use of space | Whole-page evidence includes 1920 and 2560; at 2560 working/data regions occupy about 90–96% width or document a product reason for a narrower region, prose stays within 60–80ch, and page overflow is zero; no stranded tiny UI or unbalanced empty halves | [Frontend limits](../execution/frontend.md#responsive-and-platform-behavior), [measurements/rendered images](../execution/visual-qa.md) |
| Controls and states | Main journey and reachable failure/recovery paths work; focus and state are perceivable | [Frontend interactions](../execution/frontend.md#implement-complete-interactions), [accessibility](../references/accessibility.md) |
| Product and visual quality | Composition serves the task; no material observed hierarchy, cohesion or readability defect remains | Relevant dimensions above, [evidence collection](../execution/visual-qa.md#evidence-record) |
| Preservation | Existing architecture, data contracts, drafts, behavior and authorized scope retained | [Frontend contract](../execution/frontend.md) and affected project checks |

Build/token success cannot establish rendered quality. Captured but unreviewed output cannot pass critique. Motion may be intentionally absent unless the requester's brief requires it. Use one linked evidence record; do not repeat procedures here.

## Conditional ASCII and motion acceptance

For character artwork, use the [artistic acceptance table](../references/ascii-motion.md#recognizable-subject-before-animation-complexity). For animation, use [temporal and lifecycle QA](../execution/motion-qa.md#evidence-and-correction). Link those observations into this review; do not repeat their full checklists. Mechanics tests cannot establish artistic quality, and missing observations remain not checked.
