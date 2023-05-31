import { Suspense } from 'react';

import CouponListSection from '../components/Coupon/CouponListSection/CouponListSection';
import Header from '../components/Header/Header';
import LoadingSpinner from '../components/utils/LoadingSpinner/LoadingSpinner';

const CouponListPage = () => {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<LoadingSpinner />}>
          <CouponListSection />
        </Suspense>
      </main>
    </>
  );
};

export default CouponListPage;
