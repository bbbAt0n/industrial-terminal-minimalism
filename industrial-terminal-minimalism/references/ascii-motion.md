# Living ASCII: art direction and implementation

Read when designing, implementing or reviewing character or graphical ASCII-family artwork. This is the canonical artistic contract; [motion QA](../execution/motion-qa.md) owns animated lifecycle and temporal evidence. ASCII is a creative visual medium: objects, portraits, authored illustrations, particles, waves, density fields and atmospheric scenes are legitimate. It need not explain a process. Preserve the [project-derived palette character](palette.md) (default: warm neutral) and strong sans hierarchy; a project-selected verified mono supplies a character drawing grid (Departure Mono is a default example only). Do not import a particular product's scene as a universal template.

## Recognizable Subject Before Animation Complexity

For substantial ASCII artwork, use this sequence before committing to a renderer:

1. Define the visual subject or intentional abstract artistic concept and its product relevance or atmospheric value. Compare genuinely different ideas; do not count parameter variations as new concepts.
2. Establish composition, silhouette, character-density hierarchy, contrast, scale, depth and negative space at the intended presentation size.
3. Generate a representative static frame in the actual font/grid and inspect it in context. A description or rendering algorithm is not a poster.
4. Evaluate subject recognition without depending on its caption. Could an unfamiliar viewer reasonably identify the object? For abstract work, evaluate visual structure, deliberate rhythm, contrast, depth and composition. Revise a weak poster before adding motion complexity.
5. Design meaningful key poses, transitions, timing and loop or state resolution. Keep the subject understandable at intermediate poses; avoid edge-on disappearance unless deliberately readable in context.
6. Implement in the existing stack and inspect actual normal-speed movement at its intended size, including boundaries and state changes.
7. Correct confusing, weak, generic or insufficiently expressive art and repeat the affected observation. Technical scheduler tests cannot pass artistic acceptance.

Use these checks to **select concepts before implementation**, then repeat against the delivered artwork:

| Artistic check | Selection / acceptance question |
| --- | --- |
| Subject clarity | Can the subject be identified from a representative frame or short animation without an explanatory label? |
| Silhouette quality | Do broad masses survive small size, fallback fonts and intermediate poses? |
| Character-density hierarchy | Do dark, middle and sparse regions establish form rather than uniformly filling the grid? |
| Contrast and spatial legibility | Are edges, layers and overlapping regions separable in both themes? |
| Composition and negative space | Does empty space frame the subject, establish depth or pace the composition? |
| Motion readability | Can a viewer see direction, transformation or rhythm at normal speed? |
| Perceptual strength | Is meaningful movement visible during ordinary use at its actual presentation size? |
| Loop / state resolution | Is the wrap seamless, or does a finite/reactive state intentionally settle? |
| Relevance / atmosphere | Does this subject serve the product or a clear artistic purpose? |
| Distinction | Does it have a specific visual idea beyond generic procedural ASCII noise? |

Do not add random particles, brighten everything or stack unrelated effects to repair a weak concept. Reduce ambiguity through silhouette, grouping, scale, density and meaningful movement. Keep platform implementation tests separate from curated artistic references; repeated interference fields and tiny keyframe tests establish mechanics only. See the [four original artistic studies](../examples/living-ascii/curated/README.md).

## Renderer-selection decision model

Choose the representation before finishing. Literal **ASCII text** uses ordinary characters in a measured fixed-pitch grid; **Unicode Braille** uses U+2800 dot cells (2×4 logical dots per glyph), with separate Unicode/font support requirements. **Tile/block graphics** use drawn rectangles; **graphical halftone** uses drawn dots whose area carries tone. Tile/block graphics, graphical halftone and the approved pixel-raster Braille below are non-character renderers, not literal ASCII. The scoped Braille path is a **Unicode-Braille-style dot lattice rendered graphically with drawn dots**, not U+2800 glyphs. A finishing layer changes presentation; it does not repair a weak renderer or subject.

