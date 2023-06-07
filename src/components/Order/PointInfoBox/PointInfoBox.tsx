import { DELIVERY_FEE, POINT_PERCENTAGE } from '../../../constants';
import { PurchasePropertyWrapper, PurchaseText } from '../../Cart/PurchaseBox/PurchaseBox.style';
import * as S from './PointInfoBox.style';

type PointInfoBoxProps = {
  paymentPrice: number;
};

function PointInfoBox({ paymentPrice }: PointInfoBoxProps) {
  return (
    <S.Wrapper>
      <S.Title>구매혜택</S.Title>
      <S.PaymentInfoWrapper>
        <S.Description>결제금액의 1%가 적립됩니다.</S.Description>
        <PurchasePropertyWrapper>
          <PurchaseText>적립 포인트</PurchaseText>
          <PurchaseText>{Math.floor((paymentPrice + DELIVERY_FEE) * POINT_PERCENTAGE)}p</PurchaseText>
        </PurchasePropertyWrapper>
      </S.PaymentInfoWrapper>
    </S.Wrapper>
  );
}

export default PointInfoBox;
