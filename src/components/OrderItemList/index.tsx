import { Link } from 'react-router-dom';
import { OrderProduct } from '../../types';
import OrderItem from '../OrderItem';
import styles from './index.module.scss';

interface OrderItemListProps {
  orderItemList: OrderProduct[];
  orderNumber: number;
}

function OrderItemList({ orderItemList, orderNumber }: OrderItemListProps) {
  return (
    <div className={styles.container}>
      <div className={styles['list-title']}>
        <span>주문번호: {orderNumber}</span>
        <Link to="/order-detail">
          <button type="button">상세보기{'>'}</button>
        </Link>
      </div>
      <li className={styles.list}>
        {orderItemList.map(orderItem => (
          <OrderItem {...orderItem} />
        ))}
      </li>
    </div>
  );
}

export default OrderItemList;
