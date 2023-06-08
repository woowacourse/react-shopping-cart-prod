import { getCouponApplied } from 'api/requests';
import { useGet } from 'hooks/useGet';
import { useRecoilValue } from 'recoil';
import { couponIdAtom, checkedItemsAtom, cartListAtom } from 'recoil/cartList';
import { CouponAppliedPriceResponse } from 'types/api';

export const useCalculatePrice = () => {
  const couponIds = useRecoilValue(couponIdAtom);
  const checkedItems = useRecoilValue(checkedItemsAtom);
  const cartList = useRecoilValue(cartListAtom);

  const { data } = useGet<CouponAppliedPriceResponse>(
    getCouponApplied(couponIds),
    couponIds
  );

  const calculateDeliveryPrice = () => {
    if (!data) return 0;
    return data.deliveryPrice.originalPrice - data.deliveryPrice.discountPrice;
  };

  const calculateOriginalPrice = () => {
    if (!data) return 0;

    return data.cartItemsPrice.reduce((acc, cur) => {
      if (!checkedItems.includes(cur.cartItemId)) return acc;
      const quantity =
        cartList.find((item) => item.id === cur.cartItemId)?.quantity ?? 0;
      return acc + cur.originalPrice * quantity;
    }, 0);
  };

  const calculateTotalDiscountPrice = () => {
    if (!data) return 0;

    const discountPrice = data.cartItemsPrice.reduce((acc, cur) => {
      if (!checkedItems.includes(cur.cartItemId)) return acc;
      const quantity =
        cartList.find((item) => item.id === cur.cartItemId)?.quantity ?? 0;
      return acc + cur.discountPrice * quantity;
    }, 0);

    const couponDiscountPrice = data.discountFromTotalPrice.discountPrice;
    return discountPrice + couponDiscountPrice;
  };

  const calculateOrderPrice = () => {
    if (!data) return 0;
    return (
      calculateDeliveryPrice() +
      calculateOriginalPrice() -
      calculateTotalDiscountPrice()
    );
  };

  return {
    calculateDeliveryPrice,
    calculateOriginalPrice,
    calculateTotalDiscountPrice,
    calculateOrderPrice,
  };
};
