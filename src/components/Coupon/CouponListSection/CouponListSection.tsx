import { useCallback } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

import useCoupon from '../../../hooks/useCoupon';
import { couponListState } from '../../../store/coupon';
import { CouponItemType } from '../../../types';
import LoadingSpinner from '../../utils/LoadingSpinner/LoadingSpinner';
import styles from './style.module.css';

const CouponListSection = () => {
  const coupons = useRecoilValue(couponListState);
  const { fetchCouponList, publishCoupon } = useCoupon();
  const { isLoading } = useQuery<CouponItemType[]>('couponList', fetchCouponList);
  const { mutate: publishCouponMutation, isLoading: publishCouponLoading } =
    useMutation(publishCoupon);

  const handlePublishCoupon = useCallback(
    (couponId: number) => {
      publishCouponMutation(couponId);
    },
    [publishCouponMutation]
  );

  if (isLoading) return <LoadingSpinner />;
  return (
    <>
      {publishCouponLoading && <LoadingSpinner />}
      {coupons.map((item, index) => {
        return (
          <div className={styles.CouponBox} key={index}>
            <div className={styles.CouponItem}>
              <h1>{item.couponName}</h1>
              <div>최소 주문금액 {item.minAmount}원</div>
            </div>
            <div>
              {item.isPublished ? (
                <button type="button" disabled className={styles.usedCouponText}>
                  발급완료
                </button>
              ) : (
                <button
                  type="button"
                  className={styles.getCouponButton}
                  onClick={() => {
                    handlePublishCoupon(item.couponId);
                  }}
                >
                  발급받기
                </button>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CouponListSection;
