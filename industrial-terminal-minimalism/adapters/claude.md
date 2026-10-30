# Claude Code adapter

Install the folder at one destination below, then invoke the skill explicitly in a new session. Automatic selection depends on the client. See [installation and invocation guidance](verification.md).

[Official documentation](https://code.claude.com/docs/en/skills) describes project/personal skills. Follow [the shared copy instructions](README.md) with one destination:

- `<product-repository>/.claude/skills/industrial-terminal-minimalism/`
- `~/.claude/skills/industrial-terminal-minimalism/`

Keep SKILL.md directly inside that folder with all relative resources. Invoke:

```text
/industrial-terminal-minimalism Design the requested product interface from its purpose and content; implement and validate the result.
```

Description matching may also select the skill. Confirm listing and actual resource reads with [the activation smoke test](verification.md); restart if discovery is stale. The core uses ordinary relative paths and no Claude-specific permissions/substitutions. Do not replace an existing CLAUDE.md to install it.

Personal machine-local installation does not establish availability in cloud/Cowork sessions. Verify that surface's loading route separately. If native activation is unavailable, use [manual instructions](manual.md) with the identical design and QA rules.

Keep model invocation enabled (do not set `disable-model-invocation: true`). Prefer project installation for a single product. Only when the requester requests a project routing instruction, merge a sentence into the existing `CLAUDE.md` pointing work in this chosen identity to `.claude/skills/industrial-terminal-minimalism/SKILL.md`. Preserve other instructions and user-requested identity overrides. The design rules stay in the shared bundle.
