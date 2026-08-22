# Documentation Cleanup Plan

_Created: 2026-08-22. Source: docs freshness audit (this session), cross-checked against the codebase. Companion to [codebase-audit-2026-07.md](./codebase-audit-2026-07.md) — item 5.1 (hygiene) overlaps and is partially executed here._

**Goal:** every doc in the repo is either current, explicitly archived, or deleted. No doc references files that don't exist or commands that don't run.

**Effort legend:** S = <2h · M = half–full day. All items are S.

---

## Phase 1 — Archive deprecated/historical docs (S)

### 1.1 Move self-flagged deprecated auth docs to `docs/OLD/`
- **Files:** `docs/authentication-flow.md`, `docs/authentication-approach.md`
- **Why:** Both carry deprecation headers; `authentication-flow.md` describes the pre-Convex Encore.ts stack that no longer exists here. They sit in `docs/` root alongside the living `AUTH.md` and mislead readers/skimmers.
- **Fix:** `git mv docs/authentication-flow.md docs/authentication-approach.md docs/OLD/`. Update the deprecation banner in each to point at `docs/AUTH.md` (approach.md already does; verify flow.md does too).
- **Verify:** `docs/` root contains only `AUTH.md` + subdirs; `grep -r "authentication-flow" docs/ AGENTS.md` returns only intentional archive references.

### 1.2 Move `CLEANUP_SUMMARY.md` out of repo root
- **File:** `CLEANUP_SUMMARY.md`
- **Why:** One-time Jan-2026 changelog for the docs/testing consolidation; audit item 5.1 already recommends removal. Root clutter.
- **Fix:** `git mv CLEANUP_SUMMARY.md docs/OLD/cleanup-summary-2026-01.md`.
- **Verify:** Repo root has no stray changelogs; links inside it (relative `docs/testing/...`) still resolve after the move — fix if broken.

### 1.3 Freeze `docs/testing/SUMMARY.md` explicitly
- **File:** `docs/testing/SUMMARY.md`
- **Why:** Accurate as a Jan-2026 point-in-time review, but presented like living docs. Cheaper to label than to maintain.
- **Fix:** Add a banner line: `_Snapshot of 2026-01-21; suite has since grown (emissions, mongodb, organizations, users tests) and moved to the Vitest two-project split._` Alternatively move to `docs/OLD/` — pick one.
- **Verify:** Header makes staleness obvious on first read.

---

## Phase 2 — Fix outdated docs (S per item)

### 2.1 Rewrite `docs/forms/address-form-reference.md` paths and commands
- **File:** `docs/forms/address-form-reference.md`
- **Why:** Worst offender — 6+ broken references:
  - `src/lib/schemas/contacts.ts` → `src/lib/forms/schemas/contacts.ts`
  - `src/hooks/demo.form-context.ts` / `demo.form.ts` → `src/hooks/form-context.ts` / `form.ts`
  - `src/components/FormComponents.tsx` → `src/components/demo.FormComponents.tsx` (+ `src/components/form-fields/`)
  - `src/routes/demo/form.address.tsx` → `src/routes/_demoLayout/demo/form.address.tsx` (now uses `useAppForm` from `@/hooks/form`, `fullName` field)
  - `use-image-upload.tsx` — gone; see 4.1
  - `convex/contacts.ts` — never existed; mark as "code to create" explicitly
  - `npm install ...` → `bun add ...`
- **Fix:** Update all paths/commands to current reality. Decide: keep as demo-form reference under `docs/forms/` or move to `docs/OLD/` if the demo form is scheduled for deletion (audit 0.5 deletes other demo endpoints — check whether this form survives).
- **Verify:** Every path mentioned in the doc exists (`for p in $(grep -o 'src/[a-zA-Z0-9/._-]*' docs/forms/address-form-reference.md | sort -u); do test -e $p || echo $p; done` → empty).

