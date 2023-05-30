import { OrderProduct } from '../../types';
import styles from './index.module.scss';

function OrderItem({ name, totalPrice, quantity, imageUrl }: OrderProduct) {
  return (
    <ul className={styles.container}>
      <img src={imageUrl} alt={name} className={styles.image} />
      <div className={styles.information}>
        <h3>{name}</h3>
        <p>
          {totalPrice}원 / 수량 : {quantity}개{' '}
        </p>
      </div>
    </ul>
  );
}

export default OrderItem;
