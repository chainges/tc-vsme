# Documentation Cleanup Plan

_Created: 2026-08-22. Source: docs freshness audit (this session), cross-checked against the codebase. Companion to [codebase-audit-2026-07.md](./codebase-audit-2026-07.md) — item 5.1 (hygiene) overlaps and is partially executed here._

_Executed: 2026-08-31. See "Execution notes" at the end for what changed from the original plan and why._

**Goal:** every doc in the repo is either current, explicitly archived, or deleted. No doc references files that don't exist or commands that don't run.

**Effort legend:** S = <2h · M = half–full day. All items are S.

---

## Phase 1 — Archive deprecated/historical docs (S)

### 1.1 Move self-flagged deprecated auth docs to `docs/OLD/` — DONE
- **Files:** `docs/authentication-flow.md`, `docs/authentication-approach.md`
- **Why:** Both carry deprecation headers; `authentication-flow.md` describes the pre-Convex Encore.ts stack that no longer exists here. They sit in `docs/` root alongside the living `AUTH.md` and mislead readers/skimmers.
- **Fix:** `git mv docs/authentication-flow.md docs/authentication-approach.md docs/OLD/`. Both banners already pointed at `docs/AUTH.md` — no banner edit needed.
- **Verify:** `docs/` root contains only `AUTH.md` + subdirs; `grep -r "authentication-flow" docs/ AGENTS.md` returns only intentional archive references. ✅ Confirmed.

### 1.2 Move `CLEANUP_SUMMARY.md` out of repo root — DROPPED (moot)
- **File:** `CLEANUP_SUMMARY.md`
- **Status:** File no longer exists at repo root (already gone from git HEAD). Nothing to move.

### 1.3 Freeze `docs/testing/SUMMARY.md` explicitly — DONE (banner + move)
- **File:** `docs/testing/SUMMARY.md`
- **Why:** Accurate as a Jan-2026 point-in-time review, but presented like living docs.
- **Fix:** Added the staleness banner, then moved to `docs/OLD/testing-SUMMARY-2026-01.md` (both, not either/or — see execution notes). Updated the one inbound link from `docs/testing/README.md`.
- **Verify:** Header makes staleness obvious on first read. ✅ Confirmed.

---

## Phase 2 — Fix outdated docs (S per item)

### 2.1 Rewrite `docs/forms/address-form-reference.md` paths and commands — DONE (kept in place)
- **File:** `docs/forms/address-form-reference.md`
- **Decision:** The demo form (`form.address.tsx`) is a valid, kept reference example — not scheduled for deletion. Doc stays under `docs/forms/` as a living reference, rewritten in place.
- **Fix applied:** All paths/commands updated to current reality (`src/lib/forms/schemas/contacts.ts`, `src/hooks/form-context.ts`, `src/hooks/form.ts`, `src/components/demo.FormComponents.tsx` + `form-fields/`, `src/routes/_demoLayout/demo/form.address.tsx` with its `useAppForm`/`fullName` field, `npm install` → `bun add`). `convex/contacts.ts` marked explicitly as code-to-create. `use-image-upload.tsx` marked as not existing, tracked separately (see 4.1).
- **Verify:** Every path mentioned in the doc exists, except the two explicitly marked not-yet-existing. ✅ Confirmed.

### 2.2 Fix `docs/testing/README.md` run commands — DONE
- **File:** `docs/testing/README.md`
- **Fix applied:** `bun test` → `bun run vitest run` / `bun run test`, with a note on why `bun test` silently skips the Vitest config. Fixed the now-broken `SUMMARY.md` link (file moved in 1.3) and annotated the test-count claim as a snapshot.
- **Verify:** ✅ Commands match `package.json` scripts.

