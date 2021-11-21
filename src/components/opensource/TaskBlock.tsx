import React from 'react'
import styles from 'styles/opensource/task/taskblock.module.css'
import Avatar from 'react-avatar'
import { useRouter } from 'next/router'

const TaskCard = ({ id }) => {
  const router = useRouter()

  return <div className={styles.base}>
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
    <br />
    <br />
    <div className={styles.buttonWrapper}>
      <button className={styles.joinbtn} onClick={() => router.push(`${router.asPath}/${id}`)}>Join Now</button>
    </div>
  </div>
}

export default TaskCard
