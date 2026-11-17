import { Skeleton } from '@/components/ui/skeleton'

type LoadingSkeletonProps = {
	count?: number
	variant?: 'form' | 'cards' | 'readiness' | 'reports'
}

export function LoadingSkeleton({ count = 1, variant = 'form' }: LoadingSkeletonProps) {
	return (
		<output
			aria-label='Loading'
			className={
				variant === 'cards'
					? 'flex w-full flex-col gap-4 px-4 pb-8 pt-7 md:px-6 lg:px-8'
					: variant === 'readiness'
						? 'grid gap-3 px-4 pb-8 pt-7 sm:grid-cols-2 md:px-6 lg:px-8'
						: variant === 'form'
							? 'space-y-4 py-4'
							: 'block'
			}
		>
			{Array.from({ length: count }, (_, index) => `loading-${index}`).map((item) => (
				<div key={item} data-loading-item>
					{variant === 'form' ? (
						<div className='space-y-4'>
							<Skeleton className='h-5 w-1/3' />
							<Skeleton className='h-10 w-full' />
							<Skeleton className='h-5 w-1/4' />
							<Skeleton className='h-10 w-full' />
						</div>
					) : (
						<Skeleton className={variant === 'readiness' ? 'h-40 w-full' : variant === 'reports' ? 'h-16 w-full rounded-none border-b border-background' : 'h-40 w-full'} />
					)}
				</div>
			))}
		</output>
	)
}