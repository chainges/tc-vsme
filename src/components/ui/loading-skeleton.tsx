import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

type LoadingSkeletonProps = {
	count?: number
	variant?: 'form' | 'cards' | 'readiness' | 'reports' | 'dashboard'
}

const DashboardSkeleton = () => {
	return(
		<div className="space-y-4 mt-10">

		<div className="grid grid-cols-4 gap-4">
			<Skeleton className='h-60 w-85' />
			<Skeleton className='h-60 w-85' />
			<Skeleton className='h-60 w-85' />
			<Skeleton className='h-60 w-85' />
		</div>

		<Skeleton className='h-100 w-2/5' />
		</div>
	)
}

export function LoadingSkeleton({ count = 1, variant = 'form' }: LoadingSkeletonProps) {
	return (
		<output
			aria-label='Loading'
			className={cn(
				variant === "cards" && "flex w-full flex-col gap-4 px-1 pb-8 pt-6",
				variant === "readiness" && "grid gap-3 px-4 pb-8 pt-7 sm:grid-cols-2 md:px-6 lg:px-8",
				variant === "form" && "space-y-4 py-4",
				variant === "dashboard" && "block",
				variant === "reports" && "block",
			)}
		>
			{variant === "dashboard" ? (
				<DashboardSkeleton />
			) : 
				
					Array.from({ length: count }, (_, index) => `loading-${index}`).map((item) => (
						<div key={item} data-loading-item>
							{variant === "form" ? (
								<div className='space-y-4'>
									<Skeleton className='h-5 w-1/3' />
									<Skeleton className='h-10 w-full' />
									<Skeleton className='h-5 w-1/4' />
									<Skeleton className='h-10 w-full' />
								</div>
							) : (
								<Skeleton
									className={cn(
										"w-full",
										variant === "reports" ? "mt-1 h-16 rounded-none border-b border-background" : "h-40",
									)}
								/>
							)}
						</div>
					))}
				
			
		</output>
	)
}