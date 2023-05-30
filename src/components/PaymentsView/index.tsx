import { Payments } from 'src/types';
import convertKORWon from 'src/utils';
import usePayment from 'src/hooks/usePayment';
import { $CheckedCartIdList, $CurrentServerUrl } from 'src/recoil/atom';
import { useRecoilValue } from 'recoil';
import styles from './index.module.scss';

interface PaymentsViewProps {
  paymentAmount: Payments;
  puschaseOption: boolean;
}

function PaymentsView({ puschaseOption, paymentAmount }: PaymentsViewProps) {
  const { originalPrice, discounts, discountedPrice, deliveryFee, finalPrice } = paymentAmount;
  const currentServer = useRecoilValue($CurrentServerUrl);
  const checkedCartItemsId = useRecoilValue($CheckedCartIdList(currentServer));

  const { purchaseCartItem } = usePayment();

  const handleClick = async () => {
    await purchaseCartItem(checkedCartItemsId);
  };

  const discountView = discounts.length > 0 && (
    <div className={styles['discount-container']}>
      {discounts.map(option => (
        <div>
          <span>{option.discountPolicy}</span>
          <span>-{convertKORWon(option.discountAmount)}</span>
        </div>
      ))}
      <div>
        <span>할인 적용 금액</span>
        <span>{convertKORWon(discountedPrice)}</span>
      </div>
    </div>
  );

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>결제예상금액</h2>
      <li className={styles['payments-info']}>
        <ul>
          <span>상품가격</span>
          <span>{convertKORWon(originalPrice)}</span>
        </ul>
        {discountView}
        <ul>
          <span>배송비</span>
          <span>{convertKORWon(deliveryFee)}</span>
        </ul>
        <ul>
          <span>총 주문금액</span>
          <span>{convertKORWon(finalPrice)}</span>
        </ul>
      </li>
      {puschaseOption && (
        <button type="button" className={styles['payments-button']} onClick={handleClick}>
          주문하기
        </button>
      )}
    </section>
  );
}

export default PaymentsView;
