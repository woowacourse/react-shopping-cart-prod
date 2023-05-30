import { Suspense } from 'react';

import CouponList from '@Components/CouponList';

import myCouponState from '@Atoms/myCouponState';

function MyCoupon() {
  return (
    <div>
      <Suspense fallback={<div></div>}>
        <CouponList couponState={myCouponState} />
      </Suspense>
    </div>
  );
}

export default MyCoupon;
