import React from 'react'
import styles from 'styles/feeds/feedcontent.module.css'
import Avatar from 'react-avatar'
import { BiHeart, BiComment } from 'react-icons/bi'
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client"
import { getSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import Loading from 'components/index/Loading'

export const GET_FEED = gql`
  query Feed($id: Int) {
    feed(id: $id) {
      id
      title
      content
      comments {
        content
        user {
          email
          name
          image
        }
      }
      reactions {
        id
      }
      openSource {
        profile {
          image
          name
          description
        }
      }
    }
  }
`

// Kalau bisa page cuman representatif dari struktur page dan ngga pake api client 
const FeedContent = () => {
  const router = useRouter()
  const { loading, error, data, refetch } = useQuery(GET_FEED,
    {
      variables: {
        id: Number(router.query.id)
      }
    }
  );
  if (loading) {
    return <Loading />
  }
  return <div className={styles.base} >
    <Content feed={data.feed} />
    <UserInput feedId={data.feed.id} refetch={refetch} />
    {data.feed.comments.map((comment, index) => <Message comment={comment} key={index} />)}
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

export const GET_USER = gql`
  query User($email: String) {
    user(email: $email) {
      id
    }
  }
`

export const CREATE_COMMENT = gql`
  mutation Mutation($userId: Int, $feedId: Int, $content: String) {
    createComment(userId: $userId, feedId: $feedId, content: $content) {
      content
      user {
        image
      }
    }
  }
`

const UserInput = ({ refetch, feedId }) => {
  const [createComment, { data: mutationData, loading: mutationLoading }] = useMutation(CREATE_COMMENT, { fetchPolicy: "network-only" });
  const [getUser, { data, loading, error }] = useLazyQuery(GET_USER, { fetchPolicy: "network-only", nextFetchPolicy: "network-only" });
  const [notifyChange, setNotifyChange] = React.useState(false)
  const [message, setMessage] = React.useState("")
  React.useEffect(() => {
    if (data) {
      createComment({
        variables: {
          feedId,
          content: message,
          userId: data.user.id,
        }
      })
      setMessage('')
    }
  }, [data])

  React.useEffect(() => {
    refetch()
  }, [mutationData, mutationLoading, loading])
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const session = await getSession()
      getUser({
        variables: {
          email: session.user.email
        }
      })
      setNotifyChange(!notifyChange)
    } catch (err) {
      alert(err.toString())
    }
  }
  return (
    <div className={styles.userInput}>
      <Avatar round size="2.5rem" />
      <form onSubmit={handleSubmit} className={styles.form}>
        <input className={styles.inputMessage} value={message} type="text" name="content" placeholder="Add Comment..." onChange={(e) => setMessage(e.target.value)} />
        <button type="submit" className={styles.formbtn} />
      </form>
    </div>
  )
}

const Message = ({ comment }) => (
  <div className={styles.message}>
    <Avatar src={comment.user.image} email={comment.user.email} name={comment.user.name} round size="2.5rem" />
    <div className={styles.payload}>
      {comment.content}
    </div>
  </div>
)

export default FeedContent
