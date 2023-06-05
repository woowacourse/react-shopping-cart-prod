import useOrderList from 'src/hooks/useOrderList';
import EmptyComponent from '../Common/EmptyComponent';
import OrderItem from '../OrderItem';
import styles from './index.module.scss';

function OrderList() {
  const { orderList } = useOrderList();

  const listComponents =
    orderList && orderList.length > 0 ? (
      orderList.map(order => <OrderItem key={order.id} order={order} isListItem />)
    ) : (
      <EmptyComponent title="주문 내역이 없습니다!" />
    );

  return <div className={styles['list-container']}>{listComponents}</div>;
}

export default OrderList;
