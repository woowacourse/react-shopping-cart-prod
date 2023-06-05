/* eslint-disable no-restricted-globals */
import { ReactComponent as AlertBlank } from '../../assets/baemin-alert-blank.svg';
import OrderItemList from '../../components/OrderItemList';
import useGetQuery from '../../hooks/useGetQuery';
import { OrderType } from '../../types';
import formatDateToKorean from '../../utils/formatDateToKorean';
import styles from './index.module.scss';

function Order() {
  const { data: orderList } = useGetQuery<OrderType[]>('/orders');

  return (
    <main className={styles.container}>
      <h2 className={styles.title}>주문 목록</h2>
      <div className={styles['order-list']}>
        {orderList?.length === 0 ? (
          <section className={styles['main-view-blank']}>
            <AlertBlank />
            <p>주문 목록이 비어있어요!</p>
          </section>
        ) : (
          orderList?.map((order: OrderType) => (
            <OrderItemList
              orderItemList={order.productList}
              orderNumber={order.id}
              orderTime={formatDateToKorean(order.orderTime)}
            />
          ))
        )}
      </div>
    </main>
  );
}

export default Order;