### 2.2 Fix `docs/testing/README.md` run commands
- **File:** `docs/testing/README.md`
- **Why:** Says `bun test` (Bun's runner); project uses Vitest with a two-project split (edge-runtime for Convex, jsdom for frontend) via `bun run test`. Running `bun test` silently skips the config.
- **Fix:** Replace commands with `bun run test` (and scoped variants, e.g. `bun run vitest run convex/__tests__/users-auth.test.ts`). Update the test-count claim or point to SUMMARY.md as the frozen snapshot (1.3).
- **Verify:** Copy-paste of every command in the doc runs successfully.

### 2.3 Fix `docs/private/GEMINI.md` broken references
- **File:** `docs/private/GEMINI.md`
- **Why:** Tier 0 points at `CODEBASE.md` (doesn't exist anywhere); Tier 2 uses `.agent/frontend-specialist.md` style paths while actual files are in `.agent/agents/`; `ARCHITECTURE.md` lives at `.agent/ARCHITECTURE.md`, not root.
- **Fix:** Correct the three path groups; drop the `CODEBASE.md` tier or replace with `AGENTS.md`/`CLAUDE.md` as the actual Tier-0 docs.
- **Verify:** All referenced `.agent/` paths exist.

### 2.4 Fix `docs/private/project-setup.md` scripts — or delete
- **File:** `docs/private/project-setup.md`
- **Why:** Generic antigravity-kit template; references `start`, `start:dev`, `start:prod`, `test:e2e`, `test:cov` — none in package.json.
- **Fix (prefer delete):** `git rm` — README.md already covers getting started. If kept: rewrite commands to actual scripts (`dev`, `build`, `test`, `lint`, `check`, `format`, `storybook`, `deploy:*`).
- **Verify:** No doc references this file (`grep -r "project-setup" --include="*.md"` → only archive/plan mentions).

### 2.5 Repair dead links in `docs/AUTH.md`
- **File:** `docs/AUTH.md`
- **Why:** "Related Documentation" links to `plans/auth-optimization-plan.md` and `docs/story5-convex-schema.md` — both deleted. Also: internal date mismatch (2026-05-19 vs 2026-02-19), pitfall numbering out of order (4→6→5), simplified `src/start.ts` snippet (actual file has `errorLoggingMiddleware` + Clerk keys in `clerkMiddleware()`).
- **Fix:** Remove/replace dead links; unify dates; renumber pitfalls; refresh the `start.ts` snippet to match the file.
- **Verify:** No link in AUTH.md 404s on the local filesystem.

### 2.6 Mark audit item 0.6 status drift
- **File:** `plans/codebase-audit-2026-07.md`
- **Why:** 0.6 is unmarked but partially done (`HARDCODED_ORG_ID` gone from emissions.tsx; breadcrumb flags, `AuthStatus`, `convex/forms/debug.ts` remain).
- **Fix:** Change heading to `0.6 … — PARTIALLY DONE (emissions hardcoded-org removed)` and strike the completed bullet.
- **Verify:** Heading matches code reality.

---

## Phase 3 — Correct `AGENTS.md` (S)

### 3.1 Documentation section: replace ghost references
- **Why:** Cites `authentication-implementation-plan.md`, `story5-*.md`, `story7-implementation-summary.md`, `story7.1-*.md` — all deleted. Omits what exists: `docs/AUTH.md`, `docs/forms/`, `docs/private/`, `docs/walkthroughs/`, `plans/`.
- **Fix:** Rewrite the Documentation section to the actual tree (post-Phase-1 layout).

### 3.2 Fix remaining stale claims
- **Why/fix:**
  - `tailwind.config.ts` doesn't exist (Tailwind v4 CSS-first via `src/styles.css`) → correct the Styling section.
  - Route-protection snippet shows `authStateFn()` + `loader`; actual `_appLayout/route.tsx` calls `getAuthContext()` with three permission redirects and no loader → replace snippet.
  - Database section lists demo `todos`/`products` but omits the four form tables + `targets` → fix listing.
  - Quick Start: `bun run vitest` → `bun run test` (defined script); mention vitest project split.
- **Verify:** Every file path and command in AGENTS.md exists/runs.

---

## Phase 4 — Related code fix surfaced by the audit (S)

### 4.1 Resolve broken `use-image-upload` import
- **File:** `src/components/form-fields/ImageField.tsx` (imports `@/hooks/use-image-upload` — hook does not exist anywhere; only consumer is the demo contact form)
- **Why:** Real broken import in shipped code, not just docs. Survived the Feb-10 demo consolidation.
- **Fix:** Either restore/recreate the hook (if the demo contact form + ImageField stay) or delete `ImageField.tsx` along with the demo form (align with audit 0.5 demo removal). Coordinate with 2.1, which documents this area.
- **Verify:** `bun run check` (biome) + `bun run build` pass with zero unresolved imports.

---

## Suggested order & batching

1. **Batch A (moves, ~30 min):** 1.1, 1.2, 1.3 — pure `git mv` + banners, no content risk.
2. **Batch B (content fixes, ~2–3 h):** 2.5, 2.2, 2.6, 3.1, 3.2 — surgical edits.
3. **Batch C (decisions needed):** 2.1 + 2.4 + 4.1 — all hinge on one question: **does the demo form/demos survive audit 0.5?** Decide once, then all three resolve consistently.

## Final verification (whole plan)

- `grep -rn "story5\|story7\|authentication-implementation-plan\|auth-optimization-plan" --include="*.md" .` → only `docs/OLD/` and `plans/` hits.
- Every code-fenced path in changed docs exists.
- `bun run test`, `bun run check` still green (guards Phase 4).
- Read `AGENTS.md` Documentation section top-to-bottom against `ls docs/` — 1:1 match.
