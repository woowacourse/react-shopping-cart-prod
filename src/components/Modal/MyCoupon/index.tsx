import { Suspense } from 'react';

import CouponList from '@Components/CouponList';
import CouponListSkeleton from '@Components/CouponList/CouponListSkeleton';

import myCouponState from '@Atoms/myCouponState';

function MyCoupon() {
  return (
    <div>
      <Suspense fallback={<CouponListSkeleton />}>
        <CouponList
          couponState={myCouponState}
          noExistCouponText="쿠폰을 다 사용했요!"
          noExistCouponSubText="쿠폰 발급하기에서 쿠폰을 발급해보세요!"
          couponSubMessage="쿠폰으로 할인 받고 상품 구매하기"
        />
      </Suspense>
    </div>
  );
}

export default MyCoupon;
