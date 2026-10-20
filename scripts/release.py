#!/usr/bin/env python3
"""Validate isolated installations, refresh the manifest, or build a clean ZIP (Python 3.10+)."""
import argparse
import hashlib
import importlib.util
import json
import os
from pathlib import Path
import re
import shutil
import subprocess
import sys
import tempfile
from unittest.mock import patch
from urllib.parse import unquote
import zipfile

sys.dont_write_bytecode = True
ROOT = Path(__file__).resolve().parents[1]
NAME = "industrial-terminal-minimalism"
SKILL = ROOT / NAME
ROOT_FILES = (".gitattributes", ".gitignore", "LICENSE", "README.md", "README.ru.md", "install.py", "scripts/release.py")
BLOCKED = {".git", "__pycache__", "node_modules", "Field-Test", "research", "evidence", "legacy-style-lab"}
SUFFIXES = {".md", ".json", ".css", ".png", ".wav", ".html", ".mjs", ".py", ".cs", ".txt"}


def installer():
    spec = importlib.util.spec_from_file_location("itm_install", ROOT / "install.py")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def files():
    result = []
    for path in SKILL.rglob("*"):
        if path.is_symlink():
            raise ValueError(f"Symbolic link in package: {path}")
        if not path.is_file():
            continue
        rel = path.relative_to(SKILL)
        if BLOCKED.intersection(rel.parts) or (path.name != "LICENSE" and path.suffix not in SUFFIXES):
            raise ValueError(f"Unexpected package file: {rel}")
        result.append(rel.as_posix())
    return sorted(result)


def refresh_manifest():
    version = json.loads((SKILL / "tokens/foundation.json").read_text(encoding="utf-8"))["version"]
    manifest = {"name": NAME, "kind": "installable-skill", "version": version,
                "distribution_revision": 1, "license": "MIT",
                "license_exceptions": {"examples/living-ascii/": "CC0-1.0"},
                "files": {name: hashlib.sha256((SKILL / name).read_bytes()).hexdigest()
                          for name in files() if name != "package-manifest.json"}}
    (SKILL / "package-manifest.json").write_text(json.dumps(manifest, indent=2, sort_keys=True) + "\n", encoding="utf-8", newline="\n")
    return manifest


def links(root, names):
    names = set(names)
    for name in names:
        if not name.endswith(".md"):
            continue
        content = (root / name).read_text(encoding="utf-8")
        content = re.sub(r"```.*?```", "", content, flags=re.S)
        for target in re.findall(r"!?\[[^\]]*\]\(([^)]+)\)", content):
            if "://" in target or target.startswith("#"):
                continue
            path = ((root / name).parent / unquote(target.strip("<>").split("#")[0])).resolve()
            if not path.is_relative_to(root.resolve()):
                raise ValueError(f"External local link: {name}: {target}")
            relative = path.relative_to(root.resolve()).as_posix()
            if relative not in names and not any(n.startswith(relative + "/") for n in names):
                raise ValueError(f"Missing local resource: {name}: {target}")


