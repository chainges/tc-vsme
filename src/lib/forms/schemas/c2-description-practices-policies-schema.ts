import { z } from 'zod'

export const c2DescriptionPracticesPoliciesSchema = z.object({
	reportingYear: z.string().regex(/^\d{4}$/, 'Year must be 4 digits'),
	c2_sustainability_practice_description: z
		.string()
		.min(1, 'This field is required'),
	c2_monitoring_targets_description: z
		.string()
		.min(1, 'This field is required'),
    // this field is optional
	c2_accountable_role_or_person: z.string().optional(),
	confidentialAreas: z.array(z.string()).default([]),
})

export type C2DescriptionPracticesPoliciesFormValues = z.infer<
    typeof c2DescriptionPracticesPoliciesSchema
>