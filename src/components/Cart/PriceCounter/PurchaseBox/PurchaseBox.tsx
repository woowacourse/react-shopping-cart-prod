import * as S from './PurchaseBox.style.ts';
import { useRecoilValue } from 'recoil';
import { totalPriceSelector } from '../../../../recoil/cartAtoms.ts';
import PaymentInfo from '../../../@common/PaymentInfo/PaymentInfo.tsx';

type PurchaseBoxProps = {
  point: string;
};

function PurchaseBox({ point }: PurchaseBoxProps) {
  const totalPrice = useRecoilValue(totalPriceSelector);

  return (
    <>
      <S.PurchaseWrapper>
        <S.PurchaseTitle>결제예상금액</S.PurchaseTitle>
      </S.PurchaseWrapper>
      <S.PurchaseWrapper>
        <PaymentInfo totalPrice={totalPrice} point={point} />
        <S.PurchaseButtonWrapper>
          <S.PurchaseButton disabled={totalPrice === 0}>주문하기</S.PurchaseButton>
        </S.PurchaseButtonWrapper>
      </S.PurchaseWrapper>
    </>
  );
}

export default PurchaseBox;
