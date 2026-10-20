# Platform activation evidence

Official discovery/activation mechanisms were checked on **2026-10-18** in this session. This revision retains those source-backed routes; **no installed-client activation or native integration has been runtime-verified**. Documentation evidence and runtime behavior are different claims. Do not advertise an integration as verified/supported from this matrix alone.

| Client/surface | Source-backed mechanism | Runtime status |
| --- | --- | --- |
| Codex CLI/IDE | [Official skills documentation](https://learn.chatgpt.com/docs/build-skills): repository/user `.agents/skills`, SKILL.md, `$` mention and `/skills` | Unverified; target surface, version, resource reads, and activation require a smoke test |
| Claude Code | [Official skills documentation](https://code.claude.com/docs/en/skills): project/user `.claude/skills`, name/description metadata, slash invocation | Unverified; local/cloud scopes must be checked separately |
| Antigravity | [Official agent skills documentation](https://antigravity.google/docs/skills): project `.agents/skills`, personal paths vary across App/CLI/IDE | Unverified on each surface; do not infer identical paths or invocation UI |
| Grok Build | [Official skills feature documentation](https://docs.x.ai/build/features/skills-plugins-marketplaces): project/user `.grok/skills`, SKILL.md, slash invocation and `/skills` | Unverified in installed CLI; web/chat discovery not established |

## Activation verification procedure

After deliberately installing one copy, record client version, surface, date, path, configuration/access restrictions, and exact invocation. In a fresh session, confirm the skill appears, explicitly activate it, and require actual reads of SKILL.md, STYLE.md, typography, and theme files from the installed bundle. Ask for the first product-analysis step and both canvas/text pairs without editing code. Listing a name or reproducing values from the prompt is insufficient evidence of activation/resource loading.

Then test a bounded authorized task to verify application of the common reasoning/QA rules. Record discovery/activation separately from product design quality. If the route fails or the installed surface is undocumented, use the manual adapter and retain native status as unverified. No global configuration or native skill-activation workflow was changed/run for this release.

## v1 distribution verification (2026-10-20)

The isolated release check exercises personal and project directory installation for every listed target, including dry-run, existing-install protection, update backups, rollback, checksums and resource links. These are installer checks, not client activation tests. Claude Code 2.1.220 is installed but `claude auth status` reports `loggedIn: false`; genuine activation remains unverified. No real personal skill installation or global configuration is modified by these checks. Other client activation and native WinUI/Tk execution were not reverified for this release.
