import React from 'react'
import styles from "styles/profile/index.module.css"
import Avatar from 'react-avatar'
import { gql } from '@apollo/client'
import getApolloClient from 'controller/getApolloClient'
import { useRouter } from 'next/router'

function Profile({ data }) {
  const router = useRouter()
  return <div className={styles.profilePage}>
    <div className={styles.rightPartPage}>
      <h1 className={styles.profileTitle}>{data.user.name ? data.user.name : "Anonymous"} Profile</h1>
      <div className={styles.bodyProfile}>
        <div className={styles.mainProfile}>
          <div className={styles.imageContainer}>
            <Avatar src={data.user.image} name={data.user.name} email={data.user.email} size="10rem" alt="Profile Image" />
          </div>
          <div className={styles.profileTextContainer}>
            <h1 className={styles.profileName}>{data.user.name ? data.user.name : "Anonymous"}</h1>
            <div className={styles.profileText}>
              <p>{data.user.profile?.description ? data.user.profile?.description : "No description"}</p>
            </div>
          </div>
        </div>
      </div>
      <h1 className={styles.profileTitle}>{data.user.name ? data.user.name : "Anonymous"} Open Sources</h1>
      <div className={styles.profileOpenSources}>
        <div className={styles.openSourceIconContainer}>
          {data.user.accessToOpenSources.map((access, idx) => (
            <Avatar style={{ cursor: "hover" }} src={access.openSource.profile?.image} onClick={() => router.push(`/opensource/${access.openSource.id}`)} key={idx} alt="Open Source Icon" size="3rem" />
          ))}
        </div>
      </div>
    </div>
  </div>
}

export const getUserProfile = gql`
  query User($userId: Int) {
    user(id: $userId) {
      accessToOpenSources {
        openSource {
          id
          profile {
            image
          }
        }
      }
      email
      image
      name
      profile {
        description
      }
    }
  }
`

export async function getServerSideProps({ query }) {
  const apolloClient = getApolloClient()
  try {
    const { data } = await apolloClient.query({
      query: getUserProfile,
      variables: { userId: Number(query.id) }
    })
    return {
      props: {
        data: data
      }
    }
  } catch (err) {
    console.log(err);
    return {
      props: {
        error: err.toString(),
      }
    }
  }
}

export default Profile;
