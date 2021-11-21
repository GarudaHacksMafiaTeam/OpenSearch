import React from 'react'
import TaskBlock from 'components/opensource/TaskBlock'
import Head from 'next/head'
import getApolloClient from 'controller/getApolloClient';
import { gql, useQuery } from "@apollo/client"
import { UPDATE_OPEN_SOURCE, useOpenSource } from 'context/opensource';


const Task = ({ data }) => {
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

  return (
    <>
      <Head>
        <title>Feeds | OpenSearch</title>
      </Head>
      {[1].map((x, index) => <TaskBlock key={index} id={x} />)}
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

export default Task;
