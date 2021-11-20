import React from 'react'
import styles from 'styles/feeds/feedcontent.module.css'
import Avatar from 'react-avatar'
import { BiHeart, BiComment } from 'react-icons/bi'

// Kalau bisa page cuman representatif dari struktur page dan ngga pake api client 
const FeedContent = ({ feed }) => {
  return <div className={styles.base} >
    <Content feed={feed} />
    <UserInput />
    {feed.comments.map((comment, index) => <Message comment={comment} key={index} />)}
  </div>
}

const Content = ({ feed }) => (
  <>
    <div className={styles.heading}>
      <Avatar src={feed.openSource.profile.image} name={feed.openSource.profile.name} size="3rem" className={styles.logo} />
      <div>
        <h1>
          <strong>{feed.openSource.profile.name}</strong>
        </h1>
        <h2>
          {feed.openSource.profile.description}
        </h2>
      </div>
    </div>
    <p>
      {feed.content}
    </p>
    <div className={styles.icons}>
      <div className={styles.iconWrapper}>
        <BiHeart size='2rem' />
        <h1>{feed.reactions.length}</h1>
      </div>
      <div className={styles.iconWrapper}>
        <BiComment size='2rem' />
        <h1>{feed.comments.length}</h1>
      </div>
    </div>
    <hr />
  </>
)

const UserInput = () => (
  <div className={styles.userInput}>
    <Avatar round size="2.5rem" />
    <input className={styles.inputMessage} type="text" name="content" placeholder="Add Comment..." />
  </div>
)

const Message = ({ comment }) => (
  <div className={styles.message}>
    <Avatar src={comment.user.image} email={comment.user.email} name={comment.user.name} round size="2.5rem" />
    <div className={styles.payload}>
      {comment.content}
    </div>
  </div>
)

export default FeedContent
