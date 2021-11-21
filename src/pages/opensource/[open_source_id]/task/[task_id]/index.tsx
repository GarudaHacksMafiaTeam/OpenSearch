import styles from 'styles/opensource/task/taskpage.module.css'
import Masonry from 'react-masonry-css'
import {useState} from 'react'
import TaskCard from 'components/opensource/TaskCard'
import ReactModal from 'react-modal';

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

const CardContainer = ({ title, type }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    console.log(form.name.value);
    console.log(form.desc.value);
    form.name.value = '';
    form.desc.value = '';
  }
  
  return (
  <div className={styles.cardContainer}>
    <div className={styles.containerTitle + " " + containerTitleClass(type)} >
      {title}
    </div>
    <TaskCard type={type} id={1} />
    {
      type === 'todo'
      &&
      <div>
        <button className={styles.newbtn} onClick={handleShow} >Add New +</button>

        <ReactModal 
          isOpen={show}
          contentLabel="Create New Task"
          className={styles.modal}
          overlayClassName={styles.overlay}
        >
          <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
            <h1>Add New Task</h1>
            <label className={styles.formLabel}>
              Task Name: 
            </label>
            <div className={styles.inputForm}>
              <input type="text" name="name" id="name" />
            </div>
            <label className={styles.formLabel}>
              Task Description: 
            </label>
            <div className={styles.inputForm}>
              <textarea name="desc" id="desc" />
            </div>
            <div className={styles.submitPart}>
              <button onClick={handleClose} className={styles.btn + " " + styles.btnSubmit}>
                Close
              </button>
              <button type="submit" className={styles.btn + " " + styles.btnSubmit}>Send</button>
            </div>
          </form>
        </ReactModal>
      </div>
    }
  </div>
  )
}

export default Task;
