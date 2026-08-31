# tc-vsme Codebase Audit — Improvement Backlog

_Audit date: 2026-07-07. Scope: the VSME product code (TanStack Start + Convex + Clerk + Cloudflare Workers, external read-only MongoDB CO2 dataset). Demo/example code is excluded from findings except where it creates a production security exposure. App is pre-production — schema changes and bold refactors are acceptable with no migration ceremony._

## Context

This is a full-codebase audit across four dimensions: security & multi-tenancy, architecture & data flow, code quality, and testing. The goal is an actionable backlog, not a one-shot rewrite. The multi-tenancy model is the through-line: **the correct pattern already exists** in `convex/forms/*` and `convex/targets.ts` (org id derived from the JWT via `requireOrgId`, never taken as an argument). The org/user/emissions functions predate that pattern and are where the serious exposures live. Most work below is converging the rest of the codebase onto patterns already present.

**Convergence targets (keep, don't reinvent):**
- `convex/_utils/auth.ts` — `requireUserId` / `requireOrgId`, org derived from JWT.
- `src/hooks/use-form-submission.ts` — shared form save/load/submit/version hook.
- `convex/forms/save.ts` — section-scoped, versioned form persistence.
- vitest two-project split (edge-runtime for Convex, jsdom for frontend); `convex/_utils/__tests__/auth.test.ts` as the test exemplar.

**Effort legend:** S = <2h · M = half–full day · L = multi-day.

---

## Phase 0 — Deploy-blocking security (do first, ~1 day, items parallelizable)

### 0.1 Remove secret-leaking response headers — DONE
- **File:** [src/server.ts:16-40](../src/server.ts#L16-L40)
- **Why:** Every response from the production worker (`wrangler.toml` `main`) emits `x-env-openai-api-key: starts:<first-5>`, `x-env-mongodb-uri: len:<n>`, and Google Maps key prefix. Key prefixes/lengths materially aid identification and brute-forcing. This is debug scaffolding in the prod entrypoint. **Confirmed by direct read.**
- **Fix:** Delete lines 16–40; `return res` from `paraglideMiddleware` directly. Drop now-unused `Env` fields if nothing else reads them.
- **Verify:** `curl -sI <url> | grep -i x-env` returns nothing.

### 0.2 Remove `testingMode` bypass; fail closed on org check — Done
- **File:** [convex/emissions.ts:61-104](../convex/emissions.ts#L61-L104)
- **Why:** `testingMode: v.optional(v.boolean())` is a **client-supplied** arg that skips the cross-org check (line 78); additionally the check short-circuits open when `userOrgId` is null. Any authenticated user can read any company's MongoDB emissions. **Confirmed by direct read.**
- **Fix:** Delete the `orgIdToUse` and `testingMode` args. Use `const orgId = await requireOrgId(ctx)` — the JWT org claim *is* the authorization. Keep `year` as the only arg.
- **Verify:** convex-test: org A identity succeeds for its data; no-org identity throws; no arg reaches org B's data. `grep testingMode` → zero.

### 0.3 Make `getOrgNumberByClerkOrgId` internal — DONE
- **File:** [convex/emissionsQueries.ts:5-16](../convex/emissionsQueries.ts#L5-L16), caller at [convex/emissions.ts:82](../convex/emissions.ts#L82)
- **Why:** Public query with **zero auth** mapping any `clerkOrgId` → Norwegian org number (an enumerable tenant directory).
- **Fix:** `query` → `internalQuery`; caller uses `internal.emissionsQueries...`.
- **Verify:** Unauthenticated client call fails; convex-test asserts absence from `api`.

### 0.4 Production Clerk key + remove auth.config fallbacks — S
- **Files:** `wrangler.toml` (`[env.production.vars]` uses a `pk_test_` key), [convex/auth.config.ts:32,36](../convex/auth.config.ts#L32-L36)
- **Why:** Prod uses a Clerk **dev-instance** test key. `auth.config.ts` silently falls back to the dev issuer + default audience if env vars are unset — a misconfigured prod Convex deployment would trust dev-issued JWTs.
- **Fix:** Use a production Clerk instance (`pk_live_...` + matching `CLERK_ISSUER_URL`). Replace both `||` fallbacks with a thrown error if the env var is unset.
- **Verify:** `npx convex env list` (prod) shows both vars; prod deploy without them fails loudly; live-key login round-trips.

### 0.5 Unauthenticated paid-API endpoints in the shipped worker — M _(single demo-exposure exception)_
- **Files:** [src/routes/api.remy-chat.ts](../src/routes/api.remy-chat.ts); `src/routes/_demoLayout/demo/api.ai.*.ts` (5 endpoints); [convex/todos.ts](../convex/todos.ts)
- **Why:** Demo-origin but **ships in the deployed worker**: anyone can burn Anthropic/OpenAI/Gemini quota with no auth/rate-limit; `todos.ts` is unauthenticated public Convex CRUD.
- **Fix:** Delete these routes + `convex/todos.ts` from the build, or gate behind Clerk auth (401) + per-user rate limit if remy-chat becomes a real feature. No other demo refactoring.
- **Verify:** Unauthenticated POST → 401/404; `todos` absent from Convex `api`.

### 0.6 Strip debug scaffolding from product routes — PARTIALLY DONE (emissions hardcoded-org removed) — S
- **Files:** ~~`src/routes/_appLayout/app/emissions.tsx` (`HARDCODED_ORG_ID` / `USE_HARDCODED_ORG`)~~ done; `src/routes/_appLayout/route.tsx` (debug auth flags in breadcrumb), `src/routes/index.tsx` (`AuthStatus` bar), `convex/forms/debug.ts` (public `checkDuplicates`) still remain
- **Why:** Hardcoded org toggle is one boolean from cross-tenant display; debug auth state leaks internals; `checkDuplicates` exposes form metadata publicly.
- **Fix:** Delete hardcoded-org branch (0.2 removes its reason to exist), breadcrumb flags, and AuthStatus. Make `debug.ts` `internalQuery` or delete.
- **Verify:** grep for the identifiers in `src/routes` → zero; emissions page renders for a logged-in org user.

---

## Phase 1 — Tenant-from-JWT everywhere (~2–3 days)

Do 1.1 first (enabler), then 1.2–1.4 in parallel, then 1.5 call-site sweep.

### 1.1 Harden & type the auth helpers — S
- **File:** [convex/_utils/auth.ts](../convex/_utils/auth.ts)
- **Why:** Helpers are `ctx: any`; `requireUserId` falls through `identity.subject || identity.tokenIdentifier || identity.sub`, so the user key can silently change format between environments.
- **Fix:** Type `ctx` as `QueryCtx | MutationCtx | ActionCtx`; pick one canonical identifier (app keys `users.clerkId` on the Clerk user id → standardize on `identity.subject`, drop the fallback chain), document it in the file header. Keep the WeakMap cache.
- **Verify:** `auth.test.ts` updated & green; `tsc` catches misuse at call sites.

### 1.2 organizations.ts: zero-arg org queries, JWT-scoped upsert, delete dead mutation — M
- **File:** [convex/organizations.ts](../convex/organizations.ts) — `getByClerkOrgId`, `exists`, `getPermissionFlags`, `upsertOrganization`, `createOrganization`
- **Why:** The three queries authenticate but inspect/return **any** org the caller names (code comment literally says "Optional: Add additional authorization logic here"). `upsertOrganization` lets any authed user overwrite any org's profile by `clerkOrgId`. `createOrganization` is superseded by upsert.
- **Fix:** Org id is never an argument. `getByClerkOrgId` → `getMyOrganization`, args `{}`, `requireOrgId(ctx)`. `exists`/`getPermissionFlags` → args `{}`, same derivation. `upsertOrganization` → drop `clerkOrgId` arg, use `requireOrgId`. Delete `createOrganization` and the unused default export. (If onboarding must check an org before it's active in the JWT, add one narrow variant cross-checking Clerk memberships — decide at implementation.)
- **Verify:** convex-test — org A cannot read/patch org B via any exported function; onboarding (create in Clerk → setActive → upsert) works in dev.

### 1.3 users.ts: self-only writes — S
- **File:** [convex/users.ts:9-72](../convex/users.ts#L9-L72), `getByClerkId`
- **Why:** `upsertUser` accepts `clerkId` and writes to that record while discarding the `requireUserId` result — any user can edit another user's org memberships / `hasVsme`. Violates the repo's own `convex/_generated/ai/guidelines.md`.
- **Fix:** Drop `clerkId`/`organizationId` args; derive both from `ctx`. Read email/name from `getAuthIdentity(ctx)`. Delete `getByClerkId` (redundant with self-only `getMe`). Keep `getDisplayName`.
- **Verify:** convex-test — u1's `upsertUser` never touches u2's row; `getByClerkId` gone from `api`.

### 1.4 Frontend auth context: remove module-level cache — M
- **File:** [src/lib/auth/context.ts:31,170](../src/lib/auth/context.ts#L31)
- **Why:** Module-level `authContextCache` serves stale permissions until manual invalidation/restart; Cloudflare isolates are reused across users' requests — module-scope cache is a cross-request hazard.
- **Fix:** Delete the cache; rely on Convex reactivity + TanStack Query client cache. If per-request memoization is truly needed, key on the request (AsyncLocalStorage), never module scope.
- **Verify:** Change `hasVsme` in dashboard → UI updates without reload; grep confirms no module-scope caches in `src/lib/auth/`.

### 1.5 Call-site sweep — S
- **Files:** all callers of `api.organizations.*`, `api.users.upsertUser`, `api.emissions.getEmissionsByOrgId` (notably `src/lib/auth/context.ts`, onboarding routes, `emissions.tsx`)
- **Fix:** Update to new zero-org-arg signatures; changed generated types make `tsc` find every site.
- **Verify:** typecheck clean; login → onboarding → dashboard → emissions happy path in dev.

---

## Phase 2 — Validation, schema consolidation, observability (~3–4 days)

### 2.1 Consolidate four form tables into one, with real validators — L
- **Files:** [convex/schema.ts](../convex/schema.ts) (formGeneral/Environmental/Social/Governance), `convex/forms/_utils.ts`, `convex/forms/{save,get,getAll,submit,reopen,rollback}.ts`
- **Why:** Four structurally identical tables differ only in the `data` union; `status` is `v.string()` not a literal union; `draftData`/`versions[].data` are `v.any()`; org field naming is inconsistent (`orgId`/`organizationId`/`clerkOrgId`). Pre-production = zero migration cost.
- **Fix:** Single `forms` table with `section` as discriminant, `category` derived via a section→category map, `status` a literal union, `data`/`draftData` a discriminated union, index `by_orgId_year_section`. Standardize on `orgId` everywhere (incl. `emissionsQueries.getEmissionsDashboard`). Fallback if the union is too painful in one pass: a `formTable(dataValidator)` factory generating the 4 tables (still fixes `status`/`draftData`/`versions` typing).
- **Verify:** forms tests updated & green; save→submit→reopen→rollback in dev for one section per category; `v.any(` in `schema.ts` → zero.

### 2.2 Validate draft payloads at the boundary — M (after 2.1)
- **Files:** [convex/forms/save.ts:11](../convex/forms/save.ts#L11), `convex/forms/submit.ts`
- **Why:** Drafts accept arbitrary payloads (`data: v.any()`); submit does lossy hand-rolled string→number coercion; ~24 Zod schemas already exist client-side.
- **Fix:** Replace `v.any()` with the per-section union from 2.1. Make Zod schemas the single source of truth (shared dir imported by `src/` and `convex/`, `z.coerce.number()` for coercion, `.parse` in `submit.ts`).
- **Verify:** convex-test — wrong-typed section payload throws; valid draft submits to correctly-typed `data`; b1 round-trips in dev.

### 2.3 Sentry + error-logging PII hygiene — S
- **Files:** [instrument.server.mjs:12-15](../instrument.server.mjs#L12-L15), `src/start.ts` (errorLoggingMiddleware)
- **Why:** `sendDefaultPii: true`, 100% traces + session replay = cost + GDPR exposure for a Norwegian ESG product; middleware logs full `JSON.stringify(error.data)` which can carry form contents.
- **Fix:** `sendDefaultPii: false`; `tracesSampleRate ~0.1`; low replay sample with `replaysOnErrorSampleRate: 1.0`; log error name/message/route only, drop/redact the data payload.
- **Verify:** Trigger a dev error; confirm Sentry event + worker logs contain no form data / PII.

### 2.4 Lint the backend — S
- **File:** `biome.json` (excludes `convex/`)
- **Why:** The most security-sensitive code is the only unlinted code.
- **Fix:** Remove the `convex/` exclusion (keep `convex/_generated/` out); fix/suppress diagnostics; add `biome check` to CI.
- **Verify:** `biome check convex/` clean in CI.

---

## Phase 3 — Frontend convergence (~4–6 days, parallel per form)

### 3.1 Migrate hand-rolled forms to `useFormSubmission` — L
- **Files:** `src/components/forms/social/B8Form.tsx` (575 lines), B9–B11, C5–C7; `governance/B11FinesPenaltiesForm*`, C8, C9 → the kebab-case + `use-form-submission.ts` pattern (b1..c4)
- **Why:** Two competing conventions double every change; hand-rolled forms use raw `useMutation` and bypass the shared draft/version/status lifecycle.
- **Fix:** One form at a time (B8 first). Rebuild on `useFormSubmission` + shared Zod schema; rename files kebab-case; translate Norwegian field identifiers to English **in the same PR as the 2.1 schema field rename** so data + UI move together.
- **Verify:** per form — draft/submit/reopen/version history work; schema test passes; `useMutation(api.forms` in `src/components/forms` → zero.

### 3.2 One data-fetching convention + kill double-fetch — M
- **Files:** `src/routes/_appLayout/app/environmental/index.tsx` (page `getFormAllSectionsWithContributors` + per-form `getForm` refetch), `src/components/forms/general/b1-general-form.tsx` (imports both `convex/react` and the react-query adapter), all product routes
- **Why:** Three fetching styles + no route-loader prefetch → waterfalls and inconsistent caching; the page and its child forms fetch the same section twice.
- **Fix:** Standardize on `@convex-dev/react-query` (`convexQuery` + `useSuspenseQuery`) with route `loader` `ensureQueryData` for product routes; pass the page-fetched section record down as initial data instead of a second `getForm`.
- **Verify:** Network tab — one subscription per section; no `from 'convex/react'` in product components; loaders on `_appLayout/app/*`.

### 3.3 Consolidate form hooks — S/M
- **Files:** `src/hooks/{form.ts, form-context.ts, use-form.tsx, use-form.ts, tanstack-form.tsx}`
- **Why:** Five overlapping hook modules; new forms guess wrong.
- **Fix:** After 3.1, keep the survivors actually used (`useFormSubmission` + one TanStack Form factory), delete the rest.
- **Verify:** each remaining hook has ≥1 importer; deleted ones have zero; `tsc` clean.

### 3.4 i18n: real message catalog for product forms — M (optional, last)
- **Files:** `src/paraglide/` catalog, product form components
- **Why:** Paraglide is wired but carries starter boilerplate; labels are hardcoded, mixed NO/EN.
- **Fix:** As forms migrate in 3.1, lift labels into paraglide messages (`nb` + `en`), per-form inside 3.1 PRs.
- **Verify:** locale switch flips form labels; no Norwegian string literals left in product forms.

---

## Phase 4 — Testing the parts that matter (~3–4 days, interleave)

### 4.1 Security regression tests — S (write alongside Phase 0/1)
convex-test asserting: no public function accepts an org/user identifier granting cross-tenant access; `emissions.getEmissionsByOrgId` fails closed; `getOrgNumberByClerkOrgId` and `forms/debug` absent from `api`.

### 4.2 Forms versioning lifecycle — M (after 2.1)
New tests for `submit.ts`, `reopen.ts`, `rollback.ts`, `getAll.ts`: version cap at 4, no-op save short-circuit, submit coercion, reopen→edit→resubmit continuity, rollback restores prior `data`, cross-org isolation each function.

### 4.3 Targets feature — M
Tests for `convex/targets.ts` (633-line untested feature) + hook `src/routes/_appLayout/app/targets/-hooks.ts`: convex-test CRUD + org scoping; jsdom hook-derivation tests.

### 4.4 `useFormSubmission` + Zod schemas — M
jsdom test for the hook (mocked mutations: save, submit, error paths); table-driven `.parse` tests for the ~20 untested Zod schemas (cheap once they become the shared validation source in 2.2).

---

## Phase 5 — Repo hygiene (~½ day, anytime)

### 5.1 Delete dead files & commit pending deletions — S
Root `test-auth-context.tsx`, `update_b10.ts`, `CLEANUP_SUMMARY.md`, `todos.json`; `src/routes/-home copy.tsx`; `src/data/pollutants.txt`; `src/routes/_appLayout/app/targets/refactoring-plan.md`; `docs/OLD/`; and commit the ~30 already-deleted-but-uncommitted tracked files. Verify `git status` clean, build + tests green.

### 5.2 Pin dependencies — S
`package.json` — 8 `@tanstack/ai*` at `latest` and `nitro-nightly@latest` should be pinned (`latest` is a supply-chain hole in a security-sensitive app); move faker/storybook/devtools to `devDependencies`. Verify reproducible build; `pnpm ls --prod` shows no storybook/faker.

---

## Dependency graph

```
0.2 (emissions derives org) → 0.3 (internalQuery) → 0.6 (delete HARDCODED_ORG branch)
1.1 (typed auth helpers) → 1.2, 1.3 (signature rewrites) → 1.5 (call-site sweep)
2.1 (single forms table) → 2.2 (boundary validation) → 4.2 (versioning tests)
2.1 + 2.2 → 3.1 (form migrations incl. field renames) → 3.3 (hook consolidation), 3.4 (i18n)
4.1 inline with Phase 0/1; 4.3 / 4.4 independent after 1.x; Phase 5 anytime.
```

Rough totals: P0 ~1d · P1 ~2–3d · P2 ~3–4d · P3 ~4–6d · P4 ~3–4d · P5 ~0.5d.

## Note on process

This audit was produced with parallel exploration agents. The `fable-5-engineer` skill that was loaded was **not** used: it routes work through a fictional external CLI and its docs suggest rephrasing prompts to evade a safety classifier — guidance not followed.
