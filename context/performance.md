# Role: Senior Performance Engineer & Full-Stack Architect

Act as a Principal Software Engineer specializing in React performance, TanStack Start, Vite, Convex, and modern full-stack web application optimization.

Your task is to perform a comprehensive, evidence-based performance audit of my entire application.

I want you to identify **EVERY significant area that could be slowing down my application**, explain why it is happening, measure or estimate its impact where appropriate, and create a detailed, prioritized optimization plan.

**IMPORTANT: Do not modify application code during this audit.** First investigate, collect evidence, and prepare a comprehensive report. Do not automatically install dependencies or change configurations.

## Project Technology Stack

- Framework: TanStack Start + TanStack Router
- Frontend: React + TypeScript
- Build system: Vite
- Runtime and package manager: Bun
- Backend and database: Convex
- Authentication: Clerk
- Data fetching: TanStack Query + Convex React Query integration
- Styling: Tailwind CSS + shadcn/ui
- Internationalization: Paraglide JS
- UI components: Radix UI / shadcn/ui
- Deployment: Cloudflare Workers
- Additional dependencies: Inspect package.json and identify actual usage.

Do not assume these technologies are configured optimally. Inspect their implementation.

---

# Phase 1: Understand the Application Architecture

Before analyzing performance:

1. Inspect the entire project structure.
2. Read package.json and identify all dependencies.
3. Examine Vite, TanStack Start, TanStack Router, Convex, Clerk, and Cloudflare configurations.
4. Identify application entry points and root layouts.
5. Map routing structure and route-level dependencies.
6. Identify server-side rendering and client-side hydration boundaries.
7. Understand the data-fetching architecture.
8. Identify which components render globally on every page.
9. Understand how authentication and organization context are initialized.
10. Identify existing performance monitoring, caching, and build optimization configurations.

Create a high-level architecture summary explaining the application's rendering and data-loading lifecycle.

# Phase 2: React Rendering Performance

Inspect every route, layout, and frequently used component for rendering inefficiencies.

Investigate:

- Unnecessary component re-renders.
- Expensive calculations during rendering.
- Excessive React context updates.
- Incorrect use of useEffect.
- Missing or unnecessary useMemo and useCallback.
- Missing or inappropriate React.memo.
- Large components that should be decomposed.
- Unstable object and function references.
- Expensive derived state.
- Unnecessary state synchronization.
- Large tables and lists without virtualization.
- Components performing expensive work on every render.
- Unnecessary mounting and unmounting.
- Too many simultaneous loading states.
- Form inputs causing entire forms or pages to re-render.
- Repeated calculations in dashboard components.

Do not recommend memoization blindly. Explain which optimizations are likely to produce measurable improvements.

For each issue, provide the exact file path, function/component name, cause, expected impact, and proposed solution.

# Phase 3: TanStack Start and Router Performance

Inspect:

1. Route-based code splitting.
2. Lazy loading of heavy components.
3. Route loaders and beforeLoad functions.
4. Sequential versus parallel data fetching.
5. Duplicate requests triggered by route transitions.
6. Loader execution during navigation.
7. Route preloading behavior.
8. SSR versus client-side rendering tradeoffs.
9. Hydration mismatches or unnecessary hydration work.
10. Root layout dependencies.
11. Suspense boundaries.
12. Navigation waterfalls.
13. Router configuration and caching.
14. Unnecessary rerendering during navigation.

Identify whether users are downloading or executing code that is not needed for the current route.

Pay special attention to dashboard, report generation, environmental reporting, social reporting, governance, and large multi-step forms.

# Phase 4: Convex Database and API Performance

Conduct a complete audit of Convex queries, mutations, actions, and subscriptions.

Investigate:

- Queries missing appropriate indexes.
- Unnecessary full-table scans.
- Unbounded `.collect()` usage.
- Excessive database reads.
- Duplicate queries across components.
- Excessive real-time subscriptions.
- Subscriptions that remain active unnecessarily.
- Large query responses.
- Returning fields that the frontend does not need.
- Repeated queries with identical arguments.
- Sequential database operations that could safely be parallelized.
- Inefficient filtering and sorting.
- Query functions performing expensive transformations.
- Authentication checks causing redundant reads.
- Repeated organization membership lookups.
- N+1 database query patterns.
- Pagination opportunities.
- Convex action latency.
- React Query and Convex cache integration.
- Query invalidation behavior.
- Unnecessary refetching during navigation.
- Unstable query arguments.

For every important Convex query, analyze:

