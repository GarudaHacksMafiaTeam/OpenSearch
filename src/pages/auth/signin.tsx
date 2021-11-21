import { getCsrfToken } from 'next-auth/client'
import Link from 'next/link'
import styles from 'styles/auth/signin/index.module.css'
import Image from 'next/image'
import Head from 'next/head'
import { motion } from 'framer-motion'

export default function SignIn({ csrfToken }) {
  return (
    <motion.div className={styles.signInPage}>
      <Head>
        <title>Sign In | OpenSearch</title>
      </Head>
      <motion.div
        className={styles.leftPart}
        exit={{
          opacity: 0,
          y: -50,
        }}
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.3,
          ease: 'easeInOut',
        }}
      >
        <Image src="/assets/signin/signin-img.svg" alt="me" width="850" height="850" />
      </motion.div>
      <motion.div
        className={styles.rightPart}
        exit={{
          opacity: 0,
          y: -50,
        }}
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: 'easeInOut',
        }}
      >
        <motion.div
          className={styles.mainBody}
          exit={{
            opacity: 0,
            y: -50,
          }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.7,
            ease: 'easeInOut',
          }}
        >
          <h1 className={styles.header}>Welcome Back,</h1>
          <h1 className={styles.subheader}>Login to your account</h1>
          <form className={styles.form} method="post" action="/api/auth/signin/email">
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <div className={styles.inputForm}>
              <input type="email" name="email" id="email" placeholder="Email Address" />
            </div>
            <div className={styles.submitPart}>
              <button type="submit" className={styles.btn + ' ' + styles.btnSubmit}>
                Register
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export async function getServerSideProps(context) {
  const csrfToken = await getCsrfToken(context)
  return {
    props: { csrfToken },
  }
}
