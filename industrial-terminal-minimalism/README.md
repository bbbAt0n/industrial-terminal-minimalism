# Industrial Terminal Minimalism v1

Universal UI design and frontend implementation skill. Start with [SKILL.md](SKILL.md) and its task-specific resource links. [STYLE.md](STYLE.md) defines the identity; [tokens](tokens/README.md) provide light/dark values. [CHANGELOG.md](CHANGELOG.md) covers design revisions.

Install this whole folder using the repository's `install.py`, or follow the [manual copy instructions](adapters/README.md). Keep relative resources together. See [agent adapters](adapters/README.md) for discovery and activation; client activation remains unverified.

Original project materials are [MIT licensed](LICENSE), with the existing [CC0 Living ASCII exception](examples/living-ascii/LICENSE.txt). See [licensing and provenance notices](NOTICE.md). Personal and commercial interface development is permitted under the applicable licenses; generated products do not automatically inherit MIT. No third-party reference image or font binary is bundled.

For structural checks with Python 3.10+:

```sh
python scripts/tokens.py check
python scripts/tokens.py validate
```

These checks do not prove rendered visual quality, motion quality or activation inside an agent client.
