import { renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const organizationState = vi.hoisted(() => ({
  organization: null as { id: string } | null,
  isLoaded: false,
}))

const convexAuthState = vi.hoisted(() => ({
  isAuthenticated: false,
  isLoading: true,
}))

vi.mock('@clerk/react', () => ({
  useOrganization: () => organizationState,
}))

vi.mock('convex/react', () => ({
  useConvexAuth: () => convexAuthState,
}))

import { useOrgGuard } from '../use-org-guard'

describe('useOrgGuard', () => {
  beforeEach(() => {
    organizationState.organization = null
    organizationState.isLoaded = false
    convexAuthState.isAuthenticated = false
    convexAuthState.isLoading = true
  })

  it('reports loading until Clerk and Convex auth both have a ready organization', () => {
    organizationState.organization = { id: 'org_123' }
    organizationState.isLoaded = true
    convexAuthState.isAuthenticated = false
    convexAuthState.isLoading = false

    const { result } = renderHook(() => useOrgGuard())

    expect(result.current.isReady).toBe(false)
    expect(result.current.isLoading).toBe(true)
    expect(result.current.skipQuery).toBe('skip')
  })

  it('allows queries only after organization and Convex auth are ready', () => {
    organizationState.organization = { id: 'org_123' }
    organizationState.isLoaded = true
    convexAuthState.isAuthenticated = true
    convexAuthState.isLoading = false

    const { result } = renderHook(() => useOrgGuard())

    expect(result.current.isReady).toBe(true)
    expect(result.current.isLoading).toBe(false)
    expect(result.current.skipQuery).toBeUndefined()
  })
})
