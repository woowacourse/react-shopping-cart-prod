import { useEffect, useMemo, useRef, useState } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

import { cartAPI, deleteCartItem, getCartList } from '../api/cartAPI';
import { TOAST_SHOW_DURATION } from '../constants';
import { cartItemQuantityState, cartListState } from '../store/cart';
import { currentServerState } from '../store/server';
import { useMutationFetch } from './common/useMutationFetch';

const useCart = () => {
  const currentServer = useRecoilValue(currentServerState);
  const api = useMemo(() => cartAPI(currentServer), [currentServer]);
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
        const newCartList = await api.then((apiInstance) => apiInstance.getCartList());
        set(cartListState, newCartList);
      },
    []
  );

  const { mutate: addItem } = useMutationFetch<void, number>(
    useRecoilCallback(
      () => async (productId) => {
        setIsAdded(true);
        await api.then((apiInstance) => apiInstance.postCartItem(productId));
      },
      []
    ),
    {
      onSuccess: updateCart,
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
          await api.then((apiInstance) => apiInstance.patchCartItem(cartItemId, quantity));
        },
      []
    )
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
      []
    )
  );

  const { mutate: removeCheckedItems } = useMutationFetch<void, number[]>(
    useRecoilCallback(
      ({ set }) =>
        async (cartItemIds) => {
          await Promise.all(cartItemIds.map((cartItemId) => deleteCartItem(cartItemId)));
          const newCartList = await getCartList();
          set(cartListState, newCartList);
        },
      []
    )
  );

  return { isAdded, addItem, updateItemQuantity, removeItem, removeCheckedItems };
};

export { useCart };
