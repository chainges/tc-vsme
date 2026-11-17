import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { reportXbrlBug } from '@/lib/report/report-xbrl-bug'
import XbrlReportResultDialog from '../XbrlReportResultDialog'

vi.mock('@/lib/report/report-xbrl-bug', () => ({ reportXbrlBug: vi.fn() }))

describe('XbrlReportResultDialog', () => {
	beforeEach(() => vi.clearAllMocks())
	afterEach(() => vi.unstubAllGlobals())
	it('offers the actual download URL for a completed report', () => {
		const downloadUrl = 'https://storage.example.test/report.xbrl'
		render(
			<XbrlReportResultDialog
				status="completed"
				reportId="report-123"
				downloadUrl={downloadUrl}
				open
				onOpenChange={vi.fn()}
			/>,
		)

		expect(
			screen.getByRole('heading', { name: 'Your report is ready' }),
		).toBeTruthy()
		expect(
			screen
				.getByRole('link', { name: 'Download report' })
				.getAttribute('href'),
		).toBe(downloadUrl)
	})

	it('shows a fallback instead of a download action when the URL is missing', () => {
		render(
			<XbrlReportResultDialog
				status="completed"
				reportId="report-123"
				open
				onOpenChange={vi.fn()}
			/>,
		)

		expect(screen.getByText(/download link is not available/i)).toBeTruthy()
		expect(screen.queryByRole('link', { name: 'Download report' })).toBeNull()
	})

	it('sends a bug report and shows confirmation', async () => {
		vi.mocked(reportXbrlBug).mockResolvedValue({ status: 'ok', accessKey: 'test-key', message: 'org_1 and report-123 has error please guide' })
		const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ success: true })))
		vi.stubGlobal('fetch', fetchMock)
		render(
			<XbrlReportResultDialog
				status="failed"
				reportId="report-123"
				open
				onOpenChange={vi.fn()}
			/>,
		)

		expect(
			screen.getByRole('heading', { name: 'Report generation failed' }),
		).toBeTruthy()
		fireEvent.click(screen.getByRole('button', { name: 'Report bug' }))
		await waitFor(() => expect(reportXbrlBug).toHaveBeenCalledWith({ data: { reportId: 'report-123' } }))
		expect(await screen.findByText(/issue reported/i)).toBeTruthy()
		const [url, options] = fetchMock.mock.calls[0]
		expect(url).toBe('https://api.web3forms.com/submit')
		expect(options.body.get('access_key')).toBe('test-key')
		expect(options.body.get('message')).toBe('org_1 and report-123 has error please guide')
	})

	it('allows retrying when a bug report fails', async () => {
		vi.mocked(reportXbrlBug).mockResolvedValue({ status: 'ok', accessKey: 'test-key', message: 'message' })
		vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({ success: false }))))
		render(<XbrlReportResultDialog status="failed" reportId="report-123" open onOpenChange={vi.fn()} />)
		fireEvent.click(screen.getByRole('button', { name: 'Report bug' }))
		expect(await screen.findByText(/could not send/i)).toBeTruthy()
		expect((screen.getByRole('button', { name: 'Report bug' }) as HTMLButtonElement).disabled).toBe(false)
	})

	it('allows the user to close the result dialog', () => {
		const onOpenChange = vi.fn()
		render(
			<XbrlReportResultDialog
				status="failed"
				reportId="report-123"
				open
				onOpenChange={onOpenChange}
			/>,
		)

		fireEvent.click(screen.getByRole('button', { name: 'Close' }))
		expect(onOpenChange).toHaveBeenCalledWith(false)
	})
})
