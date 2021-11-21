import styles from 'styles/auth/verify-request/index.module.css'
import Image from 'next/image'
import Head from 'next/head'
import { motion } from 'framer-motion'

export default function VerifyRequest({ csrfToken }) {
  return (
    <motion.div
      className={styles.verifyRequestPage}
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
      <Head>
        <title>Registration | OpenSearch</title>
      </Head>
      <div className={styles.leftPart}>
        <Image src="/assets/verify-request/verify-request.svg" alt="me" width="480" height="625" />
      </div>
      <motion.div
        className={styles.rightPart}
        exit={{
          opacity: 0,
          y: -50,
        }}
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.9,
          delay: 0.5,
          ease: 'easeInOut',
        }}
      >
        <h1 className={styles.title}>Thanks for your registration</h1>
        <p className={styles.subtitle}>
          We have sent a verification message to your email address. Please check your inbox
        </p>
      </motion.div>
    </motion.div>
  )
}
