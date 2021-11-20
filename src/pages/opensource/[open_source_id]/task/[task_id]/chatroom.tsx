import styles from 'styles/opensource/task/chatroom.module.css'
import Avatar from 'react-avatar'

const ChatRoom = () => {
  return (
    <div className={styles.base}>
      {[1, 2, 3].map((x, index) => <Message key={index} />)}
      <SelfMessage />
      <input className={styles.inputMessage} placeholder="Add Message..." />
    </div>
  );
}

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


const SelfMessage = () => (
  <div className={styles.selfmessage}>
    <div className={styles.selfpayload}>
      amet sed vel error aspernatur. reiciendis cum eligendi voluptatem praesentium voluptas nihil facere.
      cupiditate eligendi quos dignissimos autem aut amet nostrum. amet sed vel error aspernatur. reiciendis cum
      eligendivoluptatem praesentium voluptas nihil facere. Cupiditate eligendi quos dignissimos autem aut amet
    </div>
    <Avatar round size="2.5rem" />
  </div>
)

export default ChatRoom;
