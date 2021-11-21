import React from 'react'
import styles from "styles/profile/index.module.css"
import Avatar from 'react-avatar'
import { getSession } from "next-auth/client"
import getApolloClient from 'controller/getApolloClient'
import { gql, useMutation } from "@apollo/client"
import Head from 'next/head'
import { useRouter } from 'next/router'
import ReactModal from 'react-modal';
import { useState } from 'react';
import axios from 'axios'
// import { BiUpload } from 'react-icons/bi'

const CREATE_PROFILE = gql`
  mutation CreateUserProfile($userId: Int!, $description: String, $name: String, $image: String) { 
    createUserProfile(userId: $userId, description: $description) {
      id
      userId
    }
    updateUser(id: $userId, name: $name, image: $image) {
      id    
    }
  }
`

function Profile({ data: { user }, error }) {
  const [createProfile] = useMutation(CREATE_PROFILE, { fetchPolicy: "network-only" });
  const router = useRouter()
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => {
    setShow(true)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const imgFile = form.image.files[0];
    const imgFormData = new FormData()
    imgFormData.append('file', imgFile)
    imgFormData.append("upload_preset", "h4oea9l0")
    const res = await axios.post('https://api.cloudinary.com/v1_1/dncbtxucm/image/upload', imgFormData)
    const image = res.data.url

    const name = form.name.value;
    const description = form.desc.value;
    const variables = {
      description,
      name,
      image,
      userId: user.id,
      email: user.email,
    }
    createProfile({
      variables
    })
    form.image.value = '';
    form.name.value = '';
    form.desc.value = '';
    router.reload()
  }

  if (error) {
    return <div>{error}</div>
  }
  return (
    <div className={styles.profilePage}>
      <Modal show={show} handleSubmit={handleSubmit} handleClose={handleClose} />
      <Head>
        <title>{user.name ? user.name : "Your Profile"} | OpenSearch</title>
      </Head>
      <div className={styles.rightPartPage}>
        <h1 className={styles.profileTitle}>Your Profile</h1>
        <div className={styles.bodyProfile}>
          <div className={styles.mainProfile}>
            <div className={styles.imageContainer}>
              <Avatar src={user.image} email={user.email} name={user.name} size="10rem" alt="Profile Image" />
            </div>
            <div className={styles.profileTextContainer}>
              <h1 className={styles.profileName}>{user.name ? user.name : "Anonymous"}</h1>
              <div className={styles.profileText}>
                <p>{user.profile?.description ? user.profile?.description : "No description"}</p>
              </div>
            </div>
          </div>
          <button className={styles.profileButton} onClick={handleShow}>Edit Profile</button>
        </div>
        <h1 className={styles.profileTitle}>Your Open Sources</h1>
        <div className={styles.profileOpenSources}>
          <div className={styles.openSourceIconContainer}>
            {user.accessToOpenSources?.map((access, idx) => (
              <Avatar style={{ cursor: "pointer" }} src={access.openSource.profile?.image} onClick={() => router.push(`/opensource/${access.openSource.id}`)} key={idx} alt="Open Source Icon" size="3rem" />
            ))}
          </div>
          <button className={styles.openSourceButton} onClick={() => router.push('/create-open-source')}>Create Open Source</button>
        </div>
      </div>
    </div>
  );
}

const Modal = ({ show, handleSubmit, handleClose }) => (
  <ReactModal
    isOpen={show}
    contentLabel="Create New Task"
    className={styles.modal}
    overlayClassName={styles.overlay}
  >
    <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
      <h1>Edit Profile</h1>
      <label className={styles.formLabel}>
        Avatar:
      </label>
      <div className={styles.inputForm}>
        <input type="file" name="image" id="image" className={styles.customFileInput} >
        </input>
      </div>
      <label className={styles.formLabel}>
        Name:
      </label>
      <div className={styles.inputForm}>
        <input type="text" name="name" id="name" />
      </div>
      <label className={styles.formLabel}>
        Description:
      </label>
      <div className={styles.inputForm}>
        <textarea name="desc" id="desc" />
      </div>
      <div className={styles.submitPart}>
        <button onClick={handleClose} className={styles.btn + " " + styles.btnSubmit}>
          Close
        </button>
        <button type="submit" className={styles.btn + " " + styles.btnSubmit}>Submit</button>
      </div>
    </form>
  </ReactModal>
)

export const GET_USER = gql`
  query User($email: String) {
    user(email: $email) {
      id
      name
      email
      createdAt
      updatedAt
      image
      profile {
        description
        userId
        id
      }
      accessToOpenSources {
        openSource {
          id
          profile {
            image
          }
        }
      }
    }
  }
`

export async function getServerSideProps(ctx) {
  const apolloClient = getApolloClient()
  try {
    const { user } = await getSession(ctx)
    const { data } = await apolloClient.query({
      query: GET_USER,
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
