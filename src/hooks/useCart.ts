import { useEffect, useMemo, useRef, useState } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

import { getCartAPI } from '../api/cartAPI';
import { TOAST_SHOW_DURATION } from '../constants';
import { cartItemQuantityState, cartListState } from '../store/cart';
import { currentServerState } from '../store/server';
import { useMutationFetch } from './common/useMutationFetch';

const useCart = () => {
  const currentServer = useRecoilValue(currentServerState);
  const cartAPI = useMemo(() => getCartAPI(currentServer), [currentServer]);
  const setErrorModalMessage = useSetRecoilState(errorModalMessageState);

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

  const updateCart = useRecoilCallback(
    ({ set }) =>
      async () => {
        const newCartList = await cartAPI.then((api) => api.getCartList());
        set(cartListState, newCartList);
      },
    []
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
      () => async (productId) => {
        setIsAdded(true);
        await cartAPI.then((api) => api.postCartItem(productId));
      },
      []
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
          await cartAPI.then((api) => api.patchCartItem(cartItemId, quantity));
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
          // await api.then((apiInstance) => apiInstance.deleteCartItem(cartItemId));
          // const newCartList = await api.then((apiInstance) => apiInstance.getCartList());

          const newCartList = await api
            .then(async (apiInstance) => {
              await apiInstance.deleteCartItem(cartItemId);

              return apiInstance;
            })
            .then((apiInstance) => apiInstance.getCartList());

          // const newCartList = await api
          //   .then((apiInstance) => {
          //     apiInstance.deleteCartItem(cartItemId);
          //     return apiInstance;
          //   })
          //   .then((apiInstance) => {
          //     return apiInstance.getCartList();
          //   });

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
          await Promise.all(cartItemIds.map((cartItemId) => deleteCartItem(cartItemId)));
          const newCartList = await getCartList();
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
