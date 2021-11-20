import React from 'react'
import styles from 'styles/feeds/feedcard.module.css'
import Avatar from 'react-avatar'
import { BiHeart, BiComment } from 'react-icons/bi'
import { useRouter } from 'next/router'

const FeedCard = ({ id }) => {
  const router = useRouter()

  return <div className={styles.base} onClick={() => router.push(`/feeds/${id}`)}>
    <div className={styles.heading}>
      <Avatar size="3rem" className={styles.logo} />
      <div>
        <h1>
          <strong>Name</strong>
        </h1>
        <h2>
          Description of the opensource
        </h2>
      </div>
    </div>
    <p>
      amet sed vel error aspernatur. reiciendis cum eligendi voluptatem praesentium voluptas nihil facere.
      cupiditate eligendi quos dignissimos autem aut amet nostrum. amet sed vel error aspernatur. reiciendis cum
      eligendivoluptatem praesentium voluptas nihil facere. Cupiditate eligendi quos dignissimos autem aut amet
    </p>
    <div className={styles.icons}>
      <div className={styles.iconWrapper}>
        <BiHeart size='2rem' />
        <h1>200</h1>
      </div>
      <div className={styles.iconWrapper}>
        <BiComment size='2rem' />
        <h1>2</h1>
      </div>
    </div>
  </div>
}

export default FeedCard
