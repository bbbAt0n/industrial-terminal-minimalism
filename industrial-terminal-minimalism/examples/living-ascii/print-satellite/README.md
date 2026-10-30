# Graphical satellite / Halftone and Grey Tiles

Open `index.html` directly in an existing browser. No install, server, network or font is required. Alternatively use an existing local static server. `?mode=tiles` selects Grey Tiles; `?theme=dark` selects dark. Explicit theme takes precedence over the initial system preference. Buttons select either renderer, pause/resume the active phase, restart at zero, or switch theme.

These are **graphical renderers, not literal ASCII**. Halftone maps tone to circular dot **area**. Grey Tiles draws six quantized tonal levels as abutting integer rectangles. Both reuse one original recognizable satellite: solar wings, stepped instrument bus, grille and antenna. No model, external media, third-party artwork, font or rendering library is bundled. The source raster and two approved algorithms are ported from the original v1.1 local lab; the lab UI and experiments are excluded.

## Rendering contract

- The [canonical satellite sampling contract](../../../references/ascii-motion.md#canonical-satellite-sampling-contract) owns sampling, timing, quantization hysteresis, colour interpolation and key-pose thresholds. CSS fits the complete logical artwork into narrow windows; no WebGL is used.
- One timeout owns playback. Pause preserves the pose; hidden/offscreen/page suspension cancels scheduling. Dynamic reduced motion shows the static zero pose. Restart works while paused/reduced. See [motion lifecycle QA](../../../execution/motion-qa.md) for verification.
- Call `printStudy.destroy()` when a host route unmounts. It cancels the timeout, disconnects the observer and removes all event handlers. Page exit does this automatically; persisted page-cache entries suspend/resume instead. `printStudy.metrics` and paused `seek(seconds, resetHistory)` support local inspection without a second clock.

## Native implementations and fallback

These are implementation notes, **not a tested native port of the satellite**. Retain the product's native toolkit; a browser runtime is not required for either algorithm.

For **Tk Canvas**, project the original box/face vertices into one fixed logical surface; rasterize/sum local luminance into bounded cell arrays, then update pooled `create_oval` items for Halftone or abutting `create_rectangle` items for Grey Tiles. Use the canonical dot-radius formula, hysteresis and source timing linked above. Scale the complete logical surface consistently. Tk's rasterization/antialiasing differs from Canvas 2D, so pixel parity and native frame cost require new captures. Own one `after` handle; `after_cancel` on unmap/inactive/reduced/close and resume only when eligible.

For **WinUI**, draw pooled ellipses/rectangles on an existing custom drawing surface (or an existing native bitmap path); use theme token endpoints and a monotonic active clock. Do not add a WebView or a new graphics dependency solely for this example. Use the host's visibility, activation and Windows animation-preference events, unsubscribe and stop its timer on teardown. Measure native rasterization and frame cost before shipping.

If a native custom surface is unavailable, use the existing [Tk text example](../tkinter_example.py) or [WinUI text example](../LivingAsciiWindow.cs) as the honest **character-art fallback**; it does not reproduce these graphical renderers. A static locally generated key pose is another valid fallback. The existing [browser surface](../surface.mjs) remains the general character-art lifecycle example.

All files here are original procedural example materials within the existing [CC0 dedication](../LICENSE.txt). No binary poster or video is included; capture a local key pose if the host needs one. Native graphical execution and physical OS visibility behavior must be separately verified.
