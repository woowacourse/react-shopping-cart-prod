import {
  PurchaseButton,
  PurchaseButtonWrapper,
  PurchaseTitle,
  PurchaseWrapper,
} from './PurchaseBox.style';
import { useRecoilValue } from 'recoil';
import { totalPriceSelector } from '../../recoil/cartAtoms.ts';
import PaymentInfo from '../PaymentInfo/PaymentInfo.tsx';

type PurchaseBoxProps = {
  point: string;
};

function PurchaseBox({ point }: PurchaseBoxProps) {
  const totalPrice = useRecoilValue(totalPriceSelector);

  return (
    <>
      <PurchaseWrapper>
        <PurchaseTitle>결제예상금액</PurchaseTitle>
      </PurchaseWrapper>
      <PurchaseWrapper>
        <PaymentInfo totalPrice={totalPrice} point={point} />
        <PurchaseButtonWrapper>
          <PurchaseButton disabled={totalPrice === 0}>주문하기</PurchaseButton>
        </PurchaseButtonWrapper>
      </PurchaseWrapper>
    </>
  );
}

export default PurchaseBox;
