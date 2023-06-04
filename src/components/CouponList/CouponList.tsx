import { Suspense } from 'react';

import { useCouponList } from '../../hooks/useFetchUrl';
import CartOrderButton from '../CartOrderButton/CartOrderButton';
import CouponItem from '../CouponItem/CouponItem';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import styles from './style.module.css';

type CouponListContainerProps = {
  type: 'all' | 'usable';
};

type CouponListProps = {
  type: 'all' | 'usable';
};

const CouponList = ({ type }: CouponListProps) => {
  const coupons = useCouponList(type);

  return (
    <>
      {coupons?.map((coupon) => (
        <CouponItem key={coupon.couponId} coupon={coupon} type={type} />
      ))}
    </>
  );
};

const CouponListContainer = ({ type }: CouponListContainerProps) => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className={type === 'all' ? styles.pageContainer : styles.modalContainer}>
        <CouponList type={type} />
        <CartOrderButton />
      </div>
    </Suspense>
  );
};

export default CouponListContainer;
