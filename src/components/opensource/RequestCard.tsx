import React from 'react'
import styles from 'styles/opensource/requestcard.module.css'
import Avatar from 'react-avatar'
import { useRouter } from 'next/router'

const RequestCard = ({ id, name, description, content, image }) => {
  const router = useRouter()

  return <div className={styles.base} onClick={() => router.push(`/request/${id}`)}>
    <div className={styles.leftPart}>
      <div className={styles.heading}>
        <Avatar src={image} size="3rem" className={styles.logo} />
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
    </div>
    <div className={styles.rightPart}>
      <button>
        Accept
      </button>
    </div>
  </div>
}

export default RequestCard;
