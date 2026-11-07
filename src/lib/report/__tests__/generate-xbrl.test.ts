import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@clerk/tanstack-react-start/server', () => ({ auth: vi.fn() }))
vi.mock('@tanstack/react-start', () => ({
	createServerFn: vi.fn(() => ({
		inputValidator: () => ({ handler: <T>(fn: T) => fn }),
	})),
}))
vi.mock('convex/browser', () => ({ ConvexHttpClient: vi.fn() }))
vi.mock('../../../../convex/_generated/api', () => ({ api: { report: { getReadiness: 'getReadiness' } } }))

type Handler = (args: { data: { reportingYear: number; reportId: string } }) => Promise<unknown>

describe('generateXbrl', () => {
	const query = vi.fn()
	const fetchMock = vi.fn()
	let generateXbrl: Handler

	beforeEach(async () => {
		vi.resetModules()
		vi.clearAllMocks()
		vi.stubGlobal('fetch', fetchMock)
		vi.stubEnv('XBRL_API_URL', 'https://xbrl.test/')
		vi.stubEnv('XBRL_API_KEY', 'secret')

		const { auth } = await import('@clerk/tanstack-react-start/server')
		vi.mocked(auth).mockResolvedValue({ userId: 'u1', orgId: 'org_1', getToken: async () => 'jwt' } as never)
		const { ConvexHttpClient } = await import('convex/browser')
		vi.mocked(ConvexHttpClient).mockImplementation((() => ({ setAuth: vi.fn(), query })) as never)

		generateXbrl = (await import('../generate-xbrl')).generateXbrl as unknown as Handler
	})

	it('does not call the XBRL service when the report is not ready', async () => {
		query.mockResolvedValue({ canGenerate: false, missing: ['B3'] })
		const result = await generateXbrl({ data: { reportingYear: 2025, reportId: 'report_1' } })
		expect(result).toEqual({ status: 'not_ready', missing: ['B3'] })
		expect(fetchMock).not.toHaveBeenCalled()
	})

	it('sends org, year, and report ID to the XBRL service when ready', async () => {
		query.mockResolvedValue({ canGenerate: true, missing: [] })
		fetchMock.mockResolvedValue(
			new Response(JSON.stringify({ file: 'a.xbrl' }), { headers: { 'content-type': 'application/json' } }),
		)
		const result = await generateXbrl({ data: { reportingYear: 2025, reportId: 'report_1' } })
		expect(result).toEqual({ status: 'ok', body: JSON.stringify({ file: 'a.xbrl' }) })
		expect(fetchMock).toHaveBeenCalledWith(
			'https://xbrl.test/convex?orgId=org_1&reportingYear=2025&reportId=report_1',
			expect.objectContaining({ method: 'GET' }),
		)
	})

	it('returns an error when the XBRL service fails', async () => {
		query.mockResolvedValue({ canGenerate: true, missing: [] })
		fetchMock.mockResolvedValue(new Response('boom', { status: 502 }))
		expect(await generateXbrl({ data: { reportingYear: 2025, reportId: 'report_1' } })).toEqual({
			status: 'error',
			message: 'XBRL service responded with 502',
		})
	})

	it('rejects unauthenticated callers', async () => {
		const { auth } = await import('@clerk/tanstack-react-start/server')
		vi.mocked(auth).mockResolvedValue({ userId: null, orgId: null } as never)
		expect(await generateXbrl({ data: { reportingYear: 2025, reportId: 'report_1' } })).toEqual({
			status: 'error',
			message: 'Not authenticated',
		})
	})
})
