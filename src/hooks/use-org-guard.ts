import { useAuth, useOrganization } from '@clerk/react'
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
 * const data = useQuery(api.some.query, skipQuery ? 'skip' : { args })
 * ```
 */
export function useOrgGuard() {
	const { organization, isLoaded: isOrgLoaded } = useOrganization()
	const {
		isLoaded: isClerkAuthLoaded,
		isSignedIn,
		orgId: authOrgId,
	} = useAuth()
	const { isAuthenticated, isLoading: isConvexAuthLoading } = useConvexAuth()

	const hasSelectedOrganization = !!organization
	const isOrgClaimSynced =
		!hasSelectedOrganization || organization.id === authOrgId

	// Ready when Clerk + Convex auth are loaded, org is selected,
	// and Clerk auth org claim is in sync with selected organization.
	const isReady =
		isClerkAuthLoaded &&
		isSignedIn &&
		isAuthenticated &&
		isOrgLoaded &&
		hasSelectedOrganization &&
		isOrgClaimSynced

	// Loading while auth is resolving or during org-switch token sync.
	const isLoading =
		isConvexAuthLoading ||
		!isClerkAuthLoaded ||
		!isOrgLoaded ||
		(hasSelectedOrganization && !isOrgClaimSynced)

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
