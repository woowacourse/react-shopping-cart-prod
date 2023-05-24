import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import * as api from '../api';
import useToast from './useToast';
import { cartState, serverNameState } from '../recoil/state';
import { API_ERROR_MESSAGE } from '../constants';

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
    } catch {
      showToast('error', API_ERROR_MESSAGE.deleteCartItem);
      return;
    }

    getCart();
  };

  const patchCartItemQuantity = async (quantity: number) => {
    try {
      await api.patchCartItemQuantity(serverName, cartItemId, quantity);
      showToast('info', '수량이 변경되었어요!');
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
