
import {
	createStartHandler,
	defaultStreamHandler,
} from '@tanstack/react-start/server'

import { createServerEntry } from '@tanstack/react-start/server-entry'
import { paraglideMiddleware } from './paraglide/server.js'

const startHandler = createStartHandler(defaultStreamHandler)

export default createServerEntry({
	async fetch(req, opts) {
		console.log('[SERVER] Request received:', new URL(req.url).pathname)

		console.log('[SERVER] Environment:', {
			hasClerkSecret: Boolean(process.env.CLERK_SECRET_KEY),
			hasPublishableKey: Boolean(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY),
			hasConvexUrl: Boolean(process.env.CONVEX_URL),
		})

		try {
			const response = await paraglideMiddleware(req, () =>
				startHandler(req, opts),
			)

			console.log('[SERVER] Response status:', response.status)

			return response
		} catch (error) {
			console.error('[SERVER] ORIGINAL ERROR:', error)

			if (error instanceof Error) {
				console.error('[SERVER] Error name:', error.name)
				console.error('[SERVER] Error message:', error.message)
				console.error('[SERVER] Error stack:', error.stack)
				console.error('[SERVER] Error cause:', error.cause)
			}

			return new Response('Internal Server Error', {
				status: 500,
			})
		}
	},
})
