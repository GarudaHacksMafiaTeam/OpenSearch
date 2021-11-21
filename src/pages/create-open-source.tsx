import { gql, useMutation } from "@apollo/client";
import styles from "styles/create-open-source/index.module.css"

const CREATE_OPEN_SOURCE = gql`
  mutation CreateOpenSource {
    createOpenSource {
      id
    }
  }
`

const CREATE_OPEN_SOURCE_PROFILE = gql`
  mutation CreateOpenSource($openSourceId: Int!, $image: String, $description: String, $name: String) {
    createOpenSourceProfile(openSourceId: $openSourceId, image: $image, description: $description, name: $name) {
      id
    }
  }
`

const CreateOpenSource = () => {
  const [createOpenSource] = useMutation(CREATE_OPEN_SOURCE);
  const [createOpenSourceProfile] = useMutation(CREATE_OPEN_SOURCE_PROFILE);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    console.log(form.image.files[0]);
    console.log(form.name.value);
    console.log(form.desc.value);
    const { data: { createOpenSource: { id } } } = await createOpenSource()
    console.log(data)
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
