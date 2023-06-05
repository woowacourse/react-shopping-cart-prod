import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRecoilState, useRecoilValue } from 'recoil';

import { tokenized } from '../../constants';
import { useCoupon } from '../../hooks/useCouponList';
import { cartTotalAmountState } from '../../store/cart';
import { couponDiscountState } from '../../store/coupon';
import { originState } from '../../store/origin';
import { CouponItemType } from '../../types';
import styles from './style.module.css';

const CouponItem = ({ coupon, type }: { coupon: CouponItemType; type: 'all' | 'usable' }) => {
  const [, setCartDiscount] = useRecoilState(couponDiscountState);
  const { couponList, selectCoupon, cancelSelectCoupon, publishCoupon } = useCoupon();

  const cartTotalAmount = useRecoilValue(cartTotalAmountState);
  const origin = useRecoilValue(originState);
  const queryClient = useQueryClient();

  const publishCouponEvent = useMutation({
    mutationFn: async () => {
      await fetch(`${origin}coupons/${coupon.couponId}`, {
        method: 'POST',
        headers: {
          'Content-Type': `application/json`,
          Authorization: `Basic ${tokenized}`,
        },
      });
    },
    onSuccess: () => {
      publishCoupon(coupon.couponId);
      queryClient.invalidateQueries({ queryKey: ['coupons', coupon.couponId] });
    },
  });

  const discountCouponEvent = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        `${origin}coupons/${coupon.couponId}/discount?total=${cartTotalAmount + 3000}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': `application/json`,
            Authorization: `Basic ${tokenized}`,
          },
        }
      );

      return response.json();
    },
    onSuccess: (data) => {
      setCartDiscount(data.discountAmount);
      selectCoupon(coupon.couponId);
      queryClient.invalidateQueries({ queryKey: ['coupons/discount'] });
    },
  });

  const cancelCouponEvent = () => {
    cancelSelectCoupon();
    setCartDiscount(0);
  };

  const targetCoupon = couponList.find((couponItem) => couponItem.couponId === coupon.couponId);

  return (
    <div
      className={targetCoupon?.isChecked ? `${styles.activeUseContainer}` : `${styles.container}`}
    >
      <div className={styles.couponBox}>
        <p className={styles.name}>{coupon.couponName}</p>
        <p className={styles.minAmount}>
          {Number(coupon.minAmount).toLocaleString('ko-KR')}원 이상 구매 시 적용
        </p>
      </div>

      {type === 'all' && (
        <button
          type="button"
          className={styles.useCoupon}
          disabled={targetCoupon?.isPublished}
          onClick={() => {
            publishCouponEvent.mutate();
          }}
        >
          발급하기
        </button>
      )}

      {type === 'usable' && (
        <button
          type="button"
          className={styles.useCoupon}
          onClick={() => {
            targetCoupon?.isChecked ? cancelCouponEvent() : discountCouponEvent.mutate();
          }}
        >
          쿠폰 사용하기
        </button>
      )}
    </div>
  );
};

export default CouponItem;
