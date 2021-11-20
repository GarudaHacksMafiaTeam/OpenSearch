import React from 'react'
import styles from 'styles/feeds/feedcard.module.css'
import Avatar from 'react-avatar'
import { BiHeart, BiComment } from 'react-icons/bi'
import { useRouter } from 'next/router'

const FeedCard = ({ id, name, description, content, totalLikes, totalComments }) => {
  const router = useRouter()

  return <div className={styles.base} onClick={() => router.push(`/feeds/${id}`)}>
    <div className={styles.heading}>
      <Avatar size="3rem" className={styles.logo} />
      <div>
        <h1>
          <strong>{name}</strong>
        </h1>
        <h2>
          {description}
        </h2>
      </div>
    </div>
    <p>
      {content}
    </p>
    <div className={styles.icons}>
      <div className={styles.iconWrapper}>
        <BiHeart size='2rem' />
        <h1>{totalLikes}</h1>
      </div>
      <div className={styles.iconWrapper}>
        <BiComment size='2rem' />
        <h1>{totalComments}</h1>
      </div>
    </div>
  </div>
}

export default FeedCard
