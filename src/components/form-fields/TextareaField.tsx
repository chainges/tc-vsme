import {
	Field,
	FieldDescription,
	FieldError,
	FieldLabel,
} from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'
import { useFieldContext } from '@/hooks/form-context'
import { cn } from '@/lib/utils'
import VolunteerBadge from '../VolunteerBadge'

interface TextareaFieldProps {
	label: string
	description?: string
	placeholder?: string
	disabled?: boolean
	rows?: number
	className?: string
	showVolunteerBadge?: boolean
}

export function TextareaField({
	label,
	description,
	placeholder,
	disabled,
	rows = 3,
	className,
	showVolunteerBadge=false,
}: TextareaFieldProps) {
	const field = useFieldContext<string>()
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

	return (
		<Field data-invalid={isInvalid}>
			<div className="flex items-center gap-2">
				<FieldLabel htmlFor={field.name}>{label}</FieldLabel>
				{showVolunteerBadge && <VolunteerBadge scope='field' />}
			</div>
			<Textarea
				id={field.name}
				name={field.name}
				value={field.state.value}
				onBlur={field.handleBlur}
				onChange={(e) => field.handleChange(e.target.value)}
				aria-invalid={isInvalid}
				placeholder={placeholder}
				disabled={disabled}
				rows={rows}
				className={cn(
					className,
					showVolunteerBadge &&
						"border-volunteer/20 bg-volunteer-soft/40 focus-visible:ring-volunteer",
				)}
			/>
			{description && <FieldDescription>{description}</FieldDescription>}
			{isInvalid && <FieldError errors={field.state.meta.errors} />}
		</Field>
	)
}
