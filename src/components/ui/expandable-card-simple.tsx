'use client'

import { is } from 'date-fns/locale'
import { motion } from 'framer-motion'
import { BadgeQuestionMarkIcon, ChevronRightIcon, InfoIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { useRef } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { useExpandable } from '@/hooks/use-expandable'
import { cn } from '@/lib/utils'
import { m } from "@/paraglide/messages"
export type FormStatus = 'not_started' | 'draft' | 'submitted'

interface FormCardProps {
	title: string
	status: FormStatus
	updatedDate: string
	contributor: { name: string; image?: string }
	onClick?: () => void
	toolTip: string
	buttonText?: string
	children?: ReactNode
	module?: 'Basic Module' | 'Comprehensive Module'
	isVolunteer?: boolean
	code: string
	version?: number
}

const STATUS_CONFIG: Record<FormStatus, { label: string; className: string }> =
	{
		not_started: {
			label: 'Not Started',
			className:
				'bg-gray-100 border-gray-400 text-gray-500 dark:bg-gray-800 dark:text-gray-400',
		},
		draft: {
			label: 'In Progress',
			className:
				'bg-amber-100 border-amber-600 text-amber-600 dark:bg-amber-800 dark:text-amber-300',
		},
		submitted: {
			label: 'Completed',
			className:
				'bg-emerald-100 border-emerald-600 text-emerald-600 dark:bg-emerald-800 dark:text-emerald-300',
		},
	}

export function FormCard({
	title,
	status,
	updatedDate,
	contributor,
	onClick = () => {},
	toolTip,
	buttonText,
	children,
	module,
	code,
	version,
	isVolunteer=false,
}: FormCardProps) {
	const { isExpanded, toggleExpand } = useExpandable()
	const contentRef = useRef<HTMLDivElement>(null)
	const hasHelpButton = Boolean(buttonText)

	const getModuleLabel = (type: 'Basic Module' | 'Comprehensive Module') => {
		switch (type) {
			case 'Basic Module':
				return m["general.basicModule"]()
			case 'Comprehensive Module':
				return m["general.comprehensiveModule"]()
			default:
				return ''
		}
	}

	return (
		<Card
			className={cn(
				"mx-auto w-full transition-all duration-300 hover:shadow-lg gap-2",
				module === "Comprehensive Module" && "",
			)}
		>
			<CardHeader
				className='cursor-pointer'
				onClick={toggleExpand}
				role='button'
				tabIndex={0}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						e.preventDefault()
						toggleExpand()
					}
				}}
			>
				<div className='flex w-full flex-col gap-3 md:flex-row md:items-start md:justify-between'>
					<div className='flex min-w-0 flex-wrap items-center gap-2'>
						<div
							className={cn(
								"inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm",
								module === "Comprehensive Module"
									? "bg-secondary text-secondary-foreground"
									: "bg-primary text-primary-foreground",
							)}
						>
							{code}
						</div>
						<h3 className='min-w-0 wrap-break-word text-lg font-semibold text-secondary md:text-xl'>{title}</h3>
						<ChevronRightIcon className={cn("h-6 w-6 shrink-0 transition-transform duration-200", isExpanded && "rotate-90")} />
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<InfoIcon
										className='hidden md:inline-flex h-5 w-5 shrink-0 text-muted-foreground hover:text-foreground transition-colors cursor-help'
										onClick={(e) => {
											e.stopPropagation()
											toggleExpand()
										}}
									/>
								</TooltipTrigger>
								<TooltipContent>
									<p>{toolTip}</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
					<div className='hidden md:flex w-full items-center gap-2 md:w-auto md:justify-end'>
						{hasHelpButton && (
							<Button
								type='button'
								className='flex h-auto min-h-10 max-w-full flex-wrap justify-start gap-2 whitespace-normal text-left md:min-h-9'
								variant='outline'
								size='default'
								onClick={(e) => {
									e.stopPropagation()
									onClick()
								}}
								onPointerDown={(e) => e.stopPropagation()}
							>
								<BadgeQuestionMarkIcon className='h-6 w-6' />
								<span>{buttonText}</span>
							</Button>
						)}
					</div>
				</div>
			</CardHeader>

			<CardContent>
				<div className='space-y-0'>
					<div className='flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
						<div className='flex flex-wrap gap-2'>
							<Badge variant='secondary' className={STATUS_CONFIG[status].className}>
								{STATUS_CONFIG[status].label}
							</Badge>
							{module && (
								<Badge
									variant='secondary'
									className={cn(
										"bg-secondary text-secondary-foreground",
										module === "Basic Module" && "bg-primary text-primary-foreground",
									)}
								>
									{getModuleLabel(module)}
								</Badge>
							)}
							{isVolunteer && (
								<Badge variant='volunteer'>
									Volunteer
								</Badge>
							)}
						</div>

						{/* <div className='break-words text-left text-sm text-muted-foreground md:text-right'>
							
							{version !== undefined && <div>Version: {version}</div>}
						</div> */}
					</div>

					<motion.div
						initial={false}
						animate={{
							height: isExpanded ? "auto" : 0,
							opacity: isExpanded ? 1 : 0,
						}}
						transition={{ type: "spring", stiffness: 300, damping: 30 }}
						className='overflow-hidden'
					>
						<div ref={contentRef} className='pb-4'>
							{/* Children kept mounted to preserve Convex subscriptions */}
							<div className='space-y-4 pt-2'>
								<div className='space-y-2'>{children}</div>
							</div>
						</div>
					</motion.div>
				</div>
			</CardContent>

			<CardFooter>
				<div className='w-full wrap-break-word text-sm text-muted-foreground'>
					Last updated by {contributor.name}: {updatedDate}
				</div>
			</CardFooter>
		</Card>
	)
}
