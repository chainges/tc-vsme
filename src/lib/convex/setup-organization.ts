import { auth, clerkClient } from '@clerk/tanstack-react-start/server'
import { createServerFn } from '@tanstack/react-start'
import { ConvexHttpClient } from 'convex/browser'
import { api } from '../../../convex/_generated/api'

const CONVEX_URL = import.meta.env.VITE_CONVEX_URL
if (!CONVEX_URL) {
	throw new Error('VITE_CONVEX_URL is not set')
}

interface SetupOrganizationResult {
	success: boolean
	error?: string
}

/**
 * Server function to set up organization in Convex and update Clerk metadata.
 * Called when user creates/selects an organization.
 */
export const setupOrganization = createServerFn({ method: 'POST' })
	// Validate input data DO NOT CHANGE to 'validator' as it breaks the type inference
	.inputValidator(
		(data: {
			orgId: string
			orgName: string
			orgSlug: string
			userEmail: string
			userFirstName?: string
			userLastName?: string
			userName?: string
			orgNumber?: string
			address?: {
				street?: string[]
				postalCode?: string
				city?: string
				country?: string
				countryCode?: string
			}
			orgForm?: string
			website?: string
			naceCode?: string
			industry?: string
			numberEmployees?: number
			productsAndServices?: string
			markets?: string
			businessRelationships?: string
			sustainabilityStrategy?: string
		}) => data,
	)
	.handler(async ({ data }): Promise<SetupOrganizationResult> => {
		try {
			// Get authenticated user
			const { userId, orgId } = await auth()

			if (!userId) {
				return { success: false, error: 'Not authenticated' }
			}

			// Check if authorized (Active in session OR Admin of target org)
			let isAuthorized = false
			if (orgId === data.orgId) {
				isAuthorized = true
			} else {
				// Fallback: Verify via Clerk if user is a member/admin of the target org
				try {
					const client = await clerkClient()
					const memberships = await client.users.getOrganizationMembershipList({
						userId,
						limit: 100,
					})
					const membership = memberships.data.find(
						(m) => m.organization.id === data.orgId,
					)

					// Allow if user is an admin of the organization
					if (membership && membership.role === 'org:admin') {
						isAuthorized = true
					}
				} catch (error) {
					console.error('Failed to verify membership:', error)
				}
			}

			if (!isAuthorized) {
				console.error('Auth Check Failed', {
					sessionOrgId: orgId,
					targetOrgId: data.orgId,
				})
				return {
					success: false,
					error: 'Organization mismatch or insufficient permissions',
				}
			}

			// Get Clerk client (only needed for metadata updates)
			const client = await clerkClient()

			// Initialize Convex client (server-side)
			const convex = new ConvexHttpClient(CONVEX_URL)

			// Set auth token if available to act as the user
			try {
				// @ts-expect-error - auth() returns different types in different environments, but getToken exists
				const { getToken } = await auth()
				const token = await getToken({ template: 'convex' })
				if (token) {
					convex.setAuth(token)
				}
			} catch (err: any) {
				if (
					err?.name === 'ClerkOfflineError' ||
					err?.message?.includes('clerk_runtime_not_browser')
				) {
					console.warn(
						'Failed to set auth token for Convex:',
						err.name || 'Runtime not browser',
					)
				} else {
					console.warn('Failed to set auth token for Convex:', err)
				}
			}

			// Step 1: Upsert organization in Convex (create or update with correct data)
			await convex.mutation(api.organizations.upsertOrganization, {
				clerkOrgId: data.orgId,
				name: data.orgName,
				slug: data.orgSlug,
				orgNumber: data.orgNumber,
				address: data.address,
				orgForm: data.orgForm,
				website: data.website,
				naceCode: data.naceCode,
				industry: data.industry,
				numberEmployees: data.numberEmployees,
				productsAndServices: data.productsAndServices,
				markets: data.markets,
				businessRelationships: data.businessRelationships,
				sustainabilityStrategy: data.sustainabilityStrategy,
				hasVsme: true,
			})

			// Step 2: Upsert user in Convex
			await convex.mutation(api.users.upsertUser, {
				clerkId: userId,
				email: data.userEmail,
				firstName: data.userFirstName,
				lastName: data.userLastName,
				username: data.userName,
				organizationId: data.orgId,
				hasVsme: false,
			})

			// Step 3: Update Clerk organization metadata
			await client.organizations.updateOrganizationMetadata(data.orgId, {
				publicMetadata: {
					hasVsme: true,
					vsmeDb: true,
				},
			})

			// Step 4: Update user metadata to disable further org creation
			await client.users.updateUserMetadata(userId, {
				publicMetadata: {
					hasVsme: false,
				},
			})

			return { success: true }
		} catch (error: unknown) {
			console.error('Setup organization error:', error)
			const message =
				error instanceof Error ? error.message : 'Failed to set up organization'
			return {
				success: false,
				error: message,
			}
		}
	})

