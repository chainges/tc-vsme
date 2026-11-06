# UI/UX Audit Report

**Date:** 2026-11-05  
**Application:** TC VSME / Scope321  
**Browser target:** `http://[::1]:3000` (the running server was reachable over IPv6; `localhost:3000` refused the browser connection)  
**Viewports:** 1440×900, 1280×800, 768×1024, 390×844

## 1. Executive Summary

The product has a recognizable teal sustainability palette, reusable shadcn-style controls, and a separate dark theme. The most important verified problems are mobile horizontal overflow on the public homepage and several report pages, internal authentication diagnostics exposed on the public homepage, and inaccessible contact-form fields. The dashboard also squeezes four KPI cards into the tablet content area while its document overflows at 768px.

Public pricing is inconsistent between `/` and `/pricing`, and the audited Highcharts dashboard emits an accessibility warning. Several report sections were read-only for the authenticated audit account; that may be intentional, but the UI does not explain the disabled state in the captured views.

**Overall assessment:** usable on desktop, with material mobile and accessibility gaps. The highest-value work is to remove the diagnostic strip, correct the shared mobile layout constraints, and fix form labeling and input types.

## 2. Project Design System Analysis

- **Stack:** React 19, TanStack Start/Router, Tailwind CSS 4.0.6, shadcn-style UI primitives, Clerk, Convex, Lucide, and Highcharts.
- **Global styling:** `src/styles.css` imports Tailwind and declares light/dark CSS custom properties, chart colors, typography, radii, and utility classes. No separate `globals.css` or `index.css` was found.
- **Theme:** `.dark` overrides are applied by `useTheme` via a root initializer in `src/routes/__root.tsx`; the preference is persisted in local storage and otherwise follows the system setting.
- **Component conventions:** `components.json` uses the New York shadcn style, CSS variables, and Lucide icons. Shared primitives live under `src/components/ui`.
- **Routes/layouts:** a public Scope321 header and home page; a protected VSME sidebar layout; and a reference/demo layout with separate event and TanStack examples. The generated route tree contains additional nested demo/API routes beyond the production-facing routes included below.
- **Runtime observation:** Vite reached a usable state through an existing Node process. Clerk development-key and telemetry-abort warnings appeared. During rapid route probing, one SSR dependency chunk was missing and triggered client rendering; treat that event as a dev-server/test-environment warning unless reproduced in a clean single-route session.

## 3. Global CSS Issues

- **P2 — Duplicate base tokens:** `--background` and `--foreground` are declared twice in `:root`. This is currently harmless because the values match, but creates avoidable ambiguity.
- **P2 — Font tokens contain colors:** `--font-serif` and `--font-mono` are assigned hex color values in both themes, then exposed as font-family tokens in `@theme inline`. Those values are not font-family names and can invalidate consumers of the corresponding utilities.
- **P2 — Global letter spacing:** `body` applies `--tracking-normal: 0.5px` to all text. This is visibly broader than a heading/label-specific tracking treatment and can reduce readability in dense forms.
- **P2 — Unstructured token usage:** design tokens coexist with route-level hard-coded colors and one-off radii. For example, report readiness uses `bg-white`, `text-slate-*`, and `blue-*` classes instead of the semantic surface/foreground tokens.
- **P3 — Radius drift:** the system radius is 10px, while several route components use `rounded-2xl` and related values. Standardize only where the visual mismatch is user-visible.

## 4. Color and Typography Issues

- Teal/green is the dominant brand direction, with sky, copper, rose, amber, and pink chart accents. This gives charts some differentiation, but semantic UI colors are not used consistently across route-specific status and readiness components.
- Nunito is the global body face and Maven Pro is available for titles. The headline hierarchy is clear on the landing page, but the global 0.5px letter spacing is unnecessary for normal body copy.
- The readiness page hard-codes blue/slate and white surfaces, creating a separate visual language from the semantic token system, especially in dark mode.
- Contrast ratios were not computed. The integrated browser showed a Highcharts warning that its accessibility module is not included; chart accessibility needs an explicit follow-up rather than assuming color alone communicates data.

