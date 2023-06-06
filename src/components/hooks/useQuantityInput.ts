import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import * as api from '../../api';
import useToast from './useToast';
import { API_ERROR_MESSAGE, API_SUCCESS_MESSAGE } from '../../constants';
import { serverNameState } from '../../atom/serverName';
import { loginState } from '../../atom/login';
import { useGetCartList } from './useGetCartList';

const useQuantityInput = (cartItemId: number) => {
  const [input, setInput] = useState('');
  const { getCartsThroughApi } = useGetCartList();
  const serverName = useRecoilValue(serverNameState);
  const loginCredential = useRecoilValue(loginState);
  const { showToast } = useToast();

  const getCart = async () => {
    getCartsThroughApi(serverName, loginCredential);
  };

  const deleteCartItem = async () => {
    try {
      await api.deleteCartItem(serverName, cartItemId, loginCredential);
      showToast('info', API_SUCCESS_MESSAGE.deleteCartItem);
    } catch {
      showToast('error', API_ERROR_MESSAGE.deleteCartItem);
      return;
    }

    getCart();
  };

  const patchCartItemQuantity = async (quantity: number) => {
    try {
      await api.patchCartItemQuantity(serverName, cartItemId, quantity, loginCredential);
      showToast('info', API_SUCCESS_MESSAGE.patchCartItemQuantity);
    } catch {
      showToast('error', API_ERROR_MESSAGE.postCartItem);
    }

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