| Decision | Selection consequence |
| --- | --- |
| Source type | Authored strings preserve deliberate character silhouettes; local media retains its original timing; procedural geometry provides coherent projection and controlled light. Route photos and textured/curved 3D with fine surface detail to Halftone or Grey Tiles; route 2D maps/territory outlines, line graphics, large display type (>= ~140 px cap height), flat/few-tone graphics and simple geometric 3D (torus, cube, sphere-like primitives) to scoped Braille, Amber Glow or Old Monitor, Halftone or Tiles. Complex 3D assemblies with fine panels belong to Halftone/Grey Tiles. Never substitute a non-redistributable input into redistributed examples. |
| Purpose | Select subject and prominence for recognition, atmosphere, explanation or actual data; decorative phase must not imply measured activity. |
| Subject scale | Inspect at the actual displayed size and thumbnail size. Choose Halftone for print-like continuous form; Grey Tiles for broad planar masses and a deliberately quantized silhouette. Reject a method if its fine features disappear. |
| Glyph/font support | Text requires measured advance, pitch and calibrated density. Unicode additionally requires verified glyphs. The approved graphical paths need no dot/tile drawing font; use native shapes when text support is unreliable. |
| Frame cadence | Keep source timing and profile real updates. The approved satellite and scoped Braille/phosphor raster use 30 Hz updates; reducing it to held poses changes the approved movement. Do not impose the general 8 fps character-art default on it. |
| Target platform | Browser: Canvas 2D for the proven paths; `<pre>` for authored text. Native: Tk Canvas or WinUI custom surface for shapes, Label/TextBlock for text. No WebGL2 or browser requirement on desktop. |
| Complexity budget | Prefer bounded logical surfaces, reusable arrays and one scheduler. Preserve broad masses before detail; if a target cannot afford the approved update rate, offer a static key pose or an honestly identified simpler fallback and revalidate. |
| Expected detail | Dot area gives fine tonal structure; six-level tiles give chunky tonal grouping without gutters. Typography is a separate art choice, not a synonym for these graphical paths. |
| Finishing | Begin with plain theme ink on canvas, using the project-derived semantic palette (shipped tokens are defaults only). Add no effect without a visual purpose and fresh inspection. Never use finishing to conceal unstable geometry. |

**Approved v1.1 techniques:** The original [graphical satellite](../examples/living-ascii/print-satellite/README.md) retains Halftone and Grey Tiles only. The original fictional [signal map](../examples/living-ascii/signal-map/README.md) demonstrates the three scoped graphical modes. The [curated character studies](../examples/living-ascii/curated/README.md) remain independent references.

| Mode | Decision | Source scope / presentation |
| --- | --- | --- |
| Halftone | APPROVED | All sources: 2D, simple 3D, complex 3D such as the satellite, textured. Inspect detail at the intended size. |
| Grey Tiles | APPROVED | All sources: 2D, simple 3D, complex 3D such as the satellite, textured. |
| Braille (pixel-raster) | APPROVED SCOPED | 2D: maps, territory outlines, line graphics, large display type (>= ~140 px cap height), flat/few-tone graphics; simple geometric 3D: torus, cube, sphere-like primitives. NOT for complex 3D (satellite-like assemblies with fine panels), photos, textured/fine relief, small text. |
| Amber Glow (Braille lattice + real phosphor glow) | APPROVED SCOPED | Same scope as Braille; single colour amber only; always on a dark screen panel in either UI theme. |
| Old Monitor (horizontal beam segments, glow, static scanlines) | APPROVED SCOPED, multi-colour phosphor (default green; presets green/warm/cool; any colour via parameter) | Same scope as Braille; always on a dark screen panel. The old glyph-based Old Monitor is superseded/rejected: it inherited Mono silhouette/density defects. |
| Mono (glyph ramp) | REJECTED | Oblique planes mix `o`, `+`, `:`; antenna/silhouette fragments from underscores, vertical bars and backslashes; thin pale ink reads as generic ASCII and is weakest at thumbnail size. |

### Canonical scoped raster and phosphor contract

This section owns the numeric sampling, motion and finishing parameters; example notes link here. Hex values below are fixed approved renderer parameters derived from the shipped default example, **not mandatory UI palette colours**. Keep this artwork contract unchanged when deriving a project palette.