## 5. Spacing and Layout Issues

- **P1 — Public header overflows on mobile:** at 390×844, `/` has a 526px document width. The signed-in organization switcher, Dashboard link, theme control, and user control occupy a 462px header group. The result requires horizontal panning and clips content.
- **P1 — Report forms overflow on mobile:** `/app/environmental` reaches 638px at 390px and 972px at 768px. A captured fieldset/section wrapper is 635px wide; the form cannot shrink to the available content column.
- **P1 — Table pages overflow on mobile:** `/app/targets` reaches 459px at 390px; its table is about 393px wide before the page inset. `/app/emissions` reaches 404px at 390px because its table extends past the viewport.
- **P2 — Dashboard tablet layout:** `/app` reaches 960px at 768px. The four-column KPI grid activates at the `md` breakpoint even though the sidebar consumes part of that viewport, leaving the cards visibly compressed.
- **P2 — Other observed mobile overflow:** `/app/governance` reaches 442px and `/demo` reaches 464px at 390px. The latter is a reference/demo page, not the main VSME workflow.
- On the tested widths, `/app/order`, `/app/generate`, `/app/settings`, `/pricing`, `/schedule`, `/speakers`, and `/talks` did not exceed the viewport width.

## 6. Component Consistency Issues

- **P1 — Contact form labels are not programmatically associated:** live DOM inspection found that all four fields have no `id` and no associated labels, despite visible label text. `htmlFor` on the name and surname labels therefore does not identify their inputs.
- **P1 — Contact form input types are wrong:** surname is rendered as `type="email"`; the work-email field is `type="text"`. This gives users the wrong mobile keyboard and browser validation behavior.
- **P2 — Charts lack their accessibility module:** Highcharts reports that `accessibility.js` is missing on `/app`; add and verify the module, including keyboard and screen-reader descriptions.
- **P2 — Generic loading UI:** inspected data-backed routes temporarily show plain `Loading...` text. Use a consistent skeleton/progress pattern where load duration is material, and preserve the layout to reduce perceived shifts.
- **P2 — Demo content in app navigation:** the protected sidebar exposes `Demo` links, while `/demo` is a pastry-event reference site. Keep reference routes clearly separated from the production VSME navigation.

## 7. Route-by-Route Findings

Viewport measurements below are document widths from the rendered browser. A value greater than the viewport indicates horizontal overflow. `Fit` means no measured horizontal overflow; it is not a claim that every interaction or contrast state passed.

