import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

import { checkedCartProductIdSelector } from '../../states/checkedCartProducts';
import { orderHandlerSelector } from '../../states/order';
import { toastState } from '../../states/toast';
import { ORDER_MESSAGE } from '../../constants/toast';

export const useOrder = (couponId: number | undefined, totalPrice: number) => {
  const cartItemIds = useRecoilValue(checkedCartProductIdSelector);
  const { addOrder } = useRecoilValue(orderHandlerSelector);
  const setToastState = useSetRecoilState(toastState);

  const navigate = useNavigate();

  const orderCartProducts = async () => {
    try {
      await addOrder({ cartItemIds, totalPrice, couponId });
      navigate('/orders');
      setToastState(ORDER_MESSAGE.success);
    } catch {
      setToastState(ORDER_MESSAGE.error);
    }
  };

  return { orderCartProducts };
};
