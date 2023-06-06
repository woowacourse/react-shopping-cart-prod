import { useSetRecoilState } from 'recoil';
import * as api from '../../api';
import { CartType, ServerNameType } from '../../types';
import { cartState, checkedListState } from '../../atom/cart';
import useToast from './useToast';
import { API_ERROR_MESSAGE } from '../../constants';

export const useGetCartList = () => {
  const setCart = useSetRecoilState(cartState);
  const setCheckedList = useSetRecoilState(checkedListState);
  const { showToast } = useToast();

  const getCartsThroughApi = (
    serverName: ServerNameType,
    loginCredential: string,
    isNeedUpdateCheckList?: boolean
  ) => {
    api
      .getCarts<CartType>(serverName, loginCredential)
      .then((carts) => {
        setCart(carts);
        if (isNeedUpdateCheckList) setCheckedList(Array(carts.length).fill(true));
      })
      .catch((e: Error) => {
        if (e.name !== 'Error') {
          showToast('error', API_ERROR_MESSAGE.server);
          return;
        }

        return showToast('error', e.message);
      });
  };

  return { getCartsThroughApi };
};
