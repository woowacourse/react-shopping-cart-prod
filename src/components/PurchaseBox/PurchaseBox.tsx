import {
  PurchaseBoxWrapper,
  PurchaseButton,
  PurchaseButtonWrapper,
  PurchaseTitle,
  PurchaseWrapper,
} from './PurchaseBox.style';
import { useRecoilValue } from 'recoil';
import { totalPriceSelector } from '../../recoil/cartAtoms.ts';
import PaymentInfo from '../PaymentInfo/PaymentInfo.tsx';

function PurchaseBox() {
  const totalPrice = useRecoilValue(totalPriceSelector);

  return (
    <PurchaseBoxWrapper>
      <PurchaseWrapper>
        <PurchaseTitle>결제예상금액</PurchaseTitle>
      </PurchaseWrapper>
      <PurchaseWrapper>
        <PaymentInfo totalPrice={totalPrice} />
        <PurchaseButtonWrapper>
          <PurchaseButton disabled={totalPrice === 0}>주문하기</PurchaseButton>
        </PurchaseButtonWrapper>
      </PurchaseWrapper>
    </PurchaseBoxWrapper>
  );
}

export default PurchaseBox;
