import React from 'react'
import styles from 'styles/feeds/index.module.css'
import FeedContent from 'components/feeds/FeedContent'
import getApolloClient from 'controller/getApolloClient'
import { gql } from "@apollo/client"

const Feeds = ({ data }) => {
  return <div>
    <h1 className={styles.header}>
      Feeds
    </h1>
    <FeedContent feed={data.feed} />
  </div>
}

export const getFeed = gql`
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

export async function getServerSideProps({ query }) {
  const apolloClient = getApolloClient()
  try {
    const { data } = await apolloClient.query({
      query: getFeed,
      variables: {
        id: Number(query.id),
      }
    })

    return {
      props: {
        data
      }
    }
  } catch (err) {
    return {
      props: {
        error: err.toString()
      }
    }
  }
}


export default Feeds