| Route | 1440 / 1280 / 768 / 390 document width | Finding, severity, and recommendation | Screenshot evidence |
|---|---|---|---|
| `/` | 1432 / 1272 / 760 / **526** | **P1:** signed-in header overflows mobile. **P1:** public page renders an auth diagnostic strip with user email, organization, and Clerk/Convex access flags. Remove the diagnostic from public UI and collapse account controls on narrow widths. | Browser capture at 390×844; overflow measured at all four widths. |
| `/pricing` | 1432 / 1272 / 760 / 382 | **P1:** pricing content conflicts with `/`: the home page shows NOK 399/999 plans, while this page shows 49/99 per month and different plan names/features. Reconcile pricing, currency, and language before publishing both routes. Layout fit all widths. | Accessibility snapshot and viewport measurements. |
| `/schedule` | 1432 / 1272 / 760 / 382 | **P3:** page is a pastry-conference schedule rather than VSME content. If this is a reference route, keep it out of customer navigation and mark it as demo. Layout fit all widths. | Browser capture/snapshot; four-width measurement. |
| `/speakers` | 1432 / 1272 / 760 / 382 | **P3:** page is a pastry-conference speaker directory under a TC VSME document title. Separate demo content from public product routes. Layout fit all widths. | Accessibility snapshot; four-width measurement. |
| `/talks` | 1432 / 1272 / 760 / 382 | **P3:** page is a pastry-conference session catalogue, unrelated to VSME. Separate or relabel the reference experience. Layout fit all widths. | Accessibility snapshot; four-width measurement. |
| `/app` | 1440 / 1272 / **960** / 382 | **P2:** tablet document overflow and compressed four-column KPI cards at 768px. Use a content-width-aware breakpoint or let the grid remain two columns until the main pane has sufficient width. Dashboard has no semantic page heading (`Hello App!` is a `div`). | Browser capture at 768×1024; four-width measurement. |
| `/app/general` | 1432 at 1440 | The page rendered five report cards; 75 input controls were disabled for this account. **P2, conditional:** if read-only is intended, explain why and identify who can edit; otherwise correct the access state. Mobile measurement not retained. | Accessibility snapshot at desktop. |
| `/app/environmental` | 1432 / 1272 / **972** / **638** | **P1:** form section/fieldset width is 635px and causes mobile/tablet overflow. Add shrinkable `min-w-0` constraints and responsive field/table layouts; avoid forcing a fixed minimum width on the page. 92 of 92 inputs were disabled for the audit account. | Browser capture at 390×844; exact overflow element measured. |
| `/app/social` | 1432 at 1440 | Page rendered Social Reporting; 61 inputs were disabled for the audit account. **P2, conditional:** clarify read-only state or verify intended contributor permissions. Mobile measurement not retained. | Accessibility snapshot at desktop. |
| `/app/governance` | 1432 / 1272 / 760 / **442** | **P2:** mobile overflow. Governance data loaded, with 22 of 26 controls disabled for the audit account. Apply responsive form/card constraints and clarify unavailable fields. | Four-width measurement; browser DOM inspection at 390×844. |
| `/app/order` | 1440 / 1272 / 768 / 382 | No horizontal overflow observed. Form labels were exposed in the accessibility tree and 11 input controls were present. Continue testing validation and submission states. | Accessibility snapshot; four-width measurement. |
| `/app/emissions` | 1440 / 1280 / 768 / **404** | **P2:** emissions table overflows mobile; table width measured at about 393px before the content inset. Add a labeled horizontal-scroll region or a narrow-screen table presentation that keeps key values visible. | Browser snapshot/table DOM; four-width measurement. |
| `/app/targets` | 1432 / 1272 / 760 / **459** | **P2:** target table overflows mobile; measured table is about 393px wide. Wrap it in an explicitly scrollable region with keyboard access or provide a compact mobile layout. | Four-width measurement and table DOM inspection. |
| `/app/generate` | 1440 / 1280 / 768 / 382 | Layout fit all widths. **P2:** the page begins with a section heading (`h2`) and has no `h1`; provide a page-level heading for navigation and screen-reader hierarchy. | Accessibility snapshot; four-width measurement. |
| `/app/settings` | 1432 / 1272 / 768 / 382 | Layout fit all widths. The page displays Clerk user and organization IDs. Keep technical identifiers out of default user-facing settings unless users need to copy them. A controlled/uncontrolled RadioGroup warning appeared on this route during the audit. | Accessibility snapshot; four-width measurement and console event. |
| `/demo` | Not retained except 390: **464** | **P2 (demo):** mobile horizontal overflow. Browser also logged an SSR fallback caused by `No locale found` in the Paraglide locale switcher. Verify locale initialization on this route; keep it outside production navigation. | Browser capture at 390×844; console/page error recorded. |
| `/sign-in`, `/sign-up`, `/create-organization` | Not measured | Each direct visit redirected to `/app` because the browser already had an authenticated session. Per the brief, no auth bypass was attempted; these routes remain unaudited. | No screenshot evidence; authentication state prevented inspection. |

Other parameterized speaker/talk pages and nested demo/API routes were discovered in the generated route tree but were not individually audited. The audit therefore covers the public landing/pricing/event index pages and main protected VSME routes, not every generated reference endpoint.

