import { Link } from 'react-router-dom';
import { Order } from 'src/types';
import convertKORWon from 'src/utils';
import styles from './index.module.scss';

interface OrderItemProps {
  order: Order;
  isListItem?: boolean;
}

function OrderItem({ order, isListItem }: OrderItemProps) {
  const products = order.productList.map(product => (
    <div key={product.name} className={styles['item-container']}>
      <img src={product.imageUrl} alt={product.name} />
      <div className={styles['item-information-container']}>
        <p>{product.name}</p>
        <div>
          <span>{convertKORWon(product.totalPrice)}</span>/<span>{product.quantity}개</span>
        </div>
      </div>
    </div>
  ));

  return (
    <div>
      <div className={styles.header}>
        <p>주문 번호: {order.id}</p>
        {isListItem && <Link to={`/order/${order.id}`}>상세 보기</Link>}
      </div>
      <div>{products}</div>
    </div>
  );
}

export default OrderItem;
