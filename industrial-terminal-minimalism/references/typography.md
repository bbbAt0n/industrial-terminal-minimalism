# Typography roles and cohesion

Typography is one system across the product. Define role assignments before styling components; preserve them across routes, states, themes, and responsive sizes. Use Departure Mono for the identity it contributes, not indiscriminately for every word.

## Role contracts

| Role | Preferred treatment | Contextual rule |
| --- | --- | --- |
| Display / expressive title | Controlled reading sans by default; Departure Mono regular for justified short instrument displays | Short product statements or prominent titles. Choose scale from content and composition; do not force 44px, all caps, or one-line fitting. A long editorial title can use the reading family if justified while nearby technical/display roles retain identity. |
| Body / explanatory copy | One highly legible reading family, normal sentence case, comfortable measure/leading | Longer prose, instructions, help, legal text, and unfamiliar decisions. Do not set long paragraphs in pixel monospace solely for branding. |
| Section headings | A consistent heading role, default reading sans | Reading-heavy products can use a reading-family heading role consistently; do not alternate sibling headings randomly. Distinguish hierarchy without inventing extra font families. |
| Technical labels / identifiers | Departure Mono, short, stable case/tracking | IDs, codes, technical metadata, command/code content. Human prose and ordinary field labels do not become technical merely because they appear in a tool. |
| Numeric data | Reading face with tabular figures by default; Departure Mono for technical fixed-width values when useful | Choose one mapping per comparable data group/column. Align comparable numbers and preserve units/precision. Numbers in prose follow the body face. No random mono/sans alternation within peers. |
| Navigation | Reading face by default; Departure Mono can serve concise technical navigation | Choose a single navigation role for the product or a clearly distinct navigation level. Match familiarity, label length, scanability, and platform. Changing selected state does not change the font family. |
| Form controls / labels | Reading face by default for editing, label clarity, and native convention | Use the same label/input role logic throughout. Actual code/ID inputs may use the technical role. Placeholder is not a label. Avoid a new font for each control type. |
| Status / feedback | Reading face for the message; optional Departure Mono marker or short code | Keep the human-readable message primary. If markers are used, assign a stable companion role; do not render unrelated halves of the same sentence in different families. |

The supplied font-role defaults in [foundation.json](../tokens/foundation.json) are a coherent starting mapping. A product can deliberately choose a permitted contextual variation once at the semantic-role level. Record the reason and apply it to all equivalent elements. A different breakpoint can change scale/measure without arbitrarily changing role/family.

## Scale, measure, and hierarchy

Use one small type scale and a clear mapping to semantic roles. Body 16px and metadata 14px are starting values, not universal pixel constraints. Choose display/heading sizes, line breaks, line heights, tracking, case, and reading measure from the actual content and available space. Compact expert tools, narrative websites, and mobile tasks can differ. Avoid tiny text as a density fix, excessive uppercase, and tracking applied to long sentences.

Departure Mono has one regular face: do not synthesize bold/italic for hierarchy. Use size, placement, spacing, or inversion. The author's [README](https://github.com/rektdeckard/departure-mono/blob/main/README.md) recommends 11px increments for pixel-perfect sizes; 22/33/44/66/88px can be useful display choices. Readability, scaling, and actual content take precedence; essential labels need not be 11px multiples.

## Families, loading, and fallback

Default mono stack: `"Departure Mono", "SFMono-Regular", Consolas, "Liberation Mono", monospace`. Default reading stack: `system-ui, -apple-system, "Segoe UI", sans-serif`. Preserve a suitable existing reading family instead of adding another. A product normally needs only the identity family and one reading family; script-specific fallbacks are not ornamental font mixing.

No font binary is bundled. Obtain the font from the [author's releases](https://github.com/rektdeckard/departure-mono/releases), inspect its SIL Open Font License/copyright requirements, and vendor it in the product when reliable availability is necessary. Use the real local asset path and `font-display: swap` on the web; do not add a broken URL or require a font service. Native implementations use their platform's font-loading system. Use `font-synthesis: none` for this face.

Test actual loading and forced absence, long titles/labels, editable text, tabular values, diacritics/localization, and text scaling. Inspect repeated headings, navigation items, field labels, and status messages side by side. Cohesion is verified in the rendered interface, not by the presence of two font-family declarations.
