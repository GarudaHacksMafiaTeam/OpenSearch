import Layout from 'components/opensource/Layout'
import React from 'react';
import DonationBox from 'components/opensource/DonationBox'
import styles from "styles/opensource/crowdfunding.module.css"
import FundBox from "components/opensource/FundBox"
import Masonry from 'react-masonry-css'

const OpenSourceProfile = () => {
  const donationHistory = [
    {
      donator: "malik",
      desc: "keren gan, semangat terus yaw xoxo",
    },
    {
      donator: "azhar",
      desc: "guaassssssssssssssssssssss ssssssssss ssssssssssssss sssssssssssssssssssssssss sssssssssssssssssssssssssssss sssssss gannnnnnn nnnnnnnnnnnnnn nnnnnnnnnnnnnn nnnnnnnnnnn",
    },
    {
      donator: "mazaya",
      desc: "yoyoyooyoyoyoyooyooyoooooooooooo mantapppp sekali man tidak apa apa  autoprefixer: end value has mixed support, consider using flex-end instead",
    },
    {
      donator: "fia",
      desc: "ini cuma warning: autoprefixer: end value has mixed support, consider using flex-end instead",
    },
    {
      donator: "malik",
      desc: "keren gan, semangat terus yaw xoxo",
    },
    {
      donator: "malik",
      desc: "keren gan, semangat terus yaw xoxo",
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
                  <FundBox {...donation}></FundBox>
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
