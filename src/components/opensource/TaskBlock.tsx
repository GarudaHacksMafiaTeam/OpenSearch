import React from 'react'
import styles from 'styles/opensource/task/taskblock.module.css'
import Avatar from 'react-avatar'
import { useRouter } from 'next/router'
import { useState } from 'react'
import ReactModal from 'react-modal';

const TaskCard = ({ id }) => {
  const router = useRouter();
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  }

  return <div className={styles.base}>
    <div className={styles.heading}>
      <Avatar size="3rem" className={styles.logo} />
      <div>
        <h1>
          <strong>OpenSearch</strong>
        </h1>
        <h2>
          RFC  #1
        </h2>
      </div>
    </div>
    <p>
      Adding version control integration.
    </p>
    <br />
    <br />
    <div className={styles.buttonWrapper}>
      <button className={styles.joinbtn} onClick={() => setShow(true)}>Join Now</button>
    </div>

    <ReactModal
      isOpen={show}
      contentLabel="Send Request"
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <div className={styles.section}>
        <h1>
          Sent request to join this task?
        </h1>
      </div>
      <div className={styles.section}>
        <div className={styles.submitPart}>
          <button onClick={handleClose} className={styles.btn + " " + styles.btnSubmit}>
            Close
          </button>
          <button type="submit" className={styles.btn + " " + styles.btnSubmit} onClick={handleClose}>Send</button>
        </div>
      </div>
    </ReactModal>
  </div>
}

export default TaskCard
