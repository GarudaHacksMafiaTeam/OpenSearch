import styles from "styles/opensource/feedblock.module.css"
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface FeedInterface {
  imgUrl: string,
  type: string,
  name: string,
  content: string,
  likes: number,
  comments: number,
}

const FeedBlock = (props: FeedInterface) => {  
  return (
    <div className={styles.feedBlock}>
      <div className={styles.header}>
        <div className={styles.imgContainer}>
          <img src={props.imgUrl} alt={props.name + " icon"}></img>
        </div>
        <div className={styles.headerText}>
          <h1>{props.type}</h1>
          <h2>{props.name}</h2>
        </div>
      </div>
      <div className={styles.feedContent}>
        <p>
          {props.content}
        </p>
      </div>
      <div className={styles.statsContainer}>
        <span className={styles.statsIcon}>
          <FontAwesomeIcon icon={faHeart} />
        </span>
        <span className={styles.num}>{props.likes}</span>
        <span className={styles.statsIcon}>
          <FontAwesomeIcon icon={faComment} />
        </span>
        <i className="fas fa-comment"></i>
        <span>{props.comments}</span>
      </div>
    </div>
  );
}

export default FeedBlock;