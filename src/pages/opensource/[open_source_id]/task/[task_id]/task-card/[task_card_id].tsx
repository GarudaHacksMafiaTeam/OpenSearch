import styles from 'styles/opensource/task/taskcardpage.module.css'
import Avatar from 'react-avatar'

const TaskCardPage = () => {
  return (
    <div className={styles.base}>
      <div className={styles.heading}>
        <div>
          <h1 className={styles.title}>
            <strong>Name</strong>
          </h1>
          <p className={styles.description}>
            amet sed vel error aspernatur. reiciendis cum eligendi voluptatem praesentium voluptas nihil facere.
            cupiditate eligendi quos dignissimos autem aut amet nostrum. amet sed vel error aspernatur. reiciendis cum
            eligendivoluptatem praesentium voluptas nihil facere. Cupiditate eligendi quos dignissimos autem aut amet
          </p>
        </div>
      </div>
      <div>
        Update Progress :
      </div>
      <br />
      <hr />
      <UserInput />
      {[1].map((x, index) => <Message key={index} />)}
    </div>
  );
}


const UserInput = () => (
  <div className={styles.userInput}>
    <Avatar round size="2.5rem" />
    <input className={styles.inputMessage} type="text" name="content" placeholder="Add Comment..." />
  </div>
)

const Message = () => (
  <div className={styles.message}>
    <Avatar round size="2.5rem" />
    <div className={styles.payload}>
      amet sed vel error aspernatur. reiciendis cum eligendi voluptatem praesentium voluptas nihil facere.
      cupiditate eligendi quos dignissimos autem aut amet nostrum. amet sed vel error aspernatur. reiciendis cum
      eligendivoluptatem praesentium voluptas nihil facere. Cupiditate eligendi quos dignissimos autem aut amet
    </div>
  </div>
)

export default TaskCardPage;
