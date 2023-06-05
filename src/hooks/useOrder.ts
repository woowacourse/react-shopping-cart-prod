import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil';

import HTTPError from '../api/HTTPError';
import { getCartAPI } from '../api/cartAPI';
import { getOrderAPI } from '../api/orderAPI';
import { TOAST_SHOW_DURATION } from '../constants';
import { CART_API_ERROR_MESSAGE, HTTP_STATUS_CODE } from '../constants/api';
import { PATH } from '../constants/path';
import { CART_LIST_CHECKBOX_KEY } from '../constants/store';
import { cartItemQuantityState, cartListState, checkedCartItemListState } from '../store/cart';
import { checkedListState } from '../store/checkbox';
import { errorModalMessageState } from '../store/error';
import { memberInformationState } from '../store/member';
import { orderListState } from '../store/order';
import { currentServerState } from '../store/server';
import { APIErrorMessage, PostOrdersRequestBody } from '../types/api';
import { useMutationFetch } from './common/useMutationFetch';
import { useNavigateParams } from './common/useNavigateParams';

const useOrder = () => {
  const currentServer = useRecoilValue(currentServerState);
  const orderAPI = useMemo(() => getOrderAPI(currentServer), [currentServer]);
  const cartAPI = useMemo(() => getCartAPI(currentServer), [currentServer]);
  const setErrorModalMessage = useSetRecoilState(errorModalMessageState);
  const navigate = useNavigateParams();

  const { mutate: orderCheckedCartItems } = useMutationFetch<string, PostOrdersRequestBody>(
    useRecoilCallback(
      () => async (cartItemsForOrder) => {
        const response = await orderAPI.postOrderList(cartItemsForOrder);
        const orderId = response.headers.get('Location')?.split('/').pop()!;

        return orderId;
      },
      [orderAPI]
    ),
    {
      onSuccess: useRecoilCallback(
        ({ refresh, set }) =>
          async (orderId) => {
            refresh(memberInformationState);
            refresh(orderListState);

            const updatedCartList = await cartAPI.getCartList();
            set(cartListState, updatedCartList);

            navigate(PATH.ORDERS_SUCCESS, { orderId }); // orderId와 함께 주문 완료 페이지로 이동
          },
        [navigate]
      ),
      onError(error) {
        // handleCartError(error, CART_API_ERROR_MESSAGE.ADD);
      },
    }
  );

  return { orderCheckedCartItems };
};

export { useOrder };