### 2.3 Fix `docs/private/GEMINI.md` broken references — DONE
- **File:** `docs/private/GEMINI.md`
- **Fix applied:** `CODEBASE.md` (doesn't exist) → `AGENTS.md` / `CLAUDE.md`; `ARCHITECTURE.md` → `.agent/ARCHITECTURE.md`; `.agent/frontend-specialist.md` / `.agent/mobile-developer.md` → `.agent/agents/frontend-specialist.md` / `.agent/agents/mobile-developer.md`.
- **Verify:** ✅ All referenced `.agent/` paths exist.

### 2.4 Fix `docs/private/project-setup.md` scripts — or delete — DONE (deleted)
- **File:** `docs/private/project-setup.md`
- **Why:** Generic antigravity-kit template; referenced scripts (`start`, `test:e2e`, etc.) don't exist in `package.json`. Not actually related to the demo-form question — this was mis-batched in the original plan.
- **Fix:** `git rm docs/private/project-setup.md`.
- **Verify:** ✅ No other doc referenced this file.

### 2.5 Repair dead links in `docs/AUTH.md` — DONE
- **File:** `docs/AUTH.md`
- **Fix applied:** Removed dead links to `plans/auth-optimization-plan.md` and `docs/story5-convex-schema.md`; unified the date to 2026-02-19; renumbered pitfalls (was 1,2,3,4,6,5 → now 1–6 in order, including the cross-reference in Troubleshooting); refreshed the `src/start.ts` snippet to include `errorLoggingMiddleware` and the Clerk key wiring; also fixed `src/__root.tsx` → `src/routes/__root.tsx` (found during verification, not in the original item list).
- **Verify:** ✅ No link in AUTH.md 404s on the local filesystem.

### 2.6 Mark audit item 0.6 status drift — DONE
- **File:** `plans/codebase-audit-2026-07.md`
- **Fix applied:** Heading changed to `0.6 … — PARTIALLY DONE (emissions hardcoded-org removed)`; struck the completed bullet. Confirmed breadcrumb debug flags, `AuthStatus`, and `convex/forms/debug.ts`'s public `checkDuplicates` still remain.
- **Verify:** ✅ Heading matches code reality.

---

## Phase 3 — Correct `AGENTS.md` (S)

### 3.1 Documentation section: replace ghost references — DONE
- **Fix applied:** Rewrote the Documentation section to the actual tree: `docs/AUTH.md`, `docs/forms/`, `docs/private/`, `docs/testing/`, `docs/walkthroughs/`, `docs/research/`, `docs/agents/`, `docs/OLD/`, plus `plans/` at repo root.

### 3.2 Fix remaining stale claims — DONE
- **Fix applied:**
  - Styling section: no `tailwind.config.ts` (Tailwind v4 CSS-first via `src/styles.css`).
  - Route-protection snippet replaced with the real `_appLayout/route.tsx` pattern (`getAuthContext()` + three permission redirects, no `loader`).
  - Database section: added the four form tables + `targets`, relabeled `todos`/`products` as demo collections.
  - Quick Start: `bun run vitest` → `bun run test`, noted the Vitest two-project split.
- **Verify:** ✅ Every file path and command in AGENTS.md exists/runs.

---

## Phase 4 — Related code fix surfaced by the audit (S) — DEFERRED

### 4.1 Resolve broken `use-image-upload` import — NOT DONE, tracked separately
- **File:** `src/components/form-fields/ImageField.tsx` (imports `@/hooks/use-image-upload` — hook does not exist anywhere; confirmed via git history that it was never written, not deleted)
- **Decision:** The demo form stays, so the import should eventually be fixed — but writing the hook is real feature work (upload flow, storage wiring, loading/error states), not a doc-cleanup-sized fix. Deferred until the user actually builds out `ImageField` usage. Not part of this execution pass.
- **Note:** `docs/forms/address-form-reference.md` (2.1) already flags this import as broken and points at this deferred item.

---

## Execution notes (2026-08-31)

Two premises in the original plan didn't hold up under a fact-check before execution:

- **Batch C's gate was wrong.** The plan gated 2.1/2.4/4.1 on "does the demo form survive audit item 0.5?" Audit 0.5 turned out to be scoped entirely to unauthenticated paid-API endpoints (`remy-chat.ts`, `demo/api.ai.*.ts`, `todos.ts`) and explicitly says "no other demo refactoring" — it never covered the form. The form's fate was undecided anywhere until asked directly here: **it stays.** 2.4 was also mis-batched into Batch C; it was never actually related to the form.
- **`docs/OLD/` conflicts with audit item 5.1**, which lists `docs/OLD/` itself as a directory to delete. This plan used it anyway as the archive destination (per user decision); reconciling/removing `docs/OLD/` afterward is left to the user rather than edited into 5.1.

Batch C as a grouping is dissolved — each item resolved independently above. 1.2 turned out moot (file already gone). 4.1 is deferred as its own follow-up, not a docs-cleanup task.
