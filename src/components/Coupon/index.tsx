import { CouponType } from '@Types/index';

import * as S from './style';

function Coupon({
  name,
  description,
  isUsed = false,
  subMessage,
  ableIssued,
  isLoading = false,
}: Partial<CouponType> & { subMessage?: string; ableIssued?: boolean; isLoading?: boolean }) {
  const couponButton = ableIssued ? '⬇︎' : '➡︎';

  return (
    <S.Container isUsed={isUsed} isLoading={isLoading}>
      <S.CouponLayout>
        <S.CouponDescription>{description}</S.CouponDescription>
        <S.CouponName>{name}</S.CouponName>
        <S.CouponSubMessage>{subMessage}</S.CouponSubMessage>
      </S.CouponLayout>
      <S.CouponButton isLoading={isLoading}>{couponButton}</S.CouponButton>
    </S.Container>
  );
}

export default Coupon;
