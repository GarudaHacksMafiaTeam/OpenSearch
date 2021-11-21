import styles from "styles/create-open-source/index.module.css"

const CreateOpenSource = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    console.log(form.image.files[0]);
    console.log(form.name.value);
    console.log(form.desc.value);
    form.image.value = "";
    form.name.value = "";
    form.desc.value = "";
  }

  return (
    <div className={styles.createOpenSource}>
      <h1>
        Create Open Source
      </h1>
      <div className={styles.createOpenSourceBox}>
        <form className={styles.form} method="post" onSubmit={(e) => handleSubmit(e)}>
          <label className={styles.createLabel}>
            Open Source Icon
          </label>
          <div className={styles.inputForm}>
            <input type="file" name="image" id="image" className={styles.customFileInput} >
            </input>
          </div>
          <label className={styles.createLabel}>
            Open Source Name
          </label>
          <div className={styles.inputForm}>
            <input type="text" name="name" id="name" />
          </div>
          <label className={styles.createLabel}>
            Description
          </label>
          <div className={styles.inputForm}>
            <textarea className={styles.inputForm} name="desc" id="desc" />
          </div>
          <div className={styles.submitPart}>
            <button type="submit" className={styles.btn + " " + styles.btnSubmit}>Send</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateOpenSource;
