import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import useOrders from '../../../hooks/useOrders';
import { OrderItemInformationState } from '../../../store/order';
import { OrderItemInformation } from '../../../types';
import { priceFormatter } from '../../../utils/formatter';
import LoadingSpinner from '../../utils/LoadingSpinner/LoadingSpinner';
import styles from './style.module.css';

const OrderInformationPageSection = () => {
  const loaction = useLocation();
  const data = loaction.state;
  const orderData = useRecoilValue(OrderItemInformationState);

  const { fetchOrderOneItem } = useOrders();
  const { isLoading } = useQuery<OrderItemInformation>('couponList', () =>
    fetchOrderOneItem(data.id)
  );

  if (isLoading) return <LoadingSpinner />;
  return (
    <>
      <div className={styles.OrderListHeader}>주문 내역 상세</div>
      <hr className={styles.hr} />

      <div className={styles.OrderItemBox}>
        <div className={styles.OrderItemHeader}>
          <div>주문번호: {data.id}</div>
        </div>

        {orderData.products.map((item) => {
          return (
            <div className={styles.OrderItemData}>
              <img src={item.imgUrl} alt="상품예시" />
              <div>
                <div>{item.name}</div>
                <div>
                  {item.price}원 / 수량 : {item.quantity}개
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.paymentBox}>
        <div className={styles.paymentBoxHeader}>결제금액 정보</div>
        <div className={styles.paymentBoxSection}>
          <p>총 결제금액</p>
          <p>{priceFormatter(orderData.total_amount)}원</p>
        </div>
      </div>
    </>
  );
};

export default OrderInformationPageSection;
