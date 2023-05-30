import Coupon from '@Components/Coupon';

import * as S from './style';

function CouponListSkeleton() {
  return (
    <S.Container>
      {Array.from({ length: 4 }, (_, index) => (
        <Coupon key={index} isLoading />
      ))}
    </S.Container>
  );
}

export default CouponListSkeleton;
