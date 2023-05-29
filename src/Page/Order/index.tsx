import OrderList from 'src/components/OrderList';
import styles from './index.module.scss';

function Order() {
  return (
    <main className={styles.container}>
      <h2 className={styles.title}>주문 목록</h2>
      <OrderList />
    </main>
  );
}

export default Order;
