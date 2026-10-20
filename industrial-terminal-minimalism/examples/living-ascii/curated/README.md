# Four original ASCII art studies

Serve the parent directory locally with an existing static server and open [the gallery](index.html). No installation, external renderer, remote font, service or runtime download is required. These are artistic references, separate from the parent Vanilla/WinUI/Tk technical tests.

| Study | Visual purpose / composition | Motion and lifecycle | Representative poster |
| --- | --- | --- | --- |
| Device assembly | Broadside smartphone, readable bezel/earpiece/home bar; separate circuit board with dense chip and sparse traces. Negative space separates the repair layers. | 8s smooth separation and return; retains the phone silhouette. Reduced motion uses a separated still; pause freezes active time. | [Phone](phone-poster.png) |
| Tidal fold | One shaded ribbon with three folds, quiet edges and a dense near-facing mass. Intentional abstract shape, not an interference-field test. | 10s periodic bending; coherent shading and geometry, no random glyph replacement. | [Ribbon](ribbon-poster.png) |
| Directed signal | Wide quiet channel and two spaced three-row arrows, with distinct source and receiver silhouettes. | 6s left-to-right transit; endpoint masks conceal wrap. Fixture illustration, never measured traffic. | [Signal](directed-poster.png) |
| Musical envelope | Many mirrored vertical bars around a central axis. Dense peaks and open quiet passages produce a musical silhouette. | Actual WebAudio time-domain samples; 2048-sample window, 64 desktop/40 mobile columns, 8Hz. Peak/RMS bins, bounded adaptive ceiling, fast attack and slower release. Silence is flat. Explicit play; 12s finite local composition resolves at its end. Visual pause leaves audio running. | [Actual-audio frame](audio-poster.png) |

The gallery uses the existing `createSurface` mechanics, not another engine. Artwork functions in `art.mjs` are ordinary local math; `waveform.mjs` only analyses supplied real samples. The signal and ribbon do not claim measured data. Audio must be started by its control, and missing audio displays an error rather than generated activity.

All surfaces suspend their actual visual scheduler offscreen, hidden, page-inactive, paused or reduced; audio work remains independent. Resizing changes detail before shrinking text further. Inspect light/dark and font fallback at intended size. Decorative fields are hidden from accessibility trees; the purpose/status/control remain semantic.

Posters alone do not prove motion quality; inspect actual frames and normal-speed playback when evaluating these studies. Original artwork, code and the local original audio excerpt are CC0 under the parent [license](../LICENSE.txt). The audio comes from the original Noctra composition, with a finite fade-out; no third-party asset or font binary is bundled.
