import { getDeliveryPolicy } from 'api/cart';
import { useGet } from 'hooks/useGet';
import { useRecoilValue } from 'recoil';
import { totalDiscountPriceSelector, totalPriceSelector } from 'recoil/carts';

const usePrice = () => {
  const { data: delivery } = useGet(getDeliveryPolicy);

  const totalPrice = useRecoilValue(totalPriceSelector);

  const totalDiscountPrice = useRecoilValue(totalDiscountPriceSelector);

  const isDeliveryFree =
    totalPrice - totalDiscountPrice >= (delivery?.limit || 0);

  const deliveryFee = isDeliveryFree ? 0 : delivery?.price || 0;

  const finalPrice =
    totalPrice === 0 ? 0 : totalPrice + deliveryFee - totalDiscountPrice;

  return {
    deliveryLimit: delivery?.limit,
    deliveryPrice: delivery?.price,
    totalPrice,
    totalDiscountPrice,
    isDeliveryFree,
    finalPrice,
  };
};

export default usePrice;