1. Which frontend components call it?
2. How frequently does it execute?
3. What database indexes does it use?
4. How much data does it return?
5. Does it create an unnecessary subscription?
6. Can its workload be reduced?
7. Can it share already available data safely?

Pay special attention to queries fetching organization information, reporting data, dashboards, report generation progress, and large forms.

Do not weaken authentication or organization-level data isolation to improve performance.

# Phase 5: Authentication and Clerk Performance

Investigate:

- Repeated useUser, useAuth, and useOrganization calls.
- Duplicate authentication checks.
- Expensive organization membership validation.
- Components waiting unnecessarily for Clerk initialization.
- Authentication-dependent route loaders.
- Repeated organization metadata reads.
- Unnecessary authentication-driven re-renders.
- Sequential loading of Clerk and Convex data.
- Incorrect handling of loading states.

Determine whether authentication initialization is contributing significantly to slow application startup or route navigation.

Do not recommend bypassing authorization checks or caching sensitive data insecurely.

# Phase 6: Vite, Babel, Bun, and Build Performance

Investigate development and production build performance.

Specifically investigate this warning:

`[BABEL] Note: The code generator has deoptimised the styling of src/paraglide/messages/_index.js as it exceeds the max of 500KB.`

Determine:

1. Why Paraglide is generating a file larger than 500 KB.
2. Whether Babel unnecessarily processes generated translation files.
3. Whether generated translation modules are included in large client bundles.
4. Whether translation imports prevent effective tree shaking.
5. Whether the Vite React plugin configuration is optimal.
6. Whether unnecessary plugins slow down builds.
7. Whether dependencies are duplicated in bundles.
8. Whether development builds perform excessive transformations.
9. Whether source maps contribute to build overhead.
10. Whether TypeScript or other tooling causes unnecessary processing.

Analyze production bundle sizes, route chunks, and dependency distribution.

Distinguish development-only warnings from issues affecting production users.

# Phase 7: JavaScript Bundle and Network Performance

Analyze:

- Initial JavaScript bundle size.
- JavaScript downloaded during navigation.
- Unnecessary third-party dependencies.
- Duplicate libraries.
- Large icon-library imports.
- Charting dependencies.
- Rich text editors.
- Data grids and table libraries.
- Large JSON objects.
- Static assets.
- Tree shaking.
- Dynamic imports.
- Code splitting.
- Network request waterfalls.
- Compression and browser caching.

Identify opportunities to move heavy libraries out of the initial bundle.

Determine which dependencies contribute most to JavaScript transfer size, parsing time, and execution time.

# Phase 8: Forms, Tables, and Dashboard Performance

Focus on the application's VSME reporting workflows.

Investigate:

- TanStack Form performance.
- Large forms with numerous controlled fields.
- Validation happening too frequently.
- Form-level rerenders after individual field updates.
- Expensive schema validation.
- Data transformations during field updates.
- Complex conditional form sections.
- Repeated calculations for environmental and emissions data.
- Large report summaries.
- Dashboard charts and widgets.
- Data tables rendering excessive rows.
- Chart recalculation during unrelated state updates.

Recommend appropriate optimization strategies, including field-level subscriptions, virtualization, deferred rendering, and selective code splitting where supported by evidence.

# Phase 9: Paraglide and Internationalization Performance

Review the localization architecture.

Investigate:

1. Generated translation file sizes.
2. How translation modules are imported.
3. Whether unused translations are included in the client.
4. Whether changing language triggers expensive rerenders.
5. Translation-related processing during development.
6. Whether translation code is duplicated across routes.
7. Opportunities for splitting translation-related code.

Recommend improvements compatible with the installed version of Paraglide.

Do not change the localization architecture without identifying measurable benefits and migration risks.

# Phase 10: Cloudflare Workers and Production Performance

Inspect Cloudflare deployment configuration.

Investigate:

- Worker bundle size.
- Server-side rendering cost.
- Startup initialization overhead.
- Unnecessary server-side imports.
- Static asset caching.
- HTTP caching headers.
- Cloudflare asset delivery.
- External API latency.
- Backend request waterfalls.
- Environment configuration.
- Server-side versus client-side responsibilities.

Identify differences between local development and production performance.

Avoid recommending CDN caching for personalized or organization-specific responses unless isolation and correctness are preserved.

# Phase 11: Performance Measurements

Collect actual measurements wherever possible.

Measure or determine:

