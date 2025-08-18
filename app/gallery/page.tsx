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
			title: 'Torta de Chocolate y Frambuesas',
			description: 'Deliciosa torta de chocolate con relleno de frambuesas frescas y ganache',
			category: 'birthday',
			imageUrl: '/placeholder.svg?height=500&width=500',
			price: 'Desde $45.000'
		},
		{
			id: 2,
			title: 'Cupcakes de Vainilla',
			description: 'Cupcakes de vainilla con frosting de crema de mantequilla artesanal',
			category: 'cupcakes',
			imageUrl: '/placeholder.svg?height=500&width=500',
			price: 'Desde $3.500 c/u'
		},
		{
			id: 3,
			title: 'Torta de Boda Elegante',
			description: 'Torta de tres pisos con decoración floral para bodas y eventos especiales',
			category: 'wedding',
			imageUrl: '/placeholder.svg?height=500&width=500',
			price: 'Desde $120.000'
		},
		{
			id: 4,
			title: 'Torta de Cumpleaños de Unicornio',
			description: 'Colorida torta temática de unicornio ideal para fiestas infantiles',
			category: 'birthday',
			imageUrl: '/placeholder.svg?height=500&width=500',
			price: 'Desde $55.000'
		},
		{
			id: 5,
			title: 'Cupcakes de Chocolate',
			description: 'Cupcakes de chocolate con chips y frosting de ganache premium',
			category: 'cupcakes',
			imageUrl: '/placeholder.svg?height=500&width=500',
			price: 'Desde $4.000 c/u'
		},
		{
			id: 6,
			title: 'Torta de Aniversario',
			description: 'Elegante torta para celebrar aniversarios con decoración dorada',
			category: 'wedding',
			imageUrl: '/placeholder.svg?height=500&width=500',
			price: 'Desde $65.000'
		},
		{
			id: 7,
			title: 'Torta de Princesa',
			description: 'Torta de cumpleaños con temática de princesa y castillo encantado',
			category: 'birthday',
			imageUrl: '/placeholder.svg?height=500&width=500',
			price: 'Desde $50.000'
		},
		{
			id: 8,
			title: 'Cupcakes de Fresa',
			description: 'Cupcakes de vainilla con frosting de fresa y decoraciones rosadas',
			category: 'cupcakes',
			imageUrl: '/placeholder.svg?height=500&width=500',
			price: 'Desde $3.800 c/u'
		},
		{
			id: 9,
			title: 'Torta Red Velvet',
			description: 'Clásica torta red velvet con cream cheese frosting',
			category: 'special',
			imageUrl: '/placeholder.svg?height=500&width=500',
			price: 'Desde $48.000'
		},
		{
			id: 10,
			title: 'Torta de Compromiso',
			description: 'Elegante torta para celebrar compromisos con detalles personalizados',
			category: 'wedding',
			imageUrl: '/placeholder.svg?height=500&width=500',
			price: 'Desde $70.000'
		}
	]

	const filteredItems = filter === 'all' ? cakeItems : cakeItems.filter((item) => item.category === filter)

	const getCategoryName = (category: string) => {
		const categories = {
			'all': 'Todos',
			'birthday': 'Cumpleaños',
			'wedding': 'Bodas',
			'cupcakes': 'Cupcakes',
			'special': 'Especiales'
		}
		return categories[category as keyof typeof categories] || category
	}

	const getCategoryEmoji = (category: string) => {
		const emojis = {
			'birthday': '🎂',
			'wedding': '💒',
			'cupcakes': '🧁',
			'special': '✨'
		}
		return emojis[category as keyof typeof emojis] || '🍰'
	}

	return (
		<div className="min-h-screen bg-background">
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
							Descubre nuestra colección de tortas artesanales, cada una creada con amor y los mejores ingredientes
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
						{['all', 'birthday', 'wedding', 'cupcakes', 'special'].map((category) => (
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
						className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
					>
						{filteredItems.length > 0 ? (
							filteredItems.map((item, index) => (
								<motion.div
									key={item.id}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.3, delay: index * 0.1 }}
								>
									<Card className='group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 h-full'>
										<Dialog>
											<DialogTrigger asChild>
												<CardContent className='p-0 h-full cursor-pointer'>
													<div className='relative aspect-square overflow-hidden'>
														<Image
															src={item.imageUrl}
															alt={item.title}
															fill
															className='object-cover transition-transform duration-300 group-hover:scale-110'
														/>
														<div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6'>
															<span className='text-white text-sm font-medium px-3 py-1 bg-primary/80 rounded-full w-fit mb-2'>
																{getCategoryEmoji(item.category)} {getCategoryName(item.category)}
															</span>
															<h3 className='text-xl font-bold text-white mb-1'>
																{item.title}
															</h3>
															<p className='text-white/80 text-sm'>
																{item.description}
															</p>
															{item.price && (
																<p className='text-white font-semibold text-lg mt-2'>
																	{item.price}
																</p>
															)}
														</div>
													</div>
													<div className='p-6'>
														<h3 className='text-xl font-bold mb-2'>{item.title}</h3>
														<p className='text-sm text-muted-foreground mb-3'>
															{item.description}
														</p>
														{item.price && (
															<p className='text-primary font-semibold text-lg'>
																{item.price}
															</p>
														)}
													</div>
												</CardContent>
											</DialogTrigger>
											<DialogContent className='sm:max-w-[800px]'>
												<div className='grid md:grid-cols-2 gap-6'>
													<div className='relative aspect-square w-full overflow-hidden rounded-lg'>
														<Image
															src={item.imageUrl}
															alt={item.title}
															fill
															className='object-cover'
														/>
													</div>
													<div className='flex flex-col justify-between'>
														<div>
															<DialogHeader className='mb-6'>
																<div className='flex items-center gap-2 mb-2'>
																	<span className='text-2xl'>{getCategoryEmoji(item.category)}</span>
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
																	<h4 className='font-semibold mb-3 text-lg'>✨ Características:</h4>
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
																	<p className='text-sm text-muted-foreground mb-1'>Precio desde:</p>
																	<p className='text-2xl font-bold text-primary'>{item.price}</p>
																</div>
															)}
															<Button className='w-full' size="lg">
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
										No hay productos que coincidan con el filtro seleccionado. Prueba con otra categoría.
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
							Contáctanos para hacer realidad tus ideas más dulces y crear algo único para tu ocasión especial
						</p>
						<Button size='lg' className='mt-6 px-8 py-6 text-lg hover:scale-105 transition-transform'>
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
