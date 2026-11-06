import { auth } from '@clerk/tanstack-react-start/server'
import { createServerFn } from '@tanstack/react-start'
import { ConvexHttpClient } from 'convex/browser'
import { api } from '../../../convex/_generated/api'

export type GenerateXbrlResult =
	| { status: 'ok'; body: string }
	| { status: 'not_ready'; missing: string[] }
	| { status: 'error'; message: string }

/** Re-checks readiness with the caller's Convex identity, then asks the Python service to build the XBRL. */
export const generateXbrl = createServerFn({ method: 'POST' })
	.inputValidator((data: { reportingYear: number }) => data)
	.handler(async ({ data }): Promise<GenerateXbrlResult> => {
		const { userId, orgId, getToken } = await auth()

		console.log('Org ID:', orgId, data.reportingYear)

		if (!userId || !orgId) return { status: 'error', message: 'Not authenticated' }

		const apiUrl = process.env.XBRL_API_URL
		const apiKey = process.env.XBRL_API_KEY
		if (!apiUrl) return { status: 'error', message: 'XBRL service is not configured' }

		const token = await getToken({ template: 'convex' })
		if (!token) return { status: 'error', message: 'Not authenticated' }

		const convex = new ConvexHttpClient(import.meta.env.VITE_CONVEX_URL)
		convex.setAuth(token)

		const readiness = await convex.query(api.report.getReadiness, { reportingYear: data.reportingYear })
		if (!readiness.canGenerate) return { status: 'not_ready', missing: readiness.missing }

		const params = new URLSearchParams({
			orgId,
			reportingYear: String(data.reportingYear),
		})

		const response = await fetch(
			`${apiUrl.replace(/\/$/, '')}/convex?${params.toString()}`,
			{
				method: 'GET',
			},
		)

		if (!response.ok) return { status: 'error', message: `XBRL service responded with ${response.status}` }

		return { status: 'ok', body: await response.text() }
	})
