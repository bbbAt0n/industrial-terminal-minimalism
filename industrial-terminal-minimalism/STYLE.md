# Industrial Terminal Minimalism — Design DNA

Version **1.0.0**. Normative identity specification. MUST indicates a requirement; SHOULD indicates a default with a documented contextual reason for departure. Tokens provide values, while this document defines their relationships and use. Design quality also requires [the critique rubric](validation/rubric.md).

## Identity and reference interpretation

Primary influence: NieR's light system UI. Preserve its warm continuous surfaces, strong hierarchy, quiet secondary information, precise alignment, flat selection, and visual restraint. Secondary influences: Alien industrial terminals and cassette futurism, expressed through operational clarity, restrained technical language, discrete feedback, and purposefully composed character graphics.

These are aesthetic relationships, not page structures. A marketing narrative, mobile task, desktop workspace, and analytical screen can share this DNA with different information architectures. Do not copy game imagery/icons or reconstruct their inventory/navigation layouts. See [reference analysis](references/visual-reference.md).

## Stable identity versus contextual choices

| Shared identity | Chosen for the actual product |
| --- | --- |
| Warm neutral palette and semantic state colors | Region count, content order, navigation and interaction models |
| Departure Mono plus one coherent reading face where needed | Type sizes, display prominence, reading measure |
| Precise alignment, intentional spacing rhythm | Grid tracks, container width, breakpoints, relative proportions |
| Square/minimally rounded geometry and restrained depth | Density, section spacing, amount/distribution of negative space |
| Functional rules, meaningful selection and feedback | Cards, tables, imagery, panes, progressive disclosure when justified |
| Purposeful ASCII and discrete motion vocabulary | Which moments deserve those treatments, including intentional absence |

No universal 12-column grid, master/detail layout, hero, fixed section sequence, or screen title size is prescribed. Alignment can use any suitable grid. Spacing/type scales are implementation resources; they do not choose the composition.

## Palette and surface relationships

| Role | Light | Dark |
| --- | --- | --- |
| Canvas | `#E9E6DF` | `#151714` |
| Secondary surface | `#D4D0C6` | `#242722` |
| Primary text | `#2E3432` | `#DCD6C5` |
| Warm accent seed | `#99734C` | `#C99A56` |

Light is primary for new products; preserve explicit existing user preferences. Dark translates the same hierarchy and relationships. Use [semantic tokens](tokens/README.md) for interfaces and propagate them into charts/canvas/native resources where relevant.

Keep large surfaces neutral. Accent establishes emphasis or operational meaning without becoming a default background treatment. Use `accentText`, not the light accent seed, for contrast-safe functional text. `border` serves necessary boundaries; `divider` is a quieter decorative/grouping rule. Pair `selected` / `onSelected` for bounded inversion and `selectedHover` for its hover state. If widespread inversion would overwhelm the page, use a smaller selected marker with explicit semantics instead of filling every selected region.

Muted red and blue are reserved for meaningful error, information, or connection states. Warning may use warm accent text; success is normally neutral with explicit words. Never rely on color alone. Measure actual composed foreground/background pairs, including new surfaces or imagery. Token validation covers only its declared opaque pairs.

## Typography and cohesion

Use the [typography role system](references/typography.md). A coherent sans family leads headings, reading and controls. Departure Mono supplies technical identity and may lead justified short instrument displays. The same semantic role must retain a coherent family, size tier, weight, line height, tracking, and case policy across the interface.

Do not select a font independently for each component, alternate mono/sans arbitrarily between sibling labels, or rely on synthesized Departure Mono weights. Font fallbacks preserve roles. A product may adjust its display scale or choose a denser label treatment without changing the role logic. Baseline 16px body and 14px metadata are starting values; text scaling and platform legibility take priority.

## Geometry, rhythm, and negative space

- Use the 4px spacing family as a starting rhythm. Apply perceptible relationships: tighter within a group, more separation between groups, and larger intervals for major shifts in meaning. Large editorial/marketing spaces are legitimate when they support reading or emphasis. Empty space must have a compositional purpose.
- Default radius is 0; up to 2px or required native geometry is acceptable. Rules are usually 1 CSS px. Keep optical alignment and device scaling in mind rather than treating raw pixels as cross-platform units.
- Ordinary UI has no decorative shadows. Use a functional border/backdrop for overlays; retain necessary native presentation conventions.
- Standard web controls target at least 44px height. Dense desktop rows may be smaller where appropriate, while satisfying applicable target-size/accessibility requirements. Touch layouts need their own comfortable hit areas.
- Focus must be visible, unobscured, and distinct from selection or invalid state. The supplied default is a 2px outline with a 3px offset onto a tested adjacent surface.
- Cards and borders require real grouping/interaction meaning. Avoid repeated containers whose only role is decorating metrics or filling a grid. Open regions are useful where they clarify relationships, not a mandate for all content.

## ASCII and technical character

Use ASCII as an expressive medium: authored fields, silhouettes, spatial relationships and product transformations may be substantial visual subjects for artistic, atmospheric, explanatory or functional purposes. Small status companions and separators remain useful; they are not the limit of the vocabulary. See [ASCII art direction and implementation](references/ascii-motion.md). ASCII is not a quota or a required prefix on every section. Hide decorative sequences from assistive technology; retain meaningful text and semantic status/progress. Long separators should be CSS/native rules, not unwrappable character runs.

Choose art for its product context and composition; avoid frames around every field, fake command syntax, invented telemetry, and glyph-only or false-affordance actions. The product should feel deliberately engineered without forcing console interaction onto ordinary tasks.

## Motion identity

Ambient compositions may loop continuously; reactive fields follow real application data; interaction effects accompany a deliberate action. These modes can coexist with discrete reveals and operational feedback. Artistic expression is a valid purpose, independent of technical process explanation. Avoid competing focal movement; no fixed animation count or universal duration limit applies. Tabs, focus, selection and their primary indicators MUST synchronize immediately; do not animate a trailing underline to manufacture motion. An independently meaningful secondary effect must never suggest stale selection. Choose them for a reason and validate them over time; see [motion principles and QA](execution/motion-qa.md).

Selected decorative motion normally uses 6–12 steps/sec (default 8); actual data, focus, input, and application rendering remain responsive and independent of that cadence. Reduced motion removes unnecessary movement while preserving task meaning and completion. Do not add animation everywhere or remove useful motion to simplify validation.

## Restrictions and quality boundary

Forbidden: Matrix black/green and neon-green hacker identity; aggressive cyberpunk colors; excessive neon, glow, gradients, shadows or arbitrary effects; heavy CRT distortion; constant glitch/flicker; generic AI-generated SaaS arrangements with excessive cards, badges, decorative icons, or empty sections.

Conventional patterns remain usable when justified by real content and tasks. A credible marketing argument, useful comparison, or efficient desktop workspace should keep its appropriate composition. Technical compliance and surface styling cannot compensate for weak hierarchy, inconsistent type, careless spacing, irrelevant imagery, confusing feedback, or copied generic structure. Review those dimensions explicitly before delivery.
