# Motion principles and temporal QA

Read when implementing or reviewing animation. This is the canonical timing, lifecycle and temporal-evidence contract. For character graphics, [ASCII art direction](../references/ascii-motion.md) separately owns poster and artistic acceptance. Expressive art, atmosphere, functional explanation and actual-data visualization are valid purposes.

| Mode | Behavior | State and ownership |
| --- | --- | --- |
| Ambient | Authored/procedural scene may start automatically and loop continuously | User pause/stop/hide, reduced poster, suspended inactive work; no implied processing |
| Reactive | Shape/density follows actual audio, bytes or explicitly labeled simulation/application state | Real data/status immediate; artistic phase distinct from measured progress; settle when activity ends |
| Interaction | Optional local transition/reveal follows input | Focus/selection/content immediate; cancel/retarget obsolete effects; finite or intentionally ongoing until stopped |

Modes can coexist in one product. Choose prominence by composition, not a mandatory count or layout. Default art cadence is 8 fps (usually 6–12); selection/input has zero intentional delay. Higher cadence needs a reason and profiling. Animation playback does not throttle real data, task completion or application rendering. Generic typewriter delays, fake loading, rapid glitch/flicker and manufactured percentages are inappropriate.

Every effect records purpose, visual concept/poster, trigger, cadence, cycle or completion rule, data source, pause policy, visibility/preference lifecycle and cleanup owner. Use monotonic active elapsed time, deterministic looping where applicable, late-frame skipping, bounded buffers and one owned scheduler. Stop scheduling, rather than waking a guarded callback forever, when ineligible. Native implementations use native events and preference APIs; do not embed a web renderer just for motion.

Use the [accessibility owner](../references/accessibility.md) for pause/stop/hide, reduced motion and static alternatives. Pause artwork independently from real work.

For approved graphical artwork, use the [canonical source scopes and numeric contract](../references/ascii-motion.md#renderer-selection-decision-model) instead of the general character-art cadence. The ASCII owner defines renderer-specific cadence, hysteresis, residence and glow. Test at the actual update cadence and inspect extended reversals/detail loss; a zero immediate reversal score does not establish source suitability.

## Decoded temporal coherence gate

Decode the recorded loop to grayscale with ffmpeg. For each real update triple `f[t], f[t+1], f[t+2]`, count pixels where `abs(f[t+1]-f[t]) > 40` **and** `abs(f[t+2]-f[t]) < 15`. Flip-back is that count divided by **all frame pixels**, expressed as a percentage. Report mean and maximum over all triples, codec/settings, resolution, actual update cadence, consecutive-frame change and meaningful key-pose change. Perform signed subtraction to avoid unsigned wrap.

Measure at the renderer's **real update cadence**, never on duplicated export/held frames: a 15 Hz renderer in a 30 fps recording must be sampled once per update. For the approved 30 Hz satellite, every encoded frame is one update. Use mean ≤0.08% as the reversal gate; also compare mean/max to the approved lab baseline (Halftone approximately 0.033% mean; Grey Tiles 0.000%). A new maximum spike or style pop requires inspection even when the mean passes. Preserve codec settings for a fair comparison; report decoded pixel equality or explain differences. A zero reversal score on frozen art does not pass the movement gate in [ASCII art direction](../references/ascii-motion.md#meaningful-poses-and-temporal-coherence).

## Evidence and correction

For changed character artwork, apply the [artistic checks](../references/ascii-motion.md#recognizable-subject-before-animation-complexity) to the poster before movement, then reuse those observations during temporal review.

For every changed effect:

1. Start the actual app and verify intended ambient autoplay. Record renderer, source revision, theme, size, font and trigger.
2. Observe at normal speed for at least a complete designed loop or representative reactive interval. Capture a short actual recording or sufficiently sampled timestamped frames, including intermediate and boundary states. A simulated phase sweep can supplement actual time, never replace it.
3. Observe direction, pacing, intermediate poses and loop/state boundaries at actual size. Reuse the ASCII owner's artistic observations rather than copying its checklist into the motion report.
4. Exercise relevant real state changes, rapid retargeting, pause/resume, completion/error/cancel, route exit, hidden/offscreen/inactive and dynamic reduced motion. Inspect the resulting static meaning. Distinguish event-injected lifecycle checks from physical actions and actual OS behavior.
5. Check active frame cost and input responsiveness under a representative lower-performance condition; verify zero animation schedulers while ineligible and no callback accumulation after repeated activation. Record environment/limits, not universal performance claims.
6. Re-run affected checks and capture final evidence after corrections. Record pass / needs correction / not checked per effect, separately for visual, temporal, lifecycle and accessibility results.

A timer test or static rendered image is insufficient. Captured but unobserved movement is incomplete. Browser checks do not prove native Windows behavior. If recording is unavailable, inspect actual timed frames with known intervals; disclose whether normal-speed replay was observed. Keep assistive-technology, physical input, high-DPI and hardware claims separate from in-process/browser automation evidence.
