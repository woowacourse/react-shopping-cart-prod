import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import useToast from './useToast';
import { cartState, serverNameState, tokenState } from '../recoil/state';
import api from '../api';
import { API_INFO_MESSAGE } from '../constants';

const useQuantityUpdater = (cartItemId: number) => {
  const serverName = useRecoilValue(serverNameState);
  const token = useRecoilValue(tokenState);
  const setCart = useSetRecoilState(cartState);

  const { showToast } = useToast();

  const quantityUpdater = async (quantity: number) => {
    if (token === null) return;

    if (quantity === 0) {
      await api.deleteCartItem(serverName, token, cartItemId);
      showToast('info', API_INFO_MESSAGE.deleteCartItem);
    } else {
      await api.patchCartItemQuantity(serverName, token, cartItemId, quantity);
    }

    const cart = await api.getCart(serverName, token);
    setCart(cart);
  };

  return { quantityUpdater };
};

export default useQuantityUpdater;
