import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { useFetch } from '../../hooks/useFetch';
import { UsableCouponType, usableCouponState } from '../../store/coupon';
import { originState } from '../../store/origin';
import CouponItem from '../CouponItem/CouponItem';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import styles from './style.module.css';

const CouponList = () => {
  const [, setCouponList] = useRecoilState(usableCouponState);

  const { data, fetchApi, isLoading } = useFetch<UsableCouponType[]>(setCouponList);
  const origin = useRecoilValue(originState);

  useEffect(() => {
    fetchApi.get(`${origin}coupons`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [origin]);

  return (
    <div className={styles.container}>
      {isLoading && <LoadingSpinner />}
      {data?.map((couponItem) => (
        <CouponItem key={couponItem.couponId} information={couponItem} />
      ))}
    </div>
  );
};

export default CouponList;
