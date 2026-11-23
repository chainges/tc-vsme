import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import {
	ArrowRight,
	BarChart3,
	Check,
	CheckCircle2,
	Clock,
	DollarSign,
	FileText,
	Globe,
	LayoutTemplate,
	Lock,
	Shield,
	Users,
	Zap,
} from 'lucide-react'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	GlowingCard,
} from '@/components/ui/GlowingCard'
import { ContactForm } from '@/lib/forms/forms/ContactForm'
import { m } from '@/paraglide/messages'

export default function Home() {
	return (
		<div className='min-h-screen bg-background text-foreground overflow-x-hidden'>
			{/* Decorative Background Elements */}
			<div className='fixed inset-0 -z-10 overflow-hidden pointer-events-none'>
				<div className='absolute top-0 right-0 w-125 h-125 bg-(--sky)/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2' />
				<div className='absolute bottom-0 left-0 w-125 h-125 bg-(--teal)/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2' />
			</div>

			{/* Hero Section */}
			<section className='relative pt-24 pb-20 md:pt-32 md:pb-32 overflow-hidden items-center justify-center flex'>
				<div className='container mx-auto px-4 md:px-6 relative z-10'>
					<div className='flex flex-col lg:flex-row items-center gap-12 lg:gap-20'>
						{/* Left Content */}
						<div className='flex-1 text-center lg:text-left'>
							<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
								<div className='inline-flex items-center rounded-full border border-(--sky)/30 bg-(--sky)/10 px-3 py-1 text-sm text-(--sky) mb-6 backdrop-blur-md'>
									<span className='flex h-2 w-2 rounded-full bg-(--sky) mr-2 animate-pulse'></span>
									{m["home.hero.eyebrow"]()}
								</div>

								<h1 className='text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight'>
									{m["home.hero.title_prefix"]()}{" "}
									<span className='text-transparent bg-clip-text bg-linear-to-r from-(--teal) via-(--sky) to-(--copper)'>
										{m["home.hero.title_highlight"]()}
									</span>
									<br />
									{m["home.hero.title_suffix"]()}
								</h1>

								<p className='text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed'>
									{m["home.hero.description"]()}
								</p>

								<div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8'>
									<Button
										asChild
										size='lg'
										className='bg-linear-to-r from-(--teal) to-(--sky) hover:opacity-90 text-white border-0 shadow-lg shadow-(--teal)/20 transition-transform hover:scale-105'
									>
										<Link to='/' hash='contact'>
											{m["home.hero.primary_cta"]()}
											<ArrowRight className='ml-2 h-5 w-5' />
										</Link>
									</Button>
									<Button
										size='lg'
										variant='outline'
										className='border-(--sky)/30 hover:bg-(--sky)/5 hover:border-(--sky) text-foreground min-w-40'
									>
										{m["home.hero.secondary_cta"]()}
									</Button>
								</div>

								<div className='flex items-center justify-center lg:justify-start gap-6 text-sm text-muted-foreground'>
									<div className='flex items-center gap-2'>
										<CheckCircle2 className='h-4 w-4 text-(--teal)' />
										<span>{m["home.hero.no_commitment"]()}</span>
									</div>
									<div className='flex items-center gap-2'>
										<CheckCircle2 className='h-4 w-4 text-(--teal)' />
										<span>{m["home.hero.free_meeting"]()}</span>
									</div>
								</div>
							</motion.div>
						</div>

						{/* Right - Hero Visual */}
						<div className='flex-1 w-full max-w-150 lg:max-w-none relative perspective-1000'>
							<motion.div
								initial={{ opacity: 0, rotateY: -5, scale: 0.95 }}
								animate={{ opacity: 1, rotateY: 0, scale: 1 }}
								transition={{ duration: 0.8, delay: 0.2 }}
								className='relative z-10'
							>
								<div className='relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-background/50 backdrop-blur-sm group'>
									<div className='absolute inset-0 bg-linear-to-tr from-(--teal)/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none' />
									<img
										src='/images/hero-workspace.jpg'
										alt={m["home.hero.image_alt"]()}
										className='w-full h-auto object-cover rounded-2xl'
									/>

									{/* Floating Card: Score */}
									<motion.div
										className='absolute -top-6 right-6 md:top-8 md:right-8 z-20'
										animate={{ y: [0, -10, 0] }}
										transition={{
											duration: 4,
											repeat: Infinity,
											ease: "easeInOut",
										}}
									>
										<GlowingCard
											glowColor='teal'
											className='w-auto min-w-45 bg-card/20 backdrop-blur-xl border border-(--teal)/20'
										>
											<CardContent className='px-4 flex flex-col gap-1 items-center text-center'>
												<div className='h-10 w-10 rounded-full bg-(--teal)/10 flex items-center justify-center mb-1'>
													<Shield className='h-5 w-5 text-(--teal)' />
												</div>
												<span className='text-sm font-medium text-white'>{m["home.hero.score_label"]()}</span>
												<span className='text-2xl font-bold text-(--teal)'>{m["home.hero.score"]()}</span>
											</CardContent>
										</GlowingCard>
									</motion.div>

									{/* Floating Card: Savings */}
									<motion.div
										className='absolute -bottom-6 -left-6 md:bottom-8 md:left-8 z-20'
										animate={{ y: [0, 10, 0] }}
										transition={{
											duration: 5,
											repeat: Infinity,
											ease: "easeInOut",
											delay: 1,
										}}
									>
										<GlowingCard
											glowColor='copper'
											className='w-auto min-w-50 bg-card/20 backdrop-blur-xl border border-(--copper)/20'
										>
											<CardContent className='px-4 flex items-center gap-4'>
												<div className='h-10 w-10 rounded-full bg-(--copper)/10 flex items-center justify-center'>
													<Clock className='h-5 w-5 text-(--copper)' />
												</div>
												<div>
													<p className='text-sm text-white'>{m["home.hero.time_saved_label"]()}</p>
										<p className='text-lg font-bold text-(--copper)'>{m["home.hero.time_saved"]()}</p>
												</div>
											</CardContent>
										</GlowingCard>
									</motion.div>
								</div>
							</motion.div>

							{/* Background Blob behind image */}
							<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-(--sky)/20 blur-3xl -z-10 rounded-full opacity-60' />
						</div>
					</div>
				</div>
			</section>

			{/* Trusted By Section */}
			<section className='py-10 border-y border-border/50 bg-muted/30'>
				<div className='container mx-auto px-4 text-center'>
					<p className='text-sm text-muted-foreground font-semibold uppercase tracking-wider mb-6'>
						{m["home.partners.heading"]()}
					</p>
					<div className='flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500'>
						{/* Placeholder Logos - In production use real SVGs */}
						{[
							m["home.partners.dot_duozink"](),
							m["home.partners.solberg_industrier"](),
							m["home.partners.fjell_technology_group"](),
							m["home.partners.not_process"](),
						].map((name) => (
							<div
								key={name}
								className='text-xl font-bold font-title text-muted-foreground/80 hover:text-(--teal) cursor-default'
							>
								{name}
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Value Props / Features Grid */}
			<section id='features' className='py-24 relative overflow-hidden'>
				<div className='container mx-auto px-4 md:px-6 relative z-10'>
					<div className='text-center max-w-3xl mx-auto mb-16'>
						<h2 className='text-3xl md:text-5xl font-bold mb-6'>
							{m["home.features.heading_prefix"]()} <span className='text-(--teal)'>{m["home.features.heading_highlight"]()}</span>
						</h2>
						<p className='text-lg text-muted-foreground leading-relaxed'>
							{m["home.features.description"]()}
						</p>
					</div>

					<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
						{[
							{
								title: m["home.features.guide_title"](),
								desc: m["home.features.guide_description"](),
								icon: CheckCircle2,
								color: "sky",
								id: "guide",
							},
							{
								title: m["home.features.templates_title"](),
								desc: m["home.features.templates_description"](),
								icon: LayoutTemplate,
								color: "teal",
								id: "templates",
							},
							{
								title: m["home.features.ai_title"](),
								desc: m["home.features.ai_description"](),
								icon: Zap,
								color: "copper",
								id: "ai",
							},
							{
								title: m["home.features.security_title"](),
								desc: m["home.features.security_description"](),
								icon: Lock,
								color: "amber",
								id: "security",
							},
							{
								title: m["home.features.expert_title"](),
								desc: m["home.features.expert_description"](),
								icon: Users,
								color: "rose",
								id: "expert",
							},
							{
								title: m["home.features.report_title"](),
								desc: m["home.features.report_description"](),
								icon: FileText,
								color: "pink",
								id: "report",
							},
						].map((feature) => (
							<GlowingCard key={feature.id} glowColor={feature.color as any} className='bg-card h-full'>
								<CardHeader>
									<div
										className={`w-12 h-12 rounded-lg bg-(--${feature.color})/10 flex items-center justify-center mb-4`}
									>
										<feature.icon className={`h-6 w-6 text-(--${feature.color})`} />
									</div>
									<CardTitle className='text-xl'>{feature.title}</CardTitle>
								</CardHeader>
								<CardContent>
									<CardDescription className='text-base'>{feature.desc}</CardDescription>
								</CardContent>
							</GlowingCard>
						))}
					</div>
				</div>
			</section>

			{/* Why Choose Section (Visual Hierarchy Improved) */}
			<section className='py-24 bg-(--sky)/5'>
				<div className='container mx-auto px-4 md:px-6'>
					<div className='grid lg:grid-cols-2 gap-12 lg:gap-20 items-center'>
						<div className='order-2 lg:order-1 relative'>
							<div className='relative rounded-2xl overflow-hidden shadow-2xl border border-white/50'>
								<img
									src='https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
									alt={m["home.advantage.image_alt"]()}
									className='w-full h-auto'
								/>
								<div className='absolute inset-0 bg-(--teal)/10 mix-blend-multiply' />
							</div>
							{/* Decorative elements around image */}
							<div className='absolute -z-10 -bottom-10 -left-10 w-40 h-40 bg-(--copper)/20 rounded-full blur-2xl' />
							<div className='absolute -z-10 -top-10 -right-10 w-40 h-40 bg-(--teal)/20 rounded-full blur-2xl' />
						</div>

						<div className='order-1 lg:order-2'>
							<Badge variant='outline' className='mb-6 border-(--copper)/50 text-(--copper) bg-(--copper)/10'>
								{m["home.advantage.badge"]()}
							</Badge>
							<h2 className='text-3xl md:text-5xl font-bold mb-6 leading-tight'>
								{m["home.advantage.heading_prefix"]()}<br />
								<span className='text-transparent bg-clip-text bg-linear-to-r from-(--teal) to-(--sky)'>
									{m["home.advantage.heading_highlight"]()}
								</span>
							</h2>
							<p className='text-lg text-muted-foreground mb-8'>
								{m["home.advantage.description"]()}
							</p>

							<div className='grid gap-6'>
								{[
									{
										title: m["home.advantage.bank_title"](),
										desc: m["home.advantage.bank_description"](),
										icon: DollarSign,
										id:"bank"
									},
									{
										title: m["home.advantage.customer_title"](),
										desc: m["home.advantage.customer_description"](),
										icon: Users,
										id:"customer"
									},
									{
										title: m["home.advantage.risk_title"](),
										desc: m["home.advantage.risk_description"](),
										icon: BarChart3,
										id:"risk"
									},
									{
										title: m["home.advantage.reputation_title"](),
										desc: m["home.advantage.reputation_description"](),
										icon: Globe,
										id:"reputation"
									},
								].map((item) => (
									<div key={item.id} className='flex gap-4 items-start'>
										<div className='mt-1 bg-white dark:bg-slate-800 p-2 rounded-full shadow-xs text-(--teal)'>
											<item.icon className='h-5 w-5' />
										</div>
										<div>
											<h3 className='font-bold text-lg'>{item.title}</h3>
											<p className='text-muted-foreground'>{item.desc}</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Pricing - Cleaner Design */}
			<section className='py-24' id='pricing'>
				<div className='container px-4 text-center max-w-5xl mx-auto'>
					<Badge variant='outline' className='mb-4 border-(--teal)/50 text-(--teal)'>
						{m["home.pricing.badge"]()}
					</Badge>
					<h2 className='text-3xl md:text-5xl font-bold mb-4'>{m["home.pricing.heading"]()}</h2>
					<p className='text-muted-foreground mb-12 max-w-2xl mx-auto'>
						{m["home.pricing.description"]()}
					</p>

					<div className='grid md:grid-cols-3 gap-8 items-start'>
						{/* Starter */}
						<GlowingCard glowColor='sky' className='relative group'>
							<CardHeader>
								<CardTitle className='text-2xl'>{m["home.pricing.starter_name"]()}</CardTitle>
								<CardDescription>{m["home.pricing.starter_description"]()}</CardDescription>
							</CardHeader>
							<CardContent>
								<div className='text-4xl font-bold mb-6'>
									{m["home.pricing.starter_price"]()} <span className='text-base font-normal text-muted-foreground'>{m["home.pricing.starter_period"]()}</span>
								</div>
								<ul className='text-left space-y-3 mb-6'>
									{[
									{name: m["home.pricing.starter_feature_1"](), id: "starter_feature_1"},
										{name: m["home.pricing.starter_feature_2"](), id: "starter_feature_2"},
										{name: m["home.pricing.starter_feature_3"](), id: "starter_feature_3"},
										{name: m["home.pricing.starter_feature_4"](), id: "starter_feature_4"},
									].map((feat) => (
										<li key={feat.id} className='flex items-center gap-2'>
											<Check className='h-4 w-4 text-green-500' /> {feat.name}
										</li>
									))}
								</ul>
								<Button className='w-full' variant='outline'>
									{m["home.pricing.starter_cta"]()}
								</Button>
							</CardContent>
						</GlowingCard>

						{/* Growth (Highlighted) */}
						<GlowingCard glowColor='teal' className='relative border-(--teal) border-t-6 shadow-2xl scale-105 z-10'>
							<CardHeader>
								<div className='text-(--teal) font-bold text-sm uppercase tracking-wide mb-2'>{m["home.pricing.growth_badge"]()}</div>
								<CardTitle className='text-3xl'>{m["home.pricing.growth_name"]()}</CardTitle>
								<CardDescription>{m["home.pricing.growth_description"]()}</CardDescription>
							</CardHeader>
							<CardContent>
								<div className='text-4xl font-bold mb-6'>
									{m["home.pricing.growth_price"]()} <span className='text-base font-normal text-muted-foreground'>{m["home.pricing.growth_period"]()}</span>
								</div>
								<ul className='text-left space-y-3 mb-6'>
									{[
										{name: m["home.pricing.growth_feature_1"](), id: "growth_feature_1"},
										{name: m["home.pricing.growth_feature_2"](), id: "growth_feature_2"},
										{name: m["home.pricing.growth_feature_3"](), id: "growth_feature_3"},
										{name: m["home.pricing.growth_feature_4"](), id: "growth_feature_4"},
										{name: m["home.pricing.growth_feature_5"](), id: "growth_feature_5"},
									].map((feat) => (
										<li key={feat.id} className='flex items-center gap-2'>
											<Check className='h-4 w-4 text-(--teal)' />
											<span className='font-medium'>{feat.name}</span>
										</li>
									))}
								</ul>
								<Button className='w-full bg-(--teal) hover:bg-(--teal)/90 text-white shadow-lg shadow-(--teal)/25'>
									{m["home.pricing.growth_cta"]()}
								</Button>
							</CardContent>
						</GlowingCard>

						{/* Enterprise */}
						<GlowingCard glowColor='copper' className='relative group'>
							<CardHeader>
								<CardTitle className='text-2xl'>{m["home.pricing.enterprise_name"]()}</CardTitle>
								<CardDescription>{m["home.pricing.enterprise_description"]()}</CardDescription>
							</CardHeader>
							<CardContent>
								<div className='text-4xl font-bold mb-6'>{m["home.pricing.enterprise_price"]()}</div>
								<ul className='text-left space-y-3 mb-6'>
									{[
										{name: m["home.pricing.enterprise_feature_1"](), id: "enterprise_feature_1"},
										{name: m["home.pricing.enterprise_feature_2"](), id: "enterprise_feature_2"},
										{name: m["home.pricing.enterprise_feature_3"](), id: "enterprise_feature_3"},
										{name: m["home.pricing.enterprise_feature_4"](), id: "enterprise_feature_4"},
										{name: m["home.pricing.enterprise_feature_5"](), id: "enterprise_feature_5"},
									].map((feat) => (
										<li key={feat.id} className='flex items-center gap-2'>
											<Check className='h-4 w-4 text-(--copper)' /> {feat.name}
										</li>
									))}
								</ul>
							</CardContent>
							<CardFooter>
								<Button className='w-full' variant='outline'>
									{m["home.pricing.enterprise_cta"]()}
								</Button>
							</CardFooter>
						</GlowingCard>
					</div>
				</div>
			</section>

			{/* Contact / CTA Section */}
			<section id='contact' className='py-24 bg-muted/50'>
				<div className='container px-4 text-center max-w-4xl mx-auto'>
					<h2 className='text-3xl md:text-5xl font-bold mb-8'>{m["home.contact.heading"]()}</h2>
					<p className='text-xl text-muted-foreground mb-8'>
						{m["home.contact.description"]()}
					</p>
					<div className='flex flex-col sm:flex-row gap-4 justify-center'>
						<Button size='lg' className='bg-foreground text-background hover:opacity-90 px-8 text-lg h-12'>
							{m["home.contact.primary_cta"]()}
						</Button>
						<Button size='lg' variant='outline' className='px-8 text-lg h-12 bg-background'>
							{m["home.contact.secondary_cta"]()}
						</Button>
					</div>

					<div className='mt-16 text-left max-w-2xl mx-auto bg-card p-8 rounded-2xl border shadow-sm'>
						<h3 className='text-2xl font-bold mb-6 text-center'>{m["home.contact.form_heading"]()}</h3>
						<ContactForm />
					</div>
				</div>
			</section>

			{/* FAQ Layout Improved */}
			<section className='py-24'>
				<div className='container px-4 md:px-6 max-w-3xl mx-auto'>
					<div className='text-center mb-12'>
						<h2 className='text-3xl font-bold mb-4'>{m["home.faq.heading"]()}</h2>
					</div>
					<Accordion type='single' collapsible className='w-full space-y-4'>
						<AccordionItem value='item-1' className='border rounded-lg px-4 bg-card shadow-xs'>
							<AccordionTrigger className='text-lg font-medium hover:no-underline hover:text-(--teal)'>
								{m["home.faq.q1"]()}
							</AccordionTrigger>
							<AccordionContent className='text-muted-foreground pb-4'>
								{m["home.faq.a1"]()}
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value='item-2' className='border rounded-lg px-4 bg-card shadow-xs'>
							<AccordionTrigger className='text-lg font-medium hover:no-underline hover:text-(--teal)'>
								{m["home.faq.q2"]()}
							</AccordionTrigger>
							<AccordionContent className='text-muted-foreground pb-4'>
								{m["home.faq.a2"]()}
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value='item-3' className='border rounded-lg px-4 bg-card shadow-xs'>
							<AccordionTrigger className='text-lg font-medium hover:no-underline hover:text-(--teal)'>
								{m["home.faq.q3"]()}
							</AccordionTrigger>
							<AccordionContent className='text-muted-foreground pb-4'>
								{m["home.faq.a3"]()}
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value='item-4' className='border rounded-lg px-4 bg-card shadow-xs'>
							<AccordionTrigger className='text-lg font-medium hover:no-underline hover:text-(--teal)'>
								{m["home.faq.q4"]()}
							</AccordionTrigger>
							<AccordionContent className='text-muted-foreground pb-4'>
								{m["home.faq.a4"]()}
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value='item-5' className='border rounded-lg px-4 bg-card shadow-xs'>
							<AccordionTrigger className='text-lg font-medium hover:no-underline hover:text-(--teal)'>
								{m["home.faq.q5"]()}
							</AccordionTrigger>
							<AccordionContent className='text-muted-foreground pb-4'>
								{m["home.faq.a5"]()}
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>
			</section>
		</div>
	)
}
