# Industrial Terminal Minimalism

[English](README.md) | [Русский](README.ru.md)

**v1** · A portable UI design and frontend implementation skill for Codex, Claude Code, Grok Build and Antigravity.

Warm light surfaces, precise typography, restrained geometry and clear selection, with a complete dark theme. The identity adapts to the product instead of imposing a screen template. **Living ASCII Motion** covers authored, procedural and actual-data-reactive character graphics, reduced motion, pause and lifecycle behavior. Includes design tokens, accessibility guidance, implementation examples and visual QA.

## Install and update

Requires **Python 3.10+**, standard library only. Download and extract the ZIP from [Releases](https://github.com/bbbAt0n/industrial-terminal-minimalism/releases), or clone:

```sh
git clone https://github.com/bbbAt0n/industrial-terminal-minimalism.git
cd industrial-terminal-minimalism
python install.py --agent codex
```

Run commands from the extracted/cloned folder. On Windows, `py -3` can replace `python`; on macOS/Linux use `python3` if needed. All commands install the same skill and its relative resources.

| Client | Personal install command | Explicit activation |
| --- | --- | --- |
| Codex | `python install.py --agent codex` | `$industrial-terminal-minimalism` |
| Claude Code | `python install.py --agent claude` | `/industrial-terminal-minimalism` |
| Grok Build CLI | `python install.py --agent grok` | `/industrial-terminal-minimalism` |
| Antigravity App/IDE | `python install.py --agent antigravity` | App: `/industrial-terminal-minimalism`; IDE: name it and inspect Customizations |
| Antigravity CLI | `python install.py --agent antigravity-cli` | `/industrial-terminal-minimalism` |

```sh
# Preview without writing; project install; update with backup:
python install.py --agent codex --dry-run
python install.py --agent codex --scope project --project "/path/to/project"
python install.py --agent codex --update
```

For another client, replace `codex` with its table value. For a project update, retain `--scope project --project "/path/to/project"` and add `--update`. Obtain/extract the new release first, or run `git pull --ff-only` in a clean clone before updating. Existing installations are protected unless `--update` is supplied. Updates preserve the old folder outside skill discovery and print its backup path. To restore it, move the new installation aside and move that backup to the original destination. Uninstall by removing only the exact installed skill folder printed by the installer.

### Locations

Relative to your home directory (personal) or the selected project root; append `/industrial-terminal-minimalism` to each path:

| Client | Personal | Project |
| --- | --- | --- |
| Codex | `.agents/skills` | `.agents/skills` |
| Claude Code | `.claude/skills` | `.claude/skills` |
| Grok Build | `.grok/skills` | `.grok/skills` |
| Antigravity App/IDE | `.gemini/config/skills` | `.agents/skills` |
| Antigravity CLI | `.gemini/antigravity-cli/skills` | `.agents/skills` |

Codex and Antigravity share a project destination: install once when using both. Manual installation: copy the entire [skill folder](industrial-terminal-minimalism/) to the chosen destination, retaining its license, notices and relative resources. No client settings are modified; installation and runtime examples need no remote service or asset download.

Start a fresh client session and explicitly activate the skill. Ask it to read `SKILL.md`, `STYLE.md` and the theme tokens from its installed folder before applying it to a task. Automatic selection depends on the host. These are documented installation targets, not certified integrations: see [adapters and activation checks](industrial-terminal-minimalism/adapters/README.md). Claude Code 2.1.220 is present in the release environment but is signed out; genuine activation could not be verified. Other client activation and native WinUI/Tk runtime behavior are also unverified for this release. Local Windows installation checks do not establish macOS/Linux client compatibility.

## License and references

Original project-controlled materials are [MIT licensed](LICENSE), Copyright (c) 2026 bbbAt0n. Original Living ASCII examples, posters and audio retain their existing [CC0 dedication](industrial-terminal-minimalism/examples/living-ascii/LICENSE.txt); see [scope, provenance and exceptions](industrial-terminal-minimalism/NOTICE.md).

You may use the skill to build **personal and commercial interfaces**, subject to the applicable licenses. Generated websites and applications do **not** automatically inherit MIT. Copying substantial repository materials may carry their applicable notice obligations; separately obtained assets and dependencies retain their own licenses.

No private reference screenshot, Pinterest download, game artwork or font binary is bundled. NieR:Automata and Alien are aesthetic influences only; no affiliation or endorsement is implied. Departure Mono is optional and separately licensed. Provenance review is not a complete legal clearance.

## Resources and checks

Start with [SKILL.md](industrial-terminal-minimalism/SKILL.md), [STYLE.md](industrial-terminal-minimalism/STYLE.md), [tokens](industrial-terminal-minimalism/tokens/README.md), [Living ASCII examples](industrial-terminal-minimalism/examples/living-ascii/README.md) and the [changelog](industrial-terminal-minimalism/CHANGELOG.md).

```sh
python scripts/release.py check
python industrial-terminal-minimalism/scripts/tokens.py check
python industrial-terminal-minimalism/scripts/tokens.py validate
```

The release check uses temporary isolated installations, verifies checksums and links, and exercises documented installer routes. A manifest detects missing/modified files, not publisher identity. Structural checks do not prove visual quality or client activation. Research, field-test applications, private references, recordings and caches are excluded from distribution.
