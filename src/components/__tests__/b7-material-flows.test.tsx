import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useAppForm } from '@/hooks/tanstack-form'
import { B7ResourceUseCircularEconomyForm } from '../forms/b7-resource-use-circular-economy-form'

vi.stubGlobal('ResizeObserver', class {
	observe() {}
	unobserve() {}
	disconnect() {}
})

vi.mock('@/hooks/use-form-submission', () => ({
	useFormSubmission: ({ defaultValues }: { defaultValues: Record<string, unknown> }) => {
		const form = useAppForm({
			defaultValues: {
				...defaultValues,
				significantMaterialFlows: true,
				annualMassFlows: [{ id: 'one', materialType: 'Steel', volume: 2, unit: 'tonn' }],
			},
		})
		return { form, status: 'draft', isSaving: false, isLoading: false, saveDraft: vi.fn(), submit: vi.fn(), reopen: vi.fn() }
	},
}))

describe('B7 material flows', () => {
	it('updates totals when material quantities change and rows are added or removed', () => {
		render(<B7ResourceUseCircularEconomyForm />)
		expect(screen.getAllByText('2 t')).toHaveLength(2)
		fireEvent.change(screen.getByLabelText('Annual mass flow'), { target: { value: '3' } })
		expect(screen.getAllByText('3 t')).toHaveLength(2)
		fireEvent.click(screen.getByRole('button', { name: 'Add material type' }))
		expect(screen.getByText('Materials tracked: 2')).toBeTruthy()
		fireEvent.click(screen.getAllByRole('button', { name: 'Remove material' })[0])
		expect(screen.getAllByText('0 t')).toHaveLength(2)
	})
})