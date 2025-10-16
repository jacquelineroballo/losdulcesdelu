'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Cake, Clock, Sparkles, StarIcon, ChevronRight, ChevronLeft, Heart } from 'lucide-react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Card3D } from '@/components/3d-card'
import { FadeIn, StaggerChildren, StaggerItem } from '@/components/scroll-animations'

export default function Home() {
	const [slideIndex, setSlideIndex] = useState(0)
	const heroRef = useRef(null)

	const testimonials = [
		{
			text: 'Increíble sabor y diseño. Todos en la fiesta quedaron encantados con la torta.',
			author: 'María López',
		},
		{
			text: 'Su atención es excelente y los detalles en las tortas son impresionantes.',
			author: 'Carlos Gómez',
		},
		{
			text: 'Siempre pido mis pasteles aquí. Nunca me han decepcionado.',
			author: 'Ana Martínez',
		},
	]

	const { scrollYProgress } = useScroll()
	const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
	const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])
	const y = useTransform(scrollYProgress, [0, 0.2], [0, -50])

	const nextSlide = () => {
		setSlideIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
	}

	const prevSlide = () => {
		setSlideIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
	}

	// Efecto de sprinkles
	const renderSprinkles = () => {
		const sprinkles = []
		const colors = ['#FDA4AF', '#FB7185', '#F43F5E', '#E11D48', '#9F1239', '#FBBF24', '#34D399']

		for (let i = 0; i < 50; i++) {
			const style = {
				top: `${Math.random() * 100}%`,
				left: `${Math.random() * 100}%`,
				backgroundColor: colors[Math.floor(Math.random() * colors.length)],
				transform: `rotate(${Math.random() * 360}deg)`,
				animationDelay: `${Math.random() * 5}s`,
				animationDuration: `${Math.random() * 5 + 5}s`,
			}

			sprinkles.push(<div key={i} className='sprinkle absolute animate-falling' style={style} />)
		}

		return sprinkles
	}

	return (
		<>
			{/* Hero Section */}
			<section
				ref={heroRef}
				className='relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-pink-50 to-white'
			>
				<div className='absolute inset-0 pointer-events-none'>{renderSprinkles()}</div>

				<motion.div className='container px-4 md:px-6 relative z-10' style={{ opacity, scale, y }}>
					<div className='grid gap-4 lg:grid-cols-2 lg:gap-8 items-center'>
						<div className='space-y-3'>
							<motion.div
								className='inline-block rounded-lg bg-primary/10 px-2 py-1 text-xs'
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.5 }}
							>
								<span className='gradient-text font-bold'>Pastelería Artesanal</span>
							</motion.div>

							<motion.h1
								className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none'
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.2 }}
							>
								Delicias{' '}
								<span className='font-display gradient-text sparkle p-1'>Personalizadas</span> para
								cada ocasión
							</motion.h1>

							<motion.p
								className='max-w-[500px] text-muted-foreground text-sm md:text-base lg:text-lg'
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.4 }}
							>
								Transformamos ingredientes simples en obras de arte comestibles. Siempre con ese
								sabor único que te hace sentir en casa.{' '}
								<Heart className='inline animate-pulse text-red-400 w-4 h-4' />
							</motion.p>

							<motion.div
								className='flex flex-col gap-2 min-[400px]:flex-row'
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.6 }}
							>
								<Button asChild size='default' className='font-medium btn-fancy text-sm'>
									<Link href='/gallery'>Ver Galería</Link>
								</Button>
								<Button
									variant='outline'
									size='default'
									className='font-medium border-animated text-sm'
								>
									<Link href='/contact'>Contactar</Link>
								</Button>
							</motion.div>
						</div>

						<motion.div
							className='relative flex items-center justify-center'
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.8, delay: 0.3, type: 'spring' }}
						>
							<Card3D className='w-full'>
								<div className='relative w-full h-[300px] md:h-[350px] lg:h-[400px] rounded-xl overflow-hidden'>
									<Image
										src='/gallery/hero.png'
										alt='Tortas de cumpleaños personalizadas'
										fill
										className='object-cover'
										priority
									/>
									<div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent'></div>
								</div>
								<motion.div
									className='absolute -bottom-4 -left-4 glass rounded-lg shadow-lg p-3 max-w-[180px]'
									initial={{ opacity: 0, x: -20, y: 20 }}
									animate={{ opacity: 1, x: 0, y: 0 }}
									transition={{ duration: 0.5, delay: 0.8 }}
								>
									<div className='flex items-center gap-2 mb-2'>
										{[...Array(5)].map((_, i) => (
											<motion.div
												key={i}
												initial={{ opacity: 0, scale: 0 }}
												animate={{ opacity: 1, scale: 1 }}
												transition={{ duration: 0.3, delay: 0.8 + i * 0.1 }}
											>
												<StarIcon className='h-5 w-5 text-yellow-500 fill-yellow-500' />
											</motion.div>
										))}
									</div>
									<p className='text-sm'>
										"¡La mejor pastelería de la ciudad! Todos amaron mi torta de cumpleaños."
									</p>
									<p className='text-xs text-muted-foreground mt-1'>— Julia R.</p>
								</motion.div>
							</Card3D>
						</motion.div>
					</div>
				</motion.div>

				<motion.div
					className='absolute bottom-10 left-1/2 transform -translate-x-1/2'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 1.2 }}
				>
					<motion.div
						className='w-8 h-12 border-2 border-primary rounded-full flex justify-center'
						animate={{ y: [0, 10, 0] }}
						transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
					>
						<motion.div
							className='w-1 h-3 bg-primary rounded-full mt-2'
							initial={{ opacity: 0 }}
							animate={{ opacity: [0, 1, 0], y: [0, 10, 0] }}
							transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
						/>
					</motion.div>
				</motion.div>
			</section>

			{/* Por qué elegirnos */}
			<section className='py-20 bg-gradient-to-b from-accent to-background relative overflow-hidden'>
				<div className='container px-4 md:px-6 relative z-10'>
					<FadeIn>
						<div className='grid gap-6 text-center max-w-3xl mx-auto mb-16'>
							<h2 className='text-4xl font-bold tracking-tighter md:text-5xl/tight gradient-text'>
								Por qué elegirnos
							</h2>
							<p className='text-xl text-muted-foreground'>
								En Los dulces de Lu, cada creación es única y especial, hecha con amor e
								ingredientes de calidad
							</p>
						</div>
					</FadeIn>

					<StaggerChildren className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
						{[
							{
								icon: <Cake className='h-10 w-10 text-primary' />,
								title: 'Ingredientes de Calidad',
								description:
									'Utilizamos solo ingredientes frescos y de la más alta calidad para garantizar un sabor incomparable.',
							},
							{
								icon: <Sparkles className='h-10 w-10 text-primary' />,
								title: 'Diseños Personalizados',
								description:
									'Creamos diseños a medida para cada ocasión, reflejando tus gustos y necesidades específicas.',
							},
							{
								icon: <Clock className='h-10 w-10 text-primary' />,
								title: 'Entrega Puntual',
								description:
									'Garantizamos que tus pedidos lleguen a tiempo y en perfectas condiciones para tu celebración.',
							},
						].map((feature, index) => (
							<StaggerItem key={index} direction='up'>
								<Card3D className='h-full border-2 hover:border-primary transition-colors duration-300 frosting-drip'>
									<CardContent className='p-8 flex flex-col items-center text-center space-y-4'>
										<motion.div
											className='rounded-full bg-primary/10 p-6'
											whileHover={{ rotate: 5, scale: 1.1 }}
											transition={{ type: 'spring', stiffness: 300 }}
										>
											{feature.icon}
										</motion.div>
										<h3 className='text-2xl font-bold'>{feature.title}</h3>
										<p className='text-muted-foreground'>{feature.description}</p>
									</CardContent>
								</Card3D>
							</StaggerItem>
						))}
					</StaggerChildren>
				</div>
			</section>

			{/* Nuestras Especialidades */}
			<section className='py-20 relative overflow-hidden bg-gradient-to-b from-white to-pink-50'>
				<div className='container px-4 md:px-6 relative z-10'>
					<FadeIn>
						<div className='grid gap-6 text-center max-w-3xl mx-auto mb-16'>
							<h2 className='text-4xl font-bold tracking-tighter md:text-5xl/tight gradient-text'>
								Nuestras Especialidades
							</h2>
							<p className='text-xl text-muted-foreground'>
								Descubre nuestra variedad de creaciones para cada momento especial
							</p>
						</div>
					</FadeIn>

					<StaggerChildren className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3 items-stretch'>
						{[
							{
								title: 'Tortas de Cumpleaños',
								description: 'Diseños personalizados para celebrar tu día especial',
								image: '/placeholder.svg?height=400&width=400',
							},
							{
								title: 'Cupcakes Decorados',
								description: 'Pequeños bocados de felicidad decorados con creatividad',
								image: '/placeholder.svg?height=400&width=400',
							},
							{
								title: 'Postres Especiales',
								description: 'Creaciones exclusivas para eventos y momentos inolvidables',
								image: '/placeholder.svg?height=400&width=400',
							},
						].map((specialty, index) => (
							<StaggerItem key={index} direction='up'>
								<Card3D className='h-full'>
									<div className='group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-500 h-full'>
										<div className='aspect-square relative'>
											<Image
												src={specialty.image || '/placeholder.svg'}
												alt={specialty.title}
												className='object-cover transition-transform duration-700 group-hover:scale-110'
												fill
											/>
										</div>
										<div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500'>
											<motion.h3
												className='text-2xl font-bold text-white'
												initial={{ opacity: 0, y: 20 }}
												whileInView={{ opacity: 1, y: 0 }}
												transition={{ duration: 0.5 }}
												viewport={{ once: true }}
											>
												{specialty.title}
											</motion.h3>
											<motion.p
												className='text-white/90 mt-2 transform opacity-0 group-hover:opacity-100 transition-opacity duration-500'
												initial={{ opacity: 0 }}
												whileInView={{ opacity: 0 }}
												viewport={{ once: true }}
											>
												{specialty.description}
											</motion.p>
											<Button
												variant='secondary'
												size='sm'
												className='w-fit mt-4 transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500'
											>
												<Link href='/gallery'>Ver más</Link>
											</Button>
										</div>
									</div>
								</Card3D>
							</StaggerItem>
						))}
					</StaggerChildren>
				</div>
			</section>

			{/* Testimonios */}
			<section className='py-20 bg-gradient-to-b from-pink-100 to-white relative'>
				<div className='container px-4 md:px-6'>
					<div className='grid gap-10 md:grid-cols-2 items-center'>
						<FadeIn direction='left'>
							<div className='space-y-4'>
								<h2 className='text-4xl font-bold tracking-tighter md:text-5xl/tight gradient-text'>
									Testimonios de Clientes Satisfechos
								</h2>
								<div className='relative overflow-hidden py-8'>
									<div className='relative flex items-center'>
										<Button
											variant='ghost'
											size='icon'
											className='absolute left-0 z-10 hover:bg-primary/20'
											onClick={prevSlide}
										>
											<ChevronLeft className='h-6 w-6' />
											<span className='sr-only'>Anterior</span>
										</Button>
										<AnimatePresence mode='wait'>
											<motion.div
												key={slideIndex}
												initial={{ opacity: 0, x: 20 }}
												animate={{ opacity: 1, x: 0 }}
												exit={{ opacity: 0, x: -20 }}
												transition={{ duration: 0.3 }}
												className='mx-10 flex-1'
											>
												<blockquote className='text-xl italic'>
													"{testimonials[slideIndex].text}"
												</blockquote>
												<p className='mt-4 font-medium'>— {testimonials[slideIndex].author}</p>
											</motion.div>
										</AnimatePresence>
										<Button
											variant='ghost'
											size='icon'
											className='absolute right-0 z-10 hover:bg-primary/20'
											onClick={nextSlide}
										>
											<ChevronRight className='h-6 w-6' />
											<span className='sr-only'>Siguiente</span>
										</Button>
									</div>
									<div className='mt-6 flex justify-center space-x-2'>
										{testimonials.map((_, i) => (
											<button
												key={i}
												className={`h-3 w-3 rounded-full transition-all duration-300 ${
													i === slideIndex ? 'bg-primary w-6' : 'bg-primary/50'
												}`}
												onClick={() => setSlideIndex(i)}
											/>
										))}
									</div>
								</div>
							</div>
						</FadeIn>

						<FadeIn direction='right' delay={0.2}>
							<Card3D className='relative h-[400px] overflow-hidden rounded-lg'>
								<Image
									src='/placeholder.svg?height=600&width=800'
									alt='Cliente feliz con su torta'
									fill
									className='object-cover'
								/>
								<div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent'></div>
								<motion.div
									className='absolute bottom-6 right-6 glass p-4 rounded-lg max-w-[200px]'
									initial={{ opacity: 0, scale: 0.8 }}
									whileInView={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.5, delay: 0.4 }}
									viewport={{ once: true }}
								>
									<div className='flex items-center gap-2 mb-2'>
										{[...Array(5)].map((_, i) => (
											<StarIcon key={i} className='h-4 w-4 text-yellow-500 fill-yellow-500' />
										))}
									</div>
									<p className='text-sm text-white'>
										"Sus pasteles son obras de arte que saben tan bien como se ven."
									</p>
									<p className='text-xs text-white/70 mt-1'>— Roberto G.</p>
								</motion.div>
							</Card3D>
						</FadeIn>
					</div>
				</div>
			</section>

			{/* Suscripción */}
			<section className='py-20 bg-gradient-to-b from-primary-50 to-background relative overflow-hidden'>
				<div className='absolute inset-0 pointer-events-none'>{renderSprinkles()}</div>

				<div className='container px-4 md:px-6 relative z-10'>
					<div className='grid gap-10 lg:grid-cols-2 items-center'>
						<FadeIn direction='left'>
							<div className='space-y-4'>
								<h2 className='text-4xl font-bold tracking-tighter md:text-5xl/tight gradient-text'>
									¿Listo para probar la magia?
								</h2>
								<p className='text-xl text-muted-foreground'>
									Da el primer paso hacia la satisfacción dulce: realiza tu pedido o suscríbete a
									nuestro boletín para recibir actualizaciones y promociones.
								</p>
							</div>
						</FadeIn>

						<FadeIn direction='right' delay={0.2}>
							<Card3D>
								<Card className='border-2 border-primary/20 glass'>
									<CardContent className='p-8'>
										<form className='space-y-6'>
											<div className='space-y-2'>
												<label htmlFor='email' className='text-lg font-medium'>
													Email
												</label>
												<div className='relative'>
													<Input
														id='email'
														placeholder='tu@email.com'
														type='email'
														className='pl-10 py-6 text-lg border-2 focus:border-primary transition-colors'
													/>
													<div className='absolute left-3 top-1/2 -translate-y-1/2'>
														<motion.div
															animate={{ rotate: [0, 10, -10, 0] }}
															transition={{
																duration: 1,
																repeat: Number.POSITIVE_INFINITY,
																repeatDelay: 3,
															}}
														>
															✉️
														</motion.div>
													</div>
												</div>
											</div>
											<Button
												type='submit'
												className='w-full py-6 text-lg btn-fancy'
												onClick={(e) => {
													e.preventDefault()
												}}
											>
												<span className='mr-2'>Suscribirse</span>
												<motion.div
													animate={{ scale: [1, 1.2, 1] }}
													transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
												>
													<Heart className='h-5 w-5' />
												</motion.div>
											</Button>
										</form>
									</CardContent>
								</Card>
							</Card3D>
						</FadeIn>
					</div>
				</div>
			</section>
		</>
	)
}
