#!/usr/bin/env python3
"""Install the bundled skill. Python 3.10+, standard library only; no downloads."""
import argparse
from datetime import datetime, timezone
import hashlib
import json
from pathlib import Path
import shutil
import tempfile

NAME = "industrial-terminal-minimalism"
ROOT = Path(__file__).resolve().parent
PROJECT = {"codex": ".agents/skills", "claude": ".claude/skills",
           "grok": ".grok/skills", "antigravity": ".agents/skills",
           "antigravity-cli": ".agents/skills"}
PERSONAL = {**PROJECT, "antigravity": ".gemini/config/skills",
            "antigravity-cli": ".gemini/antigravity-cli/skills"}


def verify(source):
    manifest = json.loads((source / "package-manifest.json").read_text(encoding="utf-8"))
    if manifest["name"] != NAME or manifest["kind"] != "installable-skill":
        raise ValueError("Unexpected package identity")
    expected = manifest["files"]
    actual = set()
    for path in source.rglob("*"):
        if path.is_symlink():
            raise ValueError(f"Symbolic links are not allowed: {path}")
        if path.is_file():
            actual.add(path.relative_to(source).as_posix())
    if actual != set(expected) | {"package-manifest.json"}:
        raise ValueError("Package contains missing or extra files; use a fresh release copy")
    for name, digest in expected.items():
        path = (source / name).resolve()
        if not path.is_relative_to(source.resolve()):
            raise ValueError(f"Unsafe manifest path: {name}")
        if hashlib.sha256(path.read_bytes()).hexdigest() != digest:
            raise ValueError(f"Checksum mismatch: {name}")
    return manifest


def destination(agent, scope, project, personal):
    base = personal if scope == "user" else project
    routes = PERSONAL if scope == "user" else PROJECT
    return base / routes[agent] / NAME


def install(source, target, update=False):
    verify(source)
    # Reject a link before resolve(), so updates cannot target a linked install.
    if target.is_symlink():
        raise ValueError("Refusing a symbolic-link destination")
    target = target.resolve()
    if target == source.resolve() or target.is_relative_to(source.resolve()) or source.resolve().is_relative_to(target):
        raise ValueError("Installation destination overlaps the release source")
    if target.exists() and not update:
        raise FileExistsError(f"Already installed: {target}. Use --update to keep a backup and replace it.")
    if target.exists() and not (target.is_dir() and (target / "SKILL.md").is_file()):
        raise ValueError("Existing destination is not a skill directory")
    target.parent.mkdir(parents=True, exist_ok=True)
    backup = None
    with tempfile.TemporaryDirectory(prefix=".itm-stage-", dir=target.parent) as temporary:
        stage = Path(temporary) / NAME
        shutil.copytree(source, stage)
        verify(stage)
        if target.exists():
            stamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%S%fZ")
            # Outside the discovery directory: backups must not load as duplicate skills.
            backups = target.parent.parent / "skill-backups"
            backups.mkdir(exist_ok=True)
            backup = backups / f"{NAME}-{stamp}"
            target.rename(backup)
        try:
            stage.rename(target)
        except OSError:
            if backup is not None:
                backup.rename(target)
            raise
    return backup


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--agent", choices=tuple(PROJECT), required=True)
    parser.add_argument("--scope", choices=("user", "project"), default="user")
    parser.add_argument("--project", type=Path, default=Path.cwd(), help="Project root for --scope project")
    parser.add_argument("--update", action="store_true", help="Replace an existing skill, preserving a backup")
    parser.add_argument("--dry-run", action="store_true", help="Verify the bundle and print the destination without writing")
    args = parser.parse_args()
    try:
        source = ROOT / NAME
        manifest = verify(source)
        target = destination(args.agent, args.scope, args.project.resolve(), Path.home())
        if args.dry_run:
            print(f"Verified {NAME} v{manifest['version']}; destination: {target}")
            return 0
        backup = install(source, target, args.update)
        print(f"Installed {NAME} v{manifest['version']} to {target}")
        if backup:
            print(f"Previous installation preserved at {backup}")
        print("Start a fresh client session and explicitly invoke the skill to check activation.")
        return 0
    except (OSError, ValueError, KeyError) as error:
        parser.exit(1, f"Installation failed: {error}\n")


if __name__ == "__main__":
    raise SystemExit(main())
