import styles from 'styles/opensource/task/taskcardpage.module.css'
import Avatar from 'react-avatar'
import { useState } from 'react';
import { BsFillCaretDownFill } from "react-icons/bs";

const TaskCardPage = () => {
  const [progress, setProgress] = useState("To Do");
  const [clicked, setClicked] = useState(false);

  // const handleClick = () => {
  //   setClicked(!clicked);
  //   console.log(clicked);
  // }
  const changeProgress = (progress) => {
    setProgress(progress);
    setClicked(false);
  }

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
      <h2 className={styles.dropdownTitle}>
        Update Progress: 
      </h2>
      <div className={styles.dropdown}>
        <button onClick={() => setClicked(true)} className={styles.dropbtn}>
          {progress}
          <div className={styles.iconContainer}>
            <BsFillCaretDownFill />
          </div>
        </button>
        <div id="myDropdown" className={styles.dropdownContent + ' ' + (clicked ? "" : styles.none)}>
          <button onClick={() => changeProgress("To Do")}>To Do</button>
          <button onClick={() => changeProgress("On Going")}>On Going</button>
          <button onClick={() => changeProgress("Completed")}>Completed</button>
        </div>
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
