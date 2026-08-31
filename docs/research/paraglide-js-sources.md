# Paraglide JS primary sources

> **Date:** 2026-08-31. Research only — no skill file written here. Local claims cite file
> paths; tool-behavior claims cite vendor doc URLs (all fetched live during this research).

## Question

What primary sources exist for `@inlang/paraglide-js` (pinned `^2.8.0` in this repo, installed
`2.16.0` per `bun.lock`), and what do they say about setup, message files, runtime APIs, SSR,
TypeScript, and v1→v2 breaking changes — so a later Paraglide-specific Claude Code skill can point
at accurate, current, cited material instead of training-data guesses?

## Local repo facts (grounding for what the future skill must match)

- `package.json`: `"@inlang/paraglide-js": "^2.8.0"`; installed `2.16.0` (`bun.lock`).
- Framework: **TanStack Start** (React 19, Vite, `@tanstack/react-start` — not SvelteKit/Next.js).
- `vite.config.ts`: `paraglideVitePlugin({ project: './project.inlang', outdir: './src/paraglide', strategy: ['url'] })` — single-strategy array, no cookie/baseLocale fallback.
- `project.inlang/settings.json`: `baseLocale: "en"`, `locales: ["en", "no"]`, message-format plugin with `pathPattern: "./messages/{locale}.json"`.
- Source messages live at repo-root `messages/en.json`, `messages/no.json` (flat key → string JSON).
- Compiled output at `src/paraglide/`: `runtime.js`, `server.js`, `messages.js`, `registry.js`, `messages/{_index.js, en.js, no.js}` — one file per locale (not the per-message-folder `message-modules` layout the current docs describe as default; see Gaps).
- `src/server.ts` wraps the TanStack handler in `paraglideMiddleware(req, () => handler.fetch(req))`.
- `src/routes/__root.tsx` calls `getLocale()`/`shouldRedirect` in `beforeLoad` and sets `<html lang>`.
- `src/components/LocaleSwitcher.tsx` uses `m`, `getLocale`, `locales`, `setLocale` from `@/paraglide/{messages,runtime}`, and cites two upstream sources directly in its own comments: `https://inlang.com/m/gerre34r/library-inlang-paraglideJs` and `https://github.com/TanStack/router/tree/main/examples/react/i18n-paraglide#switching-locale`.
- `runtime.js:23` exports `locales` (not `availableLocales`) — confirms the repo already matches the current (post-v2) API, not a stale naming.

## Sources

| Source | URL | Authoritative for |
|---|---|---|
| Paraglide JS docs home (canonical; `inlang.com/m/gerre34r/...` 301-redirects here) | https://paraglidejs.com/ | Nav map, core positioning |
| Basics | https://paraglidejs.com/basics | Core concepts, compile-time model |
| TanStack Start guide | https://paraglidejs.com/tanstack-start | Setup for this repo's exact framework |
| Strategy | https://paraglidejs.com/strategy | Locale-detection strategy list & ordering rules |
| i18n Routing | https://paraglidejs.com/i18n-routing | `urlPatterns` config, `url` strategy |
| Middleware | https://paraglidejs.com/middleware | `paraglideMiddleware` signature & gotchas |
| Server Side Rendering | https://paraglidejs.com/server-side-rendering | AsyncLocalStorage/SSR model, hydration gotchas |
| Runtime | https://paraglidejs.com/runtime | Full runtime API surface |
| Compiling Messages | https://paraglidejs.com/compiling-messages | Output directory shape, CLI/plugin/programmatic compile |
| Compiler Options | https://paraglidejs.com/compiler-options | Every `paraglideVitePlugin`/`compile()` option + default |
| Message Keys | https://paraglidejs.com/message-keys | Key naming convention (random keys, flat keys) |
| Formatting | https://paraglidejs.com/formatting | Parameter interpolation, `Intl`-backed formatters |
| Variants | https://paraglidejs.com/variants | Pluralization/variant `match` syntax |
| Incremental Migration | https://paraglidejs.com/incremental-migration | Migrating *from other libraries*, not v1→v2 |
| Changelog | https://paraglidejs.com/changelog | v1→v2 breaking-change list ("Migrating breaking changes" section), version history |
| GitHub repo (source of truth; `opral/paraglide-js`, `opral/inlang-paraglide-js` redirects here) | https://github.com/opral/paraglide-js | README, CHANGELOG.md, issues |
| TanStack Router example this repo's code cites | https://github.com/TanStack/router/tree/main/examples/react/i18n-paraglide | Reference implementation for TanStack Start + Paraglide (locale switcher, offline-redirect) |
| Local repo | `package.json`, `vite.config.ts`, `project.inlang/settings.json`, `src/paraglide/*`, `src/server.ts`, `src/routes/__root.tsx`, `src/components/LocaleSwitcher.tsx` | What's actually wired up in this codebase |

