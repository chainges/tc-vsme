
import handler from '@tanstack/react-start/server-entry'
import { paraglideMiddleware } from './paraglide/server.js'

export default {
	async fetch(req: Request): Promise<Response> {
		const url = new URL(req.url)
		const bypassParaglide = url.searchParams.has('__debug_no_i18n')

		console.log('[SERVER] Request:', url.pathname)
		console.log('[SERVER] Bypass Paraglide:', bypassParaglide)

		try {
			let response: Response

			if (bypassParaglide) {
				console.log('[SERVER] Calling TanStack directly')
				response = await handler.fetch(req)
			} else {
				console.log('[SERVER] Calling Paraglide')

				response = await paraglideMiddleware(req, async () => {
					console.log('[SERVER] Paraglide callback entered')

					const result = await handler.fetch(req)

					console.log('[SERVER] TanStack returned:', result.status)

					return result
				})
			}

			console.log('[SERVER] Final status:', response.status)

			if (response.status >= 500) {
				const body = await response.clone().text()

				console.error('[SERVER] Error response body:', body.slice(0, 1500))
			}

			return response
		} catch (error) {
			 console.error('========== ACTUAL ERROR ==========')

				console.error('Raw error:', error)

				if (error instanceof Error) {
					console.error('Name:', error.name)
					console.error('Message:', error.message)
					console.error('Stack:', error.stack)
					console.error('Cause:', error.cause)
				}

				console.error('==================================')

				return new Response('Internal Server Error', {
					status: 500,
				})
		}
	},
}
