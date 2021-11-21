import styles from 'styles/opensource/task/taskcard.module.css'
import Avatar from 'react-avatar'
import { useRouter } from 'next/router';

const cardClass = (type) => {
  switch (type) {
    case "todo":
      return styles.todoCard
      break;
    case "ongoing":
      return styles.ongoingCard
      break;
    case "completed":
      return styles.completedCard
      break;
    default:
      break;
  }
}

const TaskCard = ({ type, id }) => {
  const router = useRouter()
  return <div className={styles.base + " " + cardClass(type)} onClick={() => router.push(router.asPath + "/task-card/" + id)}>
    <h1 className={styles.title}>Task 1</h1>
    <p>Amet sed vel error aspernatur. Reiciendis cum eligendi </p>
    <Avatar round size="2rem" />
  </div>
}

export default TaskCard;
