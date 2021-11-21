import styles from 'styles/opensource/task/taskpage.module.css'
import Masonry from 'react-masonry-css'
import TaskCard from 'components/opensource/TaskCard'

const Task = () => {
  return (
    <>
      <div className={styles.base}>
        <Masonry
          breakpointCols={3}
          className={styles.myMasonryGrid}
          columnClassName={styles.myMasonryGridColumn}
        >
          <CardContainer title="To Do" type='todo' />
          <CardContainer title="On Going" type='ongoing' />
          <CardContainer title="Completed" type='completed' />
        </Masonry>
      </div>
    </>
  );
}

const containerTitleClass = (type) => {
  switch (type) {
    case "todo":
      return styles.todoTitle
      break;
    case "ongoing":
      return styles.ongoingTitle
      break;
    case "completed":
      return styles.completedTitle
      break;
    default:
      break;
  }
}

const CardContainer = ({ title, type }) => (
  <div className={styles.cardContainer}>
    <div className={styles.containerTitle + " " + containerTitleClass(type)} >
      {title}
    </div>
    <TaskCard type={type} />
    {
      type === 'todo'
      &&
      <button className={styles.newbtn}>Add New +</button>
    }
  </div>
)

export default Task;