def check():
    m = installer()
    manifest = m.verify(SKILL)
    names = files()
    assert (ROOT / "LICENSE").read_bytes() == (SKILL / "LICENSE").read_bytes(), "License copies differ"
    assert {"LICENSE", "NOTICE.md", "examples/living-ascii/LICENSE.txt"} <= set(names)
    links(SKILL, names)
    links(ROOT, [*ROOT_FILES, *(NAME + "/" + name for name in names)])
    checks = ["manifest integrity", "standalone licenses", "repository and installed-relative resource closure"]
    with tempfile.TemporaryDirectory(prefix="itm-release-check-") as temporary:
        temporary = Path(temporary)
        env = dict(os.environ, PYTHONDONTWRITEBYTECODE="1")

        def cli(*args, success=True, source=ROOT):
            result = subprocess.run([sys.executable, str(source / "install.py"), *args],
                                    cwd=temporary, env=env, capture_output=True, text=True, timeout=30)
            assert (result.returncode == 0) == success, result.stdout + result.stderr
            return result

        for agent in m.PROJECT:
            for scope in ("user", "project"):
                home, project = temporary / agent / scope / "home", temporary / agent / scope / "project"
                env.update(USERPROFILE=str(home), HOME=str(home))
                expected = m.destination(agent, scope, project, home)
                before = set(temporary.rglob("*"))
                dry = cli("--agent", agent, "--scope", scope, "--project", str(project), "--dry-run")
                assert str(expected) in dry.stdout
                assert set(temporary.rglob("*")) == before, "Dry-run wrote files"
                cli("--agent", agent, "--scope", scope, "--project", str(project))
                assert m.verify(expected) == manifest
                assert (expected / "LICENSE").read_bytes() == (ROOT / "LICENSE").read_bytes()
                links(expected, names)
                checks += [f"{agent}/{scope}: dry-run without writes", f"{agent}/{scope}: fresh install, destination and links"]

        env.update(USERPROFILE=str(temporary / "update-home"), HOME=str(temporary / "update-home"))
        args = ("--agent", "claude", "--scope", "project", "--project", str(temporary / "update-project"))
        target = m.destination("claude", "project", temporary / "update-project", temporary / "update-home")
        cli(*args)
        marker = target / "local-note.txt"
        marker.write_text("preserve previous user content", encoding="utf-8")
        before = {p.relative_to(target).as_posix(): p.read_bytes() for p in target.rglob("*") if p.is_file()}
        cli(*args, success=False)
        assert {p.relative_to(target).as_posix(): p.read_bytes() for p in target.rglob("*") if p.is_file()} == before
        cli(*args, "--update")
        backups = list((target.parent.parent / "skill-backups").iterdir())
        assert len(backups) == 1 and backups[0].parent != target.parent
        assert (backups[0] / marker.name).read_text(encoding="utf-8") == "preserve previous user content"
        assert m.verify(target) == manifest and not marker.exists()
        checks += ["existing installation protected", "update preserves complete backup outside discovery"]

        marker.write_text("rollback content", encoding="utf-8")
        rename = Path.rename
        def fail_stage(path, destination):
            if path.parent.name.startswith(".itm-stage-"):
                raise OSError("simulated final move failure")
            return rename(path, destination)
        with patch.object(Path, "rename", fail_stage):
            try:
                m.install(SKILL, target, update=True)
            except OSError:
                pass
            else:
                raise AssertionError("Expected simulated failure")
        assert marker.read_text(encoding="utf-8") == "rollback content"
        checks.append("failed update restores previous installation")

        for mutation in ("missing", "modified", "extra", "missing-manifest"):
            damaged = temporary / mutation
            shutil.copytree(SKILL, damaged / NAME)
            shutil.copyfile(ROOT / "install.py", damaged / "install.py")
            if mutation == "missing":
                (damaged / NAME / "STYLE.md").unlink()
            elif mutation == "modified":
                (damaged / NAME / "STYLE.md").write_text("modified", encoding="utf-8")
            elif mutation == "extra":
                (damaged / NAME / "unexpected.txt").write_text("extra", encoding="utf-8")
            else:
                (damaged / NAME / "package-manifest.json").unlink()
            project = temporary / (mutation + "-destination")
            cli("--agent", "codex", "--scope", "project", "--project", str(project), source=damaged, success=False)
            assert not project.exists(), "Damaged package created destination"
            checks.append(f"{mutation} package rejected before writing")

        for action in ("check", "validate"):
            result = subprocess.run([sys.executable, str(SKILL / "scripts/tokens.py"), action],
                                    capture_output=True, text=True, env=env, timeout=30)
            assert result.returncode == 0, result.stdout + result.stderr
            print(result.stdout.strip())
            checks.append("tokens " + action)
    print(json.dumps({"version": manifest["version"], "passed": len(checks), "checks": checks}, indent=2))
    return manifest


def build(output):
    manifest = check()
    output = output.resolve()
    if output.is_relative_to(ROOT) or ROOT.is_relative_to(output):
        raise ValueError("Use an output directory outside the repository and its ancestors")
    archive = output / f"{NAME}-v{manifest['version']}.zip"
    checksum = output / "SHA256SUMS.txt"
    if archive.exists() or checksum.exists():
        raise FileExistsError("Refusing to overwrite release artifacts")
    members = sorted([*ROOT_FILES, *(NAME + "/" + name for name in files())])
    output.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(archive, "x", zipfile.ZIP_DEFLATED, compresslevel=9) as z:
        for name in members:
            info = zipfile.ZipInfo(name, date_time=(1980, 1, 1, 0, 0, 0))
            info.create_system = 3
            info.external_attr = 0o100644 << 16
            z.writestr(info, (ROOT / name).read_bytes(), compress_type=zipfile.ZIP_DEFLATED, compresslevel=9)
    digest = hashlib.sha256(archive.read_bytes()).hexdigest()
    checksum.write_text(f"{digest}  {archive.name}\n", encoding="ascii", newline="\n")
    with tempfile.TemporaryDirectory(prefix="itm-zip-check-") as temporary:
        with zipfile.ZipFile(archive) as z:
            assert z.testzip() is None
            z.extractall(temporary)
        extracted = Path(temporary)
        m = installer()
        assert m.verify(extracted / NAME) == manifest
        target = extracted / "test-project/.agents/skills" / NAME
        m.install(extracted / NAME, target)
        links(target, files())
        assert (target / "LICENSE").read_bytes() == (ROOT / "LICENSE").read_bytes()
    print(json.dumps({"archive": str(archive), "files": len(members), "sha256": digest, "extracted_install": "passed"}, indent=2))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("command", choices=("check", "manifest", "build"))
    parser.add_argument("--output", type=Path)
    args = parser.parse_args()
    try:
        if args.command == "manifest":
            manifest = refresh_manifest()
            print(f"Refreshed {manifest['version']} manifest; {len(manifest['files'])} files")
        elif args.command == "build":
            if args.output is None:
                parser.error("build requires --output DIRECTORY")
            build(args.output)
        else:
            check()
    except (AssertionError, OSError, ValueError, KeyError, subprocess.SubprocessError) as error:
        parser.exit(1, f"Release validation failed: {error}\n")


if __name__ == "__main__":
    main()
