import useOrderList from 'src/hooks/useOrderList';
import OrderItem from '../OrderItem';
import styles from './index.module.scss';

function OrderList() {
  const { orderList } = useOrderList();

  const listComponents = orderList?.map(order => <OrderItem key={order.id} order={order} isListItem />);

  return <div className={styles['list-container']}>{listComponents}</div>;
}

export default OrderList;
