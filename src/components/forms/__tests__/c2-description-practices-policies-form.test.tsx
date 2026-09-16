import { cleanup, render, screen } from '@testing-library/react'
import type { ReactNode } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useFormSubmission } from '../../../hooks/use-form-submission'
import { C2DescriptionPracticesPoliciesForm } from '../c2-description-paractices-policies-form'

const mockUseQuery = vi.fn()

vi.mock('@tanstack/react-store', () => ({
	useStore: vi.fn(() => 2025),
}))

vi.mock('convex/react', () => ({
	useQuery: mockUseQuery,
}))

vi.mock('../../../hooks/use-org-guard', () => ({
	useOrgGuard: vi.fn(() => ({ skipQuery: false })),
}))

vi.mock('../../../hooks/use-form-submission', () => ({
	useFormSubmission: vi.fn(),
}))

vi.mock('../../../hooks/tanstack-form', () => ({
	FormButtons: () => <div data-testid="form-buttons" />,
}))

describe('C2DescriptionPracticesPoliciesForm', () => {
	afterEach(() => cleanup())

	beforeEach(() => {
		vi.clearAllMocks()
		mockUseQuery.mockReturnValue(null)
		vi.mocked(useFormSubmission).mockReturnValue({
			form: {
				AppForm: ({ children }: { children: ReactNode }) => <div>{children}</div>,
				AppField: ({ name, children }: { name: string; children: (field: Record<string, unknown>) => ReactNode }) =>
					children({
						TextField: ({ label }: { label: string }) => <input aria-label={label} />,
						TextareaField: ({ label }: { label: string }) => <textarea aria-label={label} />,
					}),
			},
			status: 'draft',
			isSaving: false,
			isLoading: false,
			saveDraft: vi.fn(),
			submit: vi.fn(),
			reopen: vi.fn(),
			rollback: vi.fn(),
		} as unknown as ReturnType<typeof useFormSubmission>)
	})

	it('shows the practices textarea and monitoring targets when enabled in B2', () => {
		mockUseQuery.mockReturnValue({
			draftData: { hasSustainabilityPractices: true, policiesHaveTargets: true },
		})

		render(<C2DescriptionPracticesPoliciesForm />)

		expect(screen.getByLabelText('Description of practices and policies')).toBeTruthy()
		expect(screen.getByLabelText('Description of monitoring targets')).toBeTruthy()
		expect(screen.getByLabelText('Accountable role or person')).toBeTruthy()
	})

	it('shows the B2 empty-state message when practices are disabled', () => {
		render(<C2DescriptionPracticesPoliciesForm />)

		expect(screen.getByText('No practices or policies have been added in B2.')).toBeTruthy()
		expect(screen.queryByLabelText('Description of practices and policies')).toBeNull()
		expect(screen.queryByLabelText('Description of monitoring targets')).toBeNull()
		expect(screen.getByLabelText('Accountable role or person')).toBeTruthy()
	})
})
