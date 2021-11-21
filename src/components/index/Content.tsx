import React from 'react'
import { useNotification } from 'context/notification'
import Image from 'next/image'
import { signIn, signOut } from 'next-auth/client'
import { useQuery, gql } from '@apollo/client'
import Head from 'next/head'

export const exampleQuery = gql`
  query User($email: String) {
    user(email: $email) {
      id
      email
      createdAt
      updatedAt
      profile {
        description
        image
        name
        userId
        id
      }
    }
  }
`

const Content = ({ session }) => {
  if (session) {
    return (
      <SignedIn
        session={session}
      />
    )
  } else {
    return (
      <SignIn />
    )
  }
}

const SignedIn = ({ session }) => {
  const { state } = useNotification()
  const { data, loading: queryLoading, refetch } = useQuery(
    exampleQuery,
    {
      notifyOnNetworkStatusChange: true,
      variables: { email: session?.user?.email }
    }
  )
  return (
    <div className="flex justify-center mt-8 text-center" style={{ color: 'white' }}>
      <div className="flex-auto">
        state:
        <br />
        {JSON.stringify(state)}
        {session.user.image && (
          <Image
            // @ts-ignore
            src={session.user.image}
            // @ts-ignore
            alt={session.user.email ?? session.user.name}
            width="60"
            height="60"
            className="h-16 w-16 rounded-full mx-auto mb-2"
          />
        )}
        <div className="text-lg mb-2">Hello, {session.user.email ?? session.user.name}</div>
        <div className="mb-2">
          gql test query:
          <br />
          <pre>
            {queryLoading ? 'fetching...' : JSON.stringify(data, 0, 2)}
          </pre>
          <button className="btn-blue ml-2" onClick={() => refetch()}>
            Refetch!
          </button>
        </div>
        <button className="btn-green" onClick={() => signOut()}>
          Sign out
        </button>
      </div>
    </div>
  )
}

const SignIn = () => (
  <div className="flex justify-center mt-8 text-center">
    <Head>
      <title>Sign In | OpenSearch</title>
    </Head>
    <div className="flex-auto">
      <div className="text-lg mb-2">You are not logged in!</div>
      <button className="btn-green" onClick={() => signIn()}>
        Sign in
      </button>
    </div>
  </div>
)

export default Content
