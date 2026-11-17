import { useAuth } from '@clerk/tanstack-react-start'
import type { ConvexQueryClient } from '@convex-dev/react-query'
import { ConvexProviderWithClerk } from 'convex/react-clerk'

export default function AppConvexProvider({
	children,
	convexQueryClient,
}: {
	children: React.ReactNode
	convexQueryClient: ConvexQueryClient
}) {
	return (
		<ConvexProviderWithClerk
			client={convexQueryClient.convexClient}
			useAuth={useAuth}
		>
			{children}
		</ConvexProviderWithClerk>
	)
}
