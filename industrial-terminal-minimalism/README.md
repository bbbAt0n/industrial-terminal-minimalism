# Industrial Terminal Minimalism

Design and build calm, precise interfaces with palettes and fonts chosen for your project, light and dark tokens, responsive layouts and Living ASCII graphics.

Start with [SKILL.md](SKILL.md) and choose a task mode:

| Mode | Use it for |
| --- | --- |
| Quick Edit | Fix a specific component or layout problem. |
| Visual Restyle | Refresh the visual identity while preserving layout and information architecture. |
| Full Redesign | Explore three distinct directions, choose one, then implement it. |
| ASCII Artwork | Create standalone artwork from a source or concept, with motion when requested. |

[STYLE.md](STYLE.md) defines the visual principles. [Palette guidance](references/palette.md) explains how to derive colours from your brand; [typography guidance](references/typography.md) helps you choose fonts freely.

Living ASCII offers Halftone and Grey Tiles for any source, plus Braille, Amber Glow and Old Monitor for maps, outlines, large type, flat graphics and simple 3D. Old Monitor supports green/warm/cool phosphor presets or any colour. See the [renderer selection guide](references/ascii-motion.md#renderer-selection-decision-model) and [three-step integration](examples/living-ascii/README.md#integrate-the-engine-in-3-steps).

## Canonical ownership

Each topic has one canonical owner. Other files summarize and link; links do not imply a requirement to read every owner.

| Topic | Canonical owner |
| --- | --- |
| Applicability, project priorities, cards/demo data, four modes, direction choice, reading router | [SKILL.md](SKILL.md) |
| Identity invariants, boundaries and user/project/system theme precedence | [STYLE.md](STYLE.md) |
| Discovery questions and concise design intent | [Product analysis](reasoning/product-analysis.md) |
| Composition, three distinct concepts and preview/selection procedure | [Composition](reasoning/composition.md) |
| Transferable aesthetic references, without copyrighted imagery | [Visual references](references/visual-reference.md) |
| Palette character, project derivation, three palette directions and worked role mappings | [Palette](references/palette.md) |
| Font roles, user fonts, verification, fallback and synthesis | [Typography](references/typography.md) |
| Accessibility criteria, semantics, contrast, targets, pause/reduced-motion requirements | [Accessibility](references/accessibility.md) |
| ASCII art direction, approval/source limits, density, sampling, glow/cadence/hysteresis parameters | [ASCII contract](references/ascii-motion.md) |
| Architecture, components, state/data preservation and responsive implementation | [Frontend execution](execution/frontend.md) |
| Rendered inspection, interaction evidence, correction and final evidence record | [Visual QA](execution/visual-qa.md) |
| General motion cadence, scheduler/lifecycle and temporal-evidence procedure | [Motion QA](execution/motion-qa.md) |
| Independent acceptance outcomes and compact evaluation scale | [Rubric](validation/rubric.md) |
| Token schema, generated resources and validation commands | [Token guide](tokens/README.md); values in [foundation](tokens/foundation.json), [light](tokens/light.json), [dark](tokens/dark.json), [motion](tokens/motion.json) |
| Original runnable artwork/mechanics and example-specific APIs | [Living ASCII example index](examples/living-ascii/README.md) and the selected example's files |
| Client-specific installation/discovery/activation | [Adapters](adapters/README.md); guidance in [verification](adapters/verification.md) |
| Licenses and font credits | [NOTICE.md](NOTICE.md) |
| Installed-bundle orientation / revision history | This README / [CHANGELOG.md](CHANGELOG.md) |

## Install and use

Use the repository's `install.py` or copy this whole folder to your client's skills directory. Project scope is recommended for one product. Keep the relative resources, [MIT License](LICENSE) and [CC0 example dedication](examples/living-ascii/LICENSE.txt). See [adapters](adapters/README.md) for locations and invocation.

Start a new session and invoke the skill explicitly; agents do not always pick it up automatically.

Run token checks from this folder with Python 3.10+:

```sh
python scripts/tokens.py check
python scripts/tokens.py validate
```

See [CHANGELOG.md](CHANGELOG.md) for changes and [NOTICE.md](NOTICE.md) for licenses and font credits.