Note on org/domain history: `inlang.com/m/gerre34r/library-inlang-paraglideJs` now 301-redirects
to `paraglidejs.com` — the docs moved to their own domain; `github.com/opral/inlang-paraglide-js`
resolves to `github.com/opral/paraglide-js`. Use the `paraglidejs.com` and `opral/paraglide-js`
URLs going forward; the `inlang.com`/`inlang-paraglide-js` forms still work but are legacy.

## Findings

### 1. What Paraglide JS is / core concepts

Paraglide JS is a **compiler-first i18n library** — "Compiler-first i18n for React, TanStack
Start, SvelteKit, and any Vite app" (https://paraglidejs.com/). Source messages
(`messages/{locale}.json`) are compiled ahead of time into typed ESM message functions rather than
resolved at runtime; this enables tree-shaking of unused translations, claimed up to ~70% smaller
bundles than runtime libraries like i18next (https://paraglidejs.com/, GitHub README via
https://github.com/opral/paraglide-js). Messages are called as `m.functionName()` from the
compiled `messages.js`/`messages/` output; message functions return a `LocalizedString` type
distinct from plain `string` so untranslated strings are a compile-time type error
(https://paraglidejs.com/basics). Locale detection happens via an ordered **strategy** array
(cookie, URL, `preferredLanguage`, `localStorage`, `baseLocale`, `globalVariable`, custom) —
https://paraglidejs.com/strategy.

### 2. Setup/installation flow for this repo's framework (TanStack Start)

Confirmed via package.json/vite.config.ts that this is **TanStack Start** (React 19 + Vite), not
SvelteKit/Next.js — matching guide: https://paraglidejs.com/tanstack-start. That guide's flow:

1. `npx @inlang/paraglide-js@latest init` (scaffolds `project.inlang/` + messages).
2. Optional starter clone: `npx gitpick TanStack/router/tree/main/examples/react/start-i18n-paraglide start-i18n-paraglide`.
3. Add `paraglideVitePlugin({ project, outdir, outputStructure, cookieName, strategy, urlPatterns })` to `vite.config.ts`.
4. Wire `paraglideMiddleware` into `server.ts` around the TanStack handler — exactly the pattern in this repo's `src/server.ts`.
5. Router-level URL rewriting via `deLocalizeUrl`/`localizeUrl` passed to `createRouter({ rewrite: { input, output } })`.
6. Set `<html lang={getLocale()}>` in the root route.

(https://paraglidejs.com/tanstack-start)

The **reference implementation** this repo's own code cites in comments is the official TanStack
example, not the generic docs page:
https://github.com/TanStack/router/tree/main/examples/react/i18n-paraglide — covers the locale
switcher pattern and an "offline-redirect" strategy using `shouldRedirect()` in `beforeLoad`,
which is exactly what `src/routes/__root.tsx` implements.

### 3. Message file structure & compiler step

- Source format: `messages/{locale}.json` (message-format plugin,
  `$schema: https://inlang.com/schema/inlang-message-format`), flat `key: "string"` pairs for
  simple messages, or an array of variant objects (`declarations`/`selectors`/`match`) for
  pluralized/gendered messages — https://paraglidejs.com/compiling-messages,
  https://paraglidejs.com/variants. This matches `messages/en.json` in this repo exactly.
- Compiler: `npx @inlang/paraglide-js compile --project ./project.inlang --outdir ./src/paraglide [--emit-ts-declarations] [--watch]`, or (as this repo does) via the Vite/webpack/rollup/rspack/esbuild bundler plugins exported from the same package, or programmatically — https://paraglidejs.com/compiling-messages.
- Output shape is controlled by `outputStructure`: `"message-modules"` (one folder per message —
  current docs state this is default) vs `"locale-modules"` (per-locale bundling) —
  https://paraglidejs.com/compiler-options. **This repo's actual output** (`src/paraglide/messages/_index.js`, `en.js`, `no.js`) is a per-locale-bundle shape, not per-message folders — see Gaps for why this likely reflects the older installed `2.16.0` rather than current docs' default.
- Key naming convention: docs recommend **random, meaningless, stable keys** (e.g.
  `penguin_purple_shoe`) over semantic keys, and **flat keys** over nested/dotted ones for
  tooling/tree-shaking — https://paraglidejs.com/message-keys. This repo instead uses semantic
  snake_case keys (`nav_home`, `pricing_page_title`) — a deliberate deviation worth flagging in
  the eventual skill, not a bug.

### 4. Runtime APIs

Full list from https://paraglidejs.com/runtime, cross-checked against `src/paraglide/runtime.js`:

- Locale: `getLocale()`, `setLocale(locale, { reload? })`, `toLocale()`, `isLocale()`, `assertIsLocale()`, constants `locales`, `baseLocale`.
- URL localization: `localizeHref()`/`deLocalizeHref()` (client, relative paths) vs `localizeUrl()`/`deLocalizeUrl()` (server, absolute `URL` objects) — this repo's router uses the `*Url` pair in `router.tsx`-style rewrite config per the TanStack guide.
- Detection: `extractLocaleFromUrl/Request/RequestAsync/Header/Navigator/Cookie`.
- Redirects: `shouldRedirect()` — used directly in this repo's `__root.tsx`.
- Overrides: `overwriteGetLocale/SetLocale/GetUrlOrigin`, `defineCustomServerStrategy`, `defineCustomClientStrategy`.
- Misc: `getTextDirection()`, `generateStaticLocalizedUrls()` (SSG).

**Server-side / SSR**: `paraglideMiddleware(request, resolve, options?)` from `paraglide/server.js`
does locale detection + URL delocalization + per-request isolation via Node `AsyncLocalStorage`,
so `getLocale()` returns the right value even in deeply nested async/streaming code — but **only
when called inside the middleware's `resolve` callback**; calling it outside returns the server
default (https://paraglidejs.com/server-side-rendering,
https://paraglidejs.com/middleware). Documented gotcha directly relevant to this repo's TanStack
Start setup: if the framework's own router already does URL delocalization/rewriting (TanStack
Router does, per this repo's rewrite config), pass the **original** request through to the
framework handler, not the middleware-modified one, or you get redirect loops
(https://paraglidejs.com/middleware).

### 5. Testing, TypeScript, pitfalls

- **TypeScript**: compiled output is JS + JSDoc by default; `.d.ts` emission requires
  `emitTsDeclarations: true` (default `false`) and TypeScript ≥5.6, or `allowJs` if skipping
  declarations (https://paraglidejs.com/compiler-options, https://paraglidejs.com/compiling-messages). Message functions are typed via template-literal types so keys/params autocomplete and mismatches are compile errors; return type is the branded `LocalizedString`, not `string` (https://paraglidejs.com/basics).
- **Testing**: no dedicated official testing guide was found. The only testing-adjacent doc
  mentions are: the `globalVariable` strategy being "useful in testing environments or to get
  started quickly" but explicitly **not** for production servers (cross-request state bleed) —
  https://paraglidejs.com/strategy — and a compiler `fs`-mocking option for testing the compiler
  itself, mentioned in compiler-options search results but not independently verified on the page
  fetch. Treat "how to test components that call `m.*`" as an open question for the future skill.
- **Documented pitfalls** (all from https://paraglidejs.com/server-side-rendering,
  /middleware, /strategy, /basics): hydration mismatches when server and client resolve locale
  from different sources (e.g., server reads URL, client reads localStorage — localStorage isn't
  available on the first SSR pass); `url` strategy with default/no `urlPatterns` matches
  everything, so it must not be placed before strategies meant to run first, and placing it
  earlier in an array starves later fallback strategies (this repo uses `strategy: ['url']` only —
  no fallback, which is consistent since a bare `url` strategy always resolves); `setLocale()`
  triggers a full page reload by default — `{ reload: false }` is an explicit escape hatch, not
  the norm, and misusing it with URL-based routing can leave stale document state.

### 6. Version-specific notes: v2.8.x, and v1→v2 breaking changes

- Repo is pinned `^2.8.0` but has **2.16.0** installed (`bun.lock`); current npm/docs describe a
  substantially newer line (docs fetched during this research reflect **2.25.0**, per
  https://paraglidejs.com/changelog, which post-dates 2.8.0 and even the installed 2.16.0 by many
  releases). No changelog entries specific to 2.8.0 were visible in the fetched changelog excerpt
  — only entries from ~2.10.0 onward were shown, so 2.8.0-specific release notes are an unverified
  gap; check `https://github.com/opral/paraglide-js/blob/main/CHANGELOG.md` directly for the 2.8.0
  entry if that granularity matters.
- **v1 → v2 breaking changes** (official "Migrating breaking changes" section,
  https://paraglidejs.com/changelog):
  - `languageTag()` → `getLocale()`, `setLanguageTag()` → `setLocale()`, `availableLanguageTags` → `locales` (confirmed this repo's `runtime.js` already exports `locales`, matching v2).
  - Framework-specific adapter packages (`@inlang/paraglide-sveltekit`, `@inlang/paraglide-next`, `@inlang/paraglide-astro`, etc.) are removed in favor of one framework-agnostic Vite/bundler plugin — this repo correctly uses only `@inlang/paraglide-js`'s `paraglideVitePlugin`, no adapter package.
  - Framework "Providers" are no longer required/used.
  - `setLocale()` now reloads the page by default (see pitfall above).
  - `localizeHref()` is now required for localized links — no more automatic AST-based link transforms.
  - Message keys >255 chars must be shortened (tied to the `message-modules` output default).
- A **third-party/secondary** search summary claimed `runtime.locales` was renamed to
  `runtime.availableLocales`; this directly contradicts both the primary changelog page (which
  says the opposite: `availableLanguageTags` → `locales`) and this repo's own `runtime.js:23`
  (`export const locales = ...`). Discarded as incorrect; flagged here so it isn't repeated.

## Gaps / secondary sources used

- **npmjs.com blocked** (HTTP 403 on fetch) — could not independently confirm the exact published
  2.8.0 changelog entry or npm README from the registry page itself; relied on the GitHub repo and
  paraglidejs.com instead, both primary.
- **`outputStructure` default discrepancy**: current docs (https://paraglidejs.com/compiler-options)
  state `message-modules` (one file per message) is the default, but this repo's compiled output
  is a per-locale bundle (`_index.js`, `en.js`, `no.js`) consistent with `locale-modules`. Since
  the docs reflect the latest release (~2.25.0) and this repo has 2.16.0 installed, the default
  likely differed in that version, or the option was set implicitly by an earlier `init`/compile
  run. Not resolved from primary sources for 2.16.0 specifically — verify against
  `node_modules/@inlang/paraglide-js/dist` or that version's own docs/changelog before writing
  skill guidance that assumes either default.
- **Dedicated testing guide**: none found on paraglidejs.com via direct fetch or site-scoped
  search; the "Testing" gap in §5 is real, not a fetch failure — flagged for the future skill to
  either document the repo's own test approach (if any) or state there's no official guidance.
- Search-engine-generated *summaries* (WebSearch tool output, not primary pages) were used only to
  locate URLs (e.g., confirming the migration-guide section lives inside `/changelog`); every
  factual claim above was re-verified against the fetched primary page text, and the one place a
  search summary was wrong (`availableLocales` claim) is called out explicitly rather than
  silently corrected.
