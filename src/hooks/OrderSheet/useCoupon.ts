import { useRecoilValue } from 'recoil';
import { selectedProductsState } from '../../recoil/atom';
import { useEffect, useState } from 'react';
import { fetchCoupons } from '../../api';
import { Coupon } from '../../types/domain';

export const useCoupon = () => {
  const checkedCartList = useRecoilValue(selectedProductsState);
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  const getCoupon = async () => {
    const parsedCoupon = await fetchCoupons(
      checkedCartList.map((checkedCartItem) => checkedCartItem.cartItemId),
    );
    setCoupons(parsedCoupon);
  };

  useEffect(() => {
    getCoupon();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { coupons };
};
