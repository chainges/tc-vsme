---
name: paraglide-i18n
description: How to add/edit translated strings and work with Paraglide JS (@inlang/paraglide-js) in THIS repo's specific TanStack Start setup. Covers this repo's exact wiring (vite.config.ts, project.inlang/settings.json, src/server.ts middleware, src/routes/__root.tsx), the compiled src/paraglide/ runtime API (getLocale, setLocale, m.* messages), and known repo-specific deviations from upstream docs (semantic message keys, pinned-vs-installed version drift). Use this whenever the user asks to add a new UI string, translate something, add a locale, use m.functionName(), fix a hydration/locale mismatch, or touches messages/*.json or src/paraglide/. This is Paraglide-specific — for generic i18n/l10n concepts unrelated to Paraglide, see the i18n-localization skill instead.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Paraglide JS in this repo

> Grounded in cited primary-source research at `docs/research/paraglide-js-sources.md` —
> read that file for full source URLs and quotes. This skill is the "how it applies here" layer.

This repo compiles translations ahead-of-time with `@inlang/paraglide-js`, wired into
**TanStack Start** (not SvelteKit/Next — don't follow SvelteKit-flavored examples you find online).

## 1. Where things live

| Thing | Path |
|---|---|
| Source messages (edit these) | `messages/en.json`, `messages/no.json` |
| Inlang project config (locale list, plugins) | `project.inlang/settings.json` |
| Vite plugin wiring | `vite.config.ts` → `paraglideVitePlugin({ project: './project.inlang', outdir: './src/paraglide', strategy: ['url'] })` |
| Compiled output (generated — don't hand-edit) | `src/paraglide/{runtime,server,messages,registry}.js`, `src/paraglide/messages/{_index,en,no}.js` |
| SSR middleware | `src/server.ts` — wraps the TanStack handler: `paraglideMiddleware(req, () => handler.fetch(req))` |
| Root route locale wiring | `src/routes/__root.tsx` — `getLocale()` sets `<html lang>` |
| Reference locale-switcher component | `src/components/LocaleSwitcher.tsx` |

Compiled output regenerates automatically on `vite dev`/`vite build` — never edit `src/paraglide/*`
directly, edit the source `messages/*.json` instead and let the plugin recompile.

## 2. Adding or changing a translatable string

1. Add the key to **every** locale file in `messages/` (`en.json`, `no.json`), not just one —
   a key present in `en.json` but missing in `no.json` compiles fine but leaves that locale broken
   at runtime for that string.
2. Use the existing key convention: **semantic snake_case** (`nav_home`, `pricing_page_title`),
   matching what's already in `messages/en.json`. This deliberately diverges from upstream Paraglide
   docs, which recommend random/meaningless keys (e.g. `penguin_purple_shoe`) for tooling reasons —
   don't switch styles mid-file to match upstream examples.
3. Call it from a component via the compiled `m` namespace:
   ```tsx
   import { m } from '@/paraglide/messages'
   import { getLocale } from '@/paraglide/runtime'

   m.nav_home()                              // simple string
   m.current_locale({ locale: getLocale() }) // with interpolation — param names come from the message string, e.g. "Current locale: {locale}"
   ```
   `m.*` functions return a branded `LocalizedString`, not a plain `string` — if TypeScript
   complains about assigning one to a `string`-typed prop, that's the type system correctly
   flagging an untranslated/unlocalized value, not a bug to silence with a cast.
4. For plurals/variants (not currently used in this repo's message files), see the `variants`
   syntax documented in `docs/research/paraglide-js-sources.md` §3 before inventing an ad hoc
   `count === 1 ? ... : ...` branch.

## 3. Locale/runtime API (from `src/paraglide/runtime.js`)

| Function | Use |
|---|---|
| `getLocale()` | Current locale. Safe to call in components and in `beforeLoad` (see `__root.tsx`). |
| `setLocale(locale, { reload? })` | Switch locale. **Reloads the page by default** — this is intentional upstream behavior, not this repo's choice; pass `{ reload: false }` only if you've verified the URL-based `strategy: ['url']` routing won't end up in a stale state. |
| `locales` | Array of configured locales (`["en", "no"]` per `project.inlang/settings.json`). Use this to build locale switchers, as `LocaleSwitcher.tsx` does — don't hardcode the locale list elsewhere. |
| `baseLocale` | Fallback locale (`"en"`). |

This repo uses `strategy: ['url']` only (no cookie/localStorage/navigator fallback chain) — locale
comes entirely from the URL. If you're debugging "wrong locale" reports, check the URL pattern
first, not cookies/localStorage.

## 4. Server-side rendering — the one real gotcha

`paraglideMiddleware()` (in `src/server.ts`) does locale detection and makes `getLocale()` return
the right value per-request via `AsyncLocalStorage`, but **only for code that runs inside its
`resolve` callback**. Calling `getLocale()` at module scope or outside a request lifecycle returns
the server default, not the visitor's locale. If you see one visitor's locale leaking into another
request's response, check for `getLocale()`/`m.*` calls happening outside the request path first —
this is a documented upstream footgun, not necessarily a bug in new code
(`docs/research/paraglide-js-sources.md` §4).

## 5. Before assuming an API from memory or a blog post

- **Don't** use v1 APIs (`languageTag()`, `setLanguageTag()`, `availableLanguageTags`) — this repo
  is on v2, where those are `getLocale()`, `setLocale()`, `locales` respectively. A lot of
  still-indexed blog content is v1.
- **Don't** install a framework adapter package (`@inlang/paraglide-sveltekit`,
  `@inlang/paraglide-next`, etc.) — those were removed in v2 in favor of the single
  `paraglideVitePlugin` this repo already uses.
- **Check the installed version before trusting current docs verbatim.** `package.json` pins
  `^2.8.0`, but `2.16.0` is actually installed (check `bun.lock` if it matters), while
  `paraglidejs.com` describes a newer line (~2.25.0 as of the last research pass). Options/defaults
  (e.g. `outputStructure`) may have shifted between these — if something in the docs doesn't match
  what you see in `src/paraglide/`, that's the likely reason; verify against
  `node_modules/@inlang/paraglide-js` rather than assuming the docs page is wrong.
- **No official testing guide exists** for Paraglide as of the last research pass. If you need to
  test a component that calls `m.*`, there's no upstream-blessed pattern to defer to — use
  judgment and keep it minimal (e.g. asserting the compiled message function is called, not
  re-testing the compiler itself).

## 6. Deeper reference

For full cited findings (setup flow, compiler options, message-key conventions, all runtime
exports, the complete v1→v2 breaking-change list) read `docs/research/paraglide-js-sources.md` —
every claim there links back to `paraglidejs.com`, the `opral/paraglide-js` GitHub repo, or this
repo's own files. Prefer it over re-deriving from a fresh web search, since it's already been
cross-checked against what's actually wired up here.
