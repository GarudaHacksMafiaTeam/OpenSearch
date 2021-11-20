import styles from 'styles/opensource/fundbox.module.css';

interface fundBoxInterface {
  donator: string;
  desc: string;
}

const FundBox = (props: fundBoxInterface) => {
  return (
    <div className={styles.fundBox}>
      <h1>{props.donator}</h1>
      <p>
        Keterangan: {props.desc}
      </p>
    </div>
  );
}

export default FundBox;