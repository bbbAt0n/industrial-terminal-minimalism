# Render, interact, critique, correct

Use the [rubric](../validation/rubric.md) to evaluate actual visual quality alongside functional correctness. The rubric contains the review dimensions; this document defines how to obtain evidence. No single page geometry is the target.

## Establish available evidence

Identify which tools can render the target, inspect screenshots, exercise interactions, inspect semantics, and capture motion. Use suitable available tools during implementation. Tool availability does not depend on a specific agent or browser library.

For each unavailable capability, state the affected checks and exact manual procedure. Screenshot capture without image inspection is **captured, unreviewed**. A screenshot without interactive testing leaves behavior **unverified**. A static frame leaves temporal behavior **unverified**. Do not report the whole result as validated when a relevant dimension is unverified.

## Inspect representative output

1. Render realistic content in primary light mode and the dark translation. Check actual fonts and fallback behavior. Capture viewport views at readable scale, useful full-page context, and crops of important controls/states. Avoid judging a tall page only from a heavily reduced image.
   Verify actual rendered font families, not only a font declaration or successful load flag. Inspect pixel-face metadata at native scale and contextual headline wrapping. A failed local font source can still resolve to an installed family; explicitly force absence and verify the rendered fallback.
2. Choose sizes from the product's operating range and actual failure points. For web work include narrow reflow (320 CSS px where applicable), an intermediate size, and a wide size. Verify content/task order, usable line lengths, grouping, alignment, and action discoverability. No horizontal overflow is necessary in many views but insufficient for a good composition.
3. Exercise the main user journey, secondary navigation, and relevant failure/recovery paths. Use keyboard and pointer/touch as appropriate. Check that visible feedback, focus, selected state, disabled state, and live task status agree with actual behavior.
4. Inspect empty, loading, invalid, failure, success, long-content, and repeated-action states that the product can reach. Check missing fonts, text scaling/zoom, and platform contrast/motion preferences. An untested native behavior remains unverified even if an equivalent web interaction works.
   Distinguish CSS viewport reflow from actual browser zoom, OS text scaling and physical-device evidence; do not mark one as proof of another.
5. Review each visual dimension with a concrete observation and evidence location. Compare the result to its design intent and the reference's aesthetic relationships, not to the reference's screen arrangement. Ask whether the composition serves this product rather than merely wearing the palette.

## Correct visible problems

Record the problem, its effect on use/design, the responsible decision, and a scoped correction. Examples: a primary task buried below secondary navigation; sibling labels assigned inconsistent fonts; spacing that suggests a false grouping; empty space that breaks the reading sequence; feedback too quiet to notice or too prominent for its importance.

Prioritize task failure, accessibility, and major hierarchy first; then cohesion, density, rhythm, and fine optical alignment. Change composition, content, role mapping, or behavior as needed. Do not treat extra borders, icons, ASCII, or accent as the universal fix. Inspect character graphics for broken cell geometry, overflow, false affordances and an unconvincing static poster. Inspect actual normal-speed movement and loop boundaries as well as frames. A technically correct animation with weak silhouette, texture, depth, pacing, composition or inappropriate salience requires correction.

Re-render affected sizes/states and re-exercise affected interactions. If a correction touches shared controls or tokens, inspect other changed screens that consume them. Keep evidence tied to the final implementation, not an earlier passing capture. Stop when the stated acceptance criteria are met and no material observed defect remains; do not add unnecessary effects or test permutations merely to extend the process.

## Evidence record

Record implementation revision, environment/surface, viewport/window and input mode, theme/font, tested task/state, screenshot or observation reference, rubric result, corrections, and remaining checks. Use **pass**, **needs correction**, **unverified**, or a reasoned **not applicable**. These describe individual dimensions; they are not a weighted score that can hide a failed task.

For a visual-only review, distinguish observable static issues from behavior hypotheses. For implementation delivery, supply actual interaction evidence when tools permit. Include [temporal evidence](motion-qa.md) when animation is used, and keep native discovery/activation evidence separate from product quality.
