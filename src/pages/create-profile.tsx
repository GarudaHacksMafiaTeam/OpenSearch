import React, { useState } from 'react'
import styles from 'styles/create-profile/index.module.css'
import Avatar from 'react-avatar'

const CreateProfile = () => {
	const [imgAvatar, setImgAvatar] = useState(undefined);

	const handleSubmit = (e) => {
		e.preventDefault();
		const form = e.target;
		form.name.value = '';
		form.bio.value = '';
	}
	const onImageUpload = (event) => {
		const selectedFile = event.target.files[0];
		const reader = new FileReader();
	
		reader.onload = function(event) {
			setImgAvatar(event.target.result)
		};
		reader.readAsDataURL(selectedFile);
	}

	return (
		<div className={styles.createProfile}>
			<h1 className={styles.title}>Fill your profile!</h1>
			<div className={styles.formContainer}>
				<form className={styles.form} method="post" onSubmit={(e) => handleSubmit(e)}>
					<div className={styles.upperSection}>
						<div className={styles.avatarContainer}>
							<input
								accept="image/*"
								className={styles.input}
								style={{ display: 'none' }}
								id="raised-button-file"
								multiple
								type="file"
								onChange={(e) => onImageUpload(e)}
							/>
							<label htmlFor="raised-button-file">
								<Avatar src={imgAvatar} name={"avatar"} size="6rem" className={styles.logo} />
							</label>
						</div>
						<div className={styles.rightUpperSection}>
							<label className={styles.donationLabel}>
								Nama: 
							</label>
							<div className={styles.inputForm}>
								<input type="text" name="name" id="name"/>
							</div>
						</div>
					</div>
					<div className={styles.lowerSection}>
						<label className={styles.donationLabel}>
							Bio (max. 300 words): 
						</label>
						<div className={styles.inputForm}>
							<textarea name="bio" id="bio" />
						</div>
					</div>
					<div className={styles.submitPart}>
						<button type="submit" className={styles.btn + " " + styles.btnSubmit}>Continue</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default CreateProfile;
