import { RecoilValue, useRecoilValue } from 'recoil';

import Coupon from '@Components/Coupon';

import { CouponType } from '@Types/index';

import * as S from './style';

type CouponListProps<T> = {
  couponState: RecoilValue<T[]>;
};

function CouponList<T extends CouponType>({ couponState }: CouponListProps<T>) {
  const myCoupons = useRecoilValue(couponState) as T[];

  console.log(myCoupons);

  return (
    <S.Container>
      {myCoupons.map((coupon) => (
        <Coupon key={coupon.id} {...coupon} subMessage="쿠폰으로 할인 받고 상품 구매하기" />
      ))}
    </S.Container>
  );
}

export default CouponList;
