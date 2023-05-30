import { Payments } from 'src/types';
import convertKORWon from 'src/utils';
import usePurchase from 'src/hooks/usePurchase';
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

  const notChecked = checkedCartItemsId.length === 0;

  const { purchaseCartItem } = usePurchase();

  const handleClick = async () => {
    await purchaseCartItem(checkedCartItemsId);
  };

  const discountView = discounts.length > 0 && (
    <div className={styles['discount-container']}>
      {discounts.map((option, idx) => (
        <div key={idx}>
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
          <span>{notChecked ? '0원 ' : convertKORWon(deliveryFee)}</span>
        </ul>
        <ul>
          <span>총 주문금액</span>
          <span>{notChecked ? '0원 ' : convertKORWon(finalPrice)}</span>
        </ul>
      </li>
      {puschaseOption && (
        <button type="button" className={styles['payments-button']} onClick={handleClick} disabled={notChecked}>
          주문하기
        </button>
      )}
    </section>
  );
}

export default PaymentsView;
