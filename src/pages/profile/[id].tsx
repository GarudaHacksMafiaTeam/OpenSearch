import styles from "styles/profile/index.module.css"
import Avatar from 'react-avatar'
import { useQuery, gql } from '@apollo/client'
import { useSession } from "next-auth/client"
import Loading from "components/index/Loading"

export const getUserProfile = gql`
  query User($email: String) {
    user(email: $email) {
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

function Profile() {
  const [session, loading] = useSession()
  if (loading) {
    return <Loading />
  }
  return (
    <ProfileUI session={session} />
  );
}

const ProfileUI = ({ session }) => {
  const { data, loading: queryLoading, refetch } = useQuery(
    getUserProfile,
    {
      notifyOnNetworkStatusChange: true,
      variables: { email: session?.user?.email }
    }
  )

  if (queryLoading) {
    return <Loading />
  }
  return <div className={styles.profilePage}>
    <div className={styles.rightPartPage}>
      <h1 className={styles.profileTitle}>Your Profile</h1>
      <div className={styles.bodyProfile}>
        <div className={styles.mainProfile}>
          <div className={styles.imageContainer}>
            <Avatar src={"https://picsum.photos/200"} size="10rem" alt="Profile Image" />
          </div>
          <div className={styles.profileTextContainer}>
            <h1 className={styles.profileName}>{data.user.email}</h1>
            <h2 className={styles.profileCampus}>Institut Teknologi Bandung</h2>
            <div className={styles.profileText}>
              <p>Amet sed vel error aspernatur. Reiciendis cum eligendi voluptatem praesentium voluptas nihil facere. Cupiditate eligendi quos dignissimos autem aut amet nostrum. Amet sed vel error aspernatur. Reiciendis cum eligendi voluptatem praesentium voluptas nihil facere. Cupiditate eligendi quos dignissimos autem aut amet nostrum. Amet sed vel error aspernatur. Reiciendis cum eligendi voluptatem praesentium voluptas nihil facere. Cupiditate eligendi quos dignissimos autem aut amet nostrum</p>
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
}

export default Profile;
