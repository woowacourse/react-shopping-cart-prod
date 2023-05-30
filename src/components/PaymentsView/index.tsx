import { DiscountPolicy, PaymentsData } from '../../types';
import styles from './index.module.scss';

interface PaymentsViewProps {
  paymentsData: PaymentsData;
}

function PaymentsView({ paymentsData }: PaymentsViewProps) {
  const { originalPrice, discounts, discountedPrice, deliveryFee, finalPrice } = paymentsData;
  const hasDiscount = discounts.length !== 0;

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>결제예상금액</h2>
      <li className={styles['payments-info']}>
        <ul>
          <span>총 상품가격</span>
          <span className={hasDiscount ? styles['line-through'] : ''}>{originalPrice.toLocaleString()} 원</span>
        </ul>
        {discounts.map(({ discountPolicy, discountAmount }: DiscountPolicy) => (
          <ul className={styles.discount}>
            <span>- {discountPolicy}</span>
            <span>{discountAmount.toLocaleString()} 원</span>
          </ul>
        ))}
        <ul>
          <span>할인 가격</span>
          <span>{discountedPrice.toLocaleString()} 원</span>
        </ul>
        <ul>
          <span>총 배송비</span>
          <span>{deliveryFee.toLocaleString()} 원</span>
        </ul>
        <ul>
          <span>총 주문금액</span>
          <span>{finalPrice.toLocaleString()} 원</span>
        </ul>
      </li>
      <button type="button" className={styles['payments-button']} disabled={originalPrice === 0}>
        주문하기
      </button>
    </section>
  );
}

export default PaymentsView;
