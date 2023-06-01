import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

import fetchApis from '../apis/fetchApis';
import { checkedCartProductState } from '../states/checkedCartProducts';
import { serverNameState } from '../states/serverName';
import { toastState } from '../states/toast/atom';
import { TOAST_STATE } from '../constants/toast';
import { NO_DISCOUNT } from '../constants/coupon';

export const useOrderProducts = () => {
  const checkedList = useRecoilValue(checkedCartProductState);
  const serverName = useRecoilValue(serverNameState);
  const { postData } = fetchApis(serverName);
  const setToastState = useSetRecoilState(toastState);
  const navigate = useNavigate();

  const orderProducts = async (totalPrice: number, couponId: number | null) => {
    const dataSet = couponId
      ? {
          cartItemIds: checkedList.map(checked => checked.id),
          totalPrice,
          couponId,
        }
      : {
          cartItemIds: checkedList.map(checked => checked.id),
          totalPrice,
        };

    try {
      await postData(dataSet, '/orders');

      // 성공 - 장바구니 목록 업데이트(recoil, api), 주문 목록 페이지로 이동
      setToastState(TOAST_STATE.successOrderProducts);
      navigate('/order');
    } catch {
      setToastState(TOAST_STATE.failedOrderProducts);
    }
  };

  return orderProducts;
};
