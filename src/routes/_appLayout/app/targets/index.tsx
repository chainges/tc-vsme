import { createFileRoute } from '@tanstack/react-router'
import { AnimatePresence, motion } from 'framer-motion'
import { Goal } from 'lucide-react'
import { useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAppForm } from '@/hooks/tanstack-form'
import { listVariants } from './-animations'
import {
	useScope1Form,
	useScope2Form,
	useScope3Form,
	useTargetsComputedValues,
	useTargetsData,
	useTargetsForm,
} from './-hooks'
import { MainTab } from './-main-tab'
import { Scope1Tab } from './-scope1-tab'
import { Scope2Tab } from './-scope2-tab'
import { Scope3Tab } from './-scope3-tab'

export const Route = createFileRoute('/_appLayout/app/targets/')({
	component: TargetsPage,
})

function TargetsPage() {
	const [selectedBaseYear, setSelectedBaseYear] = useState<number | null>(null)

	// Fetch all targets-related data
	const {
		organization,
		existingTargets,
		baseYearEmissionsData,
		saveTargets,
		yearOptions,
		companyName,
	} = useTargetsData(selectedBaseYear)

	// Main form setup
	const { form, isSaving } = useTargetsForm(
		existingTargets,
		baseYearEmissionsData,
		saveTargets,
		selectedBaseYear,
		setSelectedBaseYear,
		useAppForm,
	)

	// Scope 1 form setup
	const { form: scope1Form, isSaving: isSavingScope1 } = useScope1Form(
		existingTargets,
		saveTargets,
		useAppForm,
	)

	// Scope 2 form setup
	const { form: scope2Form, isSaving: isSavingScope2 } = useScope2Form(
		existingTargets,
		saveTargets,
		useAppForm,
	)

	// Scope 3 form setup
	const { form: scope3Form, isSaving: isSavingScope3 } = useScope3Form(
		existingTargets,
		baseYearEmissionsData,
		saveTargets,
		useAppForm,
	)

	// Compute derived values
	const {
		baseScope1Value,
		baseScope2Value,
		baseScope3Value,
		hasSpecificTargetsActive,
	} = useTargetsComputedValues(
		existingTargets,
	)

	return (
		<div className='p-6 space-y-8 w-full mx-auto'>
			<div>
				<h1 className='flex items-center gap-2.5 text-xl font-semibold'>
					<Goal className='size-5 text-primary' />
					Climate emissions targets
				</h1>
				<p className='mt-1 text-sm text-muted-foreground'>Setting climate targets for {companyName}</p>
			</div>

			<Tabs defaultValue='main' className='w-full'>
				<TabsList className='grid h-auto min-h-11 w-full grid-cols-4 sm:h-9 sm:min-h-0'>
					<TabsTrigger className='min-h-10 px-1 text-xs sm:min-h-0 sm:px-2 sm:text-sm' value='main'>
						Main
					</TabsTrigger>
					<TabsTrigger className='min-h-10 px-1 text-xs sm:min-h-0 sm:px-2 sm:text-sm' value='scope1'>
						Scope 1
					</TabsTrigger>
					<TabsTrigger className='min-h-10 px-1 text-xs sm:min-h-0 sm:px-2 sm:text-sm' value='scope2'>
						Scope 2
					</TabsTrigger>
					<TabsTrigger className='min-h-10 px-1 text-xs sm:min-h-0 sm:px-2 sm:text-sm' value='scope3'>
						Scope 3
					</TabsTrigger>
				</TabsList>

				<div className='mt-6'>
					<TabsContent value='main' className='mt-0'>
						<AnimatePresence>
							{!organization || existingTargets === undefined ? 
							<Skeleton className='h-40 w-full' />
							:
							<motion.div
								animate='visible'
								className='space-y-8'
								exit='hidden'
								initial='hidden'
								variants={listVariants}
							>
								<MainTab
									form={form}
									isSaving={isSaving}
									hasSpecificTargetsActive={hasSpecificTargetsActive}
									selectedBaseYear={selectedBaseYear}
									setSelectedBaseYear={setSelectedBaseYear}
									yearOptions={yearOptions}
									baseYearEmissionsData={baseYearEmissionsData}
									existingTargets={existingTargets}
								/>
							</motion.div>}
						</AnimatePresence>
					</TabsContent>
					<TabsContent value='scope1' className='mt-0'>
						<AnimatePresence>
							{!organization || existingTargets === undefined ? 
							<Skeleton className='h-40 w-full' />
							:
							<motion.div animate='visible' exit='hidden' initial='hidden' variants={listVariants}>
								<Scope1Tab
									scope1Form={scope1Form}
									isSavingScope1={isSavingScope1}
									existingTargets={existingTargets}
									baseScope1Value={baseScope1Value}
								/>
							</motion.div>
							}

							
						</AnimatePresence>
					</TabsContent>
					<TabsContent value='scope2' className='mt-0'>
						<AnimatePresence>

							{!organization || existingTargets === undefined ? 
							<Skeleton className='h-40 w-full' />
							:
							<motion.div animate='visible' exit='hidden' initial='hidden' variants={listVariants}>
								<Scope2Tab
									scope2Form={scope2Form}
									isSavingScope2={isSavingScope2}
									existingTargets={existingTargets}
									baseScope2Value={baseScope2Value}
								/>
							</motion.div>}
						</AnimatePresence>
					</TabsContent>
					<TabsContent value='scope3' className='mt-0'>
						<AnimatePresence>
							{!organization || existingTargets === undefined ? 
							<Skeleton className='h-40 w-full' />
							:
							<motion.div animate='visible' exit='hidden' initial='hidden' variants={listVariants}>
								<Scope3Tab
									scope3Form={scope3Form}
									isSavingScope3={isSavingScope3}
									existingTargets={existingTargets}
									baseScope3Value={baseScope3Value}
									baseYearEmissionsData={baseYearEmissionsData}
								/>
							</motion.div>}
						</AnimatePresence>
					</TabsContent>
				</div>
			</Tabs>
		</div>
	)
}
