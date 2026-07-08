/**
 * Tests for HeaderButtons Component - Story 6: Header Conditional Rendering
 *
 * This test suite verifies that the HeaderButtons component renders the correct
 * buttons based on the user's authentication state and VSME permissions.
 *
 * Test Scenarios:
 * 1. Signed Out: Sign Up and Sign In buttons
 * 2. Signed In, no VSME: Get started link and UserButton
 * 3. Has VSME, no org/db: Setup Organization link and UserButton
 * 4. Full Access: Dashboard button and UserButton
 */

import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { HeaderButtons } from '../HeaderButtons'

const { useUser, useOrganization, useAuth } = vi.hoisted(() => ({
	useUser: vi.fn(),
	useOrganization: vi.fn(),
	useAuth: vi.fn(),
}))

// Mock Clerk - HeaderButtons imports everything from @clerk/tanstack-react-start
vi.mock('@clerk/tanstack-react-start', () => ({
	useUser,
	useOrganization,
	useAuth,
	SignUpButton: ({ children }: { children: React.ReactNode }) => (
		<span data-testid="sign-up-button">{children}</span>
	),
	SignInButton: ({ children }: { children: React.ReactNode }) => (
		<span data-testid="sign-in-button">{children}</span>
	),
	UserButton: () => <div data-testid="user-button">UserButton</div>,
	// Mirrors the real <Show/>: renders children when `when` matches the
	// mocked auth state, renders nothing while auth is loading.
	Show: ({
		when,
		children,
	}: {
		when: string
		children: React.ReactNode
	}) => {
		const { isLoaded, isSignedIn } = useAuth()
		if (!isLoaded) return null
		if (when === 'signed-in' && isSignedIn) {
			return <div data-testid="signed-in">{children}</div>
		}
		if (when === 'signed-out' && !isSignedIn) {
			return <div data-testid="signed-out">{children}</div>
		}
		return null
	},
}))

// Mock TanStack Router
vi.mock('@tanstack/react-router', () => ({
	Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
		<a href={to}>{children}</a>
	),
}))

// Mock LanguageSwitcher and ThemeSwitcher - irrelevant to HeaderButtons'
// own conditional rendering logic, and ThemeSwitcher needs window.matchMedia
// which jsdom doesn't implement.
vi.mock('../LanguageSwitcher', () => ({
	LanguageSwitcher: () => <div data-testid="language-switcher" />,
}))
vi.mock('../ThemeSwitcher', () => ({
	ThemeSwitcher: () => <div data-testid="theme-switcher" />,
}))

// Mock Button component
vi.mock('../ui/button', () => ({
	Button: ({
		children,
		asChild,
		...props
	}: {
		children: React.ReactNode
		asChild?: boolean
	}) => (
		<button data-testid="button" {...props}>
			{children}
		</button>
	),
}))

describe('HeaderButtons Component', () => {
	describe('Signed Out Users', () => {
		beforeEach(() => {
			useAuth.mockReturnValue({ isLoaded: true, isSignedIn: false })
			useUser.mockReturnValue({
				isLoaded: true,
				isSignedIn: false,
				user: null,
			})
			useOrganization.mockReturnValue({
				isLoaded: true,
				organization: null,
			})
		})

		it('renders Sign Up and Sign In buttons for signed-out users', () => {
			render(<HeaderButtons />)

			expect(screen.getByTestId('signed-out')).toBeInTheDocument()
			expect(screen.getByTestId('sign-up-button')).toBeInTheDocument()
			expect(screen.getByTestId('sign-in-button')).toBeInTheDocument()
		})

		it('does not render signed-in content for signed-out users', () => {
			render(<HeaderButtons />)

			expect(screen.queryByTestId('user-button')).not.toBeInTheDocument()
		})
	})

	describe('Signed In, No VSME Access', () => {
		beforeEach(() => {
			useAuth.mockReturnValue({ isLoaded: true, isSignedIn: true })
			useUser.mockReturnValue({
				isLoaded: true,
				isSignedIn: true,
				user: {
					id: 'user_123',
					publicMetadata: {}, // No hasVsme flag
				},
			})
			useOrganization.mockReturnValue({
				isLoaded: true,
				organization: null,
			})
		})

		it('renders "Get started!" link and UserButton', () => {
			render(<HeaderButtons />)

			expect(screen.getByTestId('signed-in')).toBeInTheDocument()
			expect(screen.getByText(/Get started!/)).toBeInTheDocument()
			expect(screen.getByTestId('user-button')).toBeInTheDocument()
		})

		it('does not render Setup Organization or Dashboard buttons', () => {
			render(<HeaderButtons />)

			expect(screen.queryByText('Setup Organization')).not.toBeInTheDocument()
			expect(screen.queryByText('Dashboard')).not.toBeInTheDocument()
		})
	})

	describe('Has VSME, No Org/DB', () => {
		beforeEach(() => {
			useAuth.mockReturnValue({ isLoaded: true, isSignedIn: true })
			useUser.mockReturnValue({
				isLoaded: true,
				isSignedIn: true,
				user: {
					id: 'user_123',
					publicMetadata: { hasVsme: true },
				},
			})
			useOrganization.mockReturnValue({
				isLoaded: true,
				organization: null,
			})
		})

		it('renders Setup Organization link and UserButton', () => {
			render(<HeaderButtons />)

			expect(screen.getByTestId('signed-in')).toBeInTheDocument()
			expect(screen.getByText('Setup Organization')).toBeInTheDocument()
			expect(screen.getByTestId('user-button')).toBeInTheDocument()
		})

		it('does not render "Get started!" or Dashboard buttons', () => {
			render(<HeaderButtons />)

			expect(screen.queryByText(/Get started!/)).not.toBeInTheDocument()
			expect(screen.queryByText('Dashboard')).not.toBeInTheDocument()
		})
	})

	describe('Full Access (orgHasVsme + vsmeDb)', () => {
		beforeEach(() => {
			useAuth.mockReturnValue({ isLoaded: true, isSignedIn: true })
			useUser.mockReturnValue({
				isLoaded: true,
				isSignedIn: true,
				user: {
					id: 'user_123',
					publicMetadata: { hasVsme: true },
				},
			})
			useOrganization.mockReturnValue({
				isLoaded: true,
				organization: {
					id: 'org_456',
					publicMetadata: { hasVsme: true, vsmeDb: true },
				},
			})
		})

		it('renders Dashboard button and UserButton', () => {
			render(<HeaderButtons />)

			expect(screen.getByTestId('signed-in')).toBeInTheDocument()
			expect(screen.getByText('Dashboard')).toBeInTheDocument()
			expect(screen.getByTestId('user-button')).toBeInTheDocument()
		})

		it('does not render "Get started!" or Setup Organization', () => {
			render(<HeaderButtons />)

			expect(screen.queryByText(/Get started!/)).not.toBeInTheDocument()
			expect(screen.queryByText('Setup Organization')).not.toBeInTheDocument()
		})
	})

	describe('Loading States', () => {
		it('renders neither signed-in nor signed-out content while auth is loading', () => {
			useAuth.mockReturnValue({ isLoaded: false, isSignedIn: false })
			useUser.mockReturnValue({
				isLoaded: false,
				isSignedIn: false,
				user: null,
			})
			useOrganization.mockReturnValue({
				isLoaded: true,
				organization: null,
			})

			render(<HeaderButtons />)

			expect(screen.queryByTestId('signed-out')).not.toBeInTheDocument()
			expect(screen.queryByTestId('signed-in')).not.toBeInTheDocument()
		})
	})
})
