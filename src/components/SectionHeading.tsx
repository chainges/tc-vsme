import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "./ui/badge"
import { Label } from "./ui/label"
import { Switch } from "./ui/switch"

interface SectionHeadingProps {
	title: string
	description?: string
	Icon: LucideIcon
	confidentialArea?: string
	confidentialAreas?: string[]
	onConfidentialChange?: (areas: string[]) => void
	disabled?: boolean
	isVolunteer?: boolean
}

const SectionHeading = ({
	title,
	description,
	Icon,
	confidentialArea,
	confidentialAreas = [],
	onConfidentialChange,
	disabled,
	isVolunteer=false
}: SectionHeadingProps) => {
	const isConfidential = confidentialArea !== undefined && confidentialAreas.includes(confidentialArea)

	const handleConfidentialChange = (checked: boolean) => {
		if (!confidentialArea || !onConfidentialChange) return

		const nextAreas = checked
			? [...new Set([...confidentialAreas, confidentialArea])]
			: confidentialAreas.filter((area) => area !== confidentialArea)

		onConfidentialChange(nextAreas)
	}

	return (
		<div
			className={cn(
				"mb-6 mt-8 flex flex-col justify-between gap-3 border-b border-border p-4 sm:flex-row sm:items-center"
			)}
		>
			<div className='flex items-center gap-3'>
				<div className='grid size-9 shrink-0 place-items-center rounded-md bg-primary/8 text-primary'>
					<Icon className='size-4' />
				</div>

				<div>
					<h2 className='font-display text-xl leading-none text-foreground'>{title}</h2>

					{description && <p className='mt-1.5 text-xs leading-5 text-muted-foreground'>{description}</p>}
				</div>
				{isVolunteer && <Badge variant='volunteer'>Volunteer</Badge>}
			</div>

			<div className='flex items-center'>
				<Label className='mr-4 text-sm text-muted-foreground'>This content is confidential?</Label>

				<Switch checked={isConfidential} onCheckedChange={handleConfidentialChange} disabled={disabled} />
			</div>
		</div>
	)
}

export default SectionHeading