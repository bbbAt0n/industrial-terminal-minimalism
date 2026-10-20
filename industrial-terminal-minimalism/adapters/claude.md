# Claude Code adapter

**Status:** documented mechanism checked 2026-10-18; installed-client activation unverified. [Evidence and smoke test](verification.md).

[Official documentation](https://code.claude.com/docs/en/skills) describes project/personal skills. Follow [the shared copy instructions](README.md) with one destination:

- `<product-repository>/.claude/skills/industrial-terminal-minimalism/`
- `~/.claude/skills/industrial-terminal-minimalism/`

Keep SKILL.md directly inside that folder with all relative resources. Invoke:

```text
/industrial-terminal-minimalism Design the requested product interface from its purpose and content; implement and validate the result.
```

Description matching may also select the skill. Confirm listing and actual resource reads with [the activation smoke test](verification.md); restart if discovery is stale. The core uses ordinary relative paths and no Claude-specific permissions/substitutions. Do not replace an existing CLAUDE.md to install it.

Personal machine-local installation does not establish availability in cloud/Cowork sessions. Verify that surface's loading route separately. If native activation is unavailable/unverified, use [manual instructions](manual.md) with the identical design and QA rules.

Keep model invocation enabled (do not set `disable-model-invocation: true`). If a stronger project default is desired, merge a short routing sentence into the existing `CLAUDE.md` pointing UI work to `.claude/skills/industrial-terminal-minimalism/SKILL.md`, preserving other instructions and user-requested identity overrides. The design rules stay in the shared bundle.
