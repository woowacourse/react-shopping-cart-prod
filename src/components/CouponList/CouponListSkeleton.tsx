import CouponSkeleton from '@Components/Coupon/CouponSkeleton';

import * as S from './style';

function CouponListSkeleton() {
  return (
    <S.Container>
      {Array.from({ length: 4 }, (_, index) => (
        <CouponSkeleton key={index} />
      ))}
    </S.Container>
  );
}

export default CouponListSkeleton;
