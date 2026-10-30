# Project-derived palette

## Character and precedence

Project/brand colours and existing design systems outrank shipped defaults. ITM identity lives in colour character and role logic, not hex values. Use industrial, restrained, matte material-like grounds: paper, concrete, enamel, anodised metal, mint/sage paint or graphite. Large surfaces are neutral or one tinted ground; graphite/ink or paper text has strong contrast. One primary signal accent, optionally a second, is used sparingly for state, selection, priority or live data; never merely decoration. Semantic state colours are muted and paired with words/shape.

No decorative gradients, glows as UI decoration, purple-blue “AI SaaS” gradients or neon-on-black cyberpunk default. Scoped ASCII phosphor glow is the sole artwork exception under the [unchanged renderer contract](ascii-motion.md#canonical-scoped-raster-and-phosphor-contract). Acid lime is **allowed when domain/brand justifies it; never the default**.

## Derive in order

1. Inventory existing project/brand colours, logo, domain, content imagery and constraints: existing tokens, platform and supported light/dark themes.
2. Choose the ground's material and temperature from the domain: warm paper, cool concrete, mint/sage or graphite.
3. Choose ink/text with strong contrast on each surface.
4. Choose signal accent(s) from brand or domain meaning: safety orange, hazard lime, instrument amber or oxide red. State what each signal **means**.
5. Map to canvas, surface, text, muted, accentSeed, accentText, border, divider, focus, selected/onSelected/selectedHover, error and info for each supported light/dark theme. Do not remove an existing theme.
6. Validate with `python scripts/tokens.py validate-palette path/to/palette.json` from the bundle root; [schema and exact contrast pairs](../tokens/README.md#validate-a-project-palette) are owned by the token guide. Seeds/dividers are decorative; additional composed pairs need measurement.
7. Render and inspect [all required widths/themes](../execution/visual-qa.md). Numeric validity does not prove palette balance or product relevance.

## Three-variant rule

For [three creative directions](../reasoning/composition.md#three-creative-directions), palettes must differ in **ground material/temperature AND signal logic**, not three recolours of a dark+neon scheme. Give each a one-line rationale tied to the project; validate each direction's supported themes before presenting. At least one stays close to the project's own colours when they exist. Brand constraints still outrank exploratory changes; document a genuine constraint rather than violating it.

## Illustrative quality references

These approximate colour references are illustrative quality references, **not tokens or requirements**. Do not copy proprietary UIs. JSON examples contain one primary theme each; derive the other theme if the product supports it. Mappings retain bright seeds for non-text signals and introduce AA-safe text variants only where needed. Validation uses unrounded ratios (printed to three decimals).

### A — Signal board

Graphite ~#2B2D2B with off-white ~#ECEDE6 text and mint ~#BFD8C8 panels/secondary information; acid lime ~#D7F23A means current selection/priority and orange ~#F2652B means intervention/risk. Loud colours each carry a signal. Orange seed remains unchanged; the functional text variant increases lightness only as far as AA requires with a small rounding margin; accent text uses #F47F4E, coral-red error uses #FF858D and cool cyan info uses #80D7ED for AA on both graphite surfaces; muted mint remains unadjusted. Mint inverse selection hover uses graphite text.

| Role | Dark / primary example |
| --- | --- |
| canvas | `#2B2D2B` |
| surface | `#343834` |
| text | `#ECEDE6` |
| muted | `#BFD8C8` |
| accentSeed | `#F2652B` |
| accentText | `#F47F4E` |
| border | `#84968A` |
| divider | `#4B554E` |
| focus | `#D7F23A` |
| selected | `#D7F23A` |
| onSelected | `#262A28` |
| selectedHover | `#BFD8C8` |
| error | `#FF858D` |
| info | `#80D7ED` |

[palette-signal.json](../tokens/examples/palette-signal.json): **PASS, 16 pairs**; tightest relative to its requirement: accentText/surface **4.538:1**, required 4.5:1. Run the command above against this file to see every pair. These adjustments preserve the seed and alter only functional role variants needed for legibility, rather than darkening the entire palette.

### B — Research poster

Pale mint ~#C5DCCB and graphite ~#262A28 make an analytical field; one thin orange ~#E8643A annotates a finding. Keep the orange seed for thin annotation only; use darker oxide #A73714 for accent text and distinct muted red #893F49 for errors, reducing lightness to the passing threshold with a small rounding margin. Lighter mint secondary surface preserves reading contrast.

| Role | Light / primary example |
| --- | --- |
| canvas | `#C5DCCB` |
| surface | `#DCE8DE` |
| text | `#262A28` |
| muted | `#48544C` |
| accentSeed | `#E8643A` |
| accentText | `#A73714` |
| border | `#68756B` |
| divider | `#A4B8A9` |
| focus | `#A73714` |
| selected | `#262A28` |
| onSelected | `#DCE8DE` |
| selectedHover | `#3A423C` |
| error | `#893F49` |
| info | `#395C56` |

[palette-research.json](../tokens/examples/palette-research.json): **PASS, 16 pairs**; tightest relative to its requirement: accentText/canvas **4.523:1**, required 4.5:1. Error/canvas is **5.042:1** and error/surface is **5.796:1**, both requiring 4.5:1. Run the command above against this file to see every pair. These adjustments preserve the seed and alter only functional role variants needed for legibility, rather than darkening the entire palette.

### C — Paper menu

Beige paper ~#CFC9B4 and charcoal ~#3A3832 form a near-monochrome system. An inverse selection bar is the primary signal; no new saturated accent is needed. The approximate ground/ink are unchanged; muted, boundary and semantic text variants extend the mapping for AA.

| Role | Light / primary example |
| --- | --- |
| canvas | `#CFC9B4` |
| surface | `#E2DDCA` |
| text | `#3A3832` |
| muted | `#56534A` |
| accentSeed | `#3A3832` |
| accentText | `#3A3832` |
| border | `#726E5E` |
| divider | `#ABA590` |
| focus | `#3A3832` |
| selected | `#3A3832` |
| onSelected | `#E2DDCA` |
| selectedHover | `#4B483E` |
| error | `#813F32` |
| info | `#40574F` |

[palette-paper.json](../tokens/examples/palette-paper.json): **PASS, 16 pairs**; tightest relative to its requirement: border/canvas **3.084:1**, required 3:1. Run the command above against this file to see every pair. These adjustments preserve the seed and alter only functional role variants needed for legibility, rather than darkening the entire palette.

### D — Shipped default example

Warm paper / graphite / amber is the fallback when no project colours or better project-derived palette exists. The [default table](../STYLE.md#palette-and-surface-relationships) and unchanged [light](../tokens/light.json) / [dark](../tokens/dark.json) files own its values. It has no precedence over brand or domain choices.
