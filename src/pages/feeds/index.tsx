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
        description={feed.title}
        content={feed.content}
        image={feed.openSource.profile.image}
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

export async function getStaticProps() {
  const apolloClient = getApolloClient()
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
}

export default Feeds
