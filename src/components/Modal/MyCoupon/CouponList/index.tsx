import { useRecoilValue } from 'recoil';

import Coupon from '@Components/Coupon';

import myCouponState from '@Atoms/myCouponState';

import * as S from './style';

function CouponList() {
  const myCoupons = useRecoilValue(myCouponState);

  return (
    <S.Container>
      {myCoupons.map((coupon) => (
        <Coupon key={coupon.id} {...coupon} subMessage="쿠폰으로 할인 받고 상품 구매하기" />
      ))}
    </S.Container>
  );
}

export default CouponList;