/**
 * Register the user's active Clerk organization in Convex.
 *
 * Use this when a user is already a member of an existing Clerk organization
 * (e.g. an admin invited them and set `publicMetadata.hasVsme = true`) but the
 * org has not yet been set up in the Convex database.
 *
 * Unlike `setupOrganization`, this does NOT create a new Clerk organization. It
 * reads the active organization's trusted data — name, slug, and the registration
 * number — directly from Clerk metadata. This guarantees that only the currently
 * active organization is registered and that the registration number is
 * authoritative rather than client-supplied.
 *
 * Prerequisite: the Clerk organization must have `publicMetadata.registrationNumber`
 * set (the organisasjonsnummer). The admin adds this at the same time as `hasVsme`.
 */
export const registerActiveOrganization = createServerFn({
	method: 'POST',
}).handler(async (): Promise<SetupOrganizationResult> => {
	try {
		const { userId, orgId } = await auth()

		if (!userId) {
			return { success: false, error: 'Not authenticated' }
		}

		if (!orgId) {
			return {
				success: false,
				error: 'No active organization. Please select your organization first.',
			}
		}

		const client = await clerkClient()

		// Read trusted organization data from Clerk metadata
		const org = await client.organizations.getOrganization({
			organizationId: orgId,
		})

		const registrationNumber = org.publicMetadata?.registrationNumber
		if (typeof registrationNumber !== 'string' || !registrationNumber.trim()) {
			return {
				success: false,
				error:
					'Registration number is not set on the organization. An admin must add publicMetadata.registrationNumber before registering.',
			}
		}

		// Read user data from Clerk so nothing trust-sensitive comes from the client
		const user = await client.users.getUser(userId)

		// Initialize Convex client (server-side)
		const convex = new ConvexHttpClient(CONVEX_URL)

		// Set auth token if available to act as the user
		try {
			// @ts-expect-error - auth() returns different types in different environments, but getToken exists
			const { getToken } = await auth()
			const token = await getToken({ template: 'convex' })
			if (token) {
				convex.setAuth(token)
			}
		} catch (err: any) {
			if (
				err?.name === 'ClerkOfflineError' ||
				err?.message?.includes('clerk_runtime_not_browser')
			) {
				console.warn(
					'Failed to set auth token for Convex:',
					err.name || 'Runtime not browser',
				)
			} else {
				console.warn('Failed to set auth token for Convex:', err)
			}
		}

		// Step 1: Upsert organization in Convex with the trusted registration number
		await convex.mutation(api.organizations.upsertOrganization, {
			clerkOrgId: orgId,
			name: org.name,
			slug: org.slug || org.name,
			orgNumber: registrationNumber,
			hasVsme: true,
		})

		// Step 2: Upsert user in Convex (link to the active org)
		await convex.mutation(api.users.upsertUser, {
			clerkId: userId,
			email: user.emailAddresses[0]?.emailAddress || '',
			firstName: user.firstName || undefined,
			lastName: user.lastName || undefined,
			username: user.username || undefined,
			organizationId: orgId,
			hasVsme: false,
		})

		// Step 3: Mark the Clerk organization as set up in the database
		await client.organizations.updateOrganizationMetadata(orgId, {
			publicMetadata: {
				hasVsme: true,
				vsmeDb: true,
			},
		})

		// Step 4: Disable further org creation for this user
		await client.users.updateUserMetadata(userId, {
			publicMetadata: {
				hasVsme: false,
			},
		})

		return { success: true }
	} catch (error: unknown) {
		console.error('Register active organization error:', error)
		const message =
			error instanceof Error ? error.message : 'Failed to register organization'
		return {
			success: false,
			error: message,
		}
	}
})
