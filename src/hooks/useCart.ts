import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil';

import HTTPError from '../api/HTTPError';
import { getCartAPI } from '../api/cartAPI';
import { TOAST_SHOW_DURATION } from '../constants';
import { CART_API_ERROR_MESSAGE, HTTP_STATUS_CODE } from '../constants/api';
import { cartItemQuantityState, cartListState } from '../store/cart';
import { errorModalMessageState } from '../store/error';
import { currentServerState } from '../store/server';
import { CartItemData, ProductItemData } from '../types';
import { APIErrorMessage } from '../types/api';
import { useMutationFetch } from './common/useMutationFetch';

const useCart = () => {
  const currentServer = useRecoilValue(currentServerState);
  const cartAPI = useMemo(() => getCartAPI(currentServer), [currentServer]);
  const setErrorModalMessage = useSetRecoilState(errorModalMessageState);
  const setCartListState = useSetRecoilState(cartListState);

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

  const updateCart = useCallback((cartItem: CartItemData) => {
    setCartListState((prevCartList) => [...prevCartList, cartItem]);
  }, []);

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
    useRecoilCallback(
      ({ set }) =>
        async (cartItemId) => {
          await cartAPI.deleteCartItem(cartItemId);
          const newCartList = await cartAPI.getCartList();
          set(cartListState, newCartList);
        },
      [cartAPI]
    ),
    {
      onError(error) {
        handleCartError(error, CART_API_ERROR_MESSAGE.DELETE);
      },
    }
  );

  const { mutate: removeCheckedItems } = useMutationFetch<void, number[]>(
    useRecoilCallback(
      ({ set }) =>
        async (cartItemIds) => {
          await Promise.all(cartItemIds.map((cartItemId) => cartAPI.deleteCartItem(cartItemId)));
          const newCartList = await cartAPI.getCartList();
          set(cartListState, newCartList);
        },
      [cartAPI]
    ),
    {
      onError(error) {
        handleCartError(error, CART_API_ERROR_MESSAGE.DELETE);
      },
    }
  );

  return { isAdded, addItem, updateItemQuantity, removeItem, removeCheckedItems };
};

export { useCart };
