import styles from "styles/opensource/index.module.css"
import Avatar from 'react-avatar'

const TaskCardHeader = () => {
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
        </div>
      </div>
    </div>
  );
}

export default TaskCardHeader;