- **Raster:** fixed 4 px lattice; Braille/Amber circular cores radius 1.6 px. Local 4x4 pixel-area Rec.709 luminance, fixed 4x4 Bayer phase, continuous edge emphasis `clamp((max-min-.03)/.18)` combined with area tone. Brightness 0, contrast 1.1, density 1.15, threshold .32. Internal grayscale is a scalar signal, not a display palette.
- **Temporal:** 30 Hz state updates, Schmitt hysteresis +/-0.06, off floor .012, explicit empty clearing and three-update minimum residence. A changed dot survives the following two updates, trading up to 66.7 ms local lag. No whole-pose holds, crossfades or previous-frame glow accumulation. A single eligible animation-frame owner presents at the device display cadence and skips late source poses; pause, reduced motion, hidden/offscreen and disposal stop it.
- **Amber (single colour amber only, no colour parameter):** token accent #C99A56 mixed 12% toward token ivory #DCD6C5, rounded to #CBA163 (within the 15% limit). Additive near/wide bloom radii **2.3 / 7 px**, alpha **.90 / .70**, at the approved nominal strength; redraw the crisp core last. This is visible two-radius phosphor illumination.
- **Old Monitor (multi-colour phosphor):** core, near bloom and wide halo all derive from one opaque phosphor colour. Presets: **green (default) #53D878**, **warm white #D7C5A4**, **cool / blue-white #A9BDC7**. Green keeps a P1-style reference hue near #33FF66 with lower peak intensity and saturation, reducing white-green clipping when bloom overlaps. Warm preserves the established finish: approximately 70% token ivory / 30% accent, rounded with +1 R/G adjustment. These are renderer parameters, not new design tokens; UI still uses existing tokens. There is no Old Monitor amber preset: Amber Glow owns the single-colour amber treatment. Same lattice/decisions; **3.8 x 1.6 px horizontal elliptical beam segments**, additive radii **2.7 / 8 px**, alpha **.90 / .70**, core redrawn after bloom. Static black scanlines **1 px every 4 px, alpha .045**; optional vignette no stronger than .045 (omitted in the package example).
- **Colour interface / legibility:** `?mode=monitor&phosphor=green|warm|cool|RRGGBB` selects a preset or arbitrary opaque hex (URL-encode `#` as `%23` if included); `signalStudy.setOptions({phosphor: '#RRGGBB'})` changes it without resetting phase/history. Three-digit opaque hex is also accepted. An initial `--itm-phosphor: #RRGGBB` on the example root `#study` supplies the colour when no URL parameter is present; JS publishes the resolved value back to that property. URL takes precedence over initial CSS; later JS/UI choices take precedence over both. Preset buttons and a labelled native colour input appear only in Old Monitor. Invalid input falls back to default green with a visible status note. For custom colours target core contrast **>=3:1 against #151714**; lower values warn visibly without blocking. Preset nominal WCAG contrasts are green **9.84:1**, warm **10.66:1**, cool **9.27:1** (opaque core, not antialiased edge/halo). Keep UI labels at 4.5:1 and boundaries/focus at 3:1 in both themes per the token contract.
- **Presentation/cache:** both phosphors always use token dark canvas **#151714**, including light UI. Pre-render 64x64 transparent glow-dot sprites per geometry/colour; rebuild colour-dependent caches only when colour or geometry changes, never per frame; stamp current active sites additively, then the core. Blur occurs only when constructing these reusable sprites, never per-frame on the full canvas. Glow depends on current dot state only, without clock-driven pulse. Release caches on disposal.
- **Performance fallback:** after a sustained display-callback window of at least 2 s below ~45 fps, drop the wide halo only and show the fallback in status/metrics; retain near halo, core, sampling and 30 Hz target. `signalStudy.setWideHalo(false)` also allows an explicit fallback; `true` retries full glow. This cannot guarantee performance on every device; measure live display callbacks and actual update cost separately.
- **Forbidden looks (all modes):** glitch, RGB split, flicker/pulse, rolling bars, curvature, noise, chromatic aberration and trails. phosphor green is allowed only as an Old Monitor phosphor colour; no falling-code rain or falling-code effects. Cool/blue-white Old Monitor is approved. Avoid eye-burning neon and oversaturation as taste guidance; arbitrary valid phosphor hex values remain accepted.

**Scope rationale:** Fine panels/relief are lost on complex assemblies, so the scoped modes remain excluded there. Simple primitives are approved within the table's limits. Zero immediate reversal does not establish retained detail or universal stability. Review records and lab measurements remain outside the package.

### Canonical satellite sampling contract

The [original satellite example](../examples/living-ascii/print-satellite/README.md) uses Halftone/Grey Tiles only. Preserve these values when matching its approved appearance:

