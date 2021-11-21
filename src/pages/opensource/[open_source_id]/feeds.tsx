import React from 'react'
import FeedCard from 'components/feeds/FeedCard'
import getApolloClient from 'controller/getApolloClient';
import { gql, useQuery } from "@apollo/client"
import { UPDATE_OPEN_SOURCE, useOpenSource } from 'context/opensource';
import Loading from 'components/index/Loading';

const GET_FEEDS = gql`
  query Feeds($openSourceId: Int) {
    feeds(openSourceId: $openSourceId) {
      title
      content
      comments {
        id
      }
      reactions {
        id
      }
    }
  }
`

const OpenSourceProfile = ({ data, id }) => {
  const { dispatch } = useOpenSource()
  const { testdata, loading } = useQuery(
    GET_FEEDS,
    {
      notifyOnNetworkStatusChange: true,
      variables: { openSourceId: id }
    }
  )

  React.useEffect(() => {
    dispatch({
      type: UPDATE_OPEN_SOURCE,
      name: data.openSourceProfile.name,
      image: data.openSourceProfile.image,
      description: data.openSourceProfile.description,
      id: data.openSourceProfile.openSourceId,
    })
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <>
      {JSON.stringify(testdata)}
    </>
  );
}

export const GET_OPEN_SOURCE = gql`
  query OpenSourceProfile($openSourceId: Int) {
    openSourceProfile(openSourceId: $openSourceId) {
      name
      image
      description
      openSourceId
    }
  }
`

export async function getServerSideProps({ query }) {
  const apolloClient = getApolloClient()
  try {
    const { data } = await apolloClient.query({
      query: GET_OPEN_SOURCE,
      variables: { openSourceId: Number(query.open_source_id) }
    })
    return {
      props: {
        data: data,
        id: Number(query.open_source_id)
      }
    }
  } catch (err) {
    return {
      props: {
        error: err.toString(),
      }
    }
  }
}


export default OpenSourceProfile;
