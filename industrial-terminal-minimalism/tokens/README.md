# Identity tokens

The light/dark palettes and font stacks are default examples only; project/brand colours and fonts take precedence through [palette derivation](../references/palette.md) and [typography](../references/typography.md).

`light.json` and `dark.json` share primitive/semantic/component keys. `foundation.json` defines spacing, geometry, and typography-role defaults; `motion.json` defines reusable timing resources. The format is a small local schema with `$type`/`$value` leaves, not a claim of full DTCG interchange support.

Aliases reference a complete token path in the merged theme, such as `{primitive.color.paper}` or `{semantic.font.body}`. They must preserve type and resolve without cycles. Supported types: six-digit opaque hex color; dimension in px/rem/em/ch or zero; integer-ms duration; nonnegative finite number; CSS fontFamily string; shadow limited to none. No partial string interpolation is supported.

## Layers and generated names

- Primitive palette/size values: `primitive.color.paper` becomes `--itm-p-color-paper`.
- Semantic roles: `semantic.color.canvas` becomes `--itm-color-canvas`; `semantic.font.navigation` becomes `--itm-font-navigation`.
- Optional component aliases: `component.button.bg` becomes `--itm-c-button-bg`. These do not require a particular component architecture.

Generate [generated.css](generated.css) with `python scripts/tokens.py build`. The CSS alone defaults to light with explicit `data-theme="light|dark"` support; it does not implement system preference detection or persistence. Resolve [user/project/system theme precedence](../STYLE.md#palette-and-surface-relationships) in the app's single theme controller, then set `data-theme` and the corresponding native-control `color-scheme`. `check` detects generated-file drift; `validate` checks aliases, units, theme parity, declared contrast pairs, motion contracts, and local Markdown links. Run from the bundle root. These checks cannot evaluate composition, typography cohesion, or rendered motion quality.

## Typography and context

Display, body, heading, technical, data, navigation, control, status, and marker families have explicit semantic roles. Display/heading/body/data/navigation/control/status default to the reading sans stack; technical/marker default to optional Departure Mono with mono fallbacks; a verified project-selected mono can replace that default. For a justified short instrument display, map display to technical once at the product-role level. Follow [typography](../references/typography.md), not arbitrary overrides per component.

Size primitives include readable text and several display choices. Semantic size values are starting choices; select a coherent product scale from content/platform and document changes. There is no universal maximum page width, display size, grid, density, or breakpoint token. Reading measure, density, layout and required 390–2560 width coverage follow [frontend responsive guidance](../execution/frontend.md#responsive-and-platform-behavior).

## Contrast and timing contracts

Text/muted/accentText/error/info are tested at 4.5:1 on canvas/surface. Border/focus are tested at 3:1 on those surfaces. OnSelected is tested at 4.5:1 on selected/selectedHover. The offset focus ring sits on the surrounding surface, not inside an inverted fill. AccentSeed/divider are decorative; new combinations, imagery, transparency, and charts require actual composed-color measurement.

Default decorative duration/steps give 8 steps/sec; selection state and its primary indicator use zero duration/steps. Separate expressive effects may use the decorative cadence. Real input/state response has zero intentional delay. Timing tokens are resources, not instructions to animate every component. Validate actual effects using [motion QA](../execution/motion-qa.md).

For native projects resolve aliases into their existing resource system and convert web reference units appropriately; see [frontend execution](../execution/frontend.md). No CSS framework or runtime dependency is required.

Motion duration/steps describe an optional short sequence. `ambientCycle` is an example periodic cycle, not a run-time cap; `reactiveFps` is a sampling default. Lifecycle and controls determine eligibility, with no universal repeat ceiling.

## Validate a project palette

Run `python scripts/tokens.py validate-palette tokens/examples/palette-research.json` from this bundle, or supply your own JSON path. Format: `{"light": {"canvas": "#RRGGBB", ...}, "dark": {...}}`, with one or both themes. Each theme must contain exactly canvas, surface, text, muted, accentSeed, accentText, border, divider, focus, selected, onSelected, selectedHover, error and info as opaque six-digit hex. All declared pairs above are printed, with the tightest pair relative to its threshold; failures exit non-zero. Decorative accentSeed/divider still require inspection in context.

The small [example palettes](examples/) are taste references with worked roles and measured results in [palette.md](../references/palette.md), not replacement defaults. Validate, render and inspect a derived palette before adoption. `check` and `validate` retain their shipped-token behavior and output.
