# Task: Improve XBRL Report Generation Progress UI

## Context

File:
`C:\Users\Hp\Desktop\Work\VSME\tc-vsme\src\routes\_appLayout\route.tsx`

We currently fetch XBRL report generation data using:

```tsx
const {
  data: report,
  isPending,
  error,
} = ...
```

The `XbrlGenerationProgress` component uses these values to display the current report generation status.

Currently, the component only shows basic progress information. I want to enhance the user experience by displaying a **shadcn/ui AlertDialog** when report generation completes or fails.

## Requirements

### 1. Report Generation Progress

- Continue using `XbrlGenerationProgress` to display ongoing generation progress.
- Preserve the existing progress/status functionality for `queued` and `processing` states.
- When the report reaches a terminal state (`completed` or `failed`), display an appropriate `AlertDialog`.
- While the AlertDialog is open, hide `XbrlGenerationProgress` to prevent duplicate status information.

### 2. Successful Report Generation (`completed`)

When `report.status === "completed"`:

- Automatically open an AlertDialog.
- Display a success icon, heading, and short success message.
- Provide a prominent **Download Report** button.
- Use the actual generated report download URL from the report data.
- Do not hardcode or fabricate download URLs.
- If the report is marked completed but the download URL is missing, show an appropriate fallback message instead of a broken download button.
- Allow users to close the dialog.

### 3. Failed Report Generation (`failed`)

When `report.status === "failed"`:

- Automatically open an AlertDialog.
- Display an error icon, heading, and user-friendly explanation.
- Provide a **Report Bug** button.
- Allow the user to dismiss the dialog.


### 4. UI/UX Requirements

Use existing project dependencies and conventions:

- shadcn/ui `AlertDialog`
- Tailwind CSS
- Existing design tokens and theme variables
- Existing icon library
- Existing reusable components, where appropriate

The dialog should be:

- Responsive and mobile-friendly
- Accessible, with clear title, description, and actions
- Consistent with the application's existing design
- Visually distinct for success and failure states
- Supportive of keyboard interaction and focus management

Use appropriate components such as `AlertDialogAction`, `AlertDialogCancel`, and `AlertDialogContent`.

## Implementation Guidelines

1. Inspect `route.tsx`, `XbrlGenerationProgress`, and related report query/types before making modifications.
2. Understand the report status lifecycle and existing download/storage data structure.
3. Prefer reusing existing utilities and components rather than duplicating logic.
4. Keep state management simple and avoid unnecessary effects or rerenders.
5. Extract the result dialog into a separate reusable component if it improves readability and maintainability.
6. Preserve existing functionality and avoid unrelated refactoring.
7. Follow existing TypeScript, React, TanStack Query, and project coding conventions.
8. Ensure the download action works with the actual backend response. Account for authenticated or expiring download URLs if applicable.
9. Add or update relevant tests if the project has an established testing setup.

## Expected Behavior

| Report State | Progress Indicator | AlertDialog |
|---|---|---|
| `queued` | Visible | Hidden |
| `processing` | Visible | Hidden |
| `completed` (new transition) | Hidden | Success dialog with Download Report |
| `failed` (new transition) | Hidden | Error dialog with Report Bug |
| Query loading | Existing loading behavior | Hidden |
| Query error | Appropriate error indicator | Only show a result dialog if explicitly justified |

After dismissing a terminal-state dialog, do not automatically reopen it for the same report and status. The compact progress indicator may reappear with the final status and an option to reopen the result dialog.

## Deliverables

- Implement the required changes in the actual project files.
- Provide a short summary of modified files and components.
- Explain the dialog state-management approach.
- Identify where the download URL comes from.
- Explain how the Report Bug button works.
- Mention any missing backend functionality or assumptions.
- Run available TypeScript, lint, and relevant test checks, and report their results.

**Important:** Do not just suggest code. Inspect the existing implementation and make the necessary changes directly, while preserving the application's current architecture.