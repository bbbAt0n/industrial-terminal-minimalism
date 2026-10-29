# Product, visual, and implementation review rubric

Use these as independent review dimensions, not fixed layout formulas or a numerical style score. Evaluate the rendered interface and actual journeys against the product's design intent and [DNA](../STYLE.md). Supply an observation and evidence for each relevant dimension.

| Dimension | Review questions | Typical correction |
| --- | --- | --- |
| Composition and visual hierarchy | Does attention follow the user's priorities? Are dominant regions/actions deserved and groups meaningful at each size? | Reorder, regroup, change emphasis or navigation; do not add a default hero/sidebar |
| Typography consistency | Do repeated roles share family, scale, weight, case, tracking, and line-height logic? Are Departure Mono and the reading face used intentionally? | Repair role assignments and the shared scale, rather than patching individual fonts |
| Spacing rhythm and alignment | Are within/between-group relationships clear? Do baselines, edges, and comparable values align without accidental near-misses? | Correct spacing roles/grid relationships and optical offsets |
| Negative space | Does empty space clarify grouping, focus, or pacing? Is anything stranded or padded without purpose? | Redistribute space according to reading/working sequence |
| Information density | Is the visible detail suitable for familiarity, frequency, decision complexity, and input mode? | Remove redundant chrome; adjust disclosure/density without shrinking essential text |
| Visual coherence and restraint | Do color, geometry, imagery, rules, and emphasis belong to one system? Does each decoration earn its place? Do character graphics have an intentional subject, scale and readable poster rather than functioning as tiny compliance stamps? | Reduce competing treatments; unify semantic roles |
| Interaction feedback quality | Are actions, focus, selection, progress, failure, and recovery perceivable, timely, truthful, and proportional? Are primary indicators synchronized immediately; does expressive motion support its artistic or functional purpose without competing with the task? | Align visuals/text with real state; correct timing and focus behavior |
| Aesthetic reference fidelity | Are warm surfaces, clear hierarchy, precise alignment, flat selection, restrained technical character, and intentional ambient/reactive/interaction motion recognizable? | Restore visual relationships without reproducing a game layout or assets |
| Avoidance of generic AI-generated patterns | Does each region follow actual content/tasks, rather than stock card grids, badge clusters, fake metrics/proof, repeated generic sections, or retro ornament? | Rebuild the relevant content/composition decision from its purpose |

## Independent acceptance gates

- **Product fit:** Users can identify the purpose, find the next relevant action, complete the main journey, and recover from the specified failures. The composition suits content, audience, platform, and available space.
- **Visual quality:** All applicable dimensions above have been inspected with evidence. Tokens and semantic correctness are necessary implementation aids, not sufficient proof of design quality. No material observed hierarchy/cohesion/readability defect remains.
- **Execution:** Relevant functionality, semantics, accessibility, themes, responsive behavior, typography/fallbacks, and state transitions are exercised. The Motion & ASCII Opportunity Assessment is reviewed against the result. Motion is inspected temporally when present, including art-direction suitability; correct timing alone cannot pass it. Preserve existing architecture and requested scope.

Use **pass**, **needs correction**, **unverified**, or **not applicable with reason** per dimension/gate. An unavailable tool creates an unverified result; a high score elsewhere cannot compensate. Capture-only evidence does not pass visual critique. No motion can be appropriate in some products; it cannot pass an evaluation whose brief explicitly requires motion.

During cross-product evaluation, compare outcomes only after independent runs are complete. Shared identity should remain recognizable while composition follows each brief. If changing category mainly replaces labels or fixture data in the same structure, investigate adaptation failure. Different structure alone does not prove good design; each result must independently serve its task.

## Conditional ASCII and motion acceptance

For character artwork, use the [artistic acceptance table](../references/ascii-motion.md#recognizable-subject-before-animation-complexity). For animation, use [temporal and lifecycle QA](../execution/motion-qa.md#evidence-and-correction). Link those observations into this review; do not repeat their full checklists. Mechanics tests cannot establish artistic quality, and missing observations remain unverified.
