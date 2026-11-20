import { clerkMiddleware } from '@clerk/tanstack-react-start/server'
import { createMiddleware, createStart } from '@tanstack/react-start'

/**
 * TanStack Start instance configuration
 *
 * Authentication Strategy:
 * - clerkMiddleware() parses JWT and makes auth state available
 * - Route protection is handled in route-level beforeLoad hooks (see _appLayout/route.tsx)
 * - We don't use custom auth middleware because Clerk's auth() requires Start context
 *   which isn't available in request middleware
 *
 * @see https://clerk.com/docs/tanstack-react-start/getting-started/quickstart#server-side
 */

// Diagnostic middleware: logs the real error before h3 wraps it as an
// unhandled HTTPError (which masks message/stack in the response body).
// Must run BEFORE clerkMiddleware so it wraps the entire downstream chain.

console.log('[VSME START] Module loaded')

const errorLoggingMiddleware = createMiddleware({
	type: 'request',
}).server(async ({ next }) => {
	console.log('[VSME DEBUG] Request middleware started')

	console.log('[VSME DEBUG] Environment:', {
		hasClerkSecret: Boolean(process.env.CLERK_SECRET_KEY),
		hasPublishableKey: Boolean(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY),
	})

	try {
		const result = await next()
		console.log('[VSME DEBUG] Middleware completed')
		return result
	} catch (error) {
		console.error('[VSME DEBUG] Original error:', error)
		throw error
	}
})

export const startInstance = createStart(() => {
	const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
	const secretKey = process.env.CLERK_SECRET_KEY

	return {
		requestMiddleware: [
			errorLoggingMiddleware,
			clerkMiddleware({
				publishableKey,
				secretKey,
			}),
		],
	}
})

// import { clerkMiddleware } from '@clerk/tanstack-react-start/server'
// import { createStart } from '@tanstack/react-start'

// export const startInstance = createStart(() => {
// 	return {
// 		requestMiddleware: [
// 			clerkMiddleware({
// 				publishableKey: process.env.VITE_CLERK_PUBLISHABLE_KEY,
// 				secretKey: process.env.CLERK_SECRET_KEY,
// 			}),
// 		],
// 	}
// })

// export default startInstance
