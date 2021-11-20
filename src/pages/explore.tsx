import React from 'react'
import styles from 'styles/explore/index.module.css'
import Masonry from 'react-masonry-css'
import ExploreCard from 'components/explore/ExploreCard'
import Head from 'next/head'
import getApolloClient from 'controller/getApolloClient'
import { gql } from "@apollo/client"

const Explore = ({ data }) => {
  return <>
    <Head>
      <title>Explore | OpenSearch</title>
    </Head>
    <Masonry
      breakpointCols={2}
      className={styles.myMasonryGrid}
      columnClassName={styles.myMasonryGridColumn}
    >
      {data.openSourceProfiles.map((openSourceProfile, idx) => <ExploreCard key={idx} openSourceProfile={openSourceProfile} id={openSourceProfile.id} />)}
    </Masonry>
  </>
}

const getOpenSourceProfiles = gql`
  query OpenSourceProfiles($take: Int, $skip: Int) {
    openSourceProfiles(skip: $skip, take: $take) {
      openSourceId
      name
      image
      description
    }
  }
`

export async function getStaticProps(_context) {
  const apolloClient = getApolloClient()
  try {
    const { data } = await apolloClient.query({
      query: getOpenSourceProfiles,
      variables: {
        skip: 0,
        take: 5,
      }
    })
    return {
      props: {
        data: data
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

export default Explore
