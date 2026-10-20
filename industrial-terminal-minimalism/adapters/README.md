# Installation and agent adapters

All agents receive the same core, DNA, reasoning, patterns, and QA criteria. Only installation/discovery/activation differs. Native mechanisms are documented, but installed-client activation remains unverified; [the evidence record](verification.md) defines the checks required before claiming a verified integration.

Choose [Codex](codex.md), [Claude Code](claude.md), [Antigravity](antigravity.md), or [Grok Build](grok-build.md) for the destination and invocation. Use [manual instructions](manual.md) where native activation is unavailable. Do not invent discovery filenames or edit unrelated configuration.

## Shared copy recipe

Extract the clean release ZIP first. Copy its `industrial-terminal-minimalism` folder with SKILL.md directly in the destination folder of that name. The release excludes evaluation applications, historical fixtures and maintenance tests. Do not copy the development repository wholesale.

PowerShell: substitute your actual source and the destination from the chosen adapter:

```powershell
$skillSource = (Resolve-Path 'C:\path\to\extracted\industrial-terminal-minimalism').Path
$skillDestination = 'C:\path\to\chosen\skills\industrial-terminal-minimalism'
if (Test-Path -LiteralPath $skillDestination) { throw 'Destination exists; review the update deliberately.' }
New-Item -ItemType Directory -Path (Split-Path -Parent $skillDestination) -Force | Out-Null
Copy-Item -LiteralPath $skillSource -Destination $skillDestination -Recurse
```

POSIX equivalent:

```sh
skill_source='/path/to/extracted/industrial-terminal-minimalism'
skill_destination='/path/to/chosen/skills/industrial-terminal-minimalism'
if [ -e "$skill_destination" ]; then
  echo 'Destination exists; review the update deliberately.' >&2
  exit 1
fi
mkdir -p "$(dirname "$skill_destination")"
cp -R "$skill_source" "$skill_destination"
```

Avoid overlapping copies. Test activation/resource loading in a fresh client session and record evidence. Updating means deliberately replacing/reviewing that one copy; no global configuration change is required by this repository. Uninstall by removing only the explicitly installed directory after verifying its path.

## Default use for personal UI work

Choose the adapter's personal/global destination when this is your default identity across products, or its project destination for one product. The description covers substantial UI design, frontend implementation and visual critique. Automatic model invocation is left enabled: no explicit-only flags are shipped. Discovery still depends on host configuration and model selection; automatic application is not guaranteed by a folder copy. Explicitly invoke the named skill if it is missed and verify actual resource reads.

For a future host with no documented skill loader, use the manual adapter with the same core and relative resources. Do not invent native configuration. Existing user choices and requests for another identity take precedence.
