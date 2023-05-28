import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil';

import HTTPError from '../api/HTTPError';
import { getAuthorizedOptionHeaders } from '../api/authorizedOptionHeaders';
import { getCartAPI } from '../api/cartAPI';
import { postOrder } from '../api/orderAPI';
import { TOAST_SHOW_DURATION } from '../constants';
import {
  CART_API_ERROR_MESSAGE,
  HTTP_STATUS_CODE,
  ORDER_API_ERROR_MESSAGE,
} from '../constants/api';
import { PATH } from '../constants/path';
import { TOAST_SHOW_DURATION } from '../constants/ui';
import { cartItemQuantityState, cartListState } from '../store/cart';
import { errorModalMessageState } from '../store/error';
import { currentMemberState } from '../store/member';
import { currentServerState } from '../store/server';
import { CartItemData, OrderCartItemsData, ProductItemData } from '../types';
import { APIErrorMessage } from '../types/api';
import { useMutationFetch } from './common/useMutationFetch';

const useCart = () => {
  const currentServer = useRecoilValue(currentServerState);
  const currentMember = useRecoilValue(currentMemberState);
  const authorizedHeaders = getAuthorizedOptionHeaders(currentMember);
  const cartAPI = useMemo(
    () => getCartAPI(currentServer, authorizedHeaders),
    [currentServer, authorizedHeaders]
  );
  const setErrorModalMessage = useSetRecoilState(errorModalMessageState);
  const navigate = useNavigate();

  const [isAdded, setIsAdded] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (isAdded) {
      timeout.current && clearTimeout(timeout.current);

      timeout.current = setTimeout(() => {
        setIsAdded(false);
      }, TOAST_SHOW_DURATION);
    }
  }, [isAdded]);

  const refreshCart = useRecoilCallback(
    ({ set }) =>
      async () => {
        const newCartList = await cartAPI.getCartList();
        set(cartListState, newCartList);
      },
    [cartAPI]
  );

  const updateCart = useRecoilCallback(
    ({ set }) =>
      (cartItem: CartItemData) => {
        set(cartListState, (prevCartList) => [...prevCartList, cartItem]);
      },
    [cartAPI]
  );

  const handleCartError = useCallback(
    (error: HTTPError, errorMessage: APIErrorMessage) => {
      if (error.statusCode === HTTP_STATUS_CODE.BAD_REQUEST) {
        setErrorModalMessage(errorMessage[error.statusCode] ?? error.message);
      }

      if (error.statusCode === HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR) {
        setErrorModalMessage(errorMessage[error.statusCode] ?? error.message);
      }
    },
    [setErrorModalMessage]
  );

  const { mutate: addItem } = useMutationFetch<CartItemData, ProductItemData>(
    useRecoilCallback(
      () => async (product) => {
        const response = await cartAPI.postCartItem(product.id);
        const cartItemId = response.headers.get('Location')?.split('/').pop();

        return { id: Number(cartItemId), quantity: 1, product };
      },
      [cartAPI]
    ),
    {
      onSuccess: (cartItem) => {
        setIsAdded(true);
        updateCart(cartItem);
      },
      onError(error) {
        handleCartError(error, CART_API_ERROR_MESSAGE.ADD);
      },
    }
  );

  const { mutate: updateItemQuantity } = useMutationFetch<
    void,
    { cartItemId: number; quantity: number }
  >(
    useRecoilCallback(
      ({ set }) =>
        async ({ cartItemId, quantity }) => {
          set(cartItemQuantityState(cartItemId), quantity);
          await cartAPI.patchCartItem(cartItemId, quantity);
        },
      [cartAPI]
    ),
    {
      onError(error) {
        handleCartError(error, CART_API_ERROR_MESSAGE.UPDATE);
      },
    }
  );

  const { mutate: removeItem } = useMutationFetch<void, number>(
    useCallback(
      async (cartItemId) => {
        await cartAPI.deleteCartItem(cartItemId);
      },
      [cartAPI]
    ),
    {
      onSuccess: async () => {
        await refreshCart();
      },
      onError(error) {
        handleCartError(error, CART_API_ERROR_MESSAGE.DELETE);
      },
    }
  );

  const { mutate: removeCheckedItems } = useMutationFetch<void, number[]>(
    useCallback(
      async (cartItemIds) => {
        await Promise.all(cartItemIds.map((cartItemId) => cartAPI.deleteCartItem(cartItemId)));
      },
      [cartAPI]
    ),
    {
      onSuccess: async () => {
        await refreshCart();
      },
      onError(error) {
        handleCartError(error, CART_API_ERROR_MESSAGE.DELETE);
      },
    }
  );

  const { mutate: orderCheckedItems } = useMutationFetch<string, number[]>(
    useRecoilCallback(
      ({ snapshot }) =>
        async (cartItemIds) => {
          const cartList = await snapshot.getPromise(cartListState);

          const OrderCartItems = cartList.reduce<OrderCartItemsData[]>((acc, curr) => {
            if (cartItemIds.includes(curr.id)) {
              acc.push({ cartItemId: curr.id, quantity: curr.quantity });
            }

            return acc;
          }, []);

          const response = await postOrder(currentServer, authorizedHeaders, OrderCartItems);
          const orderId = response.headers.get('Location')?.split('/').pop()!;

          return orderId;
        },
      [currentServer, authorizedHeaders]
    ),
    {
      onSuccess: async (orderId) => {
        await refreshCart();
        navigate(`${PATH.ORDER_SUCCESS}?orderId=${orderId}`);
      },
      onError(error) {
        handleCartError(error, ORDER_API_ERROR_MESSAGE.ADD);
      },
    }
  );

  return {
    isAdded,
    addItem,
    updateItemQuantity,
    removeItem,
    removeCheckedItems,
    orderCheckedItems,
  };
};

export { useCart };
