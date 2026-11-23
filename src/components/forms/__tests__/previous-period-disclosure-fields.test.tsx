import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { SECTIONS } from '@/data/BASICDATA'
import { PreviousPeriodDisclosureFields } from '../previous-period-disclosure-fields'

afterEach(() => {
	cleanup()
	vi.unstubAllGlobals()
})

function renderFields(selected: string[] = [], disabled = false, desktop = false) {
	vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: desktop })))
	const onSectionsChange = vi.fn()
	const view = render(
		<PreviousPeriodDisclosureFields
			containsPreviousPeriodDisclosures
			sectionsThatHasNotChanged={selected}
			linkOfPreviousReport=''
			disabled={disabled}
			onContainsPreviousPeriodDisclosuresChange={vi.fn()}
			onSectionsChange={onSectionsChange}
			onLinkChange={vi.fn()}
		/>,
	)
	const row = screen.getAllByRole('row')[1]
	return { ...view, row, onSectionsChange }
}

describe('previous period section selection', () => {
	it('selects and deselects a row on mobile', () => {
		const { row, onSectionsChange, unmount } = renderFields()
		fireEvent.click(within(row).getByRole('button', { name: SECTIONS[0].title }))
		expect(onSectionsChange).toHaveBeenCalledWith([SECTIONS[0].value])
		unmount()

		const selected = renderFields([SECTIONS[0].value])
		expect(selected.row.className).toContain('bg-success/35')
		fireEvent.click(selected.row)
		expect(selected.onSectionsChange).toHaveBeenCalledWith([])
	})

	it('does not select disabled rows or desktop rows', () => {
		const disabled = renderFields([], true)
		fireEvent.click(disabled.row)
		expect(disabled.onSectionsChange).not.toHaveBeenCalled()
		disabled.unmount()

		const desktop = renderFields([], false, true)
		fireEvent.click(desktop.row)
		expect(desktop.onSectionsChange).not.toHaveBeenCalled()
		fireEvent.click(screen.getByRole('checkbox', { name: `Select ${SECTIONS[0].module}` }))
		expect(desktop.onSectionsChange).toHaveBeenCalledWith([SECTIONS[0].value])
	})
})