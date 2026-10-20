# Motion principles and temporal QA

Read with [ASCII art direction](../references/ascii-motion.md) during substantial design. Expressive art, atmosphere, functional explanation and actual-data visualization are valid purposes. Automatic finite-only rules and a universal 1.2-second limit do not apply.

| Mode | Behavior | State and ownership |
| --- | --- | --- |
| Ambient | Authored/procedural scene may start automatically and loop continuously | User pause/stop/hide, reduced poster, suspended inactive work; no implied processing |
| Reactive | Shape/density follows actual audio, bytes or identified fixture/application state | Real data/status immediate; artistic phase distinct from measured progress; settle when activity ends |
| Interaction | Optional local transition/reveal follows input | Focus/selection/content immediate; cancel/retarget obsolete effects; finite or intentionally ongoing until stopped |

Modes can coexist in one product. Choose salience by composition, not a mandatory count or layout. Default art cadence 8fps (usually6–12); selection/input delay0. Higher cadence needs a reason and profiling. Animation playback does not throttle real data, task completion or application rendering. Generic typewriter delays, fake loading, rapid glitch/flicker and manufactured percentages are inappropriate.

Every effect records purpose, visual concept/poster, trigger, cadence, cycle or completion rule, data source, pause policy, visibility/preference lifecycle and cleanup owner. Use monotonic active elapsed time, deterministic looping where applicable, late-frame skipping, bounded buffers and one owned scheduler. Stop scheduling, rather than waking a guarded callback forever, when ineligible. Native implementations use native events and preference APIs; do not embed a web renderer just for motion.

Apply accessibility requirements contextually. Automatic moving/blinking/scrolling information lasting over5s alongside other content needs pause/stop/hide unless essential; auto-updating information has a separate control rule without that5s exception. A useful house default is an explicit motion control for ambient art. Reduced motion removes unnecessary movement without suppressing meaningful status. Pause art independently from real work. See [criteria and sources](../references/accessibility.md).

## Evidence and correction

For every changed effect, first inspect the concept/poster against subject clarity, silhouette, density hierarchy, contrast, negative space, motion readability, perceptual strength, loop resolution, relevance and distinction from generic noise. These checks also govern concept selection before implementation.

For every changed effect:

1. Start the actual app and verify intended ambient autoplay. Record renderer, source revision, theme, size, font and trigger.
2. Observe at normal speed for at least a complete designed loop or representative reactive interval. Capture a short actual recording or sufficiently sampled timestamped frames, including intermediate and boundary states. A simulated phase sweep can supplement actual time, never replace it.
3. Inspect subject recognition through the full movement, silhouette, depth, pacing, density transitions, aliasing, negative space, contrast, salience beside controls and loop continuity. Correct weak or primitive concepts when the brief calls for expressive graphics.
4. Exercise relevant real state changes, rapid retargeting, pause/resume, completion/error/cancel, route exit, hidden/offscreen/inactive and dynamic reduced motion. Inspect the resulting static meaning. Distinguish event-injected lifecycle checks from physical actions and actual OS behavior.
5. Check active frame cost and input responsiveness under a representative lower-performance condition; verify zero animation schedulers while ineligible and no callback accumulation after repeated activation. Record environment/limits, not universal performance claims.
6. Re-run affected checks and capture final evidence after corrections. Record pass / needs correction / unverified per effect, separately for visual, temporal, lifecycle and accessibility results.

A timer test or static screenshot is insufficient. Captured but unobserved movement is incomplete. Browser checks do not prove native Windows behavior. If recording is unavailable, inspect actual timed frames with known intervals; disclose whether normal-speed replay was observed. Keep assistive-technology, physical input, high-DPI and hardware claims separate from in-process/browser automation evidence.
