# Local Living ASCII examples

## Artistic references

Start with the [curated collection](curated/README.md) and its [local gallery](curated/index.html): recognizable device assembly, a shaded folded ribbon, directed signal movement and an actual-audio mirrored waveform. Each has an inspected representative poster, a distinct motion purpose and a documented lifecycle. These are examples to reason from, not universal product templates.

## Technical implementation tests

Optional mechanics, not artistic-quality evidence or product templates. All animation code is local. No animation library, CDN, external service, downloaded media or font binary is included. Use the platform already present in the product.

- **Vanilla:** serve this directory with an installed Python (`python -m http.server 8080 --bind 127.0.0.1`) or existing static server and open `index.html`. `surface.mjs` owns elapsed-time scheduling, user pause, dynamic reduced motion, offscreen/document/page lifecycle and destruction. The page demonstrates procedural, authored and actual pointer-reactive strategies; it is decoration, never telemetry. Call `destroy()` when a host route unmounts.
- **Tk:** run `python tkinter_example.py` with an existing Python/Tk installation. It uses one Label and standard-library math, an 8fps active-time phase, pause/reduced controls, Windows preference check, unmap/focus suspension and close cleanup. Windows preference changes are rechecked on focus and active ticks; re-enabling OS animation while the window stays inactive waits until focus/map/user interaction. Other OS integrations should call the supplied reduced variable from their host preference event. Use the toolkit's existing accessibility conventions and test the shipped platform.
- **WinUI3:** add `LivingAsciiWindow.cs` to an existing WinUI3 project and activate `new LivingAsciiExample.LivingAsciiWindow()`. The host already supplies WindowsAppSDK/.NET; this file adds no package. It contains its own native controls, theme, one TextBlock, deterministic8s math, 8fps timer, active/visible/reduced/user-pause lifecycle and Windows animation-preference event. Build with that project's normal tooling. It is a window example rather than a new application scaffold or webview.

Vanilla, WinUI and Tk share a procedural interference field solely to keep cross-platform mechanics inspectable. They are not curated artistic references. Product art direction must generate and select its own concepts. The three strategies need not look alike. The authored sample deliberately stores only four small poses; it illustrates frame selection, not an expressive-art quality benchmark. For actual audio/transfer/topology, read real data independently from artistic cadence. Recordings and tests live in the accompanying release evidence, outside the clean install.

Typography uses installed Departure Mono with a fixed-width fallback. Test actual fallback pitch. Bundle licensed local Departure files only with OFL rights/license, never fetch them at runtime. These examples contain original code and strings; reuse under CC0 as stated in [LICENSE.txt](LICENSE.txt).

For React/Vue/Svelte, own the surface in a lifecycle/ref rather than creating per-glyph elements; release listeners/scheduler on unmount. In Qt, .NET desktop, SwiftUI or another stack, map the same eligibility state to its dispatcher/timer, semantic labels and platform preference/visibility events. Keep input/state updates immediate, freeze ambient active time while paused, read current reactive data on resume, skip stale frames and reuse buffers. A forever-running guarded timer does not satisfy suspension. Follow [art direction](../../references/ascii-motion.md) and [temporal QA](../../execution/motion-qa.md).
