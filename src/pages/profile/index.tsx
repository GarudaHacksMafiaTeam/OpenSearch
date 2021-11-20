import React from 'react'
import styles from "styles/profile/index.module.css"
import Avatar from 'react-avatar'
import { getSession } from "next-auth/client"
import getApolloClient from 'controller/getApolloClient'
import { gql } from "@apollo/client"

function Profile({ data: user, error }) {
  if (error) {
    return <div>{error}</div>
  }
  return (
    <div className={styles.profilePage}>
      <div className={styles.rightPartPage}>
        <h1 className={styles.profileTitle}>Your Profile</h1>
        <div className={styles.bodyProfile}>
          <div className={styles.mainProfile}>
            <div className={styles.imageContainer}>
              <Avatar src={user.image} name={user.email} size="10rem" alt="Profile Image" />
            </div>
            <div className={styles.profileTextContainer}>
              <h1 className={styles.profileName}>{user.name ? user.name : "Anonymous"}</h1>
              <div className={styles.profileText}>
                <p>{user.profile?.description ? user.profile?.description : "-"}</p>
              </div>
            </div>
          </div>
          <button className={styles.profileButton}>Edit Profile</button>
        </div>
        <h1 className={styles.profileTitle}>Your Open Sources</h1>
        <div className={styles.profileOpenSources}>
          <div className={styles.openSourceIconContainer}>
            <Avatar src={"https://picsum.photos/200"} alt="Open Source Icon" size="3rem" />
            <Avatar src={"https://picsum.photos/200"} alt="Open Source Icon" size="3rem" />
            <Avatar src={"https://picsum.photos/200"} alt="Open Source Icon" size="3rem" />
          </div>
          <button className={styles.openSourceButton}>Create Open Source</button>
        </div>
      </div>
    </div>
  );
}


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

export async function getServerSideProps(ctx) {
  const apolloClient = getApolloClient()
  try {
    const { user } = await getSession(ctx)
    const { data } = await apolloClient.query({
      query: exampleQuery,
      variables: { email: user.email }
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