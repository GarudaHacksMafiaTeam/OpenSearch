import React from 'react'
import styles from 'styles/explore/index.module.css'
import Masonry from 'react-masonry-css'
import ExploreCard from 'components/explore/ExploreCard'
import Head from 'next/head'
import { gql, useQuery } from "@apollo/client"
import Loading from 'components/index/Loading'

const Explore = () => {
  const { data: response, loading } = useQuery(
    getOpenSourceProfiles,
    {
      notifyOnNetworkStatusChange: true,
      variables: {
        skip: 0,
        take: 5,
      }
    }
  )
  if (loading) {
    return <Loading />
  }
  return <>
    <Head>
      <title>Explore | OpenSearch</title>
    </Head>
    <Masonry
      breakpointCols={2}
      className={styles.myMasonryGrid}
      columnClassName={styles.myMasonryGridColumn}
    >
      {response.openSourceProfiles.map((openSourceProfile, idx) => <ExploreCard key={idx} openSourceProfile={openSourceProfile} id={openSourceProfile.openSourceId} />)}
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

export default Explore
