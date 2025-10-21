'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { StarIcon, ChevronRight, ChevronLeft, Heart } from 'lucide-react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Card3D } from '@/components/3d-card'
import { FadeIn, StaggerChildren, StaggerItem } from '@/components/scroll-animations'

const CustomCakeIcon = ({ className }: { className?: string }) => (
	<svg
		className={className}
		height='496pt'
		viewBox='0 0 496 496'
		width='496pt'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='m464 416v-104c0-19.3125-13.769531-35.472656-32-39.191406v-104.808594c0-22.054688-17.945312-40-40-40h-1.902344l21.222656-17.6875c8.054688-6.710938 12.679688-16.585938 12.679688-27.074219 0-19.429687-15.808594-35.238281-35.238281-35.238281h-1.472657c-6.953124 0-13.601562 2-19.289062 5.726562-5.679688-3.726562-12.328125-5.726562-19.289062-5.726562h-1.472657c-1.160156 0-2.292969.28125-3.4375.398438-2.046875-27.023438-24.632812-48.398438-52.167969-48.398438h-1.25c-13.992187 0-27.144531 5.449219-37.03125 15.335938l-5.351562 5.351562-5.34375-5.34375c-9.894531-9.894531-23.046875-15.34375-37.03125-15.34375h-1.25c-27.535156 0-50.128906 21.375-52.167969 48.398438-1.160156-.117188-2.285156-.398438-3.445312-.398438h-1.472657c-6.953124 0-13.601562 2-19.289062 5.726562-5.679688-3.726562-12.328125-5.726562-19.289062-5.726562h-1.472657c-19.429687 0-35.238281 15.808594-35.238281 35.238281 0 10.488281 4.625 20.355469 12.679688 27.074219l21.222656 17.6875h-1.902344c-22.054688 0-40 17.945312-40 40v104.808594c-18.230469 3.71875-32 19.878906-32 39.191406v104h-32v8c0 22.054688 17.945312 40 40 40h64.808594c3.71875 18.230469 19.871094 32 39.191406 32h208c19.3125 0 35.472656-13.769531 39.191406-32h64.808594c22.054688 0 40-17.945312 40-40v-8zm-312-184c13.230469 0 24-10.769531 24-24v-8c0-4.40625 3.59375-8 8-8s8 3.59375 8 8v32c0 13.230469 10.769531 24 24 24s24-10.769531 24-24v-4.128906c0-7.070313 3.054688-13.253906 8.601562-17.40625 6.191407-4.632813 14.628907-6.007813 22.589844-3.679688 2.761719.808594 5.710938 1.214844 8.761719 1.214844 16 0 23.984375-10.648438 30.390625-19.199219 6.136719-8.175781 9.976562-12.800781 17.601562-12.800781 7.640626 0 11.480469 4.625 17.613282 12.800781 6.417968 8.550781 14.410156 19.199219 30.410156 19.199219 16.007812 0 24-10.648438 30.414062-19.199219 3.5625-4.746093 6.410157-8.121093 9.617188-10.265625v93.464844h-336v-17.472656c2.511719.898437 5.183594 1.472656 8 1.472656 13.230469 0 24-10.769531 24-24v-48c0-4.40625 3.59375-8 8-8s8 3.59375 8 8v24c0 13.230469 10.769531 24 24 24zm164.609375-131.558594c2.054687 3.742188 4.75 7.101563 8.070313 9.871094l21.222656 17.6875h-59.605469zm32.101563-36.441406c5.066406 0 10.023437 2.054688 13.632812 5.65625l5.679688 5.632812 5.65625-5.65625c3.585937-3.578124 8.535156-5.632812 13.609374-5.632812h1.472657c10.605469 0 19.238281 8.632812 19.238281 19.238281 0 5.730469-2.519531 11.113281-6.921875 14.785157l-33.078125 27.5625-33.078125-27.570313c-2.808594-2.34375-4.832031-5.496094-5.90625-9.078125 6.609375-6.761719 11.230469-15.136719 13.441406-24.226562 1.589844-.429688 3.191407-.710938 4.78125-.710938zm-144.34375-48h1.25c9.710937 0 18.847656 3.785156 25.71875 10.65625l16.664062 16.65625 16.664062-16.664062c6.863282-6.863282 16-10.648438 25.710938-10.648438h1.25c20.054688 0 36.375 16.320312 36.375 36.367188 0 10.226562-4.335938 20.03125-11.902344 26.914062l-53.585937 48.71875h-29.015625l-53.585938-48.710938c-7.574218-6.882812-11.910156-16.695312-11.910156-26.921874 0-20.046876 16.320312-36.367188 36.367188-36.367188zm-33.046876 94.3125c3.320313-2.769531 6.015626-6.128906 8.070313-9.871094l30.3125 27.558594h-59.605469zm-83.320312-27.074219c0-10.605469 8.632812-19.238281 19.238281-19.238281h1.472657c5.066406 0 10.023437 2.054688 13.632812 5.65625l5.679688 5.632812 5.65625-5.65625c3.585937-3.578124 8.535156-5.632812 13.609374-5.632812h1.472657c1.597656 0 3.191406.28125 4.78125.71875 2.21875 9.089844 6.839843 17.464844 13.441406 24.226562-1.074219 3.589844-3.097656 6.734376-5.90625 9.078126l-33.078125 27.5625-33.078125-27.570313c-4.402344-3.664063-6.921875-9.046875-6.921875-14.777344zm-8 84.761719c0-13.230469 10.769531-24 24-24h288c10.921875 0 20.0625 7.375 22.960938 17.382812-10.191407 3.097657-16.304688 11.066407-21.367188 17.816407-6.136719 8.175781-9.984375 12.800781-17.617188 12.800781-7.632812 0-11.480468-4.625-17.617187-12.800781-6.414063-8.550781-14.40625-19.199219-30.414063-19.199219-16 0-23.984374 10.648438-30.394531 19.199219-6.136719 8.175781-9.976562 12.800781-17.597656 12.800781-1.5625 0-2.960937-.183594-4.273437-.566406-12.757813-3.738282-26.472657-1.417969-36.671876 6.222656-9.535156 7.144531-15.007812 18.160156-15.007812 30.214844v4.128906c0 4.40625-3.59375 8-8 8s-8-3.59375-8-8v-32c0-13.230469-10.769531-24-24-24s-24 10.769531-24 24v8c0 4.40625-3.59375 8-8 8s-8-3.59375-8-8v-24c0-13.230469-10.769531-24-24-24s-24 10.769531-24 24v48c0 4.40625-3.59375 8-8 8s-8-3.59375-8-8zm-8 120h352c13.230469 0 24 10.769531 24 24v8.984375c-11.664062 2.710937-18.558594 11-24.230469 17.96875-6.777343 8.335937-11.042969 13.046875-19.816406 13.046875-8.777344 0-13.042969-4.710938-19.816406-13.046875-6.863281-8.449219-15.417969-18.953125-32.234375-18.953125-16.804688 0-25.351563 10.511719-32.207032 18.953125-6.773437 8.335937-11.03125 13.046875-19.800781 13.046875-8.757812 0-13.007812-4.710938-19.773437-13.039062-6.855469-8.449219-15.386719-18.960938-32.183594-18.960938-16.808594 0-25.34375 10.511719-32.210938 18.960938-6.765624 8.328124-11.03125 13.039062-19.789062 13.039062-8.761719 0-13.007812-4.710938-19.777344-13.039062-6.855468-8.449219-15.398437-18.960938-32.199218-18.960938-16.800782 0-25.335938 10.511719-32.199219 18.960938-6.769531 8.328124-11.027344 13.039062-19.777344 13.039062-8.761719 0-13.015625-4.710938-19.785156-13.039062-5.664063-6.976563-12.550781-15.265626-24.199219-17.976563v-8.984375c0-13.230469 10.769531-24 24-24zm-24 50.007812c4.089844 2.089844 7.464844 5.726563 11.777344 11.03125 6.863281 8.449219 15.398437 18.960938 32.207031 18.960938s25.335937-10.511719 32.199219-18.960938c6.761718-8.328124 11.015625-13.039062 19.777344-13.039062 8.757812 0 13.015624 4.710938 19.78125 13.039062 6.859374 8.449219 15.402343 18.960938 32.203124 18.960938 16.808594 0 25.34375-10.511719 32.199219-18.953125 6.765625-8.335937 11.023438-13.046875 19.792969-13.046875 8.75 0 13.007812 4.710938 19.765625 13.039062 6.855469 8.449219 15.394531 18.960938 32.191406 18.960938 16.808594 0 25.351563-10.511719 32.210938-18.953125 6.773437-8.335937 11.039062-13.046875 19.796875-13.046875 8.777344 0 13.042968 4.710938 19.816406 13.046875 6.875 8.449219 15.417969 18.953125 32.234375 18.953125s25.359375-10.503906 32.230469-18.953125c4.328125-5.320313 7.710937-8.957031 11.816406-11.046875v78h-400zm304 141.992188h-208c-10.414062 0-19.214844-6.710938-22.527344-16h253.046875c-3.304687 9.289062-12.105469 16-22.519531 16zm104-32h-416c-10.433594 0-19.328125-6.6875-22.632812-16h461.257812c-3.296875 9.3125-12.191406 16-22.625 16zm0 0'
			fill='currentColor'
		/>
	</svg>
)

