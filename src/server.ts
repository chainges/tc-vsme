import handler from '@tanstack/react-start/server-entry'
import { paraglideMiddleware } from './paraglide/server.js'

export default {
	async fetch(req: Request): Promise<Response> {
		console.log('[SERVER] Request:', req.url)

		try {
			const routerModule = await import('./router')

			console.log('[ROUTER PROBE] Module imported')

			const router = routerModule.getRouter()

			console.log('[ROUTER PROBE] Router created', {
				isServer: router.isServer,
			})
		} catch (error) {
			console.error('[ROUTER PROBE] FAILURE:', error)

			if (error instanceof Error) {
				console.error('[ROUTER PROBE] Name:', error.name)
				console.error('[ROUTER PROBE] Message:', error.message)
				console.error('[ROUTER PROBE] Stack:', error.stack)
				console.error('[ROUTER PROBE] Cause:', error.cause)
			}
		}

		try {
			const response = await paraglideMiddleware(req, () => handler.fetch(req))

			console.log('[SERVER] Response:', response.status)

			return response
		} catch (error) {
			console.error('[SERVER] Error:', error)

			return new Response('Internal Server Error', {
				status: 500,
			})
		}
	},
}