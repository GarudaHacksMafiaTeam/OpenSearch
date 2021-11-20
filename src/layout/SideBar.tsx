import React from 'react'
import styles from 'styles/layout/sidebar.module.css'
import { BiHomeAlt, BiUserCircle, BiCompass } from 'react-icons/bi'
import Link from 'next/link';
import { useRouter } from 'next/router'

const Sidebar = () => {
  const toLink = (name, icon, to) => ({ name, icon, to })
  const links = [
    toLink('Feeds', BiHomeAlt, '/feeds'),
    toLink('Explore', BiCompass, '/explore'),
    toLink('Profile', BiUserCircle, '/profile'),
  ]
  const router = useRouter()
  return <div className={styles.base}>
    <h1 className={styles.header}>
      Open<strong>Search</strong>
    </h1>
    <br />
    <div>
      {links.map((link, index) => <SidebarLink key={index} name={link.name} Icon={link.icon} to={link.to} active={router.pathname === link.to} />)}
    </div>
  </div>;
}

const SidebarLink = ({ active, name, to, Icon }) => (
  <div className={styles.link + " " + (active ? styles.active : "")}>
    <Link href={to}>
      <a className={styles.linkcontent}>
        <Icon className={styles.icon} color={active ? 'black' : 'white'} />
        <p className={styles.linkname}>{name}</p>
      </a>
    </Link>
    {active && <div className={styles.activebg} />}
  </div >
)

export default Sidebar
