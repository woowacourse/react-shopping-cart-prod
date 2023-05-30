import {
  PurchasePropertyWrapper,
  PurchaseText,
} from '../PurchaseBox/PurchaseBox.style';
import * as S from './PointInfoBox.style';

function PointInfoBox() {
  return (
    <S.Wrapper>
      <S.Title>구매혜택</S.Title>
      <S.PaymentInfoWrapper>
        <S.Description>배송완료 다음날 적립됩니다</S.Description>
        <PurchasePropertyWrapper>
          <PurchaseText>적립 포인트</PurchaseText>
          <PurchaseText>58원</PurchaseText>
        </PurchasePropertyWrapper>
      </S.PaymentInfoWrapper>
    </S.Wrapper>
  );
}

export default PointInfoBox;
