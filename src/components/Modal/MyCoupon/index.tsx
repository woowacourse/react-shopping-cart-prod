import { useModal } from 'noah-modal';
import { Suspense } from 'react';

import CouponList from '@Components/CouponList';
import CouponListSkeleton from '@Components/CouponList/CouponListSkeleton';

import myCouponState from '@Atoms/myCouponState';

function MyCoupon() {
  const { openModal, closeModal } = useModal();
  const openAllCoupon = () => {
    closeModal('myCoupon');
    setTimeout(() => {
      openModal('allCoupon');
    }, 300);
  };

  return (
    <>
      <Suspense fallback={<CouponListSkeleton />}>
        <CouponList
          couponState={myCouponState}
          noExistCouponText="쿠폰을 다 사용했요!"
          noExistCouponSubText="쿠폰 발급하기에서 쿠폰을 발급해보세요."
          couponSubMessage="쿠폰으로 할인 받고 상품 구매하기"
          redirectMessage="쿠폰 발급 바로가기"
          redirectAction={openAllCoupon}
          type="use"
        />
      </Suspense>
    </>
  );
}

export default MyCoupon;
