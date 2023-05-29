import { orderList } from 'src/data/mockData';
import OrderItem from '../OrderItem';
import styles from './index.module.scss';

function OrderList() {
  const data = orderList;
  const listComponents = data.map(order => <OrderItem key={order.id} order={order} />);

  return <div className={styles['list-container']}>{listComponents}</div>;
}

export default OrderList;
