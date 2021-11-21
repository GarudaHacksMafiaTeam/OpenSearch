import styles from "styles/opensource/index.module.css"
import { useRouter } from "next/router";
import Avatar from 'react-avatar'
import Link from "next/link";

const toPath = (to, name) => ({ name, to })
const paths = [
  toPath("", "About"),
  toPath("/feeds", "Feeds"),
  toPath("/task", "Task"),
  toPath("/crowdfunding", "Crowd Funding")
]

const OpenSourceProfile = () => {
  const openSourceData = {
    name: "Blender Foundation",
    image: "https://picsum.photos/200",
    description: "ini blender Foundation gan Amet sed vel error aspernatur. Reiciendis cum eligendi voluptatem praesentium voluptas nihil facere. Cupiditate eligendi quos dignissimos autem aut amet nostrum. Amet sed vel error aspernatur.",
    countContributor: "1k+",
  }

  return (
    <div>
      <div className={styles.openSourceHeader}>
        <div className={styles.iconContainer}>
          <Avatar src={openSourceData.image} size='12rem' />
        </div>
        <div className={styles.openSourceInfo}>
          <h1>{openSourceData.name}</h1>
          <p>{openSourceData.countContributor} people contributed</p>
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
