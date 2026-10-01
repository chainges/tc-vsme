import VolunteerBadge from "./VolunteerBadge"

export default function VolunteerSection({
	title,
	subtitle,
	children,
}: {
	title: string
	subtitle: string
	children: React.ReactNode
}) {
	return (
		<div className='rounded-md border border-volunteer/25 bg-volunteer-soft/35 p-4 sm:p-5'>
			<div className='flex flex-wrap items-center justify-between gap-2 mb-6 border-b border-volunteer/20 pb-3'>
				<div>
					<h3 className='font-display text-lg'>{title}</h3>
					<p className='mt-1 text-xs text-muted-foreground'>{subtitle}</p>
				</div>
				<VolunteerBadge scope='section' />
			</div>
			{children}
		</div>
	)
}
