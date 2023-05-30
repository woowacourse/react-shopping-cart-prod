import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import * as api from '../../api';
import useToast from './useToast';
import { cartState, serverNameState } from '../../atom/state';
import { API_ERROR_MESSAGE, API_SUCCESS_MESSAGE } from '../../constants';

const useQuantityInput = (cartItemId: number) => {
  const [input, setInput] = useState('');
  const setCart = useSetRecoilState(cartState);
  const serverName = useRecoilValue(serverNameState);
  const { showToast } = useToast();

  const getCart = async () => {
    try {
      const cart = await api.getCart(serverName);
      setCart(cart);
    } catch {
      showToast('error', API_ERROR_MESSAGE.getCart);
    }
  };

  const deleteCartItem = async () => {
    try {
      await api.deleteCartItem(serverName, cartItemId);
      showToast('info', API_SUCCESS_MESSAGE.deleteCartItem);
    } catch {
      showToast('error', API_ERROR_MESSAGE.deleteCartItem);
      return;
    }

    getCart();
  };

  const patchCartItemQuantity = async (quantity: number) => {
    try {
      await api.patchCartItemQuantity(serverName, cartItemId, quantity);
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