## 8. Responsive Design Issues

1. **P1:** Remove mobile overflow from `/` (526px content at 390px) and `/app/environmental` (638px at 390px; 972px at 768px).
2. **P2:** Fix overflow in `/app/governance` (442px), `/app/emissions` (404px), `/app/targets` (459px), and reference `/demo` (464px) at 390px.
3. **P2:** Rework the `/app` KPI breakpoint for the available main-pane width; viewport-based `md` is too early with a persistent sidebar.
4. Tables should either fit, deliberately scroll within a named/keyboard-accessible region, or use an alternate narrow-screen presentation. Avoid page-level horizontal panning.

## 9. Accessibility Issues

- **P1:** Contact form labels have no associated inputs; correct field IDs/labels and verify accessible names with a DOM or axe check.
- **P1:** Contact form surname/email input types are swapped/misassigned; correct them and test mobile input affordances and native validation.
- **P2:** Load Highcharts accessibility support and test chart descriptions and keyboard navigation.
- **P2:** Add an `h1` to the dashboard and report-readiness route; use a logical heading hierarchy.
- Keyboard traversal was attempted, but the integrated browser did not move focus from `body`, so focus visibility and tab order are **inconclusive**, not passed.
- Axe-core was not available in the project dependencies and was not run. Contrast ratios were not numerically measured.

## 10. UX Problems

- Remove internal auth/debug diagnostics from customer-facing pages. The public homepage showed signed-in email, organization, and Clerk/Convex permission flags.
- Reconcile the two pricing experiences and their languages/currency. Users should not see conflicting plan names and amounts.
- Explain read-only form states. Completed environmental/general/social forms showed disabled fields without a visible reason in the captured view; verify role/permission intent before changing behavior.
- Use stable loading placeholders on data-backed pages and preserve the content layout while queries resolve.
- Keep pastry-event reference content visibly identified as demo and separate from the VSME product routes.

## 11. Recommended Design System Improvements

- Correct the `--font-serif` and `--font-mono` token values and remove duplicate root declarations.
- Reserve global tracking for intentional display/label use; keep body text at normal spacing.
- Establish semantic status and surface tokens for readiness, errors, success, and read-only state; remove hard-coded white/blue/slate variants where equivalent tokens exist.
- Define responsive behavior around the application content pane, not only viewport breakpoints; set `min-width: 0` on flex/grid children and constrain form fields.
- Set a table convention: minimum-width data grid inside an explicit scroll region, with a mobile summary where horizontal reading would be burdensome.
- Establish one shared heading, card-radius, and loading-state pattern for public and protected routes.

## 12. Prioritized Implementation Plan

Priority definitions (the source brief ends mid-priority rubric): **P0** blocks critical access or exposes severe data; **P1** high user impact/privacy/accessibility; **P2** meaningful usability or consistency issue; **P3** lower-risk polish or demo-only issue.

1. **P1:** Remove or gate the homepage auth diagnostic strip; verify no user/org details remain visible to signed-out visitors.
2. **P1:** Fix homepage and environmental mobile overflow, then check governance, emissions, and targets at 390px and 768px.
3. **P1:** Correct contact form label associations and input types; verify browser-native validation and keyboard operation.
4. **P1:** Reconcile `/` and `/pricing` product names, amounts, and currency.
5. **P2:** Reflow dashboard KPIs at tablet widths and add a real page heading.
6. **P2:** Add Highcharts accessibility support; run axe-core and keyboard checks on charts, forms, navigation, and dialogs.
7. **P2:** Clarify read-only form permissions and unify semantic color/typography tokens.
8. **P3:** Separate or clearly badge reference/demo routes; fix the demo locale SSR fallback if the route remains available.

**Evidence note:** screenshots were captured in the integrated browser for the homepage at 390×844, dashboard at 768×1024, Environmental at 390×844, and demo at 390×844. These captures are session artifacts and were not saved into the repository. No production UI code was changed as part of this audit.