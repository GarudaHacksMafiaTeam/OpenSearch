import styles from "styles/layout/signoutpopup.module.css"

const SignOutPopUp = () => {
  return (
    <div className={styles.signOutPopUp} >
      <button className={styles.signOutBtn}>
        Sign Out
      </button>
    </div>
  );
}

export default SignOutPopUp;