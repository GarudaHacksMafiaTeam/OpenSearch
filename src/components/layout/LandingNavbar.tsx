import navstyle from 'styles/layout/landingnavbar.module.css'
import Link from 'next/link'

const LandingNavbar = () => {
  return (
		<div className={navstyle.navbarbase}>
			<Link href="/">
				<a>
					<h1 className={navstyle.brand}>
						Open<strong>Search</strong>
					</h1>
				</a>
			</Link>

			<div className={navstyle.navlink}>
				<Link href='#about'>
					About
				</Link>
				<Link href='#action'>
					How it Works
				</Link>
				<Link href='/auth/signin'>
					<a>
						<button className={navstyle.button}>
							Login / Sign Up
						</button>
					</a>
				</Link>
			</div>
		</div>
	)
}

export default LandingNavbar