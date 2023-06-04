import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil';

import HTTPError from '../api/HTTPError';
import { getCartAPI } from '../api/cartAPI';
import { getOrderAPI } from '../api/orderAPI';
import { TOAST_SHOW_DURATION } from '../constants';
import { CART_API_ERROR_MESSAGE, HTTP_STATUS_CODE } from '../constants/api';
import { CART_LIST_CHECKBOX_KEY } from '../constants/store';
import { cartItemQuantityState, cartListState, checkedCartItemListState } from '../store/cart';
import { checkedListState } from '../store/checkbox';
import { errorModalMessageState } from '../store/error';
import { currentServerState } from '../store/server';
import { getCartPriceInformation } from '../store/utils';
import { CartItemData, ProductItemData } from '../types';
import { APIErrorMessage, PostOrdersRequestBody } from '../types/api';
import { useMutationFetch } from './common/useMutationFetch';

const useOrder = () => {
  const currentServer = useRecoilValue(currentServerState);
  const orderAPI = useMemo(() => getOrderAPI(currentServer), [currentServer]);
  const setErrorModalMessage = useSetRecoilState(errorModalMessageState);
  const setCartListState = useSetRecoilState(cartListState);
  const navigate = useNavigate();

  const { mutate: orderCheckedCartItems } = useMutationFetch<{ id: number }, PostOrdersRequestBody>(
    useRecoilCallback(
      () => async (cartItemsForOrder) => {
        const response = await orderAPI.postOrderList(cartItemsForOrder);
        const orderId = response.headers.get('Location')?.split('/').pop();

        return { id: Number(orderId) };
      },
      [orderAPI]
    ),
    {
      onSuccess: (cartItem) => {
        navigate(''); // orderedId와 함께 주문 완료 페이지로 이동
      },
      onError(error) {
        // handleCartError(error, CART_API_ERROR_MESSAGE.ADD);
      },
    }
  );

  return { orderCheckedCartItems };
};

export { useOrder };
