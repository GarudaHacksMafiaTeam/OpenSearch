import React from 'react'
import styles from 'styles/layout/plainnavbar.module.css'
import Avatar from 'react-avatar'
import { BiBell } from 'react-icons/bi'
import Link from 'next/link'
import { useState } from 'react'
import PopUpNotif from 'components/layout/PopUpNotif'
import Sidebar from './SideBar'
import { useSession } from 'next-auth/client'
import SignOutPopUp from './SignOutPopUp'

// Kalau bisa page cuman representatif dari struktur page dan ngga pake api client 
const PlainNavbar = () => {
  const [openNotif, setOpenNotif] = useState(false);
  const [openSignOutOpt, setSignOutOpt] = useState(false);
  const [session, loading] = useSession()

  const handleClick = () => {
    setOpenNotif(!openNotif);
    console.log('openNotif', openNotif);
  }

  return (
    <div>
      {
        !loading
        &&
        <>
          <div className={styles.popup}>
            {/* 
            <div className={styles.sidebarContainer}>
              <Sidebar />
            </div>
            */}
            {/* <div className="overlay"></div> */}
          </div>
          <div className={styles.base}>
            <Link href="/">
              <a >
                <h1 className={styles.brand}>
                  Open<strong>Search</strong>
                </h1>
              </a>
            </Link>
            <div className={styles.rightnav}>
              <div className={styles.notifContainer}>
                <BiBell color='white' size='1.5rem' className={styles.bell} onClick={handleClick} />
                {
                  openNotif && <PopUpNotif />
                }
              </div>
              <div className={styles.notifContainer}>
                <Avatar round={true} name="Mikasa Ackerman" size="1.5rem" onClick={() => setSignOutOpt(!openSignOutOpt)} className={styles.avatar} />
                {
                  openSignOutOpt && <SignOutPopUp />
                }
              </div>
              <h1 className={styles.name}>{session.user.name ? session.user.name : "Anonymous"}</h1>

            </div>
          </div>
        </>
      }
    </div>
  );
}

export default PlainNavbar