- Source/output 720×480, 8×8 cells (90×60); orthographic 12 s turntable and fixed lighting. Contrast 1.1, brightness 0, density 1.15. Key poses 0/3/6/9 s; frontal wing spread about 11.083 s.
- Quantization retains the previous level inside `step × (0.5 + 0.1)`; 16 dot-area steps or 5 tile intervals. Reset history on restart/renderer change; deterministic capture seeks successive `i/30` poses, resetting only at the start. Dot radius is `8 × 0.485 × sqrt(level/16)`.
- Fixed 30 Hz updates; late source poses are skipped. Canvas/ink use token endpoints and six tile levels interpolate between them. These are tone samples, not new palette primitives.
- Its perceptual comparison uses 0/3/6/9 s at actual size: coherent silhouette/orientation change and at least 1% whole-frame pixels changing by more than 40 grayscale levels between adjacent key poses. This subject-specific bar supplements visual inspection, not a universal threshold for other artwork.

## Meaningful poses and temporal coherence

Keep **Recognizable Subject Before Animation Complexity**. Select a readable poster, then author key poses that show a meaningful change in orientation, structure, direction or state. Inspect intermediate poses and the wrap; a full turn can include a narrow edge-on silhouette without losing the subject throughout the cycle.

Set a measurable, subject-specific perceptual bar before implementation; the [satellite contract](#canonical-satellite-sampling-contract) supplies one example. Record consecutive-frame change too; a high change percentage alone may be noise. Verify at actual size and normal speed.

**Random shimmer is not animation.** Stable regions should stay stable; avoid A→B→A pixel reversals, random symbol switching and surfaces that re-seat every frame. Use deterministic sampling, consistent quantization and bounded hysteresis near thresholds without smearing useful motion. Measure decoded flip-back at the renderer's real cadence using the [temporal QA gate](../execution/motion-qa.md#decoded-temporal-coherence-gate), rather than diluting results with duplicated frames. Perceptible movement and temporal coherence are separate gates.

## Build form with characters

- **Density and shading:** calibrate a short ramp in the actual font using the [font-density tool](#font-density-calibration). Its visual darkness is font-dependent. Map a continuous luminance/field to discrete levels; preserve broad masses before adding texture. Avoid changing the whole field between light/dark every frame.
- **Grid and pitch:** cells are rectangles. Measure advance and line pitch once; correct aspect ratio in geometry before projection. Reserve fixed bounds, disable ligatures/synthesis and avoid wide/combining glyphs unless deliberately measured. Reduce detail/cell count on small windows before shrinking glyphs excessively.
- **Silhouette/depth:** establish a legible poster and negative space. Sample surfaces/edges, rotate in model space, project with an orthographic or bounded perspective transform, and use a reusable depth buffer for overlapping surfaces. Sparse rear edges and denser lit planes can suggest depth without color gradients.
- **Waves/noise/particles:** combine low-frequency periodic fields; use seeded deterministic noise, coherent motion and bounded particle counts/lifetimes. Tie wrap/reset paths to the composition. Random glyph replacement is usually flicker, not rich motion. Noise may supply texture without becoming the subject.
- **Authored frames:** store equal-sized local strings or compact key poses. Hold frames deliberately; interpolate geometry/density rather than raw character codes. Validate interpolation and discrete symbol thresholds at native scale.
- **Seamless loops:** compute phase from active elapsed time modulo a cycle. Use periodic functions/integer harmonics and wrapped particle paths; check the last-to-first transition. Do not duplicate the endpoint as an extra held frame. Audio/actual transfer data is not expected to repeat; inspect its state transitions instead.
- **Composition:** place detailed masses against deliberate empty space; control contrast, scale and prominence beside copy/actions. One dominant scene is a useful starting judgment, not a universal layout/count rule. Captions and real controls remain separate semantic UI.

## Three local strategies

| Strategy | Best fit | Contract |
| --- | --- | --- |
| Authored | Precise silhouettes, character animation, deliberate pose sequencing | Local equal-bounds frames, meaningful poster, time-based frame selection; finite or looping |
| Procedural | Rotation, waves, particles, fields and interactive spatial art | Ordinary local math, seeded inputs, bounded grid/buffers, deterministic cycle |
| Actual-data-reactive | Audio, known byte progress, real state topology | Read actual data; separate measured values from decorative phase; stop motion when the relevant activity stops |

For a center-aligned musical waveform, mirrored vertical peak-envelope bars often match the visual target better than a connected signed trace. Read actual time-domain samples; compute per-window absolute peaks/RMS, normalize with a bounded noise floor and slowly adapting ceiling, and apply fast attack/slower release. Use short spatial smoothing only when it preserves strong variation. Maintain substantial quiet-to-energetic dynamic range; do not normalize each frame independently to full height. Signed averaging can cancel opposing waveform lobes. Silence must clear to a flat axis, never receive a minimum animated height; missing samples mean unavailable. Reset smoothing on track changes and adapt column/row counts to available space. Evaluate several passages and real silence at normal playback speed. Frequency-band analysis is another valid choice when its measured spectral distribution suits the reference. State the chosen analysis window, gain behavior and smoothing; a decorative waveform is not a calibrated level meter.

A clearly labeled simulation may animate an identified route without implying measured traffic; apply the [data-truth contract](../SKILL.md#scope-and-precedence). Keep visual pause separate from actual work through the [motion owner](../execution/motion-qa.md).

## Rendering and ownership

Use one `<pre>`/text node, Canvas surface, WinUI TextBlock/custom drawing surface, Tk Label/Canvas text item or the platform equivalent. No per-glyph components, external animation packages, remote assets, CDN, API, editor, cloud or MCP runtime dependency. Integration is [three local steps](../examples/living-ascii/README.md#integrate-the-engine-in-3-steps); examples are optional; the existing finite [sequence helper](../examples/primitives/character-sequence.mjs) remains available for finite interactions.

Reuse geometry, data arrays and depth buffers; avoid per-cell DOM/layout reads and unbounded frame histories. Apply the [motion scheduler and profiling contract](../execution/motion-qa.md) when animated. Resize/theme changes render immediately without resetting application work.

## Accessibility and font strategy

Apply the [accessibility owner](accessibility.md) for decorative/informative equivalents and controls; use [motion QA](../execution/motion-qa.md) for scheduling and preference lifecycle.

The examples contain no font binary. Follow [font verification and fallback](typography.md#verify-the-face-then-verify-the-fallback), measure cell pitch and preserve a readable poster in each supported face. No runtime font download.

## Font density calibration

Open [font-probe.html](../scripts/font-probe.html) locally in a browser. It probes explicit local sources for the default-example Departure Mono, Consolas, Courier New, Menlo, SFMono-Regular and Liberation Mono; it never treats a generic fallback as that named font. You can enter another installed family. Unavailable/blocked faces have no fabricated measurements.

The tool produces a per-font table of cell advance, pitch, a sparse-to-dense ramp and each glyph's ink coverage (% of the cell). Choose the actual artwork's size/pitch and rerun after a font change. It rasterizes regular ASCII into a transparent cell and sums alpha coverage, normalized by the same cell area for each glyph in that font. This is a reproducible geometric starting point, not a universal perceptual brightness ranking: antialiasing, weight, theme and renderer matter. Inspect the sorted ramp and representative poster in both themes before acceptance. Compare coverage within the measured font/settings; avoid copying numbers between platforms as constants.

Example measured table: Windows in-app Chromium browser, 2026-10-29, regular 16 px, line pitch 20 px, device pixel ratio 1. Values are alpha-weighted ink coverage (%); an em dash means the explicit local source was unavailable/blocked, not that it has zero density. No font binaries are bundled.

| Local source | Cell advance (px) | `.` | `+` | `#` | `@` |
| --- | --- | --- | --- | --- | --- |
| Consolas | 8.80 | 3.21 | 11.28 | 24.94 | 36.34 |
| Courier New | 9.60 | 2.93 | 9.39 | 20.58 | 20.25 |
| Departure Mono | — | — | — | — | — |
| Menlo | — | — | — | — | — |
| SFMono-Regular | — | — | — | — | — |
| Liberation Mono | — | — | — | — | — |

The `#`/`@` order already differs between these two measured faces. Use the tool's complete sorted ramp for your actual font rather than assuming a universal character order. Unmeasured rows require calibration in an environment that can load those faces.

## Reference boundary

Use transferable principles: cell discipline, composition and sequencing. This skill supplies original code and scenes without relying on an external editor, exports, APIs or services.