import { useEffect, useRef, useState } from 'react';
import { useRecoilCallback } from 'recoil';

import { deleteCartItem, getCartList, patchCartItem, postCartItem } from '../api/cartAPI';
import { TOAST_SHOW_DURATION } from '../constants';
import { cartItemQuantityState, cartListState } from '../store/cart';
import { useMutationFetch } from './common/useMutationFetch';

const useCart = () => {
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
        const newCartList = await getCartList();
        set(cartListState, newCartList);
      },
    []
  );

  const { mutate: addItem } = useMutationFetch<void, number>(
    useRecoilCallback(
      () => async (productId) => {
        setIsAdded(true);
        await postCartItem(productId);
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
          await patchCartItem(cartItemId, quantity);
        },
      []
    )
  );

  const { mutate: removeItem } = useMutationFetch<void, number>(
    useRecoilCallback(
      ({ set }) =>
        async (productId) => {
          await deleteCartItem(productId);
          const newCartList = await getCartList();
          set(cartListState, newCartList);
        },
      []
    )
  );

  const { mutate: removeCheckedItems } = useMutationFetch<void, number[]>(
    useRecoilCallback(
      ({ set }) =>
        async (productIds) => {
          await Promise.all(productIds.map((productId) => deleteCartItem(productId)));
          const newCartList = await getCartList();
          set(cartListState, newCartList);
        },
      []
    )
  );

  return { isAdded, addItem, updateItemQuantity, removeItem, removeCheckedItems };
};

export { useCart };
