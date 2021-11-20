import { getCsrfToken } from "next-auth/client"
import styles from "styles/auth/signin/index.module.css"
import Image from 'next/image'

export default function SignIn({ csrfToken }) {
	return (
        <div className={styles.signInPage}>
            <div className={styles.leftPart}>
                <Image src="/assets/signin/signin-img.svg" alt="signin-icon" width="850" height="850" />
            </div>
            <div className={styles.rightPart}>
                <div className={styles.mainBody}>
                    <h1 className={styles.header}>Login</h1>
                    <form className={styles.form} method="post" action="/api/auth/signin/email">
                        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                        <div className={styles.inputForm}>
                            <input type="email" name="email" id="email" placeholder="Email" />
                        </div>
                        <div className={styles.submitPart}>
                            <button type="submit" className={styles.btn + " " + styles.btnSubmit}>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
	);
}

export async function getServerSideProps(context) {
	const csrfToken = await getCsrfToken(context)
	return {
		props: { csrfToken },
	}
}
