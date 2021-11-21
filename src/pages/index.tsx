import React from 'react'
import { useSession } from 'next-auth/client'
import Loading from 'components/index/Loading'
import Landing from 'components/index/Landing'
import { useRouter } from 'next/router'

// Kalau bisa page cuman representatif dari struktur page dan ngga pake api client 
const IndexPage = () => {
  const [session, loading] = useSession()
  const router = useRouter()
  if (loading) {
    return (
      <Loading />
    )
  }
  if (session) {
    router.push('/feeds')
  }
  return <Landing />
}

export default IndexPage
