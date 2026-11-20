import * as Sentry from '@sentry/tanstackstart-react'
import { createRouter } from '@tanstack/react-router'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'
import { DefaultCatchBoundary } from './components/DefaultCatchBoundary'
import { NotFound } from './components/NotFound'
import * as TanstackQuery from './integrations/tanstack-query/root-provider'
import { deLocalizeUrl, localizeUrl } from './paraglide/runtime'
// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance

export const getRouter = () => {
	console.log("[ROUTER DEBUG] 1. getRouter called")

	try {
		console.log("[ROUTER DEBUG] 2. Creating query context")

		const rqContext = TanstackQuery.getContext()

		console.log("[ROUTER DEBUG] 3. Query context created", {
			hasQueryClient: Boolean(rqContext.queryClient),
			hasConvexQueryClient: Boolean(rqContext.convexQueryClient),
		})

		console.log("[ROUTER DEBUG] 4. Creating router")

		const router = createRouter({
			routeTree,
			defaultPreload: "intent",
			defaultErrorComponent: DefaultCatchBoundary,
			defaultNotFoundComponent: () => <NotFound />,
			scrollRestoration: true,
			context: {
				...rqContext,
			},
			rewrite: {
				input: ({ url }) => deLocalizeUrl(url),
				output: ({ url }) => localizeUrl(url),
			},
		})

		console.log("[ROUTER DEBUG] 5. Router created")

		console.log("[ROUTER DEBUG] 6. Setting up SSR Query integration")

		setupRouterSsrQueryIntegration({
			router,
			queryClient: rqContext.queryClient,
		})

		console.log("[ROUTER DEBUG] 7. SSR Query integration complete")

		if (!router.isServer) {
			console.log("[ROUTER DEBUG] 8. Initializing Sentry")

			Sentry.init({
				dsn: import.meta.env.VITE_SENTRY_DSN,
				integrations: [],
				tracesSampleRate: 1.0,
				sendDefaultPii: true,
			})
		}

		console.log("[ROUTER DEBUG] 9. Returning router")

		return router
	} catch (error) {
		console.error("[ROUTER DEBUG] FAILED:", error)

		if (error instanceof Error) {
			console.error("[ROUTER DEBUG] Message:", error.message)
			console.error("[ROUTER DEBUG] Stack:", error.stack)
		}

		throw error
	}
}

