import styles from 'styles/opensource/task/chatroom.module.css'
import Avatar from 'react-avatar'

const ChatRoom = () => {
  return (
    <div className={styles.base}>
      {["Helloo everyone!", "My name is Azhar, and i will be the main maintainer for this task", "We will have our first meeting soon!"].map((x, index) => <Message key={index} message={x} />)}
      {["Hello everyone, nice to meet you guys and welcome", "Copy that azhar!"].map((x, index) => <SelfMessage key={index} message={x} />)}
      <input className={styles.inputMessage} placeholder="Add Message..." />
    </div>
  );
}

const Message = ({ message }) => (
  <div className={styles.message}>
    <Avatar round size="2.5rem" />
    <div className={styles.payload}>
      {message}
    </div>
  </div>
)


const SelfMessage = ({ message }) => (
  <div className={styles.selfmessage}>
    <div className={styles.selfpayload}>
      {message}
    </div>
    <Avatar round size="2.5rem" />
  </div>
)

export default ChatRoom;
