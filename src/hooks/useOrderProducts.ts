import { useRecoilValue, useSetRecoilState } from 'recoil';

import { checkedCartProductState } from '../states/checkedCartProducts';
import { serverNameState } from '../states/serverName';
import { toastState } from '../states/toast/atom';
import fetchApis from '../apis/fetchApis';
import { TOAST_STATE } from '../constants/toast';

export const useOrderProducts = () => {
  const checkedList = useRecoilValue(checkedCartProductState);
  const serverName = useRecoilValue(serverNameState);
  const { postData } = fetchApis(serverName);
  const setToastState = useSetRecoilState(toastState);

  const orderProducts = async (totalPrice: number, couponId: number) => {
    const dataSet = {
      cartItemIds: checkedList.map(checked => checked.id),
      totalPrice,
      couponId,
    };

    try {
      await postData(dataSet, '/orders');

      // 성공 - 장바구니 목록 업데이트(recoil, api), 주문 목록 페이지로 이동
      setToastState(TOAST_STATE.successOrderProducts);
    } catch {
      setToastState(TOAST_STATE.failedOrderProducts);
    }
  };

  return orderProducts;
};
