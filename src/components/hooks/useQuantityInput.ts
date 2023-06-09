import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import * as api from '../../api';
import useToast from './useToast';
import { API_ERROR_MESSAGE, API_SUCCESS_MESSAGE } from '../../constants';
import { serverNameState } from '../../atom/serverName';
import { loginState } from '../../atom/login';
import { useGetCartList } from './useGetCartList';
import { useDeleteCartItem } from './useDeleteCartItem';

const useQuantityInput = (cartItemId: number) => {
  const [input, setInput] = useState('');
  const { getCartsThroughApi } = useGetCartList();
  const { deleteCartItemThroughApi } = useDeleteCartItem();
  const serverName = useRecoilValue(serverNameState);
  const loginCredential = useRecoilValue(loginState);
  const { showToast } = useToast();

  const getCart = async () => {
    getCartsThroughApi(serverName, loginCredential);
  };

  const deleteCartItem = async () => {
    await deleteCartItemThroughApi(serverName, loginCredential, cartItemId);

    getCart();
  };

  const patchCartItemQuantity = async (quantity: number) => {
    await api
      .patchCartItemQuantity(serverName, loginCredential, cartItemId, quantity)
      .then(() => {
        showToast('info', API_SUCCESS_MESSAGE.patchCartItemQuantity);
      })
      .catch((e: Error) => {
        if (e.name !== 'Error') {
          showToast('error', API_ERROR_MESSAGE.server);
          return;
        }

        showToast('error', e.message);
      });

    getCart();
  };

  const setInputWithRequest = async (quantity: number) => {
    if (quantity === 0) {
      await deleteCartItem();
    } else {
      await patchCartItemQuantity(quantity);
    }

    setInput(quantity.toString());
  };

  return { input, setInput, setInputWithRequest };
};

export default useQuantityInput;
