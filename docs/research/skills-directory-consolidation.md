# Skills directory consolidation

> **Status: EXECUTED 2026-08-31.** Deviations from the plan below: `.agent/` kit container kept
> (retirement still pending as a team decision; driver-script paths for moved skills rewritten),
> `.augment/`/`.windsurf/` mirrors kept, and a `bun run skills:sync` / `skills:check` script
> (`scripts/sync-skills.ts`) added as the Windows fallback (real copies instead of symlinks).
> This document records the research as written before execution.

> **Location rationale:** the repo keeps written notes in topic subdirectories under `docs/`
> (`docs/forms/`, `docs/testing/`, `docs/walkthroughs/`, `docs/agents/`). This file creates
> `docs/research/` as a new topic directory following that established pattern.
>
> **Date:** 2026-08-31. All local claims cite file paths; all tool-behavior claims cite vendor docs.

## Question

How can this repo streamline its agent-skill directories? Specifically:

1. What skill copies/overlaps exist across `.agent/skills/`, `.agents/skills/`, `.kilocode/skills/`, and the other tool dirs?
2. Do all agents read `.agent/` and `.agents/`?
3. What is the evidence-based canonical directory, and how do we migrate?

## Part 1 — Local inventory

### 1.1 The full picture (bigger than reported)

The task brief mentioned three skill trees; there are actually **seven** locations, five of which
are symlink fan-outs pointing at `.agents/skills/`:

| Directory | Real skill dirs | Symlinks into `../../.agents/skills/<name>` | Provenance (git log) |
|---|---|---|---|
| `.agent/skills/` | 36 (+ `doc.md` guide) | 0 | `2026-03-25 install antigravity kit 2.0.2` |
| `.agents/skills/` | 74 | 0 (this is the source) | grown 2026-05-19 → 2026-08-22 (`Add convex ai-skills…`) |
| `.kilocode/skills/` | 2 (`memory-write`, `unslop`) | 46 | symlinks 2026-04-15 / 2026-08-22 |
| `.claude/skills/` | 6 (`architecture`, `clean-code`, `highcharts`, `memory-write`, `parallel-agents`, `vulnerability-scanner`) | 72 | `2026-07-07 …some skills added to Claude` |
| `.augment/skills/` | 0 | 43 | 2026-08-22 |
| `.kiro/skills/` | 0 | 5 (convex-*) | 2026-04-15 |
| `.windsurf/skills/` | 0 | 5 (convex-*) | 2026-04-15 |

Total: **164 symlinks**, all resolving into `.agents/skills/`. (A stale copy of `.agent/skills/`
also exists inside the Kilo Agent Manager worktree `.kilo/worktrees/spectacular-humor/` — that is
a checkout artifact, not a live config; clean it up via Agent Manager, not by editing.)

### 1.2 Name-level duplicates between `.agent/` and `.agents/`: ZERO

`comm -12` of the two listings is empty: **no skill name exists in both `.agent/skills/` and
`.agents/skills/`**. The reported "some skills are identical across `.agent/` and `.agents/`" is
not accurate at the name level.

### 1.3 Content-level duplicates: exactly one cross-tree pair

Hashing every `SKILL.md` body (frontmatter stripped, CRLF normalized — both trees use CRLF) yields
**one** cross-tree duplicate:

| Pair | Verdict |
|---|---|
| `.agents/skills/memory-write/` ↔ `.kilocode/skills/memory-write/` | **IDENTICAL** (`diff -rq` exit 0, byte-for-byte) |

The only other byte-level near-duplicates sit between `.agent/skills/` and `.claude/skills/`:

| `.claude/skills/<name>` | vs `.agent/skills/<name>` | Divergence |
|---|---|---|
| `architecture` | — | **IDENTICAL** (`diff -rq` clean) |
| `clean-code` | — | **IDENTICAL** |
| `vulnerability-scanner` | — | **IDENTICAL** |
| `parallel-agents` | — | trailing newline only |
| `memory-write` | (vs `.agents/`) | trailing newline only |
| `highcharts` | no counterpart | unique to `.claude/` |

