import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

import { checkedCartProductIdSelector } from '../../states/checkedCartProducts';
import { orderHandlerSelector } from '../../states/order';
import { toastState } from '../../states/toast';

export const useOrder = (couponId: number | undefined, totalPrice: number) => {
  const cartItemIds = useRecoilValue(checkedCartProductIdSelector);
  const { addOrder } = useRecoilValue(orderHandlerSelector);
  const setToastState = useSetRecoilState(toastState);

  const navigate = useNavigate();

  const orderCartProducts = async () => {
    try {
      await addOrder({ cartItemIds, totalPrice, couponId });
      navigate('/orders');
      setToastState({
        message: '선택한 상품을 주문했습니다',
        variant: 'success',
        duration: 2000,
      });
    } catch {
      setToastState({
        message: '선택한 상품 주문에 실패했습니다',
        variant: 'error',
        duration: 2000,
      });
    }
  };

  return { orderCartProducts };
};
