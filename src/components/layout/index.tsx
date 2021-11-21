import React from 'react'
import Sidebar from './SideBar'
import NavbarWithSidebar from './NavbarWithSidebar'
import styles from 'styles/layout/index.module.css'
import { useRouter } from 'next/router'
import PlainNavbar from './PlainNavbar'
import OpenSourceHeader from './Header'
import TaskHeader from './TaskHeader'

const nonLayoutedPath = [
  '/auth',
]

const withoutSidebarPath = [
  '/opensource',
]

const whichHeader = (currPath) => {
  if (currPath.includes('task/')) {
    return <TaskHeader />
  } else if (currPath.includes('opensource')) {
    return <OpenSourceHeader />
  }
  return <div />
}


const checkPath = (pathsChecked, currPath) => {
  const filteredPath = pathsChecked.filter(path => currPath.includes(path))
  return filteredPath.length > 0
}

const Layout = ({ children }) => {
  const router = useRouter()
  const withoutLayout = checkPath(nonLayoutedPath, router.pathname)
  if (withoutLayout || router.pathname === '/') {
    return children
  }
  const withoutSidebar = checkPath(withoutSidebarPath, router.pathname)
  if (withoutSidebar) {
    const header = whichHeader(router.pathname)
    return <WithoutSidebar content={children} header={header} />
  } else {
    return <WithSidebar content={children} />
  }
}

const WithSidebar = ({ content }) => (
  <div className={styles.layout}>
    <Sidebar />
    <div className={styles.base}>
      <NavbarWithSidebar />
      {content}
    </div>
  </div>
)

const WithoutSidebar = ({ content, header }) => (
  <div className={styles.base}>
    <PlainNavbar />
    {header}
    {content}
  </div>
)

export default Layout
