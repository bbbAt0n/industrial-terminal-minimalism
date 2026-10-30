# Industrial Terminal Minimalism — Design DNA

Normative identity specification within the scope chosen by the requester/project. The [scope and precedence rules](SKILL.md#scope-and-precedence) take priority over stylistic defaults. MUST indicates a requirement; SHOULD indicates a default with a contextual reason for departure. Tokens provide values, while this document defines their relationships and use. The [rubric](validation/rubric.md) expands the visual review criteria when needed.

## Identity and reference interpretation

Primary influences: warm paper system UI, industrial terminal, cassette futurism. Preserve continuous material-like surfaces (warm paper is the default example), strong hierarchy, quiet secondary information, precise alignment, flat selection, and visual restraint. Express these influences through operational clarity, restrained technical language, discrete feedback, and purposefully composed character graphics.

These are aesthetic relationships, not page structures. A marketing narrative, mobile task, desktop workspace, and analytical screen can share this DNA with different information architectures. Do not copy game imagery/icons or reconstruct their inventory/navigation layouts. See [reference analysis](references/visual-reference.md).

## Stable identity versus contextual choices

| Shared identity | Chosen for the actual product |
| --- | --- |
| Project-derived palette in the ITM character (default: warm neutral) and semantic state colors | Region count, content order, navigation and interaction models |
| Coherent project-selected sans roles plus optional verified technical mono (shipped stacks are defaults) | Type sizes, display prominence, reading measure |
| Precise alignment, intentional spacing rhythm | Grid tracks, container width, breakpoints, relative proportions |
| Square/minimally rounded geometry and restrained depth | Density, section spacing, amount/distribution of negative space |
| Functional rules, meaningful selection and feedback | Cards, tables, imagery, panes, progressive disclosure when justified |
| Purposeful ASCII and discrete motion vocabulary | Which moments deserve those treatments, including intentional absence |

No universal 12-column grid, master/detail layout, hero, fixed section sequence, or screen title size is prescribed. Alignment can use any suitable grid. Spacing/type scales are implementation resources; they do not choose the composition.

## Palette and surface relationships

Project/brand colours and an existing design system outrank the shipped defaults. Identity is the **colour character and role logic**, not specific hex values. Derive and validate palettes through [the palette owner](references/palette.md). The table below is the **default example palette** shipped in `tokens/`, used only when the project has no colours of its own and no better project-derived palette is chosen.

| Default example role | Light | Dark |
| --- | --- | --- |
| Canvas | `#E9E6DF` | `#151714` |
| Secondary surface | `#D4D0C6` | `#242722` |
| Primary text | `#2E3432` | `#DCD6C5` |
| Warm accent seed | `#99734C` | `#C99A56` |

Light is the primary aesthetic reference, not a runtime override. Preserve the project's existing theme controller and supported themes. For a new controller, resolve an explicit user choice (light/dark/system), then the project's configured default when no user choice exists (default: system), then the OS preference in system mode, then light if the preference API is unavailable. An explicit user light/dark choice wins over project defaults and OS changes; system mode follows OS changes. Persist the requester's chosen mode, not each resolved OS colour. A documented project/platform constraint may limit supported themes; do not silently remove an existing user choice. Use one controller across UI, charts/canvas and native resources, with matching native-control colour scheme. Test both supported themes regardless of the initial preference. [Tokens](tokens/README.md) provide values, not a preference controller.

Keep large surfaces neutral or on one restrained tinted ground. Accent establishes emphasis or operational meaning without becoming a default background treatment. Use the validated `accentText`, not an unvalidated accent seed, for contrast-safe functional text. `border` serves necessary boundaries; `divider` is a quieter decorative/grouping rule. Pair `selected` / `onSelected` for bounded inversion and `selectedHover` for its hover state. If widespread inversion would overwhelm the page, use a smaller selected marker with explicit semantics instead of filling every selected region.

Project-derived muted semantic colours express error, information or connection states with words/shape. Warning may use the signal accent text; success is normally neutral with explicit words. [Accessibility](references/accessibility.md) owns composed-colour contrast and non-colour meaning requirements.

## Typography and cohesion

Sans leads display, headings, reading and controls; an optional project-selected verified mono (Departure Mono is a shipped default only) supplies technical/marker roles and justified short instrument displays. Keep equivalent roles coherent. The [typography contract](references/typography.md) owns assignments, user-provided fonts, verification, fallback, scale and synthesis rules; [foundation tokens](tokens/foundation.json) supply defaults.

## Geometry, rhythm, and negative space

- Use the 4px spacing family as a starting rhythm. Apply perceptible relationships: tighter within a group, more separation between groups, and larger intervals for major shifts in meaning. Large editorial/marketing spaces are legitimate when they support reading or emphasis. Empty space must have a compositional purpose.
- Default radius is 0; up to 2px or required native geometry is acceptable. Rules are usually 1 CSS px. Keep optical alignment and device scaling in mind rather than treating raw pixels as cross-platform units.
- Ordinary UI has no decorative shadows. Use a functional border/backdrop for overlays; retain necessary native presentation conventions.
- Control geometry and focus tokens support the [accessibility contract](references/accessibility.md); use that owner for target sizes and focus requirements.
- Cards and borders require grouping/interaction meaning. Follow the [user-requested-card precedence](SKILL.md#scope-and-precedence), including metric cards in a monitoring dashboard; keep comparable values aligned and avoid redundant nested frames. Avoid gratuitous containers added only to decorate metrics or fill a grid. Open regions are an option, not a mandate.

## ASCII and technical character

Use ASCII as an expressive medium: authored fields, silhouettes, spatial relationships and product transformations may be substantial visual subjects for artistic, atmospheric, explanatory or functional purposes. Small status companions and separators remain useful; they are not the limit of the vocabulary. See [ASCII art direction and implementation](references/ascii-motion.md). ASCII is not a quota or a required prefix on every section. Use CSS/native rules for long separators; [accessibility](references/accessibility.md) owns decorative-content semantics.

Choose art for its product context and composition; avoid frames around every field, fake command syntax, telemetry presented as real when it is synthetic, and glyph-only or false-affordance actions. Labeled demo data follows [SKILL.md](SKILL.md#scope-and-precedence). The product should feel deliberately engineered without forcing console interaction onto ordinary tasks.

## Motion identity

Artistic atmosphere, real-data response and interaction feedback are valid when their prominence serves the composition. Selection and its primary indicator change immediately; expressive motion must not suggest stale state. No mandatory animation count or universal duration cap applies. [Motion QA](execution/motion-qa.md) owns cadence defaults, scheduler/lifecycle and temporal evidence; [accessibility](references/accessibility.md) owns pause/reduced-motion requirements.

The [canonical ASCII decision table](references/ascii-motion.md#renderer-selection-decision-model) approves Halftone/Grey Tiles for all sources and pixel-raster Braille, single-colour amber Amber Glow and multi-colour phosphor Old Monitor for 2D/simple geometric 3D only. It rejects Mono glyph ramp and supersedes glyph-based Monitor; it owns all source exclusions and phosphor/glow parameters. Approved phosphor glow is a bounded artwork exception to ordinary UI restraint, never a general glow treatment. The canonical owner defines its green/warm/cool presets and custom colour parameter.

## Restrictions and quality boundary

Old Monitor may use phosphor green only as a phosphor colour under the canonical artwork contract. Forbidden: a general black/green hacker-terminal identity or neon-green hacker identity; aggressive cyberpunk colors; excessive neon, glow, gradients, shadows or arbitrary effects; heavy CRT distortion; constant glitch/flicker; generic AI-generated SaaS arrangements with excessive cards, badges, decorative icons, or empty sections.

Conventional patterns remain usable when justified by real content and tasks. A credible marketing argument, useful comparison, or efficient desktop workspace should keep its appropriate composition. Technical compliance and surface styling cannot compensate for weak hierarchy, inconsistent type, careless spacing, irrelevant imagery, confusing feedback, or copied generic structure. Review those dimensions explicitly before delivery.
