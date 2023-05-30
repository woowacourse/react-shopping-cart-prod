/* eslint-disable no-restricted-globals */
import OrderItemList from '../../components/OrderItemList';
import useGetQuery from '../../hooks/useGetQuery';
import { OrderType } from '../../types';
import styles from './index.module.scss';

function Order() {
  const { data: orderList } = useGetQuery<OrderType[]>('/orders');

  return (
    <main className={styles.container}>
      <h2 className={styles.title}>주문 목록</h2>
      <div className={styles['order-list']}>
        {orderList?.map((order: OrderType) => (
          <OrderItemList orderItemList={order.productList} orderNumber={order.id} />
        ))}
      </div>
    </main>
  );
}

export default Order;
