import styles from './style.module.css';

const OrderInformationPageSection = () => {
  return (
    <>
      <div className={styles.OrderListHeader}>주문 내역 상세</div>
      <hr className={styles.hr} />
      <div className={styles.OrderItemBox}>
        <div className={styles.OrderItemHeader}>
          <div>주문번호: 1</div>
        </div>
        <div className={styles.OrderItemData}>
          <img
            src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80"
            alt="상품예시"
          />
          <div>
            <div>친환경 실링용기-ECO 19153</div>
            <div>180,600원 / 수량 : 3개</div>
          </div>
        </div>
        <div className={styles.OrderItemData}>
          <img
            src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80"
            alt="상품예시"
          />
          <div>
            <div>친환경 실링용기-ECO 19153</div>
            <div>180,600원 / 수량 : 3개</div>
          </div>
        </div>
      </div>
      <div className={styles.paymentBox}>
        <div className={styles.paymentBoxHeader}>결제금액 정보</div>
        <div className={styles.paymentBoxSection}>
          <p>총 결제금액</p>
          <p>325,600원</p>
        </div>
      </div>
    </>
  );
};

export default OrderInformationPageSection;
