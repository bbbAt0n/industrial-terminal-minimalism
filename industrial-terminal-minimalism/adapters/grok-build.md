# Grok Build adapter

Install the folder at one destination below, then invoke the skill explicitly in a new session. Automatic selection depends on the client. See [installation and invocation guidance](verification.md).

[Official documentation](https://docs.x.ai/build/features/skills-plugins-marketplaces) documents folder-based skills. Follow [the shared copy instructions](README.md), choosing one destination:

- `<product-repository>/.grok/skills/industrial-terminal-minimalism/`
- `~/.grok/skills/industrial-terminal-minimalism/`

Keep SKILL.md directly in the folder with relative resources. Invoke:

```text
/industrial-terminal-minimalism Design the requested product interface from its purpose and content; implement and validate the result.
```

Use `/skills` to inspect the extensions interface, then perform [the activation smoke test](verification.md) with actual resource reads. Docs also describe compatibility paths, but use one explicit installation rather than duplicate copies through multiple routes.

Grok Build CLI documentation does not establish local discovery in a chat/web surface. If the installed surface lacks a documented or functioning native route, use [manual instructions](manual.md) and check activation on that surface separately. The core does not acquire Grok-specific settings or behavior.

Automatic model invocation remains enabled by default. Do not add `disable-model-invocation: true` or `user-invocable: false` for the normal workflow. Verify the installed CLI rather than inferring that Grok web Skills use the same folders.
