import { Check, Download, LoaderCircle, TriangleAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"

export type GenerationStatus = "queued" | "processing" | "uploading" |"completed" | "failed"

const generationStages: GenerationStatus[] = ["queued", "processing", "uploading", "completed"]

export default function XbrlGenerationProgress({
	generationStatus,
	isGenerating,
}: {
	generationStatus: GenerationStatus
	isGenerating: boolean
}) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					aria-label={`XBRL generation status: ${generationStatus}`}
					title='XBRL generation status'
					variant='outline'
					className='h-9 gap-2 px-2.5 capitalize'
				>
					{isGenerating ? (
						<LoaderCircle aria-hidden='true' className='size-4 animate-spin motion-reduce:animate-none' />
					) : generationStatus === "failed" ? (
						<TriangleAlert aria-hidden='true' className='size-4 text-destructive' />
					) : (
						<Check aria-hidden='true' className='size-4 text-primary' />
					)}
					<span className='hidden sm:inline'>{generationStatus}</span>
				</Button>
			</PopoverTrigger>
			<PopoverContent align='end' sideOffset={12} className='w-[min(340px,calc(100vw-24px))] p-0'>
				<div className='px-4 py-4'>
					<div className='flex items-start gap-3'>
						<span className='mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-muted'>
							{isGenerating ? (
								<LoaderCircle aria-hidden='true' className='size-4 animate-spin motion-reduce:animate-none' />
							) : generationStatus === "failed" ? (
								<TriangleAlert aria-hidden='true' className='size-4 text-destructive' />
							) : (
								<Check aria-hidden='true' className='size-4 text-primary' />
							)}
						</span>
						<div className='min-w-0 flex-1'>
							<h2 className='text-sm font-semibold'>
								{generationStatus === "failed"
									? "Generation encountered an error"
									: generationStatus === "completed"
										? "XBRL report is ready"
										: "Generating XBRL report"}
							</h2>
							<p className='mt-1 text-xs leading-5 text-muted-foreground'>
								{generationStatus === "failed"
									? "Something went wrong while preparing your report. Please try again or report the issue."
									: generationStatus === "completed"
										? "Your report has been generated successfully."
										: `Your report is ${generationStatus}. This may take a moment.`}
							</p>
						</div>
					</div>
					{generationStatus !== "failed" ? (
						<>
							<div
								role='progressbar'
								aria-label='XBRL generation progress'
								aria-valuemin={0}
								aria-valuemax={4}
								aria-valuenow={
									generationStages.indexOf(generationStatus as Exclude<GenerationStatus, "idle" | "failed">) + 1
								}
								className='mt-5 grid grid-cols-4 gap-1.5'
							>
								{generationStages.map((stage, index) => (
									<span
										key={stage}
										className={`h-1 rounded-full ${generationStages.indexOf(generationStatus as Exclude<GenerationStatus, "idle" | "failed">) >= index ? "bg-primary" : "bg-muted"}`}
									/>
								))}
							</div>
							<ol className='mt-4 space-y-3'>
								{generationStages.map((stage, index) => {
									const currentIndex = generationStages.indexOf(
										generationStatus as Exclude<GenerationStatus, "failed">,
									)
									const isCurrent = stage === generationStatus
									const isComplete = index < currentIndex
									return (
										<li key={stage} className='flex items-center gap-2.5 text-xs capitalize'>
											<span className='flex size-4 shrink-0 items-center justify-center'>
												{isComplete ? (
													<Check aria-hidden='true' className='size-3.5 text-primary' />
												) : isCurrent && isGenerating ? (
													<LoaderCircle
														aria-hidden='true'
														className='size-3.5 animate-spin text-primary motion-reduce:animate-none'
													/>
												) : (
													<span
														className={`size-1.5 rounded-full ${isCurrent ? "bg-primary" : "bg-muted-foreground/40"}`}
													/>
												)}
											</span>
											<span
												className={isComplete || isCurrent ? "font-medium text-foreground" : "text-muted-foreground"}
											>
												{stage}
											</span>
										</li>
									)
								})}
							</ol>
						</>
					) : null}
				</div>
				{generationStatus === "completed" ? (
					<>
						<Separator />
						<div className='p-3'>
							<Button onClick={() => {}} className='h-9 w-full gap-2'>
								<Download aria-hidden='true' className='size-4' />
								Download report
							</Button>
							<p className='mt-2 text-center text-[11px] text-muted-foreground'>
								Demo report · source financial data not provided
							</p>
						</div>
					</>
				) : null}
				{generationStatus === "failed" ? (
					<>
						<Separator />
						<div className='p-3'>
							<Button onClick={() => {}} variant='outline' className='h-9 w-full gap-2'>
								<TriangleAlert aria-hidden='true' className='size-4' />
								Report bug
							</Button>
						</div>
					</>
				) : null}
			</PopoverContent>
		</Popover>
	)
}
