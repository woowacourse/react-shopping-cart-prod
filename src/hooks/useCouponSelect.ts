import { useRecoilState, useRecoilValue } from 'recoil';
import {
  couponsSelector,
  selectedCouponsState,
  specificCouponSelector,
} from '../atoms/coupons';
import { isSelectedCartId } from '../atoms/cart';
import { useEffect, useState } from 'react';

const useCouponSelect = (cartId: number, productId: number) => {
  const { allCoupons } = useRecoilValue(couponsSelector);
  const [selectedCoupons, setSelectedCoupons] =
    useRecoilState(selectedCouponsState);
  const isCheckedCartItem = useRecoilValue(isSelectedCartId(cartId));
  const specificCoupons = useRecoilValue(specificCouponSelector(productId));

  const [targetCouponId, setTargetCouponId] = useState<number>();

  useEffect(() => {
    if (!isCheckedCartItem && targetCouponId) {
      setSelectedCoupons(
        selectedCoupons.filter((couponId) => couponId !== targetCouponId)
      );
    }
  }, [isCheckedCartItem]);

  const onCouponSelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === 'DEFAULT' || !isCheckedCartItem) {
      e.target.selectedIndex = 0;
      setSelectedCoupons(
        selectedCoupons.filter((couponId) => couponId !== targetCouponId)
      );
      return;
    }

    const newSelectedCoupons = selectedCoupons.filter(
      (couponId) => !allCoupons.some((coupon) => coupon.id === couponId)
    );
    const newSelectedCouponId = +e.target.value;
    newSelectedCoupons.push(newSelectedCouponId);

    setTargetCouponId(newSelectedCouponId);
    setSelectedCoupons([...new Set(newSelectedCoupons)]);
  };

  return { onCouponSelected, selectedCoupons, specificCoupons };
};

export default useCouponSelect;
