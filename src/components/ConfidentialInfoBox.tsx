import { cva, type VariantProps } from "class-variance-authority"
import { Lock } from "lucide-react"
import { cn } from "@/lib/utils"
import { m } from "@/paraglide/messages"
import { Switch } from "./ui/switch"

const infoBoxVariants = cva("flex justify-between items-center p-5 rounded-2xl border", {
	variants: {
		variant: {
			basic: "",
			comprehensive: "",
		},
		confidential: {
			true: "",
			false: "bg-muted/45 border-border",
		},
	},
	defaultVariants: {
		variant: "basic",
		confidential: true,
	},
})

interface ConfidentialInfoBoxProps extends VariantProps<typeof infoBoxVariants> {
	handleChange: (value: boolean) => void
	value: boolean
	className?: string
}

export default function ConfidentialInfoBox({
	handleChange,
	value,
	variant = "basic",
	className,
}: ConfidentialInfoBoxProps) {
	return (
		<div
			className={cn(
				infoBoxVariants({
					variant,
					confidential: value,
				}),
				className,
			)}
		>
			<div>
				<div className='flex items-center text-md'>
					<Lock className='mr-2 h-5 w-5 text-confidential-text' />

					<h3 className='text-sm font-bold text-confidential-text'>{m["common.confidentialBoxTitle"]()}</h3>
				</div>

				<p className='mt-2 text-sm text-confidential-text'>{m["common.confidentialBoxDescription"]()}</p>
			</div>

			<div className='mr-4'>
				<Switch id='isB1Confidential' checked={value} onCheckedChange={handleChange} />
			</div>
		</div>
	)
}
