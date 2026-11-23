import handler from '@tanstack/react-start/server-entry'
import { paraglideMiddleware } from './paraglide/server.js'

export default {
	async fetch(req: Request): Promise<Response> {

		try {
			const response = await paraglideMiddleware(req, () => handler.fetch(req))

			return response
		} catch (error) {
			console.error('[SERVER] Error:', error)

			return new Response('Internal Server Error', {
				status: 500,
			})
		}
	},
}