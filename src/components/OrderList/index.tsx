import useOrderList from 'src/hooks/useOrderList';
import OrderItem from '../OrderItem';
import LoadingSpinner from '../Common/LoadingSpinner';
import styles from './index.module.scss';

function OrderList() {
  const { orderList, loading } = useOrderList();

  const listComponents = orderList?.map(order => <OrderItem key={order.id} order={order} />);

  if (loading) {
    return (
      <div className={styles['loading-container']}>
        <LoadingSpinner size="medium" />
      </div>
    );
  }

  return <div className={styles['list-container']}>{listComponents}</div>;
}

export default OrderList;
