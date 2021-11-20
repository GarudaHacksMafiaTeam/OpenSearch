import React from 'react'
import styles from 'styles/feeds/index.module.css'
import FeedCard from 'components/feeds/FeedCard'
import getApolloClient from 'controller/getApolloClient'
import { gql } from "@apollo/client"
import Head from 'next/head'

const Feeds = ({ data }) => {
  return <div>
    <Head>
      <title>Feeds | OpenSearch</title>
    </Head>
    <h1 className={styles.header}>
      Feeds
    </h1>
    {
      data.feeds.map((feed, index) => <FeedCard
        key={index}
        id={feed.id}
        totalComments={feed.comments.length}
        totalLikes={feed.reactions.length}
        name={feed.openSource.profile.name}
        description={feed.openSource.profile.description}
        content={feed.content}
      />)
    }
  </div>
}

export const getFeeds = gql`
  query Tasks($skip: Int, $take: Int) {
    feeds(skip: $skip, take: $take) {
      id
      title
      content
      openSource {
        profile {
          image
          description
          name
          openSourceId
        }
      }
      comments {
        id
      }
      reactions {
        id
      }
    }
  }
`

export async function getStaticProps(_context) {
  const apolloClient = getApolloClient()
  try {
    const { data } = await apolloClient.query({
      query: getFeeds,
      variables: {
        skip: 0,
        take: 5,
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
        error: err
      }
    }
  }
}

export default Feeds
