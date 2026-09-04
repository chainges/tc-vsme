import { createFileRoute } from '@tanstack/react-router'
import Header from '@/components/Header'
import HomeV1 from '@/routes/-home-v1'
import { AuthStatus } from '@/routes/index'

export const Route = createFileRoute('/home-1')({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<AuthStatus />
			<HomeV1 />
		</div>
	)
}
