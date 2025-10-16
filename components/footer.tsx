'use client'

import type React from 'react'

import Link from 'next/link'
import { Instagram, Facebook, Twitter, Heart, ArrowUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface FooterLinksProps {
	title: string
	links: { name: string; href: string }[]
	delay?: number
}

interface SocialIconProps {
	href: string
	icon: React.ReactNode
}

interface AnimatedScrollTopProps {
	show: boolean
	onClick: () => void
}

export function Footer() {
	const [showScrollTop, setShowScrollTop] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 500) {
				setShowScrollTop(true)
			} else {
				setShowScrollTop(false)
			}
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}

	return (
		<footer className='relative bg-gradient-to-b from-accent to-primary-50 border-t'>
			{/* Burbujas decorativas */}
			<div className='absolute inset-0 overflow-hidden pointer-events-none'>
				{[...Array(15)].map((_, i) => (
					<div
						key={i}
						className='bubble'
						style={{
							left: `${Math.random() * 100}%`,
							width: `${Math.random() * 50 + 10}px`,
							height: `${Math.random() * 50 + 10}px`,
							animationDuration: `${Math.random() * 10 + 5}s`,
							animationDelay: `${Math.random() * 5}s`,
						}}
					/>
				))}
			</div>

			{/* Botón de volver arriba */}
			<AnimatedScrollTop show={showScrollTop} onClick={scrollToTop} />

			<div className='container px-4 md:px-6 py-12 md:py-16 relative z-10'>
				<div className='grid grid-cols-1 md:grid-cols-4 gap-10'>
					<motion.div
						className='space-y-4'
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						viewport={{ once: true }}
					>
						<h3 className='text-2xl font-display gradient-text'>Los dulces de Lu</h3>
						<p className='text-muted-foreground'>
							Pastelería artesanal con diseños personalizados para cada ocasión.
						</p>
						<div className='flex space-x-4'>
							<SocialIcon href='https://instagram.com' icon={<Instagram />} />
							<SocialIcon href='https://facebook.com' icon={<Facebook />} />
							<SocialIcon href='https://twitter.com' icon={<Twitter />} />
						</div>
					</motion.div>

					<FooterLinks
						title='Enlaces'
						links={[
							{ name: 'Inicio', href: '/' },
							{ name: 'Galería', href: '/gallery' },
							{ name: 'Nosotros', href: '/about' },
							{ name: 'Contacto', href: '/contact' },
						]}
						delay={0.1}
					/>

					<FooterLinks
						title='Productos'
						links={[
							{ name: 'Tortas de Cumpleaños', href: '/gallery' },
							{ name: 'Cupcakes', href: '/gallery' },
							{ name: 'Pasteles Personalizados', href: '/gallery' },
							{ name: 'Postres Especiales', href: '/gallery' },
						]}
						delay={0.2}
					/>

					<motion.div
						className='space-y-4'
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.3 }}
						viewport={{ once: true }}
					>
						<h4 className='text-xl font-bold gradient-text'>Contacto</h4>
						<p className='text-muted-foreground flex items-center gap-2'>
							<span className='inline-block w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center'>
								📧
							</span>
							info@losdulcesdelu.com
						</p>
						<p className='text-muted-foreground flex items-center gap-2'>
							<span className='inline-block w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center'>
								📞
							</span>
							(+54) 11 1234 5678
						</p>
						<p className='text-muted-foreground flex items-center gap-2'>
							<span className='inline-block w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center'>
								📍
							</span>
							Av. Pastelería 123, Ciudad Dulce
						</p>
					</motion.div>
				</div>

				<motion.div
					className='mt-12 border-t pt-8 text-center text-muted-foreground'
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.4 }}
					viewport={{ once: true }}
				>
					<div className='flex items-center justify-center gap-2'>
						Los dulces de Lu 2025 © Hecho por Jacqueline
						<motion.div
							animate={{ scale: [1, 1.2, 1] }}
							transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
						>
							<Heart className='h-4 w-4 text-primary fill-primary' />
						</motion.div>
					</div>
				</motion.div>
			</div>
		</footer>
	)
}

function FooterLinks({ title, links, delay = 0 }: FooterLinksProps) {
	return (
		<motion.nav
			className='space-y-4'
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay }}
			viewport={{ once: true }}
		>
			<h4 className='text-xl font-bold gradient-text'>{title}</h4>
			<ul className='space-y-3'>
				{links.map((link, index) => (
					<motion.li
						key={link.name}
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.3, delay: delay + index * 0.1 }}
						viewport={{ once: true }}
					>
						<Link href={link.href} className='group flex items-center'>
							<span className='h-1.5 w-1.5 bg-primary rounded-full mr-2 transition-all duration-300 group-hover:w-3'></span>
							<span className='hover:text-primary transition-colors'>{link.name}</span>
						</Link>
					</motion.li>
				))}
			</ul>
		</motion.nav>
	)
}

function SocialIcon({ href, icon }: SocialIconProps) {
	return (
		<motion.a
			href={href}
			className='h-10 w-10 bg-white/80 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors duration-300 shadow-md'
			whileHover={{ y: -5, scale: 1.1 }}
			whileTap={{ scale: 0.9 }}
		>
			{icon}
			<span className='sr-only'>Social Media</span>
		</motion.a>
	)
}

function AnimatedScrollTop({ show, onClick }: AnimatedScrollTopProps) {
	return (
		<AnimatePresence>
			{show && (
				<motion.button
					className='fixed bottom-6 right-6 h-12 w-12 bg-primary rounded-full flex items-center justify-center text-white shadow-lg z-50'
					onClick={onClick}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 20 }}
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
				>
					<ArrowUp />
					<span className='sr-only'>Volver arriba</span>
				</motion.button>
			)}
		</AnimatePresence>
	)
}
