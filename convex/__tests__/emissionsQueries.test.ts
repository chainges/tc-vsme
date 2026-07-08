/**
 * emissionsQueries.getOrgNumberByClerkOrgId is a server-only lookup used by
 * emissions.getEmissionsByOrgId to map the caller's own (JWT-derived) Clerk
 * org id to a Norwegian org number. It must never be reachable from a
 * client - it takes an arbitrary clerkOrgId with no auth check, so exposing
 * it publicly would let any client enumerate other orgs' numbers.
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { convexTest } from 'convex-test'
import { api, internal } from '../_generated/api'
import schema from '../schema'
import { modules } from '../test.setup'

// `api` and `internal` are the same runtime proxy (`anyApi`) - Convex only
// distinguishes public vs. internal functions via the *type* of `api`
// (generated from each function's `query`/`internalQuery` registration),
// enforced by the real deployment when dispatching a client call. So the
// regression check for "not client-reachable" has to be a type-level one:
// if this function is ever changed back to a public `query`, the line
// below starts type-checking and `@ts-expect-error` fails the build.
it('type-check: getOrgNumberByClerkOrgId is not on the public api surface', () => {
  // @ts-expect-error getOrgNumberByClerkOrgId must stay an internalQuery
  expect(api.emissionsQueries.getOrgNumberByClerkOrgId).toBeDefined()
})

describe('getOrgNumberByClerkOrgId', () => {
  let t: ReturnType<typeof convexTest>

  beforeEach(() => {
    t = convexTest(schema, modules)
  })

  it('is callable internally and resolves the matching org', async () => {
    await t.run(async (ctx) => {
      await ctx.db.insert('organizations', {
        clerkOrgId: 'org_a_123',
        name: 'Org A',
        slug: 'org-a',
        orgNumber: '999999999',
      })
    })

    const orgNumber = await t.query(internal.emissionsQueries.getOrgNumberByClerkOrgId, {
      clerkOrgId: 'org_a_123',
    })

    expect(orgNumber).toBe('999999999')
  })

  it('returns null for a clerkOrgId with no matching organization', async () => {
    const orgNumber = await t.query(internal.emissionsQueries.getOrgNumberByClerkOrgId, {
      clerkOrgId: 'org_unknown',
    })

    expect(orgNumber).toBeNull()
  })
})
