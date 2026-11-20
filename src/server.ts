import handler from '@tanstack/react-start/server-entry'
import { paraglideMiddleware } from './paraglide/server.js'

export default {
	async fetch(req: Request): Promise<Response> {
		console.log('[SERVER] Request:', req.url)

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