const TimerIcon = ({ className }: { className?: string }) => (
	<svg
		className={className}
		version='1.1'
		id='svg4191'
		width='682.66669'
		height='682.66669'
		viewBox='0 0 682.66669 682.66669'
		xmlns='http://www.w3.org/2000/svg'
	>
		<defs id='defs4195'>
			<clipPath clipPathUnits='userSpaceOnUse' id='clipPath4205'>
				<path d='M 0,512 H 512 V 0 H 0 Z' id='path4203' />
			</clipPath>
		</defs>
		<g id='g4197' transform='matrix(1.3333333,0,0,-1.3333333,0,682.66667)'>
			<g id='g4199'>
				<g id='g4201' clip-path='url(#clipPath4205)'>
					<g id='g4207' transform='translate(151.7905,127.7417)'>
						<path
							d='m 0,0 c 0,-26.563 -21.534,-48.097 -48.097,-48.097 -26.563,0 -48.097,21.534 -48.097,48.097 0,26.563 21.534,48.097 48.097,48.097 C -21.534,48.097 0,26.563 0,0 Z'
							style={{
								fill: 'none',
								stroke: 'currentColor',
								strokeWidth: 15,
								strokeLinecap: 'round',
								strokeLinejoin: 'round',
								strokeMiterlimit: 10,
								strokeDasharray: 'none',
								strokeOpacity: 1,
							}}
							id='path4209'
						/>
					</g>
					<g id='g4211' transform='translate(119.7256,127.7417)'>
						<path
							d='m 0,0 c 0,-8.854 -7.178,-16.032 -16.032,-16.032 -8.854,0 -16.032,7.178 -16.032,16.032 0,8.854 7.178,16.033 16.032,16.033 C -7.178,16.033 0,8.854 0,0 Z'
							style={{
								fill: 'none',
								stroke: 'currentColor',
								strokeWidth: 15,
								strokeLinecap: 'round',
								strokeLinejoin: 'round',
								strokeMiterlimit: 10,
								strokeDasharray: 'none',
								strokeOpacity: 1,
							}}
							id='path4213'
						/>
					</g>
					<g id='g4215' transform='translate(472.4355,127.7417)'>
						<path
							d='m 0,0 c 0,-26.563 -21.534,-48.097 -48.097,-48.097 -26.563,0 -48.097,21.534 -48.097,48.097 0,26.563 21.534,48.097 48.097,48.097 C -21.534,48.097 0,26.563 0,0 Z'
							style={{
								fill: 'none',
								stroke: 'currentColor',
								strokeWidth: 15,
								strokeLinecap: 'round',
								strokeLinejoin: 'round',
								strokeMiterlimit: 10,
								strokeDasharray: 'none',
								strokeOpacity: 1,
							}}
							id='path4217'
						/>
					</g>
					<g id='g4219' transform='translate(440.3711,127.7417)'>
						<path
							d='m 0,0 c 0,-8.854 -7.178,-16.032 -16.032,-16.032 -8.855,0 -16.032,7.178 -16.032,16.032 0,8.854 7.177,16.033 16.032,16.033 C -7.178,16.033 0,8.854 0,0 Z'
							style={{
								fill: 'none',
								stroke: 'currentColor',
								strokeWidth: 15,
								strokeLinecap: 'round',
								strokeLinejoin: 'round',
								strokeMiterlimit: 10,
								strokeDasharray: 'none',
								strokeOpacity: 1,
							}}
							id='path4221'
						/>
					</g>
					<g id='g4223' transform='translate(151.7905,127.7417)'>
						<path
							d='M 0,0 H 224.451'
							style={{
								fill: 'none',
								stroke: 'currentColor',
								strokeWidth: 15,
								strokeLinecap: 'round',
								strokeLinejoin: 'round',
								strokeMiterlimit: 10,
								strokeDasharray: 'none',
								strokeOpacity: 1,
							}}
							id='path4225'
						/>
					</g>
					<g id='g4227' transform='translate(440.8291,312.1152)'>
						<path
							d='m 0,0 -11.009,39.667 c -3.274,9.82 -12.463,16.443 -22.815,16.443 h -62.828 c -8.854,0 -16.032,-7.177 -16.032,-16.032 v -184.37 c 0,-4.428 -3.589,-8.017 -8.016,-8.017 h -179.111'
							style={{
								fill: 'none',
								stroke: 'currentColor',
								strokeWidth: 15,
								strokeLinecap: 'round',
								strokeLinejoin: 'round',
								strokeMiterlimit: 10,
								strokeDasharray: 'none',
								strokeOpacity: 1,
							}}
							id='path4229'
						/>
					</g>
					<g id='g4231' transform='translate(472.4355,127.7417)'>
						<path
							d='m 0,0 h 16.032 c 8.855,0 16.032,7.178 16.032,16.033 v 67.29 c 0,8.041 -4.018,15.55 -10.709,20.01 l -37.387,24.925 -6.676,24.054'
							style={{
								fill: 'none',
								stroke: 'currentColor',
								strokeWidth: 15,
								strokeLinecap: 'round',
								strokeLinejoin: 'round',
								strokeMiterlimit: 10,
								strokeDasharray: 'none',
								strokeOpacity: 1,
							}}
							id='path4233'
						/>
					</g>
					<g id='g4235' transform='translate(456.4033,256)'>
						<path
							d='m 0,0 h -80.162 c -8.854,0 -16.032,7.178 -16.032,16.032 v 48.097 c 0,8.854 7.178,16.032 16.032,16.032 h 24.049'
							style={{
								fill: 'none',
								stroke: 'currentColor',
								strokeWidth: 15,
								strokeLinecap: 'round',
								strokeLinejoin: 'round',
								strokeMiterlimit: 10,
								strokeDasharray: 'none',
								strokeOpacity: 1,
							}}
							id='path4237'
						/>
					</g>
					<g id='g4239' transform='translate(496.4839,215.9194)'>
						<path
							d='m 0,0 h -8.016 c -8.855,0 -16.032,-7.178 -16.032,-16.032 0,-8.855 7.177,-16.032 16.032,-16.032 H 8.016'
							style={{
								fill: 'none',
								stroke: 'currentColor',
								strokeWidth: 15,
								strokeLinecap: 'round',
								strokeLinejoin: 'round',
								strokeMiterlimit: 10,
								strokeDasharray: 'none',
								strokeOpacity: 1,
							}}
							id='path4241'
						/>
					</g>
					<g id='g4243' transform='translate(328.145,215.9194)'>
						<path
							d='M 0,0 H 112.226'
							style={{
								fill: 'none',
								stroke: 'currentColor',
								strokeWidth: 15,
								strokeLinecap: 'round',
								strokeLinejoin: 'round',
								strokeMiterlimit: 10,
								strokeDasharray: 'none',
								strokeOpacity: 1,
							}}
							id='path4245'
						/>
					</g>
					<g id='g4247' transform='translate(440.3711,280.0483)'>
						<path
							d='M 0,0 H -16.032 V 32.064 H 0 c 8.854,0 16.032,-7.177 16.032,-16.032 C 16.032,7.178 8.854,0 0,0 Z'
							style={{
								fill: 'none',
								stroke: 'currentColor',
								strokeWidth: 15,
								strokeLinecap: 'round',
								strokeLinejoin: 'round',
								strokeMiterlimit: 10,
								strokeDasharray: 'none',
								strokeOpacity: 1,
							}}
							id='path4249'
						/>
					</g>
					<g id='g4251' transform='translate(55.5967,127.7417)'>
						<path
							d='m 0,0 h -40.081 c -4.427,0 -8.016,3.589 -8.016,8.017 v 16.032 c 0,4.427 3.589,8.016 8.016,8.016 H 9.77'
							style={{
								fill: 'none',
								stroke: 'currentColor',
								strokeWidth: 15,
								strokeLinecap: 'round',
								strokeLinejoin: 'round',
								strokeMiterlimit: 10,
								strokeDasharray: 'none',
								strokeOpacity: 1,
							}}
							id='path4253'
						/>
					</g>
					<g id='g4255' transform='translate(95.6768,304.0967)'>
						<path
							d='m 0,0 h -56.112 c -8.855,0 -16.033,-7.178 -16.033,-16.032 V -144.29'
							style={{
								fill: 'none',
								stroke: 'currentColor',
								strokeWidth: 15,
								strokeLinecap: 'round',
								strokeLinejoin: 'round',
								strokeMiterlimit: 10,
								strokeDasharray: 'none',
								strokeOpacity: 1,
							}}
							id='path4257'
						/>
					</g>
					<g id='g4259' transform='translate(296.0806,159.8066)'>
						<path
							d='m 0,0 v 128.258 c 0,8.854 -7.178,16.032 -16.032,16.032 h -152.309'
							style={{
								fill: 'none',
								stroke: 'currentColor',
								strokeWidth: 15,
								strokeLinecap: 'round',
								strokeLinejoin: 'round',
								strokeMiterlimit: 10,
								strokeDasharray: 'none',
								strokeOpacity: 1,
							}}
							id='path4261'
						/>
					</g>
					<g id='g4263' transform='translate(239.9678,304.0967)'>
						<path
							d='m 0,0 v 80.162 c 0,8.854 -7.178,16.032 -16.032,16.032 h -128.259 c -8.854,0 -16.032,-7.178 -16.032,-16.032 V 0'
							style={{
								fill: 'none',
								stroke: 'currentColor',
								strokeWidth: 15,
								strokeLinecap: 'round',
								strokeLinejoin: 'round',
								strokeMiterlimit: 10,
								strokeDasharray: 'none',
								strokeOpacity: 1,
							}}
							id='path4265'
						/>
					</g>
					<g id='g4267' transform='translate(280.0488,207.9033)'>
						<path
							d='M 0,0 H 16.032'
							style={{
								fill: 'none',
								stroke: 'currentColor',
								strokeWidth: 15,
								strokeLinecap: 'round',
								strokeLinejoin: 'round',
								strokeMiterlimit: 10,
								strokeDasharray: 'none',
								strokeOpacity: 1,
							}}
							id='path4269'
						/>
					</g>
					<g id='g4271' transform='translate(23.5322,207.9033)'>
						<path
							d='M 0,0 H 224.45'
							style={{
								fill: 'none',
								stroke: 'currentColor',
								strokeWidth: 15,
								strokeLinecap: 'round',
								strokeLinejoin: 'round',
								strokeMiterlimit: 10,
								strokeDasharray: 'none',
								strokeOpacity: 1,
							}}
							id='path4273'
						/>
					</g>
					<g id='g4275' transform='translate(23.5322,264.0161)'>
						<path
							d='M 0,0 C 17.027,0 17.027,-16.032 34.055,-16.032 51.083,-16.032 51.083,0 68.11,0 c 17.028,0 17.028,-16.032 34.056,-16.032 17.022,0 17.022,16.032 34.045,16.032 17.025,0 17.025,-16.032 34.05,-16.032 17.04,0 17.04,16.032 34.08,16.032 17.052,0 17.052,-16.032 34.104,-16.032 17.052,0 17.052,16.032 34.103,16.032'
							style={{
								fill: 'none',
								stroke: 'currentColor',
								strokeWidth: 15,
								strokeLinecap: 'round',
								strokeLinejoin: 'round',
								strokeMiterlimit: 10,
								strokeDasharray: 'none',
								strokeOpacity: 1,
							}}
							id='path4277'
						/>
					</g>
					<g id='g4279' transform='translate(79.6421,356.5015)'>
						<path
							d='m 0,0 c 3.032,2.147 6.687,3.708 12,3.708 17.028,0 17.028,-16.032 34.056,-16.032 17.022,0 17.022,16.032 34.045,16.032 17.025,0 17.025,-16.032 34.05,-16.032 17.04,0 17.04,16.032 34.08,16.032 5.363,0 9.039,-1.585 12.089,-3.759'
							style={{
								fill: 'none',
								stroke: 'currentColor',
								strokeWidth: 15,
								strokeLinecap: 'round',
								strokeLinejoin: 'round',
								strokeMiterlimit: 10,
								strokeDasharray: 'none',
								strokeOpacity: 1,
							}}
							id='path4281'
						/>
					</g>
					<g id='g4283' transform='translate(159.8066,416.3228)'>
						<path
							d='m 0,0 c 0,-8.854 -7.178,-16.032 -16.032,-16.032 -8.855,0 -16.033,7.178 -16.033,16.032 0,8.854 7.178,16.032 16.033,16.032 C -7.178,16.032 0,8.854 0,0 Z'
							style={{
								fill: 'none',
								stroke: 'currentColor',
								strokeWidth: 15,
								strokeLinecap: 'round',
								strokeLinejoin: 'round',
								strokeMiterlimit: 10,
								strokeDasharray: 'none',
								strokeOpacity: 1,
							}}
							id='path4285'
						/>
					</g>
					<g id='g4287' transform='translate(191.8711,416.3228)'>
						<path
							d='m 0,0 c 0,-8.854 -7.178,-16.032 -16.032,-16.032 -8.855,0 -16.032,7.178 -16.032,16.032 0,8.854 7.177,16.032 16.032,16.032 C -7.178,16.032 0,8.854 0,0 Z'
							style={{
								fill: 'none',
								stroke: 'currentColor',
								strokeWidth: 15,
								strokeLinecap: 'round',
								strokeLinejoin: 'round',
								strokeMiterlimit: 10,
								strokeDasharray: 'none',
								strokeOpacity: 1,
							}}
							id='path4289'
						/>
					</g>
					<g id='g4291' transform='translate(79.645,320.1289)'>
						<path
							d='m 0,0 c 0,-8.854 -7.178,-16.032 -16.032,-16.032 -8.855,0 -16.032,7.178 -16.032,16.032 0,8.854 7.177,16.032 16.032,16.032 C -7.178,16.032 0,8.854 0,0 Z'
							style={{
								fill: 'none',
								stroke: 'currentColor',
								strokeWidth: 15,
								strokeLinecap: 'round',
								strokeLinejoin: 'round',
								strokeMiterlimit: 10,
								strokeDasharray: 'none',
								strokeOpacity: 1,
							}}
							id='path4293'
						/>
					</g>
					<g id='g4295' transform='translate(272.0322,320.1289)'>
						<path
							d='m 0,0 c 0,-8.854 -7.178,-16.032 -16.032,-16.032 -8.855,0 -16.032,7.178 -16.032,16.032 0,8.854 7.177,16.032 16.032,16.032 C -7.178,16.032 0,8.854 0,0 Z'
							style={{
								fill: 'none',
								stroke: 'currentColor',
								strokeWidth: 15,
								strokeLinecap: 'round',
								strokeLinejoin: 'round',
								strokeMiterlimit: 10,
								strokeDasharray: 'none',
								strokeOpacity: 1,
							}}
							id='path4297'
						/>
					</g>
				</g>
			</g>
		</g>
	</svg>
)

