# Frontend execution

For Full Redesign consume the product's design intent from [reasoning](../reasoning/product-analysis.md); bounded edits preserve existing intent and roles without that reading. Implement the chosen relationships and behavior, rather than treating token substitution as the completed design.

## Map intent to the existing system

Inspect framework conventions, theme ownership, shared controls, route/state management, data contracts, assets, localization, and relevant test/build commands. Reuse these boundaries. Do not replace application architecture, add a web view to a native app, upgrade a CSS framework, or install an animation/component library solely to obtain the aesthetic.

Map [DNA tokens](../tokens/README.md) into existing semantic roles. Build the chosen direction with one dominant object per screen and real type-scale contrast; state display/body sizes and their ratio. Assign every colour a meaning, consistent across controls, charts and native resources. Ship light and dark themes from semantic tokens through one theme controller; follow [user/project/system precedence](../STYLE.md#palette-and-surface-relationships) and preserve native-control color scheme. Add product-specific scale/layout roles only as justified by design intent.

Assign the [typography roles](../references/typography.md) when establishing or changing type treatment. Preserve existing role definitions for an isolated spacing or behavior correction; no font-selection exercise is needed. Reuse roles for repeated content across screens. Extract components from actual repeated behavior/structure, not speculative template families. Component names should describe product meaning or behavior, not a fixed page position.

## Implement complete interactions

- Follow the [semantic/control accessibility contract](../references/accessibility.md) using existing platform primitives; visual appearance must not misrepresent behavior.
- Bind controls to application state and actions. A prominent action must have a meaningful result. Follow the [production/demo data contract](../SKILL.md#scope-and-precedence): a requested demo may use labeled sample data and simulated interactions; production data and progress must reflect real operations.
- Implement default, hover, press, visible keyboard focus on every control, selection and disabled states. Design reachable empty, loading and error states, plus success/recovery where applicable; keep feedback near its cause and preserve entered context and layout stability.
- Inspect the rendered browser/native parts of controls such as progress and selection: an accent-color declaration may not theme every part. Preserve semantics and forced/system-color behavior while correcting unintended palette defaults.
- Live validation/filtering must retain an active editor, its draft and focus. If repair makes an item leave the current view, defer that removal until a suitable commit/blur boundary rather than interrupting typing.
- Async operations need clear ownership, duplicate-action handling, and cancellation/retry where warranted. Prevent stale completions from overwriting newer selections or input. Loading is not a reason to block unrelated interactions.
- Only when selected by the task, implement animation through [motion QA](motion-qa.md), artwork through [ASCII guidance](../references/ascii-motion.md), and a relevant [local example](../examples/living-ascii/README.md) if its mechanics are reused.
- Implement overlays with accessible naming, dismissal, background behavior, and appropriate focus return. Prefer the existing accessible/native primitive over a custom approximation.

## Responsive and platform behavior

Choose breakpoints from observed content failures. Required verification widths are **390 / 768 / 1440 / 1920 / 2560 CSS px** with no horizontal page overflow or clipped text; add narrower checks when required by the product. Reflow priority, navigation, grouping and controls instead of scaling down desktop composition. Preserve meaningful DOM/accessibility order. Essential wide data may use explicitly labeled, keyboard-accessible local scrolling, never hidden page overflow as a repair.

Use fluid type and spacing between roughly 390 and 2560, bounded with `clamp()`, for example:

```css
:root {
  --body-size: clamp(1rem, .966rem + .14vw, 1.1875rem);
  --display-size: clamp(2.5rem, 1.1rem + 5.75vw, 10.3rem);
  --gutter: clamp(1rem, .5rem + 2vw, 3.5rem);
  --region-gap: clamp(1.25rem, .8rem + 1.8vw, 3.5rem);
}
```

Choose max-widths by region: prose about **60–80ch**, short labels about **16–32ch** with wrapping/truncation only when full text remains available, working/data regions typically **90–96%** of wide viewports with a justified larger cap (for example 2400px at 2560). A prose-only product may remain narrower with a recorded reason. Never center one narrow 1200–1440 column in a huge empty field at 2560; never make body copy full-bleed. Scale outer gutters smoothly and use a consistent inner gap rhythm.

Spend extra width on more meaningful columns, wider data panels/tables/charts, side-by-side detail, larger bounded ASCII/visual objects or denser grids. Keep readable measures inside wide regions. At 1920/2560 reject tiny UI floating in emptiness, stretched prose, overscaled type and unbalanced empty halves. Measure content bounding width as a share of the viewport, prose width in `ch`, and page overflow; justify exceptions by task rather than device name. Inspect **2560 at DPR 1** and **1440 at DPR 2**: equal physical pixel counts do not imply equal CSS layout or canvas presentation.

For mobile, inspect touch reach, software keyboard, safe areas, back behavior, and dynamic text. For desktop, inspect window resizing, focus, shortcuts, pointer and keyboard use, and necessary dense content. Native runtimes require their own control/resource units and OS preferences; browser device emulation cannot establish native behavior.

## Verify and deliver

Run the project's relevant build and behavior checks. Test the primary journey and recovery paths with actual interactions. Perform [accessibility checks](../references/accessibility.md), [visual QA](visual-qa.md), and [motion QA](motion-qa.md) when applicable. Correct defects and refresh evidence after changes.

Report the intent-to-implementation mapping, changed scope, evidence, corrections, and remaining limitations. Do not count token validity, a clean build, or a set of rendered images as proof of visual design quality. No new runtime dependency is required by this skill.
