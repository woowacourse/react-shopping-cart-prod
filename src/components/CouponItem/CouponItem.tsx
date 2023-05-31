import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import { UsableCouponType } from '../../store/coupon';
import { originState } from '../../store/origin';
import styles from './style.module.css';

const CouponItem = ({ information }: { information: UsableCouponType }) => {
  const [isPublish, setIsPublish] = useState(false);
  const origin = useRecoilValue(originState);

  const onClickCouponItem = async () => {
    try {
      await fetch(`${origin}coupons/${information.couponId}`, {
        method: 'POST',
      });

      setIsPublish(true);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.couponBox}>
        <p className={styles.name}>{information.couponName}</p>
        <p className={styles.minAmount}>
          {Number(information.minAmount).toLocaleString('ko-KR')}원 이상 구매 시 적용
        </p>
      </div>

      {information.isPublished || isPublish ? (
        <button type="button" className={styles.useCoupon} disabled>
          사용하기
        </button>
      ) : (
        <button type="button" className={styles.useCoupon} onClick={onClickCouponItem}>
          사용하기
        </button>
      )}
    </div>
  );
};

export default CouponItem;
