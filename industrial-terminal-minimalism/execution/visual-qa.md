# Render, interact, critique, correct

Review only dimensions relevant to the scope, using the [rubric](../validation/rubric.md) for a whole-page audit. A bounded fix needs affected checks, not every dimension. This document owns evidence collection, not another checklist of criteria. No single page geometry is the target.

## Establish available evidence

Identify which tools can render the target, inspect rendered images, exercise interactions, inspect semantics, and capture motion. Use suitable available tools during implementation. Tool availability does not depend on a specific agent or browser library.

For each unavailable capability, state the affected checks and exact manual procedure. Image capture without image inspection is **captured, unreviewed**. A rendered image without interactive testing leaves behavior **not checked**. A static frame leaves temporal behavior **not checked**. Do not report the whole result as validated when a relevant dimension is not checked.

## Inspect representative output

1. Render realistic content in primary light mode and the dark translation. Check actual fonts and fallback behavior. Capture viewport views at readable scale, useful full-page context, and crops of important controls/states. Avoid judging a tall page only from a heavily reduced image.
   Apply the [font verification/fallback contract](../references/typography.md#verify-the-face-then-verify-the-fallback); record its evidence or limitation.
2. Use the [responsive probes](frontend.md#responsive-and-platform-behavior) for whole-page verification in both supported themes; whole-page rendered images must include **390/768/1440/1920/2560 CSS px** in both supported themes; without 1920 and 2560 a whole-page result cannot pass. A narrow fix needs affected sizes/states. At 1920/2560 record content bounding width / viewport (%) and maximum body-copy line measure in `ch`, using the [frontend limits](frontend.md#responsive-and-platform-behavior). Add the [accessibility probes](../references/accessibility.md) as applicable. Measure `document.documentElement.scrollWidth - innerWidth` in the browser: require zero page overflow, inspect text clipping and actual reflow. Never substitute a claim or hidden overflow for this evidence.
3. Exercise the main journey, navigation and recovery with keyboard and pointer/touch as appropriate. Capture visible keyboard focus and reachable empty/loading/error states. Check feedback, selection, disabled controls and live status against actual behavior. Record page exceptions and console errors; offline examples must make zero network requests (observe attempts as well as failures).
4. Inspect empty, loading, invalid, failure, success, long-content, and repeated-action states that the product can reach. Check missing fonts, text scaling/zoom, and platform contrast/motion preferences. An untested native behavior remains not checked even if an equivalent web interaction works.
   Distinguish CSS viewport reflow from actual browser zoom, OS text scaling and physical-device evidence; do not mark one as proof of another.
5. View every PNG at readable/native scale, using tiles for tall pages. Verify the chosen dominant object, stated display/body ratio, assigned colour meanings, contrast and theme parity against the design intent. Record observations and at least one improvement pass with fresh affected renders; rendered images alone or token checks cannot pass visual QA.

## Correct visible problems

Record the problem, its effect on use/design, the responsible decision, and a scoped correction. Examples: a primary task buried below secondary navigation; sibling labels assigned inconsistent fonts; spacing that suggests a false grouping; empty space that breaks the reading sequence; feedback too quiet to notice or too prominent for its importance.

Prioritize task failure, accessibility, and major hierarchy first; then cohesion, density, rhythm, and fine optical alignment. Change composition, content, role mapping, or behavior as needed. Do not treat extra borders, icons, ASCII, or accent as the universal fix. For character graphics, reuse [artistic acceptance](../references/ascii-motion.md#recognizable-subject-before-animation-complexity); for animation, reuse [temporal evidence](motion-qa.md). These observations remain in their owning checks.

Re-render affected sizes/states and re-exercise affected interactions. If a correction touches shared controls or tokens, inspect other changed screens that consume them. Keep evidence tied to the final implementation, not an earlier passing capture. Stop when the stated acceptance criteria are met and no material observed defect remains; do not add unnecessary effects or test permutations merely to extend the process.

## Evidence record

Record implementation revision, environment/surface, viewport/window and input mode, theme/font, tested task/state, rendered image or observation reference, rubric result, corrections, and remaining checks. Use **pass**, **needs correction**, **not checked**, or a reasoned **not applicable**. These describe individual dimensions; they are not a weighted score that can hide a failed task.

For a visual-only review, distinguish observable static issues from behavior hypotheses. For implementation delivery, supply actual interaction evidence when tools permit. Include [temporal evidence](motion-qa.md) when animation is used, and keep native discovery/activation evidence separate from product quality.

For Full Redesign, landing/marketing pages, dashboards and new directions, include one delivery line: **Engine: [approved mode + meaningful element + reason]**, or **Engine omitted: [why none fits]**, per [the decision owner](../SKILL.md#consider-the-living-ascii-engine). Frames/borders/separators are not engine evidence. Record the chosen source, local integration, pause/reduced/offscreen/destroy checks when used.
