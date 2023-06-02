import { useRecoilValue } from 'recoil';

import orderApis from '../apis/order';
import useCartPrice from './useCartPrice';
import { checkedCartProductIdSelector } from '../states/checkedCartProducts';
import { targetCouponIdState } from '../states/coupon';
import { serverNameState } from '../states/serverName';

const useOrder = () => {
  const serverName = useRecoilValue(serverNameState);
  const cartItemIds = useRecoilValue(checkedCartProductIdSelector);
  const couponId = useRecoilValue(targetCouponIdState);

  const { totalPrice } = useCartPrice();

  const addOrder = () => {
    orderApis(serverName).postOrder({ cartItemIds, totalPrice, couponId });
  };

  return { addOrder };
};

export default useOrder;
