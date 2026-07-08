/**
 * Emissions Action Test
 *
 * Tests for the getEmissionsByOrgId action that fetches emissions data
 * from MongoDB with authentication and authorization. The org is derived
 * solely from the caller's JWT (`org_id` claim) - it is never accepted as
 * an argument, so there is no client-controllable way to read another
 * organization's data.
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { convexTest } from 'convex-test'
import { api } from '../_generated/api'
import schema from '../schema'
import { modules } from '../test.setup'

describe('Emissions Action', () => {
  let t: ReturnType<typeof convexTest>
  const ORG_A = 'org_a_123'

  beforeEach(() => {
    t = convexTest(schema, modules)
  })

  afterEach(async () => {
    // Clean up MongoDB connections
    try {
      const { closeMongoClient } = await import('../mongodb/client')
      await closeMongoClient()
    } catch (error) {
      // Ignore if module doesn't exist
    }
  })

  it('should export getEmissionsByOrgId action', async () => {
    expect(api.emissions.getEmissionsByOrgId).toBeDefined()
  })

  it('should require authentication', async () => {
    await expect(
      t.action(api.emissions.getEmissionsByOrgId, {})
    ).rejects.toThrow('Unauthorized')
  })

  it('should require an organization to be selected', async () => {
    // Authenticated but no org_id claim on the identity
    await expect(
      t.withIdentity({ subject: 'user_123' }).action(
        api.emissions.getEmissionsByOrgId,
        {}
      )
    ).rejects.toThrow('Organization must be selected')
  })

  it('should reject a client-supplied org id argument', async () => {
    // orgIdToUse is not part of the args validator anymore - passing it
    // must fail rather than silently being accepted.
    await expect(
      t.withIdentity({ subject: 'user_123', org_id: ORG_A }).action(
        api.emissions.getEmissionsByOrgId,
        // @ts-expect-error orgIdToUse was removed from the args validator
        { orgIdToUse: 'org_b_456' }
      )
    ).rejects.toThrow()
  })

  it("should resolve the org number from the caller's own JWT org", async () => {
    await t.run(async (ctx) => {
      await ctx.db.insert('organizations', {
        clerkOrgId: ORG_A,
        name: 'Org A',
        slug: 'org-a',
        orgNumber: '999999999',
      })
    })

    const result = await t
      .withIdentity({ subject: 'user_123', org_id: ORG_A })
      .action(api.emissions.getEmissionsByOrgId, {})

    // orgNumber for ORG_A was found via the JWT's org_id, so the action
    // should proceed past the "Organization not found" short-circuit.
    expect(result).toBeDefined()
    expect(result.error).not.toBe('Organization not found')
  })

  it('should not find an org number for an org that has no matching record', async () => {
    const result = await t
      .withIdentity({ subject: 'user_123', org_id: 'org_with_no_record' })
      .action(api.emissions.getEmissionsByOrgId, {})

    expect(result).toEqual({ success: false, error: 'Organization not found' })
  })

  it('should support optional year parameter', async () => {
    const result = await t
      .withIdentity({ subject: 'user_123', org_id: ORG_A })
      .action(api.emissions.getEmissionsByOrgId, { year: 2024 })

    expect(result).toBeDefined()
  })
})
