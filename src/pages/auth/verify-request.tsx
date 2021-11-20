import styles from "styles/auth/verify-request/index.module.css"
import Image from 'next/image'
import Head from 'next/head'

export default function VerifyRequest({ csrfToken }) {
  return (
    <div className={styles.verifyRequestPage}>
      <Head>
        <title>Registration | OpenSearch</title>
      </Head>
      <div className={styles.leftPart}>
        <Image src="/assets/verify-request/verify-request.svg" alt="me" width="480" height="625" />
      </div>
      <div className={styles.rightPart}>
        <h1 className={styles.title}>Thanks for your registration</h1>
        <p className={styles.subtitle}>
        We have sent a verification message to your email address. Please check your inbox
        </p>
      </div>
    </div>
  );
}