- Development server startup time.
- Production build duration.
- Initial page load time.
- Largest Contentful Paint (LCP).
- Interaction to Next Paint (INP), using appropriate browser tooling or field data.
- Cumulative Layout Shift (CLS).
- Total JavaScript transferred.
- Largest JavaScript chunks.
- Number of initial network requests.
- Number of requests during navigation.
- React render duration.
- Convex query latency.
- Route transition latency.
- Hydration cost.
- Memory consumption where measurable.

If browser profiling tools are available, inspect actual runtime behavior.

Compare cold navigation, warm navigation, authenticated startup, and major reporting routes.

If profiling tools or a running application are unavailable, clearly mark measurements as **Not Measured**.

Do not invent benchmark results.

Separate:
- Confirmed bottlenecks.
- Strongly suspected bottlenecks.
- Possible optimization opportunities.

# Phase 12: Create a Prioritized Optimization Plan

After completing the investigation, generate a file named:

`PERFORMANCE_AUDIT.md`

Use this structure:

## 1. Executive Summary

Summarize the application's performance health and the five highest-priority issues.

## 2. Performance Scorecard

Provide a table containing:

| Area | Current Status | Severity | Evidence | Improvement Opportunity |
|---|---|---|---|---|
| React Rendering | | | | |
| Convex Queries | | | | |
| Routing | | | | |
| Authentication | | | | |
| JavaScript Bundles | | | | |
| Build Performance | | | | |
| Forms | | | | |
| Internationalization | | | | |
| Production Deployment | | | | |

## 3. Detailed Findings

For each issue include:

- Unique issue ID.
- Exact file path.
- Relevant component/function.
- Description of the problem.
- Supporting evidence.
- Root cause.
- Severity: Critical / High / Medium / Low.
- Expected performance impact.
- Recommended solution.
- Risks and tradeoffs.
- How to verify the improvement.

## 4. Quick Wins

Identify safe, low-effort changes that could improve performance immediately.

## 5. High-Impact Optimizations

Identify major architectural or implementation improvements.

## 6. Implementation Roadmap

Create a practical phased optimization roadmap:

**Phase A — Quick Wins:** Low-risk changes that require minimal effort.

**Phase B — Frontend Optimization:** Rendering, route loading, forms, and JavaScript bundles.

**Phase C — Backend Optimization:** Convex queries, indexes, subscriptions, and data loading.

**Phase D — Production Optimization:** Cloudflare, SSR, caching, and deployment configuration.

**Phase E — Validation:** Benchmark the optimized application against baseline measurements.

For each task provide:

| Priority | Task | Files Affected | Estimated Effort | Expected Benefit | Risk |
|---|---|---|---|---|---|

Use High / Medium / Low for benefits that cannot be quantitatively estimated.

## 7. Before and After Benchmark Plan

Define reproducible measurements and acceptance criteria for each optimization.

## 8. Recommended Monitoring Tools

Suggest tools compatible with this project's technology stack for finding and tracking performance bottlenecks.

## 9. Risks and Regression Prevention

Explain how to prevent optimizations from breaking functionality, authentication, localization, data consistency, or reporting workflows.

---

# Critical Rules

1. **Audit the actual source code, not just package.json.**
2. Do not make generic recommendations without connecting them to actual project files.
3. Do not invent performance measurements.
4. Do not modify application code during this initial audit.
5. Do not remove dependencies without checking their usage.
6. Do not sacrifice functionality or maintainability for minor performance improvements.
7. Do not weaken security or authentication.
8. Do not recommend memoization or caching without explaining why it is needed.
9. Distinguish development build performance from production runtime performance.
10. Include exact source locations and actionable solutions.
11. Prioritize user-perceived performance over cosmetic code improvements.
12. Examine both frontend and backend.
13. Use available tools to collect actual evidence.
14. Clearly state which findings require additional runtime profiling.
15. Avoid recommendations incompatible with installed package versions.

# Expected Deliverables

Create two Markdown files in the project root:

**1. `PERFORMANCE_AUDIT.md`**

A comprehensive, evidence-based audit of the complete application.

**2. `PERFORMANCE_OPTIMIZATION_PLAN.md`**

An actionable implementation checklist organized by priority and phase, including measurable acceptance criteria.

At the end, provide a summary in the chat containing:

- Top 10 performance bottlenecks.
- Top 5 quick wins.
- Highest-impact architectural improvements.
- Recommended order of implementation.
- Areas requiring browser or production profiling.

**Start by inspecting the project. Do not implement optimizations until I explicitly approve the plan.**