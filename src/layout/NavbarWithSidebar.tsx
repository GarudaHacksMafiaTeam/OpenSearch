import React from 'react'
import styles from 'styles/layout/navbarwithsidebar.module.css'
import Avatar from 'react-avatar'
import { BiBell } from 'react-icons/bi'
import { useState } from 'react'
import PopUpNotif from './PopUpNotif'

// Kalau bisa page cuman representatif dari struktur page dan ngga pake api client 
const NavbarWithSidebar = () => {
  const [openNotif, setOpenNotif] = useState(false);

  const handleClick = () => {
    setOpenNotif(!openNotif);
    console.log('openNotif', openNotif);
  }

  return <div className={styles.base}>
    <div className={styles.notifContainer}>
      <BiBell color='white' size='1.5rem' className={styles.bell} onClick={handleClick} />
      {
        openNotif && <PopUpNotif />
      }
    </div>
    <Avatar round={true} name="Mikasa Ackerman" size="1.5rem" />
    <h1 className={styles.name}>Mikasa Ackerman</h1>
  </div>
}

export default NavbarWithSidebar
