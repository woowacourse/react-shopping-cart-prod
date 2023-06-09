import { getDeliveryPolicy } from 'api/cart';
import { useGet } from 'hooks/useGet';
import { useRecoilValue } from 'recoil';
import {
  deliveryPriceSelector,
  totalDiscountPriceSelector,
  totalPriceSelector,
} from 'recoil/carts';

const usePrice = () => {
  const { data: delivery } = useGet(getDeliveryPolicy);

  const totalPrice = useRecoilValue(totalPriceSelector);

  const totalDiscountPrice = useRecoilValue(totalDiscountPriceSelector);

  const isDeliveryFreeFromCoupon = useRecoilValue(deliveryPriceSelector);

  const isDeliveryFree =
    totalPrice - totalDiscountPrice >= (delivery?.limit || 0) ||
    isDeliveryFreeFromCoupon;

  const deliveryPrice = isDeliveryFree ? 0 : delivery?.price || 0;

  const finalPrice =
    totalPrice === 0 ? 0 : totalPrice + deliveryPrice - totalDiscountPrice;

  return {
    deliveryLimit: delivery?.limit,
    deliveryPrice,
    totalPrice,
    totalDiscountPrice,
    isDeliveryFree,
    finalPrice,
  };
};

export default usePrice;
