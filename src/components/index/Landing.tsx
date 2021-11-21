import React from 'react'
import style from 'styles/layout/landing.module.css'
import Image from 'next/image'
import LandingNavbar from 'components/layout/LandingNavbar'
import Link from 'next/link'
import Head from 'next/head'
import Footer from 'components/layout/Footer'
import { motion } from "framer-motion";

const Headline = () => {
	return (
		<header className={style.content}>
			<motion.div className={style.left}
				exit={{
					opacity: 0,
					y: -50
				}}
				initial={{ opacity: 0 }}
				animate={{ y: -10, opacity: 1 }}
				transition={{
					duration: 0.8,
					delay: 0.5,
					ease: 'easeInOut'
				}}
			>
				<div className={style.textbox}>
					<h1 className={style.title}>
						Create, Search, and Manage your <span className={style.red}>Open Source Project</span>
					</h1>
					<p className={style.desc}>
						Join our worldwide open source community
					</p>
				</div>
				<Link href='/auth/signin'>
					<a>
						<button className={style.button}>
							Join Now
						</button>
					</a>
				</Link>
			</motion.div>
			<motion.div className={style.right}
				exit={{
					opacity: 0,
					y: -50
				}}
				initial={{ opacity: 0 }}
				animate={{ y: -10, opacity: 1 }}
				transition={{
					duration: 0.8,
					delay: 0.6,
					ease: 'easeInOut'
				}}
			>
				<Image src="/assets/landing/landing-img-1.svg" alt="landing-img-1" width="803" height="619"/>
			</motion.div>
		</header>
	)
}

const About = () => {
	return (
		<motion.section id="about" className={style.content}
			exit={{
				opacity: 0,
				y: -50
			}}
			initial={{ opacity: 0 }}
			animate={{ y: -10, opacity: 1 }}
			transition={{
				duration: 0.8,
				delay: 0.5,
				ease: 'easeInOut'
			}}
		>
			<div className={style.left}>
				<Image className={style.leftimg} src="/assets/landing/landing-img-2.svg" alt="landing-img-2" width="828" height="750"/>
			</div>
			<div className={style.right}>
				<div className={style.textbox}>
					<p className={style.aboutblock}>
						About Us
					</p>
					<h1 className={ [style.title2, style.red].join(' ') }>
						A Collaboration Platform
					</h1>
					<p className={style.desc}>
						Join, create, and manage your open source platform at OpenSearch! You can also join to search and contribute to existing open source!
					</p>
				</div>
			</div>
		</motion.section>
	)
}

const ActionTile = ({children, ...props}) => {
	return (
		<motion.div className={style.tilecontainer}
			exit={{
				opacity: 0,
				y: -50
			}}
			initial={{ opacity: 0 }}
			animate={{ y: -10, opacity: 1 }}
			transition={{
				duration: 0.8,
				delay: 0.5,
				ease: 'easeInOut'
			}}
		>
			<div className={style.tileblock}>
				<div className={style.tilebox}>
					<div className={style.blockimg}>
						{ children }
					</div>
					<p>
						{ props.step }
					</p>
				</div>
				<p>
					{ props.desc }
				</p>
			</div>
		</motion.div>
	)
}

const Action = () => {
	return (
		<section id="action" className={[style.content, style.bgnavy].join(' ')}>
			<div>
				<div className={style.actiontitle}>
					<h1>
						How it Works?
					</h1>
					<p>
						Simple steps to follow on using our platform
					</p>
				</div>
				<div className={style.tilecontainer}>
					<ActionTile
						step="Register yourself"
						desc="Fill in your email, the registration is passwordless!"
					>
						<Image src="/assets/landing/landing-img-3.svg" alt="yes" width="250" height="300"/>
					</ActionTile>
					<ActionTile
						step="Create and share your Open Source Project"
						desc="Create feeds & customize your open source profile!"
					>
						<Image src="/assets/landing/landing-img-4.svg" alt="yes" width="250" height="300"/>
					</ActionTile>
					<ActionTile
						step="Join Open Source"
						desc="Explore your favorite open source projects and join them!"
					>
						<Image src="/assets/landing/landing-img-5.svg" alt="yes" width="250" height="300"/>
					</ActionTile>
				</div>
			</div>
		</section>
	)
}

const Landing = () => {
	return (
		<motion.div className={style.base}
		>
			<Head>
				<title>
					OpenSearch | Create, Search, and Manage your Open Source Project 
				</title>
				<link rel="icon" href="/public/assets/favicon.ico" type="image/png" />
			</Head>
			<LandingNavbar/>
			<Headline />
			<About />
			<Action />
			<Footer />
		</motion.div>
	)
}

export default Landing