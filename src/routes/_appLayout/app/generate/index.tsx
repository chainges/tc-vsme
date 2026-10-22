import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Building2,
  CheckCircle2,
  Circle,
  CircleDollarSign,
  CloudRain,
  Compass,
  Droplets,
  Factory,
  FileCode2,
  FileText,
  Gavel,
  Handshake,
  HeartPulse,
  Info,
  Leaf,
  LockKeyhole,
  type LucideIcon,
  NotebookPen,
  Pencil,
  Recycle,
  Scale,
  ShieldAlert,
  ShieldCheck,
  Target,
  TreePine,
  UserPlus,
  Users,
  UsersRound,
  Wind,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { areaIsFilled, canGenerateReport, INFORMATION_AREAS, type ReportInformation } from "@/lib/report-readiness";

const icons = [Building2, Leaf, Users, ShieldCheck];

const MODULE_ICONS: Record<string, LucideIcon> = {
  B1: FileText,
  B2: BookOpen,
  B3: Factory,
  B4: Wind,
  B5: TreePine,
  B6: Droplets,
  B7: Recycle,
  B8: Users,
  B9: HeartPulse,
  B10: Handshake,
  B11: Gavel,
  C1: Compass,
  C2: NotebookPen,
  C3: Target,
  C4: CloudRain,
  C5: UserPlus,
  C6: Scale,
  C7: ShieldAlert,
  C8: CircleDollarSign,
  C9: UsersRound,
};

export const Route = createFileRoute("/_appLayout/app/generate/")({
  component: ReportReadiness,
})

function ReportReadiness() {
  const [values, setValues] = useState<ReportInformation>({});
  const [editing, setEditing] = useState<string | null>(null);
  const active = INFORMATION_AREAS.find((area) => area.id === editing);
  const completed = INFORMATION_AREAS.filter((area) => areaIsFilled(area, values)).length;
  const ready = canGenerateReport(values);

  return (
		<section className='mt-8 border-t border-border pt-7' aria-labelledby='readiness-title'>
			{/* Report readiness section */}
			<div className='flex flex-wrap items-center justify-between gap-3'>
				<h2 id='readiness-title' className='flex items-center gap-2 text-lg font-semibold text-foreground'>
					<FileCode2 className='size-5 text-info' />
					Report readiness
				</h2>
				<span className={ready ? "text-sm font-medium text-success" : "text-sm text-muted-foreground"}>
					{completed} of 4 filled
				</span>
			</div>
			{/* //   <p className="mt-2 text-sm text-muted-foreground">Please fill as much information as possible.</p> */}
			<div className='mt-5 grid gap-3 sm:grid-cols-2'>
				{INFORMATION_AREAS.map((area, index) => {
					const filled = areaIsFilled(area, values)
					const AreaIcon = icons[index] ?? Info
					const filledCount = area.modules.filter((module) => Boolean(values[module]?.trim())).length
					return (
						<Card
							key={area.id}
							className={`flex min-w-0 flex-col border shadow-xs transition-all duration-150 ${filled ? "border-success/35 bg-success/[0.04]" : "border-blue-100 bg-white dark:border-blue-950 dark:bg-card"}`}
						>
							<CardHeader className='flex flex-row items-center justify-between gap-2 space-y-0 p-4'>
								<div className='flex min-w-0 items-center gap-2.5'>
									<span
										className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${filled ? "bg-success/10 text-success" : "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400"}`}
									>
										<AreaIcon className='size-4.5' />
									</span>
									<div className='min-w-0'>
										<CardTitle className='truncate text-sm leading-tight text-slate-900 dark:text-slate-100'>
											{area.title}
										</CardTitle>
										<CardDescription className={`mt-1 text-xs ${filled ? "text-success" : "text-muted-foreground"}`}>
											{filledCount} of {area.modules.length} modules filled
										</CardDescription>
									</div>
								</div>
								{filled ? (
									<CheckCircle2 className='size-5 shrink-0 text-success' />
								) : (
									<Circle className='size-5 shrink-0 text-blue-200 dark:text-blue-900' />
								)}
							</CardHeader>
							<CardContent className='flex flex-wrap gap-1.5 p-4 pt-3'>
								{area.modules.map((module) => {
									const moduleFilled = Boolean(values[module]?.trim())
									const ModuleIcon = MODULE_ICONS[module] ?? FileText
									const title = area.fields.find((field) => field.id === module)?.label ?? module
									return (
										<button
											key={module}
											type='button'
											title={title}
											aria-label={`${module} — ${moduleFilled ? "filled" : "not filled"}: ${title}. Open editor.`}
											
											className={`group flex cursor-pointer items-center gap-1.5 rounded-lg border px-2 py-1 text-xs font-semibold transition-all duration-150 focus-visible:ring-2 focus-visible:ring-info/50 focus-visible:outline-none ${
												moduleFilled
													? "border-success/40 bg-success/10 text-success hover:border-success/60 hover:bg-success/15"
													: "border-blue-100 bg-background text-slate-500 hover:border-blue-300 hover:text-blue-600 dark:border-blue-950 dark:bg-card dark:text-slate-400 dark:hover:border-blue-800 dark:hover:text-blue-400"
											}`}
										>
											<ModuleIcon
												className={`size-3.5 shrink-0 ${moduleFilled ? "" : "text-blue-400 group-hover:text-blue-500 dark:text-blue-500 dark:group-hover:text-blue-400"}`}
											/>
											{module}
											{moduleFilled ? (
												<CheckCircle2 className='size-3 opacity-80' />
											) : (
												<Circle className='size-2.5 opacity-50' />
											)}
										</button>
									)
								})}
							</CardContent>
							<CardFooter className='mt-auto p-4 pt-0'>
								<Button
									variant='ghost'
									size='sm'
									className='h-7 self-start px-0 text-info hover:bg-transparent hover:text-info/80'
									
								>
									{filled ? "Edit information" : "Fill information"}
									{filled ? <Pencil /> : <ArrowRight />}
								</Button>
							</CardFooter>
						</Card>
					)
				})}
			</div>
			<div className='mt-5 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between'>
				<p aria-live='polite' className='flex items-center gap-2 text-xs text-muted-foreground'>
					{ready ? (
						<CheckCircle2 className='size-4 shrink-0 text-success' />
					) : (
						<LockKeyhole className='size-4 shrink-0' />
					)}
					{ready ? "All four information areas are filled." : "Complete all four areas to unlock generation."}
				</p>
				<Button disabled={!ready} onClick={() => {}} className='shrink-0 bg-info! text-info-foreground! hover:bg-info/90!'>
					<FileCode2 />
					Generate XBRL Report
				</Button>
			</div>
		</section>
	)
}