const MixerIcon = ({ className }: { className?: string }) => (
	<svg
		className={className}
		version='1.1'
		id='svg3087'
		width='682.66669'
		height='682.66669'
		viewBox='0 0 682.66669 682.66669'
		xmlns='http://www.w3.org/2000/svg'
	>
		<defs id='defs3091'>
			<clipPath clipPathUnits='userSpaceOnUse' id='clipPath3101'>
				<path d='M 0,512 H 512 V 0 H 0 Z' id='path3099' />
			</clipPath>
		</defs>
		<g id='g3093' transform='matrix(1.3333333,0,0,-1.3333333,0,682.66667)'>
			<g id='g3095'>
				<g id='g3097' clip-path='url(#clipPath3101)'>
					<g id='g3103' transform='translate(406,256)'>
						<path
							d='m 0,0 c 0,-82.843 -67.157,-150 -150,-150 -82.843,0 -150,67.157 -150,150 0,82.843 67.157,150 150,150 C -67.157,150 0,82.843 0,0 Z'
							style={{
								fill: 'none',
								stroke: 'currentColor',
								strokeWidth: 30,
								strokeLinecap: 'round',
								strokeLinejoin: 'round',
								strokeMiterlimit: 10,
								strokeDasharray: 'none',
								strokeOpacity: 1,
							}}
							id='path3105'
						/>
					</g>
					<g id='g3107' transform='translate(331,301)'>
						<path
							d='m 0,0 -90,-90 -60,60'
							style={{
								fill: 'none',
								stroke: 'currentColor',
								strokeWidth: 30,
								strokeLinecap: 'round',
								strokeLinejoin: 'round',
								strokeMiterlimit: 10,
								strokeDasharray: 'none',
								strokeOpacity: 1,
							}}
							id='path3109'
						/>
					</g>
					<g id='g3111' transform='translate(236.5459,489.8374)'>
						<path
							d='m 0,0 c 11.212,9.55 27.696,9.55 38.908,0 l 38.983,-34.405 65.969,5.105 c 14.684,1.136 28.021,-8.553 31.477,-22.869 l 13.226,-54.776 57.639,-34.502 c 12.547,-7.712 17.641,-23.39 12.023,-37.003 l -22.771,-55.177 22.771,-55.177 c 5.618,-13.614 0.524,-29.292 -12.023,-37.004 l -57.639,-34.502 -13.226,-54.776 c -3.456,-14.315 -16.793,-24.005 -31.477,-22.869 l -65.324,5.056 -39.628,-34.776 c -11.212,-9.55 -27.696,-9.55 -38.908,0 l -39.628,34.776 -65.324,-5.056 c -14.684,-1.136 -28.021,8.554 -31.477,22.869 l -13.279,54.993 -57.542,34.285 c -12.548,7.712 -17.642,23.39 -12.023,37.004 l 22.77,55.177 -22.77,55.177 c -5.619,13.613 -0.525,29.291 12.023,37.003 l 52.61,31.255 18.211,58.023 c 3.456,14.316 16.793,24.005 31.477,22.869 l 65.97,-5.105 z'
							style={{
								fill: 'none',
								stroke: 'currentColor',
								strokeWidth: 30,
								strokeLinecap: 'round',
								strokeLinejoin: 'round',
								strokeMiterlimit: 10,
								strokeDasharray: 'none',
								strokeOpacity: 1,
							}}
							id='path3113'
						/>
					</g>
				</g>
			</g>
		</g>
	</svg>
)

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
								className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-5xl/none'
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
								icon: <CustomCakeIcon className='h-10 w-10 text-primary' />,
								title: 'Diseños Personalizados',
								description:
									'Creamos diseños a medida para cada ocasión, reflejando tus gustos y necesidades específicas.',
							},
							{
								icon: <TimerIcon className='h-10 w-10 text-primary' />,
								title: (
									<>
										Entrega
										<br />
										Puntual
									</>
								),

								description:
									'Garantizamos que tus pedidos lleguen a tiempo y en perfectas condiciones para tu celebración.',
							},
							{
								icon: <MixerIcon className='h-10 w-10 text-primary' />,
								title: 'Ingredientes de Calidad',
								description:
									'Utilizamos solo ingredientes frescos y de la más alta calidad para garantizar un sabor incomparable.',
							},
						].map((feature, index) => (
							<StaggerItem key={index} direction='up'>
								<Card3D className='h-full border-brand-accent1 border-2 rounded-lg hover:border-primary transition-colors duration-300 frosting-drip'>
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
									¿Listos para probar la magia?
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
