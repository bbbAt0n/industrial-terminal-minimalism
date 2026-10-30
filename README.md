# Industrial Terminal Minimalism

[English](README.md) | [Русский](README.ru.md)

An agent skill for designing and building calm, precise interfaces with an industrial-terminal character: warm materials, strict typography, one signal colour and living ASCII graphics. It adapts to your project instead of forcing a template.

## What you get

- **A palette method built around your project and brand.** Start with Paper menu, Research poster or Signal board, then check contrast with `tokens.py validate-palette`. The warm paper/graphite token set is a default starting point, not a requirement. See [palette guidance](industrial-terminal-minimalism/references/palette.md).
- **Free font choice**, guided by readability, purpose, language coverage, licensing and fallbacks; no imposed font.
- **Layout checks at 390, 768, 1440, 1920 and 2560 px**, with rules for wide and 2K+ screens.
- **Living ASCII with five modes:** Halftone and Grey Tiles for any source; Braille, Amber Glow and Old Monitor for maps, outlines, large type, flat graphics and simple 3D. Old Monitor supports green/warm/cool phosphor presets or any colour. [Integrate the engine in three steps](industrial-terminal-minimalism/examples/living-ascii/README.md#integrate-the-engine-in-3-steps).
- **Four task modes:** Quick Edit, Visual Restyle, Full Redesign (three directions, you pick one) and ASCII Artwork.
- **Light and dark design tokens**, accessibility and visual QA guidance, and implementation examples.

## Install

Requires **Python 3.10+**, standard library only. Download and extract the ZIP from [Releases](https://github.com/bbbAt0n/industrial-terminal-minimalism/releases), or clone:

```sh
git clone https://github.com/bbbAt0n/industrial-terminal-minimalism.git
cd industrial-terminal-minimalism
```

Run `python install.py --agent <client>` from the extracted or cloned folder for a personal installation. For one product, project scope is recommended:

```sh
python install.py --agent codex --scope project --project "/path/to/project"
```

| Client | Personal install | Invocation |
| --- | --- | --- |
| Codex | `python install.py --agent codex` | `$industrial-terminal-minimalism` |
| Claude Code | `python install.py --agent claude` | `/industrial-terminal-minimalism` |
| Grok Build | `python install.py --agent grok` | `/industrial-terminal-minimalism` |
| Antigravity App/IDE | `python install.py --agent antigravity` | `/industrial-terminal-minimalism` |
| Antigravity CLI | `python install.py --agent antigravity-cli` | `/industrial-terminal-minimalism` |

Locations are relative to your home directory (personal) or project root. Append `/industrial-terminal-minimalism` to each path:

| Client | Personal | Project |
| --- | --- | --- |
| Codex | `.agents/skills` | `.agents/skills` |
| Claude Code | `.claude/skills` | `.claude/skills` |
| Grok Build | `.grok/skills` | `.grok/skills` |
| Antigravity App/IDE | `.gemini/config/skills` | `.agents/skills` |
| Antigravity CLI | `.gemini/antigravity-cli/skills` | `.agents/skills` |

Codex and Antigravity share a project destination; install one copy when using both. In the Antigravity IDE, you can also name the skill explicitly in the agent panel.

Add `--dry-run` to preview the destination. Add `--update` to install a new version with a backup; keep the same scope and project options. To install manually, copy the entire [skill folder](industrial-terminal-minimalism/) to the chosen location with its relative resources. On Windows, `py -3` can replace `python`; on macOS/Linux, use `python3` if needed.

Start a new session and invoke the skill explicitly; agents do not always pick it up automatically.

## Quick start

```text
$industrial-terminal-minimalism Redesign the dashboard in src/ for our telemetry product. Derive the palette from our brand colours and add a living ASCII map in the hero.
```

## Checks (optional, for contributors)

```sh
python -X utf8 scripts/release.py check
python -X utf8 industrial-terminal-minimalism/scripts/tokens.py check
python -X utf8 industrial-terminal-minimalism/scripts/tokens.py validate
```

## License

Released under the [MIT License](LICENSE). The Living ASCII examples, posters and audio study are dedicated to the public domain under [CC0 1.0](industrial-terminal-minimalism/examples/living-ascii/LICENSE.txt). What you build with the skill is yours. See [NOTICE.md](industrial-terminal-minimalism/NOTICE.md) for font credits.
