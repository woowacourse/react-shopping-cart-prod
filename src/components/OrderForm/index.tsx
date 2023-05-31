import { CartItem, Payments } from 'src/types';
import convertKORWon from 'src/utils';
import styles from './index.module.scss';

interface OrderFormProps {
  cancelHandler: () => void;
  orderHandler: () => Promise<void>;
  products: CartItem[];
  paymentAmount: Omit<Payments, 'discounts'>;
}

function OrderForm({ cancelHandler, orderHandler, products, paymentAmount }: OrderFormProps) {
  const { finalPrice, originalPrice, deliveryFee, discountedPrice } = paymentAmount;
  const itemInfo = products.map(item => (
    <div key={item.id} className={styles['item-container']}>
      <img src={item.product.imageUrl} alt={item.product.name} className={styles['product-img']} />
      <span className={styles['product-description']}>{item.product.name}</span>
      <span>{item.quantity}개</span>
      <span>{convertKORWon(item.product.price * item.quantity)}</span>
    </div>
  ));
  return (
    <section className={styles['form-section']}>
      <div className={styles.header}>
        <span>주문서</span>
      </div>
      <div className={styles['content-container']}>
        <div>
          <p className={styles['sub-title']}>주문 상품</p>
          <div className={styles['product-container']}>{itemInfo}</div>
        </div>
        <div className={styles['payments-container']}>
          <p className={styles['sub-title']}>결제 금액</p>
          <ul className={styles['payments-ul']}>
            <li>
              <span>상품 금액</span>
              <span>{convertKORWon(originalPrice)}</span>
            </li>
            <li>
              <span>할인 적용 금액</span>
              <span>{convertKORWon(discountedPrice)}</span>
            </li>
            <li>
              <span>배송비</span>
              <span>{convertKORWon(deliveryFee)}</span>
            </li>
            <li>
              <span>최종 결제 금액</span>
              <span className={styles.emphasize}>{convertKORWon(finalPrice)}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles['button-container']}>
        <button type="button" onClick={cancelHandler}>
          취소하기
        </button>
        <button type="button" onClick={orderHandler}>
          주문하기
        </button>
      </div>
    </section>
  );
}

export default OrderForm;
