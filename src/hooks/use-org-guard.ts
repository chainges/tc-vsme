import { useOrganization } from "@clerk/react"
import { useConvexAuth } from 'convex/react'

/**
 * Organization Loading Guard Hook
 *
 * Prevents race conditions during organization switching by ensuring both:
 * 1. Clerk's organization context is loaded
 * 2. Convex authentication is ready with updated JWT
 *
 * Usage:
 * ```typescript
 * const { skipQuery } = useOrgGuard()
 * const data = useQuery(api.some.query, skipQuery || { args })
 * ```
 */
export function useOrgGuard() {
	const { organization, isLoaded: isOrgLoaded } = useOrganization()
	const { isAuthenticated, isLoading: isAuthLoading } = useConvexAuth()

	// Ready when authenticated, org is loaded, and org exists
	const isReady = isAuthenticated && isOrgLoaded && !!organization

	// Loading until every required state is settled. Clerk may report its
	// organization as loaded while Convex auth is still attaching the new JWT.
	const isLoading = isAuthLoading || !isOrgLoaded || !isAuthenticated || !organization

	return {
		/** True when safe to make queries requiring orgId */
		isReady,
		/** True during initial load or org switching */
		isLoading,
		/** The current organization object (may be null during switching) */
		organization,
		/** Use with useQuery to skip queries when not ready */
		skipQuery: !isReady ? ('skip' as const) : undefined,
	}
}
