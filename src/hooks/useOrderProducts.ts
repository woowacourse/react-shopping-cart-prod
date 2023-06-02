import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

import useMultipleChecked from './useMultipleChecked';
import fetchApis from '../apis/fetchApis';
import { checkedCartProductState } from '../states/checkedCartProducts';
import { serverNameState } from '../states/serverName';
import { toastState } from '../states/toast/atom';
import { TOAST_STATE } from '../constants/toast';
import { PAGE_URLS } from '../constants/pageUrls';

export const useOrderProducts = () => {
  const checkedList = useRecoilValue(checkedCartProductState);
  const { deleteCheckedProductState } = useMultipleChecked();
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
      deleteCheckedProductState();
      setToastState(TOAST_STATE.successOrderProducts);
      navigate(PAGE_URLS.order);
    } catch {
      setToastState(TOAST_STATE.failedOrderProducts);
    }
  };

  return orderProducts;
};
