# Codex adapter

**Status:** documented mechanism checked 2026-10-18; installed-client activation unverified. [Evidence and smoke test](verification.md).

[Official documentation](https://learn.chatgpt.com/docs/build-skills) describes SKILL.md bundles in project `.agents/skills` and personal `~/.agents/skills`. Follow [the shared copy instructions](README.md), choosing one destination:

- `<product-repository>/.agents/skills/industrial-terminal-minimalism/`
- `~/.agents/skills/industrial-terminal-minimalism/`

Keep SKILL.md directly inside the folder and retain relative resources. Explicit CLI/IDE invocation:

```text
$industrial-terminal-minimalism Design the requested product interface from its purpose and content; implement and validate the result.
```

Use `/skills` or the `$` selector where available to inspect discovery. Surface-specific UI can differ. Restart for stale discovery, inspect the installed client's documented configuration/access, and perform [the activation smoke test](verification.md). Do not infer success from the presence of this file or use the workspace's historical `.codex/skills` inventory as the portable install route.

If native activation is unavailable/unverified, use [manual instructions](manual.md). Core design, decision, and QA rules are identical; no vendor UI metadata or global configuration edit is required by this bundle.

Automatic invocation is enabled by default; do not add `allow_implicit_invocation: false` when using this as your personal default. For an explicit project default, merge a short instruction into the product's existing `AGENTS.md`: "For UI design and frontend tasks, apply industrial-terminal-minimalism from .agents/skills/industrial-terminal-minimalism unless the user requests another identity." Preserve all existing project instructions. This is optional host setup, not a change to the design rules.
