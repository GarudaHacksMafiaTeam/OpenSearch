import React from 'react'
import AboutOpenSource from 'components/opensource/AboutOpenSource';
import getApolloClient from 'controller/getApolloClient';
import { gql } from "@apollo/client"
import { UPDATE_OPEN_SOURCE, useOpenSource } from 'context/opensource';

const OpenSourceProfile = ({ data }) => {
  const { dispatch } = useOpenSource()
  React.useEffect(() => {
    dispatch({
      type: UPDATE_OPEN_SOURCE,
      name: data.openSourceProfile.name,
      image: data.openSourceProfile.image,
      description: data.openSourceProfile.description,
      id: data.openSourceProfile.openSourceId,
    })
  }, [])
  return <AboutOpenSource />
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
        data: data
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
