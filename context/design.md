# Complete UI/UX Audit Using Playwright MCP

Act as a Senior UI/UX Designer, Frontend Architect, Design Systems Engineer, and QA Specialist.

I want you to perform a complete visual and technical design audit of my existing website.

## Project Context

My application uses:
- Tailwind CSS
- CSS variables for colors and design tokens
- React-based frontend
- Reusable UI components
- Potentially shadcn/ui components

The application is already developed. Your job is to find existing design problems, inconsistencies, and opportunities for improvement.

IMPORTANT: You must inspect the actual website using Playwright MCP, not just read the source code.

# PHASE 1 — Understand the Project

First, inspect the project structure.

Identify:
- Frontend framework and version.
- Tailwind CSS version and configuration.
- Global CSS files.
- CSS variables and theme definitions.
- Component architecture.
- Shared UI components.
- Application routes.
- Layout components.
- Theme provider and dark mode implementation.

Inspect:
- globals.css
- index.css
- tailwind.config.js or tailwind.config.ts
- components.json
- All relevant CSS files.
- Shared components and layouts.

Understand how the existing design system works before evaluating it.

# PHASE 2 — Browser-Based Visual Inspection

Use Playwright MCP to open my running local application.

Base URL: http://localhost:3000

If the application uses another port, identify the correct running URL.

Discover all accessible routes.

Visit every route and inspect its actual rendered appearance.

Test these viewport dimensions:

- Desktop: 1440 × 900
- Laptop: 1280 × 800
- Tablet: 768 × 1024
- Mobile: 390 × 844

For each route:

1. Navigate to the page.
2. Wait for the page to finish rendering.
3. Capture a screenshot.
4. Inspect the complete page, including scrollable content.
5. Inspect important interactive components.
6. Check responsive behavior.
7. Record every meaningful visual issue.

Do not inspect only the homepage.

Do not assume routes are working just because navigation succeeds.

If authentication is required, report the limitation instead of attempting to bypass it.

# PHASE 3 — Design System Audit

Inspect the existing CSS variables and Tailwind implementation.

## A. Color System

Find:
- Inconsistent primary colors.
- Incorrect secondary colors.
- Inconsistent background colors.
- Poor foreground/background combinations.
- Hardcoded colors bypassing CSS variables.
- Duplicate or unused CSS variables.
- Inconsistent semantic colors.
- Incorrect dark mode colors.
- Poor contrast between text and backgrounds.

Check whether semantic tokens are consistently used.

## B. Typography

Find:
- Inconsistent font sizes.
- Inconsistent font weights.
- Incorrect line heights.
- Poor heading hierarchy.
- Inconsistent font families.
- Text that is too small.
- Incorrect text colors.
- Poor readability.

## C. Spacing System

Find:
- Inconsistent margins and padding.
- Inconsistent gaps.
- Incorrect section spacing.
- Inconsistent container widths.
- Arbitrary spacing values.
- Components that are unnecessarily cramped or oversized.

## D. Component Styling

Inspect:
- Buttons.
- Inputs.
- Selects.
- Dropdowns.
- Cards.
- Tables.
- Dialogs.
- Modals.
- Tabs.
- Navigation.
- Sidebars.
- Badges.
- Tooltips.
- Alerts.
- Empty states.
- Loading states.

Identify inconsistent styling between components serving the same purpose.

## E. Tailwind CSS Issues

Find:
- Conflicting utility classes.
- Excessive arbitrary values.
- Repeated class combinations.
- Inconsistent responsive breakpoints.
- Incorrect dark mode utilities.
- Hardcoded colors.
- Unnecessary !important declarations.
- Classes that override design tokens.
- Unnecessary duplication.

Do not recommend refactoring merely for stylistic preference. Focus on meaningful improvements.

# PHASE 4 — Responsive Design Audit

Test every accessible route on all four viewport sizes.

Look for:
- Horizontal scrolling.
- Broken grid layouts.
- Incorrect flex behavior.
- Content overflow.
- Sidebar problems.
- Navigation issues.
- Table overflow.
- Text wrapping problems.
- Incorrect image sizing.
- Inaccessible buttons.
- Touch targets that are too small.
- Elements overlapping each other.

Record the exact route and viewport where each issue occurs.

# PHASE 5 — UX and Accessibility Audit

Inspect:
- Keyboard navigation.
- Visible focus indicators.
- Semantic HTML.
- Form labels.
- Error messages.
- Button accessibility.
- Link usability.
- Color contrast.
- Loading indicators.
- Empty states.
- Error states.
- Disabled states.

Use axe-core if available.

Also inspect browser console errors and failed network requests when possible.

Distinguish between existing application errors and issues introduced by the testing environment.

# PHASE 6 — Visual Quality Assessment

Evaluate each page using these criteria:

1. Visual hierarchy.
2. Consistency.
3. Alignment.
4. Spacing.
5. Typography.
6. Color harmony.
7. Component consistency.
8. Responsive behavior.
9. Accessibility.
10. Overall professional appearance.

Be critical and objective.

Do not invent problems just to increase the issue count.

Do not recommend redesigning a working component without a clear reason.

# PHASE 7 — Create the Audit Report

Create:

UI_UX_AUDIT_REPORT.md

Use this structure:

## 1. Executive Summary
Overall design quality and most important findings.

## 2. Project Design System Analysis
Existing architecture, CSS variables, Tailwind configuration and design tokens.

## 3. Global CSS Issues
Problems affecting multiple routes.

## 4. Color and Typography Issues

## 5. Spacing and Layout Issues

## 6. Component Consistency Issues

## 7. Route-by-Route Findings

For every route include:
- Route URL.
- Viewport.
- Issue description.
- Affected component.
- Severity.
- Screenshot evidence.
- Recommended solution.

## 8. Responsive Design Issues

## 9. Accessibility Issues

## 10. UX Problems

## 11. Recommended Design System Improvements

## 12. Prioritized Implementation Plan

Classify all issues:

- P0: Critical problems.
- P1: High-impact problems.
- P