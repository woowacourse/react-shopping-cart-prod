import { useRecoilValue, useSetRecoilState } from 'recoil';

import useCartPrice from './useCartPrice';
import { checkedCartProductIdSelector } from '../states/checkedCartProducts';
import { targetCouponIdState } from '../states/coupon';
import { orderHandlerSelector } from '../states/order';
import { toastState } from '../states/toast/atom';
import { useNavigate } from 'react-router-dom';

const useOrder = () => {
  const cartItemIds = useRecoilValue(checkedCartProductIdSelector);
  const couponId = useRecoilValue(targetCouponIdState);
  const { addOrder } = useRecoilValue(orderHandlerSelector);
  const setToastState = useSetRecoilState(toastState);

  const navigate = useNavigate();

  const { totalPrice } = useCartPrice();

  const orderCartProducts = async () => {
    try {
      await addOrder({ cartItemIds, totalPrice, couponId });
      navigate('/orders');
    } catch {
      setToastState({
        message: '해당 상품 주문을 실패했습니다',
        variant: 'error',
        duration: 2000,
      });
    }
  };

  return { orderCartProducts };
};

export default useOrder;
