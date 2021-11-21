import styles from "styles/opensource/index.module.css"
import { useRouter } from "next/router";
import Avatar from 'react-avatar'
import Link from "next/link";
import { useOpenSource } from "context/opensource";

const toPath = (to, name) => ({ name, to })
const paths = [
  toPath("", "Feeds"),
  toPath("/task", "Task"),
  toPath("/crowdfunding", "Crowd Funding"),
  toPath("/request", "Request"),
]

const OpenSourceProfile = () => {
  const { state: openSourceData } = useOpenSource()

  return (
    <div>
      <div className={styles.openSourceHeader}>
        <div className={styles.iconContainer}>
          <Avatar src={openSourceData.image} size='12rem' />
        </div>
        <div className={styles.openSourceInfo}>
          <h1>{openSourceData.name}</h1>
          <p>{openSourceData.description}</p>
          <div className={styles.optionsContainer}>
            {paths.map((path, index) => <ProfileLink path={path.to} name={path.name} key={index} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

const ProfileLink = ({ path, name }) => {
  const { asPath, query: { open_source_id } } = useRouter()
  return (
    <Link href={`/opensource/${open_source_id}${path}`}>
      <a
        className={asPath === `/opensource/${open_source_id}${path}` ? (styles.clickedOption) : ""}>
        {name}
      </a>
    </Link>
  )
}

export default OpenSourceProfile;
