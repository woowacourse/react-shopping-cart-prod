import { PaymentInfo } from '../../@common/PaymentInfo';
import * as S from './PaymentInfoBox.style';

function PaymentInfoBox() {
  return (
    <S.Wrapper>
      <S.Title>결제정보</S.Title>
      <S.PaymentInfoWrapper>
        <PaymentInfo totalPrice={10200} point={'100'} />
      </S.PaymentInfoWrapper>
    </S.Wrapper>
  );
}

export default PaymentInfoBox;
