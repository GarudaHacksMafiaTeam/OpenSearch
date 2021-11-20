import styles from "styles/opensource/index.module.css"
import { useRouter } from "next/router";
import Avatar from 'react-avatar'
import Link from "next/link";

const toPath = (to, name) => ({ name, to })
const paths = [
  toPath("", "Tasks"),
  toPath("/chatroom", "Chat Room"),
]

const OpenSourceProfile = () => {
  const taskData = {
    name: "RFC #1",
    image: "https://picsum.photos/200",
    description: "To create a better dev experience",
  }

  return (
    <div>
      <div className={styles.openSourceHeader}>
        <div className={styles.iconContainer}>
          <Avatar src={taskData.image} size='12rem' />
        </div>
        <div className={styles.openSourceInfo}>
          <h1>{taskData.name}</h1>
          <p>{taskData.description}</p>
          <div className={styles.optionsContainer}>
            {paths.map((path, index) => <ProfileLink path={path.to} name={path.name} key={index} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

const ProfileLink = ({ path, name }) => {
  const { asPath, query: { open_source_id, task_id } } = useRouter()
  return (
    <Link href={`/opensource/${open_source_id}/task/${task_id}${path}`}>
      <a
        className={asPath === `/opensource/${open_source_id}/task/${task_id}${path}` ? (styles.clickedOption) : ""}>
        {name}
      </a>
    </Link>
  )
}

export default OpenSourceProfile;
