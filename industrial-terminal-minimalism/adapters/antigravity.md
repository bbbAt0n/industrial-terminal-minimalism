# Antigravity adapter

**Status:** documented mechanism checked 2026-10-18; App, CLI, and IDE runtime activation all unverified. [Evidence and smoke test](verification.md).

[Official documentation](https://antigravity.google/docs/skills) distinguishes locations by surface. Follow [the shared copy instructions](README.md):

| Scope/surface | Destination |
| --- | --- |
| Project App/CLI/IDE | `<workspace>/.agents/skills/industrial-terminal-minimalism/` |
| Personal App/IDE | `~/.gemini/config/skills/industrial-terminal-minimalism/` |
| Personal CLI | `~/.gemini/antigravity-cli/skills/industrial-terminal-minimalism/` |

Docs identify singular `.agent/skills` as backward-compatible; prefer plural `.agents` for new installs. Keep SKILL.md directly in the named folder. App/CLI document slash invocation:

```text
/industrial-terminal-minimalism Design the requested product interface from its purpose and content; implement and validate the result.
```

For IDE, inspect active skills in the agent panel's Customizations menu and explicitly name the skill. Verify its actual invocation UI rather than assuming parity. Restart if needed, confirm version-specific paths, and perform [the smoke test](verification.md).

If native discovery/activation is unavailable or the installed surface differs, use [manual instructions](manual.md). No rules file, plugin manifest, or surface-specific design rule is introduced into the core.
