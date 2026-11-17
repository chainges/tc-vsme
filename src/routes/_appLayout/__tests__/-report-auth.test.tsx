import { QueryClientProvider } from '@tanstack/react-query'
import { act, cleanup, render, waitFor } from '@testing-library/react'
import { useConvexAuth } from 'convex/react'
import { afterEach, expect, it, vi } from 'vitest'
import { getContext } from '@/integrations/tanstack-query/root-provider'
import { reportStore } from '@/lib/report/report-store'
import { Route } from '../route'

vi.mock('convex/react', async (importOriginal) => ({
	...await importOriginal<typeof import('convex/react')>(),
	useConvexAuth: vi.fn(),
}))
vi.mock('@/components/app-sidebar', () => ({ AppSidebar: () => null }))
vi.mock('@/components/LanguageSwitcher', () => ({ LanguageSwitcher: () => null }))
vi.mock('@/components/ThemeSwitcher', () => ({ ThemeSwitcher: () => null }))
vi.mock('@/components/XbrlGenerationProgress', () => ({ default: () => null }))
vi.mock('@/components/ui/sidebar', () => ({
	SidebarProvider: () => null,
	SidebarInset: () => null,
	SidebarTrigger: () => null,
}))

afterEach(() => {
	cleanup()
	reportStore.setState(() => ({ reportId: null }))
	vi.restoreAllMocks()
})

it('subscribes to the report only after Convex authentication is ready', async () => {
	const { queryClient, convexQueryClient } = getContext()
	const unsubscribe = vi.fn()
	const watch = vi.spyOn(convexQueryClient.convexClient, 'watchQuery').mockReturnValue({
		onUpdate: () => unsubscribe,
		localQueryResult: () => undefined,
	} as never)
	vi.spyOn(convexQueryClient.convexClient, 'query').mockResolvedValue(null)
	vi.spyOn(Route, 'useRouteContext').mockReturnValue({ authContext: {} } as never)
	vi.mocked(useConvexAuth).mockReturnValue({ isLoading: true, isAuthenticated: false })
	reportStore.setState(() => ({ reportId: 'report-id' }))
	const Component = Route.options.component
	if (!Component) throw new Error('Missing layout component')
	const view = render(<QueryClientProvider client={queryClient}><Component /></QueryClientProvider>)

	expect(watch).not.toHaveBeenCalled()
	vi.mocked(useConvexAuth).mockReturnValue({ isLoading: false, isAuthenticated: true })
	view.rerender(<QueryClientProvider client={queryClient}><Component /></QueryClientProvider>)
	await waitFor(() => expect(watch).toHaveBeenCalledTimes(1))
	vi.mocked(useConvexAuth).mockReturnValue({ isLoading: false, isAuthenticated: false })
	view.rerender(<QueryClientProvider client={queryClient}><Component /></QueryClientProvider>)
	await waitFor(() => expect(unsubscribe).toHaveBeenCalledTimes(1))
	vi.mocked(useConvexAuth).mockReturnValue({ isLoading: false, isAuthenticated: true })
	view.rerender(<QueryClientProvider client={queryClient}><Component /></QueryClientProvider>)
	await waitFor(() => expect(watch).toHaveBeenCalledTimes(2))
	act(() => reportStore.setState(() => ({ reportId: null })))
	await waitFor(() => expect(unsubscribe).toHaveBeenCalledTimes(2))
	view.unmount()
	queryClient.clear()
})