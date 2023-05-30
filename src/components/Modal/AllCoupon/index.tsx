import { Suspense } from 'react';

import CouponList from '@Components/CouponList';

import allCouponState from '@Selector/allCouponState';

function AllCoupon() {
  return (
    <div>
      <Suspense fallback={<div></div>}>
        <CouponList couponState={allCouponState} />
      </Suspense>
    </div>
  );
}

export default AllCoupon;
