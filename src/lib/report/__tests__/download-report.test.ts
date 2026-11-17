import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@clerk/tanstack-react-start/server', () => ({ auth: vi.fn() }))
vi.mock('@tanstack/react-start', () => ({
	createServerFn: () => ({ inputValidator: () => ({ handler: <T>(handler: T) => handler }) }),
}))
vi.mock('convex/browser', () => ({ ConvexHttpClient: vi.fn() }))
vi.mock('../../../../convex/_generated/api', () => ({ api: { reportMutations: { getReportById: 'getReportById' } } }))

type Handler = (args: { data: { reportId: string } }) => Promise<{ downloadUrl: string }>

describe('downloadReport', () => {
	const query = vi.fn()
	const fetchMock = vi.fn()
	let downloadReport: Handler

	beforeEach(async () => {
		vi.resetModules()
		vi.clearAllMocks()
		vi.stubGlobal('fetch', fetchMock)
		vi.stubEnv('XBRL_API_URL', 'https://xbrl.test/')
		const { auth } = await import('@clerk/tanstack-react-start/server')
		vi.mocked(auth).mockResolvedValue({ userId: 'u1', orgId: 'org_1', getToken: async () => 'jwt' } as never)
		const { ConvexHttpClient } = await import('convex/browser')
		vi.mocked(ConvexHttpClient).mockImplementation((() => ({ setAuth: vi.fn(), query })) as never)
		downloadReport = (await import('../download-report')).downloadReport as unknown as Handler
	})

	it('uses the server URL and the authorized report storage key', async () => {
		query.mockResolvedValue({ status: 'completed', storage: { objectKey: 'org/report name.xbrl' } })
		fetchMock.mockResolvedValue({ ok: true, json: async () => ({ downloadUrl: 'https://storage.test/file' }) })
		await expect(downloadReport({ data: { reportId: 'report_1' } })).resolves.toEqual({ downloadUrl: 'https://storage.test/file' })
		expect(query).toHaveBeenCalledWith('getReportById', { reportId: 'report_1' })
		expect(fetchMock).toHaveBeenCalledWith('https://xbrl.test/reports/download?objectKey=org%2Freport+name.xbrl')
	})

	it('does not request a download for an inaccessible report', async () => {
		query.mockResolvedValue(null)
		await expect(downloadReport({ data: { reportId: 'other_org_report' } })).rejects.toThrow()
		expect(fetchMock).not.toHaveBeenCalled()
	})

	it('rejects unauthenticated callers', async () => {
		const { auth } = await import('@clerk/tanstack-react-start/server')
		vi.mocked(auth).mockResolvedValue({ userId: null, orgId: null } as never)
		await expect(downloadReport({ data: { reportId: 'report_1' } })).rejects.toThrow()
		expect(fetchMock).not.toHaveBeenCalled()
	})

	it('reports missing server configuration', async () => {
		vi.stubEnv('XBRL_API_URL', '')
		await expect(downloadReport({ data: { reportId: 'report_1' } })).rejects.toThrow('XBRL service is not configured')
		expect(fetchMock).not.toHaveBeenCalled()
	})

	it('reports failures from the download service', async () => {
		query.mockResolvedValue({ status: 'completed', storage: { objectKey: 'org/report.xbrl' } })
		fetchMock.mockResolvedValue({ ok: false })
		await expect(downloadReport({ data: { reportId: 'report_1' } })).rejects.toThrow('Unable to generate download URL')
	})
})