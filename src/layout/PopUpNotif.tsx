import styles from "styles/layout/popupnotif.module.css"

const Notif = (props) => {
  return (
    <div className={styles.notifContainer}>
      <p className={styles.notifMsg}>
        {props}
      </p>    
    </div>
  );
}

const PopUpNotif = () => {
  const dataNotif = [
    "You have been added to a group",
    "You have been added to a group",
    "You have been added to a group",
    "You have been added to a group",
  ]

  return (
    <div className={styles.popupnotif}>
      {
        dataNotif.map((item) => {
          return (
            <div className={styles.notifContainer}>
              <p className={styles.notifMsg}>
                {item}
              </p>    
            </div>
          )
        })
      }
    </div>
  );
}

export default PopUpNotif;