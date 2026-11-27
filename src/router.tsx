import * as Sentry from '@sentry/tanstackstart-react'
import { createRouter } from '@tanstack/react-router'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'
import { DefaultCatchBoundary } from './components/DefaultCatchBoundary'
import { NotFound } from './components/NotFound'
import { LoadingSkeleton } from './components/ui/loading-skeleton'
import * as TanstackQuery from './integrations/tanstack-query/root-provider'
import { deLocalizeUrl, localizeUrl } from './paraglide/runtime'
// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance

export const getRouter = () => {
	try {
		const rqContext = TanstackQuery.getContext()

		const router = createRouter({
			routeTree,
			defaultPreload: "intent",
			defaultPendingMs: 0,
			defaultPendingComponent: () => (
				<LoadingSkeleton variant="cards" count={1} />
			),
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

		setupRouterSsrQueryIntegration({
			router,
			queryClient: rqContext.queryClient,
		})

		if (!router.isServer) {
			Sentry.init({
				dsn: import.meta.env.VITE_SENTRY_DSN,
				integrations: [],
				tracesSampleRate: 1.0,
				sendDefaultPii: true,
			})
		}

		return router
	} catch (error) {
		throw error
	}
}

