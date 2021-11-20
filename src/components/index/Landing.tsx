import React from 'react'
import style from 'styles/layout/landing.module.css'
import Image from 'next/image'
import LandingNavbar from 'components/layout/LandingNavbar'
import Head from 'next/head'

const Headline = () => {
	return (
		<section className={style.headline}>
			<div className={style.left}>
				<div className={style.desc}>
					<h1 className={style.title}>
						Create, Search, and Manage your <span className={style.red}>Open Source Project</span>
					</h1>
					<p className={style.subtitle}>
					Join our worldwide open source community
					</p>
				</div>
				<button className={style.button}>Join Now</button>
			</div>
			<div className={style.right}>
				<Image src="/assets/landing/landing-img.svg" alt="landing" width="803" height="619"/>
			</div>
		</section>
	)
}

const About = () => {
	return (
		<section className={style.about}>
			<div className={style.left}>

			</div>
			<div className={style.right}>
				<h1 className={style.title}>
					A Collaboration Platform
				</h1>
				<p className={style.subtitle}>
					Join, create, and market your open source platform at OpenSearch! You can also join to search and contribute to existing open source!
				</p>
			</div>
		</section>
	)
}

const Action = () => {
	return (
		<section className={style.action}>
			
			<h1>How it Works?</h1>
			<p>Simple steps to follow on using our platform</p>
		</section>
	)
}

const Landing = () => {
	return (
		<div className={style.base}>
			<Head>
				<title>
					Create, Search, and Manage your Open Source Project | OpenSearch
				</title>
				<link rel="icon" href="/public/assets/favicon.ico" type="image/png" />
			</Head>
			<LandingNavbar/>
			<Headline />
			<About />
			<Action />
		</div>
	)
}

export default Landing