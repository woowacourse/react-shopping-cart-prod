import styles from './style.module.css';

const PaymentInfo = () => {
  return (
    <div className={styles.container}>
      <div className={styles.paymentBox}>
        <h3 className={styles.header}>결제금액 정보</h3>
        <p className={styles.content}>
          <span>총 금액 정보</span>
          <span>325,600원</span>
        </p>
      </div>
    </div>
  );
};

export default PaymentInfo;
