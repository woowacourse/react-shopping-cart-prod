import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import OrderItemList from '../../components/OrderItemList';
import PaymentsView from '../../components/PaymentsView';
import useGetQuery from '../../hooks/useGetQuery';
import { $CurrentServerUrl } from '../../recoil/atom';
import formatDateToKorean from '../../utils/formatDateToKorean';
import styles from './index.module.scss';
import type { OrderDetailType } from '../../types';

function OrderDetail() {
  const { id } = useParams();
  const currentServerUrl = useRecoilValue($CurrentServerUrl);
  const { data: orderDetail } = useGetQuery<OrderDetailType>(`${currentServerUrl}/orders/${id}`);

  return (
    <main className={styles.container}>
      <h2 className={styles.title}>주문 상세</h2>
      <div className={styles['order-list']}>
        {orderDetail && (
          <>
            <PaymentsView paymentsData={orderDetail.paymentAmount} />
            <OrderItemList
              orderItemList={orderDetail.productList}
              orderNumber={orderDetail.id}
              orderTime={formatDateToKorean(orderDetail.orderTime)}
            />
          </>
        )}
      </div>
    </main>
  );
}

export default OrderDetail;
