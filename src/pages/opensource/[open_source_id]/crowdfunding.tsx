import Layout from 'components/opensource/Layout'
import React from 'react';
import DonationBox from 'components/opensource/DonationBox'
import styles from "styles/opensource/crowdfunding.module.css"
import FundBox from "components/opensource/FundBox"
import Masonry from 'react-masonry-css'

const OpenSourceProfile = () => {
  const donationHistory = [
    {
      donator: "Malik",
      desc: "What a great open source! hope it will get big soon enough",
    },
    {
      donator: "Azhar",
      desc: "You guys did such a great job!",
    },
  ];

  return (
    <>
      <div className={styles.crowdfundContainer}>
        <Masonry
          breakpointCols={2}
          className={styles.myMasonryGrid}
          columnClassName={styles.myMasonryGridColumn}
        >
          <div className={styles.donationBoxContainer}>
            <DonationBox />
          </div>
          <div className={styles.donationHistory}>
            <h1>Donasi Terbaru: </h1>
            {
              donationHistory.map((donation) => {
                return (
                  <FundBox {...donation} />
                );
              })
            }
          </div>
        </Masonry>
      </div>
    </>
  );
}

export default OpenSourceProfile;
