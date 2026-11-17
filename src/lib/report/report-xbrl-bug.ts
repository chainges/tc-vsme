import { auth } from '@clerk/tanstack-react-start/server'
import { createServerFn } from '@tanstack/react-start'

export const reportXbrlBug = createServerFn({ method: 'POST' })
	.inputValidator((data: { reportId: string }) => {
		if (typeof data?.reportId !== 'string' || !data.reportId.trim()) {
			throw new Error('Invalid report ID')
		}
		return data
	})
	.handler(async ({ data }): Promise<{ status: 'ok'; accessKey: string; message: string } | { status: 'error' }> => {
		try {
			const { userId, orgId } = await auth()
			const accessKey = process.env.FORM_ACCESS_KEY

			if (!userId || !orgId || !accessKey) return { status: 'error' }

			return { status: 'ok', accessKey, message: `Org ID: ${orgId} and Report ID: ${data.reportId} has error please guide` }
		} catch {
			return { status: 'error' }
		}
	})