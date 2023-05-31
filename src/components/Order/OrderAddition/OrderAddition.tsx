import styles from './style.module.css';

const OrderAddition = () => {
  return (
    <>
      <div>
        <div className={styles.modalHeader}>
          <h3>쿠폰 선택</h3>
        </div>
        <ul>
          <li className={styles.couponItem}>
            <h4>오늘만 10%할인 쿠폰</h4>
            <div className={styles.minimumPrice}>최소 주문금액 15000원</div>
          </li>
          <li className={styles.couponItem}>
            <h4>사장님이 미쳤어요! 99%할인 쿠폰</h4>
            <div className={styles.minimumPrice}>최소 주문금액 9999999999원</div>
          </li>
          <li className={styles.couponItem}>
            <h4>오늘만 20%할인 쿠폰</h4>
            <div className={styles.minimumPrice}>최소 주문금액 30000원</div>
          </li>
        </ul>

        <div className={styles.resultBox}>
          <div className={styles.priceBox}>
            <div>총 상품가격</div>
            <div>86,000원</div>
          </div>
          <div className={styles.priceBox}>
            <div>총 배송비</div>
            <div>3,000원</div>
          </div>

          <div className={styles.priceResultBox}>
            <div>총 주문금액</div>
            <div>89,000원</div>
          </div>
          <button className={styles.resultOrderButton}>주문 완료하기</button>
        </div>
      </div>
    </>
  );
};

export default OrderAddition;
