import React from 'react'
import styles from 'styles/create-profile/index.module.css'
import Avatar from 'react-avatar'

const CreateProfile = () => {
	return (
		<div className={styles.container}>
			<div>
				<h1 className={styles.title}>Fill your profile!</h1>
				<div className={styles.selfContainer}>
					<div>
						<Avatar src="" />
					</div>
					<div>
						<div>
							<div>
									Name:
								<br/>
								<input type="text" className={styles.inputForm} name="name" id="name" />
							</div>
							<div>
								Institution:
								<br/>
								<input type="text" className={styles.inputForm} name="institution" id="institution" />
							</div>
						</div>
					</div>
				</div>
				<div className={styles.bioContainer}>
					Bio
					<br />
					<textarea className={styles.inputForm}></textarea>
				</div>
			</div>
		</div>
	)
}

export default CreateProfile