import { Lock } from "lucide-react"
import { m } from "@/paraglide/messages"
import { Switch } from "./ui/switch"

interface ConfidentialInfoBoxProps {
	handleChange: (value: boolean) => void
	value: boolean
	className?: string
}

export default function ConfidentialInfoBox({
	handleChange,
	value,
}: ConfidentialInfoBoxProps) {
	return (
		<div
			className="flex justify-between items-center bg-success/[0.04] border-success/35 p-5 rounded-2xl border"
		>
			<div>
				<div className='flex items-center text-md'>
					<Lock className='mr-2 h-5 w-5 text-confidential-text dark:text-success' />

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
