import SecondaryButton from '@Components/SecondaryButton';

import * as S from './style';

function IssuedCoupon() {
  return (
    <S.Container>
      <S.IssuedCouponText>쿠폰 받고 할인 받기</S.IssuedCouponText>
      <SecondaryButton text="쿠폰 발급" />
    </S.Container>
  );
}

export default IssuedCoupon;
