# Frontend execution

Consume the product's design intent from [reasoning](../reasoning/product-analysis.md). Implement the chosen relationships and behavior, rather than treating token substitution as the completed design.

## Map intent to the existing system

Inspect framework conventions, theme ownership, shared controls, route/state management, data contracts, assets, localization, and relevant test/build commands. Reuse these boundaries. Do not replace application architecture, add a web view to a native app, upgrade a CSS framework, or install an animation/component library solely to obtain the aesthetic.

Map [DNA tokens](../tokens/README.md) into existing semantic roles. Add project-specific type-size, spacing, density, and layout roles only as justified by design intent. Keep color meanings consistent across HTML, charts, canvas, and native resources. Maintain a single theme controller; preserve explicit user preferences. Set native-control color scheme through the project's existing mechanism.

Assign the [typography roles](../references/typography.md) before styling individual components. Reuse role definitions for repeated content across screens. Extract components from actual repeated behavior/structure, not speculative template families. Component names should describe product meaning or behavior, not a fixed page position.

## Implement complete interactions

- Use semantic headings, navigation, links, buttons, labels, lists, tables, and platform accessibility primitives. Visual appearance must not misrepresent behavior. ARIA roles require their full keyboard/interaction contract.
- Bind controls to real application state and actions. A prominent action must have a meaningful result. Do not present fake network activity, fabricated progress percentages, invented metrics, or decorative charts as product functionality. Simulation is permitted only when the task explicitly calls for a clearly identified prototype/evaluation.
- Implement applicable default, hover, press, focus, selection, disabled, loading, empty, error, success, and recovery states. Keep feedback close to its cause and preserve layout stability and entered context where possible.
- Inspect the rendered browser/native parts of controls such as progress and selection: an accent-color declaration may not theme every part. Preserve semantics and forced/system-color behavior while correcting unintended palette defaults.
- Live validation/filtering must retain an active editor, its draft and focus. If repair makes an item leave the current view, defer that removal until a suitable commit/blur boundary rather than interrupting typing.
- Async operations need clear ownership, duplicate-action handling, and cancellation/retry where warranted. Prevent stale completions from overwriting newer selections or input. Loading is not a reason to block unrelated interactions.
- Implement the selected Motion & ASCII opportunities using [motion principles](motion-qa.md) and [lightweight rendering guidance](../references/ascii-motion.md). Represent actual state immediately; decorative stepping must not throttle rendering, input, or data updates. Give each effect a lifecycle owner, cycle or endpoint and cleanup path. Use [native/local examples](../examples/living-ascii/README.md) only as optional mechanics. Suspend actual scheduling while ineligible; react to dynamic preferences. No remote or added animation runtime dependency is needed.
- Implement overlays with accessible naming, dismissal, background behavior, and appropriate focus return. Prefer the existing accessible/native primitive over a custom approximation.

## Responsive and platform behavior

Choose breakpoints from observed content failures. Re-evaluate task priority, navigation, grouping, reading order, and controls as space/input changes; do not simply shrink type or stack desktop chrome above the task. Preserve meaningful DOM/accessibility order. Local scrolling can be appropriate for wide data, code, and canvases when labeled and keyboard accessible.

For mobile, inspect touch reach, software keyboard, safe areas, back behavior, and dynamic text. For desktop, inspect window resizing, focus, shortcuts, pointer and keyboard use, and necessary dense content. Native runtimes require their own control/resource units and OS preferences; browser device emulation cannot establish native behavior.

## Verify and deliver

Run the project's relevant build and behavior checks. Test the primary journey and recovery paths with actual interactions. Perform [accessibility checks](../references/accessibility.md), [visual QA](visual-qa.md), and [motion QA](motion-qa.md) when applicable. Correct defects and refresh evidence after changes.

Report the intent-to-implementation mapping, changed scope, evidence, corrections, and remaining limitations. Do not count token validity, a clean build, or a set of screenshots as proof of visual design quality. No new runtime dependency is required by this skill.
