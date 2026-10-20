# Identity tokens — content version 1.0.0

`light.json` and `dark.json` share primitive/semantic/component keys. `foundation.json` defines spacing, geometry, and typography-role defaults; `motion.json` defines reusable timing resources. The format is a small local schema with `$type`/`$value` leaves, not a claim of full DTCG interchange support.

Aliases reference a complete token path in the merged theme, such as `{primitive.color.paper}` or `{semantic.font.body}`. They must preserve type and resolve without cycles. Supported types: six-digit opaque hex color; dimension in px/rem/em/ch or zero; integer-ms duration; nonnegative finite number; CSS fontFamily string; shadow limited to none. No partial string interpolation is supported.

## Layers and generated names

- Primitive palette/size values: `primitive.color.paper` becomes `--itm-p-color-paper`.
- Semantic roles: `semantic.color.canvas` becomes `--itm-color-canvas`; `semantic.font.navigation` becomes `--itm-font-navigation`.
- Optional component aliases: `component.button.bg` becomes `--itm-c-button-bg`. These do not require a particular component architecture.

Generate [generated.css](generated.css) with `python scripts/tokens.py build`. It defaults to light with explicit `data-theme="light|dark"` support. `check` detects generated-file drift; `validate` checks aliases, units, theme parity, declared contrast pairs, motion contracts, and local Markdown links. Run from the bundle root. These checks cannot evaluate composition, typography cohesion, or rendered motion quality.

## Typography and context

Display, body, heading, technical, data, navigation, control, status, and marker families have explicit semantic roles. The initial mapping uses Departure Mono for short display/technical/markers; sans for headings and the reading stack for body/data/navigation/control/status. Implement permitted contextual changes once through a role mapping, following [typography](../references/typography.md), not as arbitrary overrides per component.

Size primitives include readable text and several display choices. Semantic size values are starting choices; select a coherent product scale from content/platform and document changes. There is no universal maximum page width, display size, grid, density, or breakpoint token. Reading measure, density, and layout belong to the product's design intent.

## Contrast and timing contracts

Text/muted/accentText/error/info are tested at 4.5:1 on canvas/surface. Border/focus are tested at 3:1 on those surfaces. OnSelected is tested at 4.5:1 on selected/selectedHover. The offset focus ring sits on the surrounding surface, not inside an inverted fill. AccentSeed/divider are decorative; new combinations, imagery, transparency, and charts require actual composed-color measurement.

Default decorative duration/steps give 8 steps/sec; selection state and its primary indicator use zero duration/steps. Separate expressive effects may use the decorative cadence. Real input/state response has zero intentional delay. Timing tokens are resources, not instructions to animate every component. Validate actual effects using [motion QA](../execution/motion-qa.md).

For native projects resolve aliases into their existing resource system and convert web reference units appropriately; see [frontend execution](../execution/frontend.md). No CSS framework or runtime dependency is required.

Motion duration/steps describe an optional short sequence. `ambientCycle` is an example periodic cycle, not a run-time cap; `reactiveFps` is a sampling default. v1.3 removes `maximumAutoRun`/`maximumRepeats`: lifecycle/controls determine eligibility, not a universal repeat ceiling.
