import React from 'react'
import styles from 'styles/layout/navbarwithsidebar.module.css'
import Avatar from 'react-avatar'
import { BiBell } from 'react-icons/bi'
import { useState } from 'react'
import PopUpNotif from './PopUpNotif'
import { useSession } from 'next-auth/client'
import SignOutPopUp from './SignOutPopUp'

// Kalau bisa page cuman representatif dari struktur page dan ngga pake api client 
const NavbarWithSidebar = () => {
  const [openNotif, setOpenNotif] = useState(false);
  const [openSignOutOpt, setSignOutOpt] = useState(false);
  const [session, loading] = useSession()

  const handleClick = () => {
    setOpenNotif(!openNotif);
    console.log('openNotif', openNotif);
  }

  return <div className={styles.base}>
    {
      !loading
      &&
      <>
        <div className={styles.notifContainer}>
          <BiBell color='white' size='1.5rem' className={styles.bell} onClick={handleClick} />
          {
            openNotif && <PopUpNotif />
          }
        </div>
        <div className={styles.notifContainer}>
          <Avatar round={true} src={session.user.image} email={session.user.email} name={session.user.name} size="1.5rem" onClick={() => setSignOutOpt(!openSignOutOpt)} className={styles.avatar} />
          {
            openSignOutOpt && <SignOutPopUp />
          }
        </div>
        <h1 className={styles.name}>{session.user.name ? session.user.name : "Anonymous"}</h1>
      </>
    }
  </div>
}

export default NavbarWithSidebar
