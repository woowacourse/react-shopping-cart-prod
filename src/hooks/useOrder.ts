import { useRecoilValue } from 'recoil';

import orderApis from '../apis/order';
import useCartPrice from './useCartPrice';
import { checkedCartProductIdSelector } from '../states/checkedCartProducts';
import { targetCouponIdState } from '../states/coupon';

const useOrder = () => {
  const couponId = useRecoilValue(targetCouponIdState);
  const cartItemIds = useRecoilValue(checkedCartProductIdSelector);

  const { totalPrice } = useCartPrice();

  const addOrder = () => {
    orderApis().postOrder({ cartItemIds, totalPrice, couponId });
  };

  return { addOrder };
};

export default useOrder;
