import styles from "styles/opensource/aboutopensource.module.css"
import Head from "next/head"

const AboutOpenSource = () => {
  const data = {
    overview: "The Blender Foundation is an independent public benefit organization. Its spin-off corporation Blender Institute hosts the foundation’s offices and currently employs 15 people who work on the Blender software and creative projects to validate and test Blender in production environments. The Blender Foundation is an independent public benefit organization. Its spin-off corporation Blender Institute hosts the foundation’s offices and currently employs 15 people who work on the Blender software and creative projects to validate and test Blender in production environments. The Blender Foundation is an independent public benefit organization. Its spin-off corporation Blender Institute hosts the foundation’s offices and currently employs 15 people who work on the Blender software and creative projects to validate and test Blender in production environments.",
    website: "https://www.blender.org/",
    spesialization: "Computer Analysis, Software",
    year: 2015,
  }


  return (
    <div className={styles.aboutOpenSource}>
      <Head>
        <title>The Blender Foundation | OpenSearch</title>
      </Head>
      <h1 className={styles.subtitles}>Overview</h1>
      <p className={styles.infoDesc}>
        {data.overview}
      </p>
      <h1 className={styles.subtitles}>Website</h1>
      <p className={styles.infoDesc}>
        {data.website}
      </p>
      <h1 className={styles.subtitles}>Spesialization</h1>
      <p className={styles.infoDesc}>
        {data.spesialization}
      </p>
      <h1 className={styles.subtitles}>Year</h1>
      <p className={styles.infoDesc}>
        {data.year}
      </p>
    </div>  
  );
}

export default AboutOpenSource;