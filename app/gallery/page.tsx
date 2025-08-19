'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { motion } from 'framer-motion'

interface CakeItem {
	id: number
	title: string
	description: string
	category: string
	imageUrl: string
	price?: string
}

export default function GalleryPage() {
	const [selectedImage, setSelectedImage] = useState<CakeItem | null>(null)
	const [filter, setFilter] = useState('all')

	const cakeItems: CakeItem[] = [
		{
			id: 1,
			title: 'Torta Equina',
			description: 'Torta de chocolate con relleno de frambuesas frescas y ganache',
			category: 'customized',
			imageUrl: '/gallery/torta-equina.png',

			price: 'Cotizar',
		},
		{
			id: 2,
			title: 'Torta Casino',
			description: 'Torta de casino con decoración de cartas y dados',
			category: 'customized',
			imageUrl: '/gallery/torta-casino.png',
			price: 'Cotizar',
		},
		{
			id: 3,
			title: 'Torta Freefire',
			description: 'Torta temática del juego Freefire con relleno de crema oreo y dulce de leche',
			category: 'customized',
			imageUrl: '/gallery/torta-freefire.png',

			price: 'Cotizar',
		},
		{
			id: 4,
			title: '',
			description: '',
			category: 'desserts',

			imageUrl: '/gallery/postre-pascuas.png',
			price: '$20.000',
		},
		{
			id: 5,
			title: 'Huevo de Pascua relleno',
			description: 'El relleno y la decoración es a elección; Cadbury, Oreo o Chocotorta',
			category: 'desserts',
			imageUrl: '/placeholder.svg?height=500&width=500',
			price: 'Desde $4.000 c/u',
		},
		{
			id: 6,
			title: 'Torta de Aniversario',
			description: 'Elegante torta para celebrar aniversarios con decoración dorada',
			category: 'wedding',
			imageUrl: '/placeholder.svg?height=500&width=500',
			price: 'Desde $65.000',
		},
		{
			id: 7,
			title: 'Torta de Princesa',
			description: 'Torta de cumpleaños con temática de princesa y castillo encantado',
			category: 'birthday',
			imageUrl: '/placeholder.svg?height=500&width=500',
			price: 'Desde $50.000',
		},
		{
			id: 8,
			title: 'Cupcakes de Fresa',
			description: 'Cupcakes de vainilla con frosting de fresa y decoraciones rosadas',
			category: 'cupcakes',
			imageUrl: '/placeholder.svg?height=500&width=500',
			price: 'Desde $3.800 c/u',
		},
		{
			id: 9,
			title: 'Torta Red Velvet',
			description: 'Clásica torta red velvet con cream cheese frosting',
			category: 'special',
			imageUrl: '/placeholder.svg?height=500&width=500',
			price: 'Desde $48.000',
		},
		{
			id: 10,
			title: 'Torta de Compromiso',
			description: 'Elegante torta para celebrar compromisos con detalles personalizados',
			category: 'wedding',
			imageUrl: '/placeholder.svg?height=500&width=500',
			price: 'Desde $70.000',
		},
	]

	const filteredItems =
		filter === 'all' ? cakeItems : cakeItems.filter((item) => item.category === filter)

	const getCategoryName = (category: string) => {
		const categories = {
			all: 'Todos',
			birthday: 'Cumpleaños',
			customized: 'Temática',
			desserts: 'Postre',
			candybar: 'Candy Bar',
		}
		return categories[category as keyof typeof categories] || category
	}

	const getCategoryEmoji = (category: string) => {
		const emojis = {
			birthday: '🎂',
			customized: '🍰',
			desserts: '🍩',
			candybar: '✨',
		}
		return emojis[category as keyof typeof emojis] || '🍰'
	}

	return (
		<div className='min-h-screen bg-background'>
			{/* Hero Section */}
			<section className='py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5'>
				<div className='container px-4 md:px-6 text-center'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className='max-w-4xl mx-auto space-y-6'
					>
						<div className='inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4'>
							✨ Galería de Creaciones
						</div>
						<h1 className='text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter'>
							Nuestras Dulces
							<br />
							<span className='text-primary'>Creaciones</span>
						</h1>
						<p className='text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed'>
							Descubre nuestra colección de tortas artesanales, cada una creada con amor y los
							mejores ingredientes
						</p>
					</motion.div>
				</div>
			</section>

			{/* Gallery Section */}
			<section className='py-20'>
				<div className='container px-4 md:px-6'>
					{/* Filter Buttons */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className='flex flex-wrap justify-center gap-4 mb-12'
					>
						{['all', 'birthday', 'customized', 'desserts', 'candybar'].map((category) => (
							<Button
								key={category}
								variant={filter === category ? 'default' : 'outline'}
								onClick={() => setFilter(category)}
								className='transition-all duration-300 hover:scale-105'
							>
								{category !== 'all' && getCategoryEmoji(category)} {getCategoryName(category)}
							</Button>
						))}
					</motion.div>

					{/* Gallery Grid */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.6, delay: 0.4 }}
						className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
					>
						{filteredItems.length > 0 ? (
							filteredItems.map((item, index) => (
								<motion.div
									key={item.id}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.3, delay: index * 0.1 }}
								>
									<Card className='group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 h-full max-w-sm mx-auto'>
										<Dialog>
											<DialogTrigger asChild>
												<CardContent className='p-0 h-full cursor-pointer'>
													{/* Cambio principal: aspect-[4/3] en lugar de aspect-square */}
													<div className='relative aspect-[4/3] overflow-hidden bg-gray-50'>
														<Image
															src={item.imageUrl}
															alt={item.title}
															fill
															className='object-contain transition-transform duration-300 group-hover:scale-105 p-2'
														/>
														<div className='absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
															<span className='text-white text-sm font-medium px-3 py-1 bg-primary/90 rounded-full backdrop-blur-sm'>
																{getCategoryEmoji(item.category)} {getCategoryName(item.category)}
															</span>
														</div>
													</div>
													<div className='p-4'>
														<h3 className='text-lg font-bold mb-1 line-clamp-1'>{item.title}</h3>
														<p className='text-sm text-muted-foreground mb-2 line-clamp-2'>
															{item.description}
														</p>
														{item.price && (
															<p className='text-primary font-semibold text-base'>{item.price}</p>
														)}
													</div>
												</CardContent>
											</DialogTrigger>
											{/* Modal permanece igual */}
											<DialogContent className='sm:max-w-[800px]'>
												<div className='grid md:grid-cols-2 gap-6'>
													{/* En el modal también cambio para mostrar imagen completa */}
													<div className='relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-gray-50'>
														<Image
															src={item.imageUrl}
															alt={item.title}
															fill
															className='object-contain p-4'
														/>
													</div>
													<div className='flex flex-col justify-between'>
														<div>
															<DialogHeader className='mb-6'>
																<div className='flex items-center gap-2 mb-2'>
																	<span className='text-2xl'>
																		{getCategoryEmoji(item.category)}
																	</span>
																	<span className='px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium'>
																		{getCategoryName(item.category)}
																	</span>
																</div>
																<DialogTitle className='text-2xl font-bold mb-2'>
																	{item.title}
																</DialogTitle>
																<DialogDescription className='text-lg leading-relaxed'>
																	{item.description}
																</DialogDescription>
															</DialogHeader>

															<div className='space-y-4'>
																<div>
																	<h4 className='font-semibold mb-3 text-lg'>
																		✨ Características:
																	</h4>
																	<ul className='space-y-2'>
																		<li className='flex items-center gap-3'>
																			<span className='h-2 w-2 bg-primary rounded-full'></span>
																			<span>Sabores personalizables</span>
																		</li>
																		<li className='flex items-center gap-3'>
																			<span className='h-2 w-2 bg-primary rounded-full'></span>
																			<span>Decoración artesanal</span>
																		</li>
																		<li className='flex items-center gap-3'>
																			<span className='h-2 w-2 bg-primary rounded-full'></span>
																			<span>Ingredientes premium</span>
																		</li>
																		<li className='flex items-center gap-3'>
																			<span className='h-2 w-2 bg-primary rounded-full'></span>
																			<span>Diseño personalizado</span>
																		</li>
																	</ul>
																</div>
															</div>
														</div>

														<div className='mt-6 pt-6 border-t'>
															{item.price && (
																<div className='mb-4'>
																	<p className='text-sm text-muted-foreground mb-1'>
																		Precio desde:
																	</p>
																	<p className='text-2xl font-bold text-primary'>{item.price}</p>
																</div>
															)}
															<Button className='w-full' size='lg'>
																💬 Solicitar Cotización
															</Button>
														</div>
													</div>
												</div>
											</DialogContent>
										</Dialog>
									</Card>
								</motion.div>
							))
						) : (
							<div className='col-span-full text-center py-20'>
								<motion.div
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									className='space-y-4'
								>
									<div className='text-6xl'>🔍</div>
									<h3 className='text-2xl font-bold'>No se encontraron resultados</h3>
									<p className='text-muted-foreground max-w-md mx-auto'>
										No hay productos que coincidan con el filtro seleccionado. Prueba con otra
										categoría.
									</p>
									<Button onClick={() => setFilter('all')} className='mt-4'>
										Ver todos los productos
									</Button>
								</motion.div>
							</div>
						)}
					</motion.div>
				</div>
			</section>

			{/* CTA Section */}
			<section className='py-20 bg-gradient-to-b from-primary/5 to-background'>
				<div className='container px-4 md:px-6 text-center'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className='max-w-3xl mx-auto space-y-6'
					>
						<h2 className='text-4xl font-bold tracking-tighter'>
							¿Quieres ver tu torta soñada en nuestra galería?
						</h2>
						<p className='text-xl text-muted-foreground'>
							Contáctanos para hacer realidad tus ideas más dulces y crear algo único para tu
							ocasión especial
						</p>
						<Button
							size='lg'
							className='mt-6 px-8 py-6 text-lg hover:scale-105 transition-transform'
						>
							<a href='/contact' className='flex items-center gap-2'>
								💬 Contactar Ahora
							</a>
						</Button>
					</motion.div>
				</div>
			</section>
		</div>
	)
}
