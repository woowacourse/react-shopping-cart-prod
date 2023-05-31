import styles from './style.module.css';

{
  /* <button disabled className={styles.usedCouponText}>
          발급완료
        </button> */
}

const CouponListSection = () => {
  return (
    <>
      <div className={styles.CouponBox}>
        <div className={styles.CouponItem}>
          <h1>오늘만 10%할인 쿠폰</h1>
          <div>최소 주문금액 15000원</div>
        </div>
        <div>
          <button type="button" className={styles.getCouponButton}>
            발급받기
          </button>
        </div>
      </div>
    </>
  );
};

export default CouponListSection;
