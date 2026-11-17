import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@clerk/tanstack-react-start/server', () => ({ auth: vi.fn() }))
vi.mock('@tanstack/react-start', () => ({
	createServerFn: () => ({ inputValidator: () => ({ handler: <T>(fn: T) => fn }) }),
}))
vi.mock('convex/browser', () => ({ ConvexHttpClient: vi.fn() }))
vi.mock('../../../../convex/_generated/api', () => ({
	api: { reportMutations: { getReportById: 'getReportById' } },
}))

type Handler = (args: { data: { reportId: string } }) => Promise<{ status: string; accessKey?: string; message?: string }>

describe('reportXbrlBug', () => {
	const query = vi.fn()
	let reportXbrlBug: Handler

	beforeEach(async () => {
		vi.resetModules()
		vi.clearAllMocks()
		vi.stubEnv('WEB3FORMS_ACCESS_KEY', 'test-key')
		const { auth } = await import('@clerk/tanstack-react-start/server')
		vi.mocked(auth).mockResolvedValue({ userId: 'user_1', orgId: 'org_1', getToken: async () => 'jwt' } as never)
		const { ConvexHttpClient } = await import('convex/browser')
		vi.mocked(ConvexHttpClient).mockImplementation((() => ({ setAuth: vi.fn(), query })) as never)
		query.mockResolvedValue({ reportId: 'report_1', orgId: 'org_1', status: 'failed' })
		reportXbrlBug = (await import('../report-xbrl-bug')).reportXbrlBug as unknown as Handler
	})

	it('prepares a failed report with the authenticated organization ID', async () => {
		expect(await reportXbrlBug({ data: { reportId: 'report_1' } })).toEqual({
			status: 'ok', accessKey: 'test-key', message: 'org_1 and report_1 has error please guide',
		})
		expect(query).toHaveBeenCalledWith('getReportById', { reportId: 'report_1' })
	})

	it('does not send for an inaccessible or non-failed report', async () => {
		query.mockResolvedValue(null)
		expect((await reportXbrlBug({ data: { reportId: 'other' } })).status).toBe('error')
		query.mockResolvedValue({ status: 'completed' })
		expect((await reportXbrlBug({ data: { reportId: 'report_1' } })).status).toBe('error')
	})

	it('rejects unauthenticated callers', async () => {
		const { auth } = await import('@clerk/tanstack-react-start/server')
		vi.mocked(auth).mockResolvedValue({ userId: null, orgId: null } as never)
		expect((await reportXbrlBug({ data: { reportId: 'report_1' } })).status).toBe('error')
	})

	it('reports missing Web3Forms configuration', async () => {
		vi.stubEnv('WEB3FORMS_ACCESS_KEY', '')
		expect((await reportXbrlBug({ data: { reportId: 'report_1' } })).status).toBe('error')
	})
})