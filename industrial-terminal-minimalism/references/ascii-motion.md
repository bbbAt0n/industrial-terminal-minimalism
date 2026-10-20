# Living ASCII Motion: art direction and implementation

Read during substantial UI design and when implementing character graphics. ASCII is a creative visual medium: objects, portraits, authored illustrations, particles, waves, density fields and atmospheric scenes are legitimate. It need not explain a process. Preserve the warm palette and strong sans hierarchy; Departure Mono supplies the drawing grid and technical character. Do not import a particular product's scene as a universal template.

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

## Build form with characters

- **Density and shading:** test a short ramp such as ` .,:;+=*#@` in the actual font. Its visual darkness is font-dependent. Map a continuous luminance/field to discrete levels; preserve broad masses before adding texture. Avoid changing the whole field between light/dark every frame.
- **Grid and pitch:** cells are rectangles. Measure advance and line pitch once; correct aspect ratio in geometry before projection. Reserve fixed bounds, disable ligatures/synthesis and avoid wide/combining glyphs unless deliberately measured. Reduce detail/cell count on small windows before shrinking glyphs excessively.
- **Silhouette/depth:** establish a legible poster and negative space. Sample surfaces/edges, rotate in model space, project with an orthographic or bounded perspective transform, and use a reusable depth buffer for overlapping surfaces. Sparse rear edges and denser lit planes can suggest depth without color gradients.
- **Waves/noise/particles:** combine low-frequency periodic fields; use seeded deterministic noise, coherent motion and bounded particle counts/lifetimes. Tie wrap/reset paths to the composition. Random glyph replacement is usually flicker, not rich motion. Noise may supply texture without becoming the subject.
- **Authored frames:** store equal-sized local strings or compact key poses. Hold frames deliberately; interpolate geometry/density rather than raw character codes. Validate interpolation and discrete symbol thresholds at native scale.
- **Seamless loops:** compute phase from active elapsed time modulo a cycle. Use periodic functions/integer harmonics and wrapped particle paths; check the last-to-first transition. Do not duplicate the endpoint as an extra held frame. Audio/actual transfer data is not expected to repeat; inspect its state transitions instead.
- **Composition:** place detailed masses against deliberate empty space; control contrast, scale and salience beside copy/actions. One dominant scene is a useful starting judgment, not a universal layout/count rule. Captions and real controls remain separate semantic UI.

## Three local strategies

| Strategy | Best fit | Contract |
| --- | --- | --- |
| Authored | Precise silhouettes, character animation, deliberate pose sequencing | Local equal-bounds frames, meaningful poster, time-based frame selection; finite or looping |
| Procedural | Rotation, waves, particles, fields and interactive spatial art | Ordinary local math, seeded inputs, bounded grid/buffers, deterministic cycle |
| Actual-data-reactive | Audio, known byte progress, real state topology | Read actual data; separate measured values from decorative phase; stop motion when the relevant activity stops |

For a center-aligned musical waveform, mirrored vertical peak-envelope bars often match the visual target better than a connected signed trace. Read actual time-domain samples; compute per-window absolute peaks/RMS, normalize with a bounded noise floor and slowly adapting ceiling, and apply fast attack/slower release. Use short spatial smoothing only when it preserves strong variation. Maintain substantial quiet-to-energetic dynamic range; do not normalize each frame independently to full height. Signed averaging can cancel opposing waveform lobes. Silence must clear to a flat axis, never receive a minimum animated height; missing samples mean unavailable. Reset smoothing on track changes and adapt column/row counts to available space. Evaluate several passages and real silence at normal playback speed. Frequency-band analysis is another valid choice when its measured spectral distribution suits the reference. State the chosen analysis window, gain behavior and smoothing; a decorative waveform is not a calibrated level meter.

A fixture may animate its explicitly identified connected route, but that is not measured traffic. Unknown totals have labeled indeterminate activity with received bytes, never invented completion. Pausing visual motion must not pause data acquisition, recording, playback or transfer. Cancel only the visual scheduler; keep essential current numeric/text feedback independent and label a frozen signal view as paused. Unsupported operation pause must be stated; retain cancellation/retry.

## Rendering and ownership

Use one `<pre>`/text node, Canvas surface, WinUI TextBlock/custom drawing surface, Tk Label/Canvas text item or the platform equivalent. No per-glyph components, external animation packages, remote assets, CDN, API, editor, cloud or MCP runtime dependency. Examples are [local and optional](../examples/living-ascii/README.md); the existing finite [sequence helper](../examples/primitives/character-sequence.mjs) remains available for finite interactions.

Default character cadence is 8fps; 6–12fps is a useful range. Higher cadence needs a visual/functional reason and a measured cost. Input, focus, selection, application rendering and real task feedback remain immediate. Use monotonic elapsed time, skip late frames, never replay a backlog. Freeze active phase during ambient pause; reactive resume reads current data. Own at most one scheduler per surface, cancel it when hidden/offscreen/inactive, reduced, paused, route-exited or disposed. A guarded permanent timer is not suspension. Reconcile eligibility on state, visibility, preference and layout changes. Prevent duplicate callbacks with cancellation/generation ownership.

Reuse geometry, data arrays and depth buffers. Avoid per-cell DOM/layout reads and unbounded frame histories. Cache authored frames only when small. Profile active rendering, allocation, idle callbacks and control latency at representative density; degrade cell count or cadence before harming interaction. Resize/theme changes render immediately without resetting application work.

## Accessibility and font strategy

Decorative art is hidden from accessibility trees. Informative visuals need a caption/status or equivalent structured data outside the character field; do not announce every frame. Keep static functional meaning when movement is disabled. Respect preference changes while running. Provide a persistent keyboard-accessible pause/stop/hide for automatic motion alongside content where required; reduced motion alone is not that control. Avoid flashes and random high-contrast inversion. See [accessibility](accessibility.md) for criteria and [temporal QA](../execution/motion-qa.md).

Load Departure Mono locally only when redistribution rights and its OFL license accompany the font. The skill examples use installed Departure Mono with Consolas/Liberation Mono/monospace fallback and contain no font binary. Generated products may copy licensed local font assets. Measure fallback pitch, test absence, preserve a readable poster and keep essential text in the reading family. No runtime font download.

## Reference boundary

[ASCII Motion](https://www.ascii-motion.com/) was inspected as a conceptual reference on 2026-10-19. Its public demo shows character-based flames, silhouettes, density/shading, drawing and timeline playback; its page presents authored and procedural approaches. Infer transferable principles—cell discipline, composition and sequencing—without copying artwork or depending on its editor, exports, APIs or services. Displayed demo rates are not a recommended product cadence. This skill supplies its own code and original product scenes.
