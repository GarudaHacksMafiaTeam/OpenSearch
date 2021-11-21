import styles from "styles/opensource/donationbox.module.css"

const DonationBox = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    console.log(form.nominal.value);
    console.log(form.desc.value);
  }

  return (
    <div className={styles.donationBox}>
      <form className={styles.form} method="post" onSubmit={(e) => handleSubmit(e)}>
        <label className={styles.donationLabel}>
          Nominal Donasi: 
        </label>
        <div className={styles.inputForm}>
          <input type="number" name="nominal" id="nominal"/>
        </div>
        <label className={styles.donationLabel}>
          Keterangan: 
        </label>
        <div className={styles.inputForm}>
          <textarea name="desc" id="desc" />
        </div>
        <div className={styles.submitPart}>
          <button type="submit" className={styles.btn + " " + styles.btnSubmit}>Send</button>
        </div>
      </form>
    </div>
  );
}

export default DonationBox;