And `technical-writing` exists only in `.agents/` (not mirrored into `.claude/`).

### 1.4 Overlapping-but-differently-named pairs

Comparing frontmatter descriptions and bodies:

| `.agent/skills/` | `.agents/skills/` | Overlap | Recommended winner |
|---|---|---|---|
| `tdd-workflow` (149-line monolith) | `tdd` (38-line SKILL.md + `mocking.md`, `tests.md`, `agents/`) | Both are RED-GREEN-REFACTOR guides | **`tdd`** — follows the spec's progressive-disclosure pattern (supporting files loaded on demand, see [spec](https://agentskills.io/specification)), referenced by AGENTS.md |
| `systematic-debugging` (109 lines, 4-phase methodology) | `diagnosing-bugs` (138 lines, trigger-driven diagnosis loop) | Both debugging methodologies | **`diagnosing-bugs`** — concrete triggers ("diagnose", "debug this"); methodology content is redundant with `AGENTS.md` engineering principles |
| `code-review-checklist` (109 lines, generic checklist) | `code-review` (87 lines, Standards+Spec axes, sub-agent workflow) | Both code review | **`code-review`** — workflow-driven, repo-standards aware; fold any missing checklist items in |
| `documentation-templates` | `technical-writing` | Both doc standards | **`technical-writing`** (Diátaxis; the repo's docs already follow it) — keep `documentation-templates` only if the kit is retained |
| `brainstorming` | `grilling`, `grill-me`, `grill-with-docs`, `loop-me` | Socratic-questioning territory | Partial; keep both families — `.agent`'s is load-bearing for the kit (see 1.5) |
| `architecture` | `domain-modeling`, `codebase-design` | Complementary, not duplicates | keep (low priority) |
| `testing-patterns` | `tdd` | Patterns vs workflow — complementary | keep both or fold into `tdd`'s `tests.md` |
| — | `implement` vs `implement-spec` | Near-duplicates **within** `.agents/` ("implement work based on spec or tickets" vs "implement a specification in code") | merge into one (suggest keeping `implement`, it is referenced by AGENTS.md) |
| — | `convex` + 33 `convex-*` | Intentional router + specialists design, not duplication | keep as-is (installed by `npx convex ai-files install`, noted in `AGENTS.md` convex-ai block) |

### 1.5 What the antigravity kit expects inside `.agent/`

`.agent/ARCHITECTURE.md` (lines 17–27) defines the kit layout: `agents/` (20 personas),
`skills/` (36), `workflows/` (11 slash commands), `rules/`, `scripts/`, plus `mcp_config.json` —
all present. Two hard dependencies on `.agent/` paths:

- `.agent/scripts/checklist.py:59-120` and `.agent/scripts/verify_all.py:66-120` invoke **16 real
  Python scripts** at hard-coded paths `.agent/skills/<skill>/scripts/*.py` (verified to exist:
  `vulnerability-scanner`, `lint-and-validate`, `database-design`, `testing-patterns`,
  `frontend-design`, `seo-fundamentals`, `performance-profiling`, `webapp-testing`,
  `geo-fundamentals`, …).
- `docs/private/GEMINI.md` (and its twin `.agent/rules/GEMINI.md`) mandate reading
  `.agent/agents/{agent}.md`, `.agent/skills/` ("Path Awareness", lines 127–132) and running
  `python .agent/scripts/checklist.py` (lines 187–190).

Stale kit internals worth knowing: `.agent/ARCHITECTURE.md` lists skills that do not exist on disk
(`react-best-practices`, `ui-ux-pro-max`, `prisma-expert`, `nestjs-expert`, `docker-expert`,
`game-development`); the installed dir has `nextjs-react-expert` where the doc says
`react-best-practices`.

### 1.6 Which skills are actually referenced by AGENTS.md / docs

Grepping `AGENTS.md` for every skill name:

- Referenced and living in `.agent/skills/`: `clean-code`, `frontend-design`,
  `i18n-localization`, `systematic-debugging`, `tailwind-patterns`, `tdd-workflow`,
  `web-design-guidelines` (7).
- Referenced and living in `.agents/skills/`: `convex`, `implement`, `memory-write`, `tdd` (4).
- Referenced but **nonexistent on disk**: `form-system`, `i18n-localization-paraglidejs`,
  `shadcn`, `skill-creator` (the "Agent Skills Index" in `AGENTS.md` is stale; the live system
  prompt of this repo shows the same index with further drift).

## Part 2 — What each tool actually reads (primary sources)

### 2.1 The Agent Skills open standard — defines no project directory

The spec at [agentskills.io/specification](https://agentskills.io/specification) defines only the
**skill folder format** (`SKILL.md` + optional `scripts/`, `references/`, `assets/`, frontmatter
fields, name rules). It does **not** define where a client must install or discover skills, and it
does not mention `.agents/skills`. The homepage ([agentskills.io](https://agentskills.io)) confirms
the format originated at Anthropic and was released as an open standard. So "the standard says
`.agents/skills`" is false — that directory is a **client convention**, adopted independently by
the tools below.

### 2.2 Kilo — reads `.kilo/`, `.agents/`, `.claude/`; NOT `.agent/` or `.kilocode/`

From [kilo.ai/docs/customize/skills](https://kilo.ai/docs/customize/skills):

- Global: `~/.kilo/skills/`
- Project: `.kilo/skills/`
- **Compatibility: `.agents/skills/` — "Open agent standard, loaded by default"**, and
  `.claude/skills/` — "loaded when Claude Code Compatibility is enabled"
- Extra paths/remote URLs via `skills.paths` / `skills.urls` in `kilo.jsonc`
- Trusted shell-command execution only in global skills (`~/.kilo/skills/`, `~/.agents/skills/`,
  `~/.claude/skills/`) — project skills never execute embedded `!` commands.

[Settings docs](https://kilo.ai/docs/getting-started/settings) confirm project config is
`kilo.jsonc` or `.kilo/kilo.jsonc`; `.kilocode/` appears in **no** documented location list.
This matches the repo's own environment config ("Project config: `.kilo/`… Do not use
`.kilocode/`"). Conclusion: **`.kilocode/skills/` is read by nothing — it is dead weight**, and
`.agent/` is likewise not read by Kilo.

### 2.3 Claude Code — reads `.claude/skills/` only (and follows symlinks)

From [code.claude.com/docs/en/skills](https://code.claude.com/docs/en/skills) ("Where skills
live"):

- Project: `.claude/skills/<skill-name>/SKILL.md` (plus nested `.claude/skills/` in monorepo
  subdirs and `--add-dir` directories)
- Personal: `~/.claude/skills/`, Enterprise managed dir, and plugins (`<plugin>/skills/`)
- It does **not** read `.agents/skills/` or `.agent/skills/`.
- Crucially for this repo: *"A `<skill-name>` entry … can be a symlink to a directory elsewhere on
  disk. Claude Code follows the symlink and reads `SKILL.md` from the target directory."* — the
  existing `.claude/skills` symlink fan-out is officially supported.

### 2.4 Gemini CLI — reads `.gemini/skills/` and the `.agents/skills/` alias; NOT `.agent/`

From [geminicli.com/docs/cli/skills](https://geminicli.com/docs/cli/skills/) ("Discovery tiers"):

- User: `~/.gemini/skills/` **or** `~/.agents/skills/` alias
- Workspace: `.gemini/skills/` **or** `.agents/skills/` alias — "Workspace skills are shared with
  your team via version control"
- Within the same tier, "the `.agents/skills/` alias takes precedence over the `.gemini/skills/`
  directory."
- No mention of `.agent/` (singular). Note the banner on that page: Gemini CLI is being
  transitioned to **Antigravity CLI** (successor), which matters below.

### 2.5 Google Antigravity — defaults to `.agents/skills/`, backward-supports `.agent/skills/`

First-party docs exist at antigravity.google:

- [Skills](https://antigravity.google/docs/skills/) ("Where skills live"): workspace skills at
  `<workspace-root>/.agents/skills/<skill-folder>/`, global at `~/.gemini/config/skills/`, with
  the explicit note: *"Antigravity now defaults to .agents/skills, but still maintains backward
  support for .agent/skills."*
- [Rules](https://antigravity.google/docs/rules-workflows/): workspace rules in `.agents/rules`,
  with the same note: *"Antigravity now defaults to `.agents/rules`, but still maintains backward
  support for `.agent/rules`."*

So **yes, a first-party source confirms `.agent/` is still read (backward compatibility only)** —
but `.agents/` is the going-forward directory for skills, rules, and (per the same docs section)
workflows invoked as slash commands.

### 2.6 Other mirrors

- **Kiro** ([kiro.dev/docs/skills](https://kiro.dev/docs/skills/)): workspace skills in
  `.kiro/skills/`, global in `~/.kiro/skills/`. No `.agents/skills` support documented → the 5
  symlinks in `.kiro/skills/` are the correct mechanism, though the docs neither promise nor
  forbid following symlinks (imported skills are *copied*).
- **Augment / Windsurf**: no first-party skills-directory doc was verified for this research.
  Their mirror dirs are pure symlink fan-outs; confirm against vendor docs before relying on or
  deleting them.

### 2.7 AGENTS.md convention — says nothing about skills

[agents.md](https://agents.md) standardizes only the `AGENTS.md` instruction file (format,
nesting, precedence). It does not standardize any skill directory.

## Part 3 — Recommendation

### 3.1 Canonical directory: `.agents/skills/`

Evidence: it is read natively by **Antigravity** (default,
[docs](https://antigravity.google/docs/skills/)), **Gemini CLI** (workspace alias with
precedence, [docs](https://geminicli.com/docs/cli/skills/)), and **Kilo** (default compatibility
directory, [docs](https://kilo.ai/docs/customize/skills)). It is already the de-facto source of
truth in this repo — 164 symlinks across five tool dirs resolve into it. Claude Code is the one
tool in use that needs its own dir, and it officially follows symlinks
([docs](https://code.claude.com/docs/en/skills)); Kiro likewise needs `.kiro/skills/`
([docs](https://kiro.dev/docs/skills/)).

Keep therefore:

- `.agents/skills/` — single source of truth (real files only)
- `.claude/skills/` — symlink fan-out for Claude Code (keep; replace its 6 real dirs with
  symlinks after merging)
- `.kiro/skills/` — keep the 5 convex symlinks if Kiro is used
- `.augment/skills/`, `.windsurf/skills/` — keep only if those tools are actually used; verify
  their docs first (unverified here)

### 3.2 Per-skill disposition table

| Skill(s) | Disposition | Why / content that wins |
|---|---|---|
| `.kilocode/skills/memory-write` | **delete dir, keep `.agents/skills/memory-write`** | byte-identical (1.3) |
| `.kilocode/skills/unslop` | **move to `.agents/skills/unslop`** | unique content, only live copy |
| `.kilocode/` (whole dir) | **delete** | read by nothing — Kilo reads `.kilo/` ([settings](https://kilo.ai/docs/getting-started/settings), [skills](https://kilo.ai/docs/customize/skills)) |
| `.agents/tdd` vs `.agent/tdd-workflow` | **merge → keep `tdd`** | richer + spec-conformant structure (1.4); update AGENTS.md index |
| `.agents/diagnosing-bugs` vs `.agent/systematic-debugging` | **merge → keep `diagnosing-bugs`** | trigger-driven; methodology duplicated in AGENTS.md principles |
| `.agents/code-review` vs `.agent/code-review-checklist` | **merge → keep `code-review`** | workflow + repo-standards aware; fold in any checklist gaps |
| `.agents/technical-writing` vs `.agent/documentation-templates` | **keep `technical-writing`**; drop templates if kit retired | docs already follow Diátaxis |
| `.agents/implement` vs `.agents/implement-spec` | **merge → keep `implement`** | near-duplicate within `.agents/`; `implement` referenced by AGENTS.md |
| `.agent/skills/{clean-code, frontend-design, i18n-localization, tailwind-patterns, web-design-guidelines}` + any other wanted kit skills | **move into `.agents/skills/`** | referenced by AGENTS.md (1.6); Antigravity still finds them there natively |
| `.agent/skills/*` with `scripts/` (16 Python scripts) | **move together with their skill dirs**; update `.agent/scripts/*.py` path tables or retire the kit scripts | `checklist.py`/`verify_all.py` hard-code `.agent/skills/...` paths (1.5) |
| Remaining `.agent/skills/*` (lint-and-validate, red-team-tactics, rust-pro, seo-fundamentals, …) | **keep-or-drop per team judgment** | generic reference content, no doc references; each adds ~100–800 lines of context surface |
| `convex` + `convex-*` (34 dirs in `.agents/`) | **keep as-is** | intentional router+specialist design from `npx convex ai-files install` |
| `.claude/skills/{architecture, clean-code, parallel-agents, vulnerability-scanner, memory-write}` real dirs | **replace with symlinks** after the `.agent` merge | byte/newline-level dupes (1.3); symlink officially supported by Claude Code |
| `.claude/skills/highcharts` | **keep** (or move to `.agents/` + symlink) | unique to `.claude/` |
| `.agents/skills/technical-writing` | **add symlink into `.claude/skills/`** | currently unmirrored (1.3) |

### 3.3 Migration steps

1. **Salvage from `.agent/skills/` into `.agents/skills/`**: the 7 AGENTS.md-referenced skills,
   plus any others wanted; move each skill dir whole (including `scripts/`). For the overlap
   pairs in 3.2, the `.agents` content wins; delete the `.agent` twin in the same commit.
2. **Retire the antigravity kit container** (decision point):
   - If Antigravity is still used: move `.agent/rules/GEMINI.md` → `.agents/rules/` and workflows
     → `.agents/` equivalents (both supported per
     [Antigravity rules docs](https://antigravity.google/docs/rules-workflows/)); rewrite the
     hard-coded paths in `.agent/scripts/checklist.py` / `verify_all.py` to `.agents/skills/...`
     (or copy those two drivers into `scripts/` at repo root), then `git rm -r .agent/`.
   - If not used: `git rm -r .agent/` directly — skills survive in `.agents/` (Antigravity reads
     that natively), and the kit's agent personas/workflows are kit-internal.
3. **Fix `.claude/skills/`**: convert the 6 real dirs to symlinks `→ ../../.agents/skills/<name>`
   (after step 1 made those targets exist), add the missing `technical-writing` symlink.
   Preserve `.claude/agents/`, `.claude/hooks/`, settings — untouched by this migration.
4. **Delete `.kilocode/`** after moving `unslop` and confirming `memory-write` is byte-identical
   (it is, 1.3).
5. **Audit the other fan-outs**: keep `.kiro/`, `.augment/`, `.windsurf/` symlink dirs only for
   tools actually in use; delete the rest.
6. **Update `AGENTS.md`** skills index in the same PR: point every entry at `.agents/skills/`,
   drop `form-system`, `shadcn`, `skill-creator`, `i18n-localization-paraglidejs` (nonexistent),
   and fix `tdd-workflow` → `tdd`, `systematic-debugging` → `diagnosing-bugs`.
7. **Verify**: start Kilo and ask "what skills do you have available?" (verification method per
   [Kilo docs](https://kilo.ai/docs/customize/skills)); in Claude Code run `/skills`; in Gemini
   CLI run `/skills list` ([docs](https://geminicli.com/docs/cli/skills/)); in Antigravity check
   the Customizations → Skills panel ([docs](https://antigravity.google/docs/skills/)).
8. **Add a guard**: a tiny CI or pre-commit check that no new real files appear under the
   fan-out dirs (only symlinks), so the single-source-of-truth property holds.

### 3.4 Risks

- **Windows collaborators + 164 symlinks (pre-existing risk, grows if fan-outs grow).** Git stores
  symlinks as special blobs; on Windows without developer mode / `core.symlinks=true`, they check
  out as plain text files containing the target path, silently breaking skill discovery in
  `.claude/`, `.kiro/`, etc. Mitigations: document `git config --global core.symlinks true` +
  Windows developer mode for the team, or replace fan-outs with a `bun run sync:skills` script
  that copies/links per-OS and runs in CI.
- **Tools that may not follow symlinks.** Claude Code is confirmed to follow them
  ([docs](https://code.claude.com/docs/en/skills)); Kilo loads `.agents/skills/` directly so its
  own dir matters less; Kiro/Augment/Windsurf symlink behavior is **unverified** — the Kiro docs
  describe *copying* imported skills ([docs](https://kiro.dev/docs/skills/)). Test step 7 before
  deleting anything those tools depend on.
- **Removing `.agent/` breaks kit scripts if still invoked.** `checklist.py` and `verify_all.py`
  resolve 16 script paths under `.agent/skills/` (1.5), and `docs/private/GEMINI.md` instructs
  the agent to run `python .agent/scripts/checklist.py`. Migrate paths or retire the workflow
  together; otherwise "final checks" flows will fail with FileNotFoundError.
- **Backward-compat window for Antigravity.** `.agent/skills` support is explicitly *backward*
  ([docs](https://antigravity.google/docs/skills/)); it can be dropped in a future release. That
  is an argument for migrating now, not for staying.
- **Frontmatter drift.** The kit skills carry non-spec frontmatter (`allowed-tools: Read, Write,
  Edit`, `version:`, `priority:`); the spec's field set is
  [`name`, `description`, `license`, `compatibility`, `metadata`, `allowed-tools`]
  ([spec](https://agentskills.io/specification)) and Claude's claude.ai/upload path hard-rejects
  unknown keys ([docs](https://code.claude.com/docs/en/skills)). Harmless for local use; strip if
  a skill is ever published.
- **AGENTS.md staleness compounds.** The index already lists four nonexistent skills (1.6); any
  rename during consolidation must update AGENTS.md in the same commit or agents will keep trying
  to load ghosts.

## Sources

- Agent Skills spec: https://agentskills.io/specification (format only; no install dir defined)
- Agent Skills overview: https://agentskills.io
- Kilo skills locations: https://kilo.ai/docs/customize/skills
- Kilo settings / config locations: https://kilo.ai/docs/getting-started/settings
- Claude Code skills (locations, symlink support, frontmatter rules): https://code.claude.com/docs/en/skills
- Gemini CLI Agent Skills (discovery tiers, `.agents/skills` alias precedence): https://geminicli.com/docs/cli/skills/
- Antigravity Skills (`.agents/skills` default, `.agent/skills` backward support): https://antigravity.google/docs/skills/
- Antigravity Rules & Workflows (`.agents/rules` default, backward support): https://antigravity.google/docs/rules-workflows/
- Kiro Agent Skills (`.kiro/skills/`, `~/.kiro/skills/`): https://kiro.dev/docs/skills/
- AGENTS.md convention (no skill-dir standardization): https://agents.md
- Local evidence: `.agent/ARCHITECTURE.md`, `.agent/rules/GEMINI.md`, `docs/private/GEMINI.md`,
  `.agent/scripts/checklist.py`, `.agent/scripts/verify_all.py`, `AGENTS.md`, git history of
  `.agent/`, `.agents/`, `.kilocode/`, and byte-level diffs cited in Part 1.
