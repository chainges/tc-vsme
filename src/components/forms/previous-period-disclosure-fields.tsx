import { ClipboardList, Table2, Trash2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { SECTIONS } from '@/data/BASICDATA'

interface PreviousPeriodDisclosureFieldsProps {
	containsPreviousPeriodDisclosures: boolean
	sectionsThatHasNotChanged: string[]
	linkOfPreviousReport: string
	disabled?: boolean
	onContainsPreviousPeriodDisclosuresChange: (value: boolean) => void
	onSectionsChange: (values: string[]) => void
	onLinkChange: (value: string) => void
}

export function PreviousPeriodDisclosureFields({
	containsPreviousPeriodDisclosures,
	sectionsThatHasNotChanged,
	linkOfPreviousReport,
	disabled = false,
	onContainsPreviousPeriodDisclosuresChange,
	onSectionsChange,
	onLinkChange,
}: PreviousPeriodDisclosureFieldsProps) {
	const toggleSection = (value: string, checked: boolean) => {
		const nextValues = checked
			? [...sectionsThatHasNotChanged, value]
			: sectionsThatHasNotChanged.filter((section) => section !== value)

		onSectionsChange(nextValues)
	}

	const clearSelections = () => onSectionsChange([])

	return (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<div className="flex items-start justify-between gap-4">
						<div className="space-y-1">
							<CardTitle className="text-base">
								Previous reporting period disclosures
							</CardTitle>
							<CardDescription>
								Identify disclosures that remain unchanged from the previous
								report.
							</CardDescription>
						</div>
						<Switch
							id="contains-previous-period-disclosures"
							checked={containsPreviousPeriodDisclosures}
							disabled={disabled}
							onCheckedChange={(checked) => {
								onContainsPreviousPeriodDisclosuresChange(checked)
								if (!checked) {
									onSectionsChange([])
									onLinkChange('')
								}
							}}
						/>
					</div>
					<label
						className="cursor-pointer text-sm leading-relaxed text-muted-foreground"
						htmlFor="contains-previous-period-disclosures"
					>
						This report contains disclosures from the previous reporting period
						that remain unchanged.
					</label>
				</CardHeader>
			</Card>

			{containsPreviousPeriodDisclosures && (
				<>
					<Card>
						<CardHeader className="pb-3">
							<div className="flex items-center justify-between gap-3">
								<CardTitle className="flex items-center gap-2.5 text-lg font-semibold tracking-tight">
									<Table2 className="size-5 shrink-0 text-blue-600" />
									Selected Sections
								</CardTitle>
								{sectionsThatHasNotChanged.length > 0 && (
									<Button
										variant="ghost"
										size="sm"
										disabled={disabled}
										onClick={clearSelections}
										className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-destructive"
									>
										<Trash2 className="size-3.5" />
										Clear all
									</Button>
								)}
							</div>
							<CardDescription>
								Choose the sections whose disclosures have not changed.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="overflow-hidden rounded-xl border">
								<Table>
									<TableHeader>
										<TableRow className="bg-muted/50">
											<TableHead className="w-12" />
											<TableHead className="w-20">Module</TableHead>
											<TableHead>Section</TableHead>
											<TableHead className="hidden md:table-cell">
												XBRL member value
											</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{SECTIONS.map((section) => {
											const isSelected = sectionsThatHasNotChanged.includes(
												section.value,
											)

											return (
												<TableRow key={section.value}>
													<TableCell>
														<Checkbox
															checked={isSelected}
															disabled={disabled}
															onCheckedChange={(checked) =>
																toggleSection(section.value, checked === true)
															}
															aria-label={`Select ${section.module}`}
														/>
													</TableCell>
													<TableCell>
														<Badge variant="outline">{section.module}</Badge>
													</TableCell>
													<TableCell className="max-w-md text-sm font-medium">
														{section.title}
													</TableCell>
													<TableCell className="hidden max-w-xs md:table-cell">
														<code className="block truncate text-xs text-muted-foreground">
															{section.value}
														</code>
													</TableCell>
												</TableRow>
											)
										})}
									</TableBody>
								</Table>
							</div>
							{sectionsThatHasNotChanged.length === 0 && (
								<div className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-dashed px-6 py-5 text-center text-sm text-muted-foreground">
									<ClipboardList className="size-5 text-blue-300" />
									No sections selected yet
								</div>
							)}
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="text-base">
								Link to Previous Report
							</CardTitle>
							<CardDescription>
								Add a link to the previous reporting period report.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Input
								id="link-of-previous-report"
								value={linkOfPreviousReport}
								disabled={disabled}
								onChange={(event) => onLinkChange(event.target.value)}
								placeholder="https://..."
							/>
						</CardContent>
					</Card>
				</>
			)}
		</div>
	)
}
