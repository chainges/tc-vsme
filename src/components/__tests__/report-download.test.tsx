import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import type { ComponentType } from 'react'
import { toast } from 'sonner'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { downloadReport } from '@/lib/report/download-report'
import { Route } from '../../routes/_appLayout/app/reports/index'

vi.mock('@tanstack/react-router', () => ({
	createFileRoute: () => (options: unknown) => options,
}))

vi.mock('convex/react', () => ({
	useConvexAuth: () => ({ isAuthenticated: true }),
	useQuery: () => [
		{ _id: 'first', reportId: 'report-first', createdAt: 2, reportingYear: 2025, status: 'completed', storage: { objectKey: 'first', fileName: 'First report' } },
		{ _id: 'second', reportId: 'report-second', createdAt: 1, reportingYear: 2024, status: 'completed', storage: { objectKey: 'second', fileName: 'Second report' } },
	],
}))

vi.mock('sonner', () => ({ toast: { error: vi.fn() } }))
vi.mock('@/lib/report/download-report', () => ({ downloadReport: vi.fn() }))

const ReportsPage = (Route as unknown as { component: ComponentType }).component

afterEach(() => {
	cleanup()
	vi.restoreAllMocks()
	vi.unstubAllGlobals()
})

describe('report downloads', () => {
	it('shows a spinner and disables only the report being downloaded', async () => {
		let resolveRequest!: (response: { downloadUrl: string }) => void
		vi.mocked(downloadReport).mockImplementation(() => new Promise((resolve) => { resolveRequest = resolve }))
		const open = vi.spyOn(window, 'open').mockImplementation(() => null)
		render(<ReportsPage />)
		const rows = screen.getAllByRole('listitem')
		fireEvent.click(within(rows[0]).getByRole('button', { name: 'Download' }))
		expect(downloadReport).toHaveBeenCalledWith({ data: { reportId: 'report-first' } })
		const downloading = within(rows[0]).getByRole('button', { name: 'Downloading...' })
		expect(downloading.hasAttribute('disabled')).toBe(true)
		expect(downloading.querySelector('.animate-spin')).toBeTruthy()
		expect(within(rows[1]).getByRole('button', { name: 'Download' }).hasAttribute('disabled')).toBe(false)
		resolveRequest({ downloadUrl: 'https://example.com/report' })
		await waitFor(() => expect(within(rows[0]).getByRole('button', { name: 'Download' }).hasAttribute('disabled')).toBe(false))
		expect(open).toHaveBeenCalledWith('https://example.com/report', '_blank')
	})

	it('restores the button and reports a failed request', async () => {
		vi.mocked(downloadReport).mockRejectedValue(new Error('Download failed'))
		render(<ReportsPage />)
		fireEvent.click(screen.getAllByRole('button', { name: 'Download' })[0])
		await waitFor(() => expect(toast.error).toHaveBeenCalled())
		expect(screen.getAllByRole('button', { name: 'Download' })[0].hasAttribute('disabled')).toBe(false)
	})
})