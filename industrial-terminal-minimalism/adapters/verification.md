# Installation and invocation

Install the whole skill folder at one of the locations below. Project scope is recommended for one product; personal scope makes it available across projects. Keep `SKILL.md` and all relative resources together.

| Client | Project / personal location | Explicit invocation |
| --- | --- | --- |
| [Codex](codex.md) | `.agents/skills` / `~/.agents/skills` | `$industrial-terminal-minimalism` |
| [Claude Code](claude.md) | `.claude/skills` / `~/.claude/skills` | `/industrial-terminal-minimalism` |
| [Grok Build](grok-build.md) | `.grok/skills` / `~/.grok/skills` | `/industrial-terminal-minimalism` |
| [Antigravity](antigravity.md) | `.agents/skills` / App/IDE: `~/.gemini/config/skills`; CLI: `~/.gemini/antigravity-cli/skills` | `/industrial-terminal-minimalism`; in the IDE, name the skill in the agent panel |

Append `/industrial-terminal-minimalism` to the location. Use the repository installer or follow the [shared copy instructions](README.md).

## Start a session

Start a new session and invoke the skill explicitly. Ask the agent to read the installed `SKILL.md` and the references for your task. Automatic selection depends on the client, its configuration and the request.

If the skill is missing, check the folder location, client access and discovery settings, then restart the session. Local, IDE and cloud sessions may use different locations. Use the [manual adapter](manual.md) when a native loader is unavailable.

## Contributor checks

The repository's `scripts/release.py check` exercises installation destinations, dry runs, update protection, backups, rollback, checksums, links and tokens. To check invocation in a client, install one copy, open a new session, invoke it explicitly and confirm that the agent reads resources from that installed folder. Check automatic selection separately with a relevant request.
