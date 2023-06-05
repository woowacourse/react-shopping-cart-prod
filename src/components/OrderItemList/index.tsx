import { Link } from 'react-router-dom';
import { OrderProduct } from '../../types';
import OrderItem from '../OrderItem';
import styles from './index.module.scss';

interface OrderItemListProps {
  orderItemList: OrderProduct[];
  orderNumber: number;
  orderTime: string;
}

function OrderItemList({ orderItemList, orderNumber, orderTime }: OrderItemListProps) {
  const path = `/order-detail/${orderNumber}`;

  return (
    <div className={styles.container}>
      <div className={styles['list-title']}>
        <div>
          <span>주문번호: {orderNumber}</span> | <span>구매 일시: {orderTime}</span>
        </div>
        <Link to={path}>
          <button type="button" className={styles['show-detail-button']}>
            상세보기{'>'}
          </button>
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
