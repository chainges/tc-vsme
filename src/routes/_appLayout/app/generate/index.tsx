import { useMutation } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";
import { api } from "convex/_generated/api";
import { useMutation as useConvexMutation, useQuery } from "convex/react";
import {
  AlertTriangle,
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
  Loader2,
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
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useOrgGuard } from "@/hooks/use-org-guard";
import { generateXbrl } from "@/lib/report/generate-xbrl";
import { reportStore } from "@/lib/report/report-store";
import { modulesInArea, moduleTitle, READINESS_AREAS, STATE_LABEL } from "@/lib/report-readiness";
import { yearStore } from "@/lib/year-store";

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
  const reportingYear = useStore(yearStore, (state) => state.selectedYear);
	const createReport = useConvexMutation(api.reportMutations.createReport);
  const { skipQuery } = useOrgGuard();
  const readiness = useQuery(api.report.getReadiness, skipQuery || { reportingYear });

  const generate = useMutation({
		mutationFn: async () => {
			const report = await createReport({ reportingYear });
			reportStore.setState((state) => ({ ...state, reportId: report.reportId }));
			return generateXbrl({ data: { reportingYear, reportId: report.reportId } });
		},
    onSuccess: (result) => {
      if (result.status === "ok") toast.success("XBRL report generation started");
      else if (result.status === "not_ready") toast.error(`Still missing: ${result.missing.join(", ")}`);
      else {toast.error(result.message);console.log("XBRL generation error:", result.message);}
    },
    onError: () => {toast.error("Could not reach the report service");console.log("Error reaching report service");},
  });

  if (readiness === undefined) return <div className='mt-8 text-sm text-muted-foreground'>Loading...</div>;

  const moduleByCode = new Map(readiness.modules.map((m) => [m.code, m]));
  const areas = READINESS_AREAS.map((area) => {
    const codes = modulesInArea(area.id);
    const required = codes.filter((code) => moduleByCode.get(code)?.state !== "not_required");
    const done = required.filter((code) => moduleByCode.get(code)?.state === "complete");
    return { ...area, codes, required, done, filled: done.length === required.length };
  });
  const ready = readiness.canGenerate;
  const completed = areas.filter((area) => area.filled).length;
  const blocking = readiness.modules.filter((m) => m.state === "missing" || m.state === "invalid");

  return (
		<section className='mt-8 border-t border-border pt-7' aria-labelledby='readiness-title'>
			<div className='flex flex-wrap items-center justify-between gap-3'>
				<h2 id='readiness-title' className='flex items-center gap-2 text-lg font-semibold text-foreground'>
					<FileCode2 className='size-5 text-info' />
					Report readiness
				</h2>
				<span className={ready ? "text-sm font-medium text-success" : "text-sm text-muted-foreground"}>
					{completed} of 4 complete
				</span>
			</div>
			<div className='mt-5 grid gap-3 sm:grid-cols-2'>
				{areas.map((area, index) => {
					const AreaIcon = icons[index] ?? Info
					return (
						<Card
							key={area.id}
							className={`flex min-w-0 flex-col border shadow-xs transition-all duration-150 ${area.filled ? "border-success/35 bg-success/[0.04]" : "border-blue-100 bg-white dark:border-blue-950 dark:bg-card"}`}
						>
							<CardHeader className='flex flex-row items-center justify-between gap-2 space-y-0 p-4'>
								<div className='flex min-w-0 items-center gap-2.5'>
									<span
										className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${area.filled ? "bg-success/10 text-success" : "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400"}`}
									>
										<AreaIcon className='size-4.5' />
									</span>
									<div className='min-w-0'>
										<CardTitle className='truncate text-sm leading-tight dark:text-slate-100! text-slate-900! '>
											{area.title}
										</CardTitle>
										<CardDescription
											className={`mt-1 text-xs ${area.filled ? "text-success" : "text-muted-foreground"}`}
										>
											{area.done.length} of {area.required.length} required modules complete
										</CardDescription>
									</div>
								</div>
								{area.filled ? (
									<CheckCircle2 className='size-5 shrink-0 text-success' />
								) : (
									<Circle className='size-5 shrink-0 text-blue-200 dark:text-blue-900' />
								)}
							</CardHeader>
							<CardContent className='flex flex-wrap gap-1.5 p-4 pt-3'>
								{area.codes.map((code) => {
									const state = moduleByCode.get(code)?.state ?? "missing"
									const ModuleIcon = MODULE_ICONS[code] ?? FileText
									return (
										<Link
											key={code}
											to={area.route}
											title={moduleTitle(code)}
											aria-label={`${code} — ${STATE_LABEL[state]}: ${moduleTitle(code)}. Open form.`}
											className={`group flex items-center gap-1.5 rounded-lg border px-2 py-1 text-xs font-semibold transition-all duration-150 focus-visible:ring-2 focus-visible:ring-info/50 focus-visible:outline-none ${
												state === "complete"
													? "border-success/40 bg-success/10 text-success hover:border-success/60 hover:bg-success/15"
													: state === "invalid"
														? "border-destructive/40 bg-destructive/10 text-destructive"
														: state === "not_required"
															? "border-border bg-muted/40 text-muted-foreground opacity-60"
															: "border-blue-100 bg-background text-slate-500 hover:border-blue-300 hover:text-blue-600 dark:border-blue-950 dark:bg-card dark:text-slate-400 dark:hover:border-blue-800 dark:hover:text-blue-400"
											}`}
										>
											<ModuleIcon className='size-3.5 shrink-0' />
											{code}
											{state === "complete" ? (
												<CheckCircle2 className='size-3 opacity-80' />
											) : state === "invalid" ? (
												<AlertTriangle className='size-3' />
											) : (
												<Circle className='size-2.5 opacity-50' />
											)}
										</Link>
									)
								})}
							</CardContent>
							<CardFooter className='mt-auto p-4 pt-0'>
								<Button
									asChild
									variant='ghost'
									size='sm'
									className='h-7 self-start px-0 text-info hover:bg-transparent hover:text-info/80'
								>
									<Link to={area.route}>
										{area.filled ? "Edit information" : "Fill information"}
										{area.filled ? <Pencil /> : <ArrowRight />}
									</Link>
								</Button>
							</CardFooter>
						</Card>
					)
				})}
			</div>
			{blocking.length > 0 && (
				<ul className='mt-4 space-y-1 text-xs text-muted-foreground'>
					{blocking.map((m) => (
						<li key={m.code}>
							<span className='font-semibold'>{m.code}</span> {STATE_LABEL[m.state]}
							{m.issues.length > 0 && <span> — {m.issues.join("; ")}</span>}
						</li>
					))}
				</ul>
			)}
			<div className='mt-5 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between'>
				<p aria-live='polite' className='flex items-center gap-2 text-xs text-muted-foreground'>
					{ready ? (
						<CheckCircle2 className='size-4 shrink-0 text-success' />
					) : (
						<LockKeyhole className='size-4 shrink-0' />
					)}
					{ready ? "All required information is submitted." : "Submit all required modules to unlock generation."}
				</p>
				<Button
					disabled={!ready || generate.isPending}
					onClick={() => generate.mutate()}
					className='shrink-0 bg-info-background! text-info-foreground! hover:bg-info/90!'
				>
					{generate.isPending ? <Loader2 className='animate-spin' /> : <FileCode2 />}
					Generate XBRL Report
				</Button>
			</div>
		</section>
	)
}
