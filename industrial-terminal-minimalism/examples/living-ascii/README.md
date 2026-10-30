# Local Living ASCII examples

## Artistic references

Start with the [curated collection](curated/README.md) and its [local gallery](curated/index.html): recognizable device assembly, a shaded folded ribbon, directed signal movement and an actual-audio mirrored waveform. Each has an inspected representative poster, a distinct motion purpose and a documented lifecycle. These are examples to reason from, not universal product templates.

## Proven graphical renderers / v1.1 work in progress

The original [Halftone and Grey Tiles satellite](print-satellite/README.md) adds a small shared Canvas 2D example: non-character dots or six-level tiles, not literal ASCII. Open its `index.html` locally for the approved 30 Hz turntable, pause/restart and reduced/static behavior. Its native Tk Canvas / WinUI custom-surface notes clearly distinguish guidance from tested ports. This supplements the curated character studies without replacing them.

The original [signal map](signal-map/README.md) adds **APPROVED SCOPED pixel-raster Braille, single-colour amber Amber Glow and multi-colour phosphor Old Monitor (default green; green/warm/cool presets and any colour via parameter)** for 2D maps/territory outlines, line graphics, large display type, flat/few-tone graphics and simple geometric 3D (torus, cube, sphere-like primitives). Complex 3D assemblies with fine panels, photos, textured/fine relief and small text are outside scope. Braille draws a Unicode-Braille-style dot lattice graphically; the two phosphor modes use real cached glow and always have a dark screen panel. See the [canonical scopes and parameters](../../references/ascii-motion.md#renderer-selection-decision-model). The satellite stays Halftone/Grey Tiles only. Open the local signal map for its pan/zoom, playback controls, reduced motion, suspension and cleanup; native notes remain untested guidance.

## Technical implementation tests and adapters

Optional mechanics, not artistic-quality evidence or product templates. All animation code is local. No animation library, CDN, external service, downloaded media or font binary is included. Use the platform already present in the product.

- **Vanilla:** serve this directory with an installed Python (`python -m http.server 8080 --bind 127.0.0.1`) or existing static server and open `index.html`. `surface.mjs` owns elapsed-time scheduling, user pause, dynamic reduced motion, offscreen/document/page lifecycle and destruction. The page demonstrates procedural, authored and actual pointer-reactive strategies; it is decoration, never telemetry. Call `destroy()` when a host route unmounts.
- **Tk:** run `python tkinter_example.py` with an existing Python/Tk installation. It uses one Label and standard-library math, an 8fps active-time phase, pause/reduced controls, Windows preference check, unmap/focus suspension and close cleanup. Windows preference changes are rechecked on focus and active ticks; re-enabling OS animation while the window stays inactive waits until focus/map/user interaction. Other OS integrations should call the supplied reduced variable from their host preference event. Use the toolkit's existing accessibility conventions and test the shipped platform.
- **WinUI3:** add `LivingAsciiWindow.cs` to an existing WinUI3 project and activate `new LivingAsciiExample.LivingAsciiWindow()`. The host already supplies WindowsAppSDK/.NET; this file adds no package. It contains its own native controls, theme, one TextBlock, deterministic 8 s math, 8 fps timer, active/visible/reduced/user-pause lifecycle and Windows animation-preference event. Build with that project's normal tooling. It is a window example rather than a new application scaffold or webview.

Vanilla, WinUI and Tk share a procedural interference field solely to keep cross-platform mechanics inspectable. They are not curated artistic references. Product art direction must generate and select its own concepts. The three strategies need not look alike. The authored sample deliberately stores only four small poses; it illustrates frame selection, not an expressive-art quality benchmark. For actual audio/transfer/topology, read real data independently from artistic cadence. Recordings and tests live in the accompanying release evidence, outside the clean install.

Typography defaults to optional installed Departure Mono with a fixed-width fallback; project/brand fonts take precedence under the [font contract](../../references/typography.md). Test actual fallback pitch. Bundle licensed local Departure files only with OFL rights/license, never fetch them at runtime. These examples contain original code and strings; reuse under CC0 as stated in [LICENSE.txt](LICENSE.txt).

For React/Vue/Svelte, own the surface in a lifecycle/ref rather than creating per-glyph elements; release listeners/scheduler on unmount. In Qt, .NET desktop, SwiftUI or another stack, map the same eligibility state to its dispatcher/timer, semantic labels and platform preference/visibility events. Keep input/state updates immediate, freeze ambient active time while paused, read current reactive data on resume, skip stale frames and reuse buffers. A forever-running guarded timer does not satisfy suspension. Follow [art direction](../../references/ascii-motion.md) and [temporal QA](../../execution/motion-qa.md).

## Integrate the engine in 3 steps

The small `mountEngine` adapter wraps the existing global raster APIs without altering them. It exposes an ES-module export and loads only the selected family. It does not reuse page-specific `player.mjs` files or invent player exports. Choose a mode through the [source/mode table](../../references/ascii-motion.md#renderer-selection-decision-model) first.

1. Copy local files preserving these relative paths beneath `engine/` (no network/CDN):

   | Mode family | Exact required files relative to this index |
   | --- | --- |
   | Halftone / Grey Tiles | `mount.mjs`, `print-satellite/sampling.mjs`, `print-satellite/renderers.mjs` |
   | Braille / Amber Glow / Old Monitor | `mount.mjs`, `signal-map/raster.mjs` |

   Optional source example for Halftone/Tiles: copy `print-satellite/source.mjs`, import it before mount, and use `source: ({seconds}) => PrintSource.frame(seconds)`. Keep the [CC0 dedication](LICENSE.txt) with reused material. Serve locally through the existing app/static server; the standalone original example pages also support direct file opening. No font binary or runtime download is needed.

2. Add a bounded canvas/container and real pause button. Here the artwork is informative, with a stable caption; for purely decorative art use `aria-hidden="true"` and omit the image role/label. Do not announce animation frames.

```html
<figure>
  <div class="engine-plate"><canvas id="engine-art" role="img"
    aria-label="Selected fictional region outline" aria-describedby="engine-caption"></canvas></div>
  <figcaption id="engine-caption">Original fictional region geometry; static reference, not live telemetry.</figcaption>
</figure>
<button id="engine-pause" type="button" aria-pressed="false">Pause map</button>
<canvas id="engine-source" width="720" height="480" hidden></canvas>
<style>
  .engine-plate { max-width: 1600px; width: 100%; }
  #engine-art { display: block; width: 100%; height: auto; }
</style>
```

3. Populate the source canvas with local art/data, then use this exact module (tested in a full-page integration). The helper accepts a ready local image, GIF, canvas or a procedural `source: ({seconds, width, height}) => sourceCanvas` callback. Source must be same-origin/readable for pixel sampling; wait for image decode first. The helper converts RGB to scalar luminance, keeps a bounded 1600×1000 CSS-pixel raster with a DPR-aware backing canvas (up to 2×), and samples 30 Hz without per-cell DOM. For Halftone/Tiles choose `mode: 'halftone'` / `'tiles'`; for scoped finishes choose `'braille'` / `'amber'` / `'monitor'`. Theme ink uses host semantic roles; Amber is always the fixed approved amber on a dark screen and Old Monitor takes its phosphor parameter, independent of UI palette.

```js
import {mountEngine} from './engine/mount.mjs';

const engine = await mountEngine({
  canvas: document.querySelector('#engine-art'),
  source: document.querySelector('#engine-source'), // Ready local image/GIF/canvas, or a frame function.
  mode: 'braille', // Choose through the canonical source/mode table.
  theme: document.documentElement, // Reads host --itm-color-canvas / --itm-color-text.
  phosphor: 'green' // Only Old Monitor uses this; Amber stays fixed approved amber.
});
const pause = document.querySelector('#engine-pause');
const toggle = () => {
  const stopped = pause.getAttribute('aria-pressed') !== 'true';
  engine.pause(stopped);
  pause.setAttribute('aria-pressed', String(stopped));
  pause.textContent = stopped ? 'Resume map' : 'Pause map';
};
pause.addEventListener('click', toggle);
// The helper owns offscreen/hidden suspension, reduced-motion zero pose and page exit.
// Call dispose on a host route unmount; no guarded forever-running timer remains.
const onExit = event => { if (!event.persisted) dispose(); };
const dispose = () => {
  pause.removeEventListener('click', toggle);
  window.removeEventListener('pagehide', onExit);
  engine.destroy();
};
window.addEventListener('pagehide', onExit);
export {engine, dispose};
```

`engine.redraw()` refreshes changed data immediately; `setOptions({theme, phosphor})` changes presentation. Changing mode/source family means destroy and remount. A static source remains static art: an engine element need not animate. For motion, supply a deterministic frame callback with meaningful poses. The adapter freezes active time on pause/offscreen/hidden, shows zero pose under dynamic reduced motion and destroys observers/listeners/caches on exit. Its `metrics` exposes draws, update, reduced/paused/inView/disposed and scheduler count. Phosphor performance fallback and low-contrast custom colour warnings are exposed via `canvas.dataset.engineFallback` / `phosphorWarning`; show these beside the canvas when those modes are selected. Test the [motion lifecycle](../../execution/motion-qa.md) in the host runtime; browser evidence is not a native port claim.
