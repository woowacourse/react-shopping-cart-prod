import { Suspense } from 'react';

import CouponList from '@Components/CouponList';
import CouponListSkeleton from '@Components/CouponList/CouponListSkeleton';

import allCouponState from '@Selector/allCouponState';

function AllCoupon() {
  return (
    <div>
      <Suspense fallback={<CouponListSkeleton />}>
        <CouponList
          couponState={allCouponState}
          noExistCouponText="혹시 쿠폰이 있으신가요?"
          noExistCouponSubText="발급 가능한 쿠폰이 없어요."
          couponSubMessage="쿠폰 발급 받고 상품 할인 받기"
          ableIssued
        />
      </Suspense>
    </div>
  );
}

export default AllCoupon;
