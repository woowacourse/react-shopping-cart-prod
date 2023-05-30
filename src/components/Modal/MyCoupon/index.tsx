import { Suspense } from 'react';

import CouponList from './CouponList';

function MyCoupon() {
  return (
    <div>
      <Suspense fallback={<div></div>}>
        <CouponList />
      </Suspense>
    </div>
  );
}

export default MyCoupon;
