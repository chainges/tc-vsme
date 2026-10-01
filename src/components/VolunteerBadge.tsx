import { Leaf } from "lucide-react"
import { Badge } from "./ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"

function VolunteerBadge({ scope = "field" }: { scope?: "field" | "section" }) {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Badge variant='outline' className='gap-1 border-volunteer/30 bg-volunteer-soft text-volunteer shadow-none'>
					<Leaf className='size-3' /> Volunteer
				</Badge>
			</TooltipTrigger>
			<TooltipContent>
				{scope === "section" ? "This section is optional to report." : "This field is optional to report."}
			</TooltipContent>
		</Tooltip>
	)
}

export default VolunteerBadge
