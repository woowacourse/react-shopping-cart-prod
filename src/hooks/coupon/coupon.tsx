import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  allCouponsSelector,
  productCouponsSelector,
  selectedCouponsState,
  selectedCouponState,
} from '../../atoms/coupon';
import { ALL_COUPON_MAP_ID } from '../../constants/coupon';
import { CartItem } from '../../types/cart';
import { AllCoupon, SpecificCoupon } from '../../types/coupon';
import { useRefreshableRecoilValue } from '../common/useRefreshableAtom';

export const useSpecificCoupon = (cartInfo: CartItem) => {
  const {
    id: cartId,
    product: { id: productId },
  } = cartInfo;

  const selectedCoupon = useRecoilValue(selectedCouponState(cartId));
  const productCoupons = useRefreshableRecoilValue(
    productCouponsSelector(productId)
  );
  const setSelectedCouponsState = useSetRecoilState(selectedCouponsState);

  const selectSpecificCoupon = (couponId: SpecificCoupon['id']) => {
    const targetCoupon = productCoupons?.find(
      (coupon) => coupon.id === couponId
    );

    setSelectedCouponsState((prevSelectedCoupons) => {
      const updatedSelectedCoupons = new Map(prevSelectedCoupons);
      targetCoupon
        ? updatedSelectedCoupons.set(cartId, targetCoupon)
        : updatedSelectedCoupons.delete(cartId);

      updatedSelectedCoupons.delete(-1);

      return updatedSelectedCoupons;
    });
  };

  return {
    productCoupons,
    selectedCoupon,
    selectSpecificCoupon,
  };
};

export const useAllCoupon = (couponMapId: CartItem['id']) => {
  const allCoupons = useRefreshableRecoilValue(allCouponsSelector);
  const selectedCoupon = useRecoilValue(selectedCouponState(couponMapId));
  const setSelectedCouponsState = useSetRecoilState(selectedCouponsState);

  const selectAllCoupon = (couponId: AllCoupon['id']) => {
    const targetCoupon = allCoupons?.find((coupon) => coupon.id === couponId);

    setSelectedCouponsState(
      targetCoupon ? new Map().set(ALL_COUPON_MAP_ID, targetCoupon) : new Map()
    );
  };

  return {
    allCoupons,
    selectedCoupon,
    selectAllCoupon,
  };
};
