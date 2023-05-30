import { MyCouponType } from '@Types/index';

import * as S from './style';

function Coupon({ name, description, isUsed, subMessage }: MyCouponType & { subMessage: string }) {
  return (
    <S.Container isUsed={isUsed}>
      <S.CouponLayout>
        <S.CouponDescription>{description}</S.CouponDescription>
        <S.CouponName>{name}</S.CouponName>
        <S.CouponSubMessage>{subMessage}</S.CouponSubMessage>
      </S.CouponLayout>
      <S.CouponButton>➔</S.CouponButton>
    </S.Container>
  );
}

export default Coupon;
