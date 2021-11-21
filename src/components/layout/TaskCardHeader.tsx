import styles from "styles/opensource/index.module.css"
import Avatar from 'react-avatar'
import { useOpenSourceTask } from "context/opensourcetask"

const TaskCardHeader = () => {
  const { state } = useOpenSourceTask()
  const taskData = {
    name: "RFC #1",
    image: "https://picsum.photos/200",
    description: "To create a better dev experience",
  }

  return (
    <div>
      <div className={styles.openSourceHeader}>
        {JSON.stringify(state, 0, 2)}
        <div className={styles.iconContainer}>
          <Avatar src={taskData.image} size='12rem' />
        </div>
        <div className={styles.openSourceInfo}>
          <h1>{taskData.name}</h1>
          <p>{taskData.description}</p>
        </div>
      </div>
    </div>
  );
}

export default TaskCardHeader;
