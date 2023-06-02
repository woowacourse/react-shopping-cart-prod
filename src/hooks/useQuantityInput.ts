import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import * as api from '../api';
import useToast from './useToast';
import { cartState, serverNameState, tokenState } from '../recoil/state';
import { API_ERROR_MESSAGE, API_INFO_MESSAGE } from '../constants';

const useQuantityInput = (cartItemId: number) => {
  const serverName = useRecoilValue(serverNameState);
  const token = useRecoilValue(tokenState);
  const setCart = useSetRecoilState(cartState);

  const [input, setInput] = useState('');
  const { showToast } = useToast();

  const getCart = async (token: string) => {
    try {
      const cart = await api.getCart(serverName, token);
      setCart(cart);
    } catch {
      showToast('error', API_ERROR_MESSAGE.getCart);
    }
  };

  const deleteCartItem = async (token: string) => {
    try {
      await api.deleteCartItem(serverName, token, cartItemId);
      showToast('info', API_INFO_MESSAGE.deleteCartItem);
    } catch {
      showToast('error', API_ERROR_MESSAGE.deleteCartItem);
    }
  };

  const patchCartItemQuantity = async (token: string, quantity: number) => {
    try {
      await api.patchCartItemQuantity(serverName, token, cartItemId, quantity);
      setInput(quantity.toString());
      showToast('info', API_INFO_MESSAGE.patchCartItemQuantity);
    } catch {
      showToast('error', API_ERROR_MESSAGE.postCartItem);
    }
  };

  const setInputWithRequest = async (quantity: number) => {
    if (token === null) return;

    if (quantity === 0) {
      await deleteCartItem(token);
    } else {
      await patchCartItemQuantity(token, quantity);
    }

    getCart(token);
  };

  return { input, setInput, setInputWithRequest };
};

export default useQuantityInput;
