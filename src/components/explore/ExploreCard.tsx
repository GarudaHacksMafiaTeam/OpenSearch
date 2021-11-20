import React from 'react'
import styles from 'styles/explore/explorecard.module.css'
import Avatar from 'react-avatar'
import { useRouter } from 'next/router'

const ExploreCard = ({ id, openSourceProfile }) => {
  const router = useRouter()

  return <div className={styles.base}>
    <div className={styles.heading}>
      <Avatar src={openSourceProfile.image} name={openSourceProfile.name} size="3rem" className={styles.logo} />
      <div>
        <h1>
          <strong>{openSourceProfile.name}</strong>
        </h1>
        <h2>
          {openSourceProfile.description}
        </h2>
      </div>
    </div>
    <div className={styles.buttonWrapper}>
      <button className={styles.joinbtn} onClick={() => router.push(`/opensource/${id}`)}>Join Now</button>
    </div>
  </div>
}



export default ExploreCard
