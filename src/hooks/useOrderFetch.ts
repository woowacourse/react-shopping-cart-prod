import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import cartItemIdState from '../recoil/atoms/cartItemIdState';
import clientState from '../recoil/atoms/clientState';
import type { SyncCartItem } from '../recoil/atoms/syncCartItemState';

const useOrderFetch = () => {
  const client = useRecoilValue(clientState);
  const cartItemId = useRecoilValue(cartItemIdState);

  const getSelectedOrderItems = () => {
    return cartItemId
      .map((item) => {
        const { state } = item as { state: SyncCartItem };
        if (item.checked) {
          return {
            id: state.id,
            productId: state.productId,
            quantity: state.quantity,
          };
        }
        return null;
      })
      .filter((item) => item !== null);
  };

  const order = (usingPoint: number) => {
    client
      .post('/orders', {
        usedPoints: usingPoint,
        cartItems: getSelectedOrderItems(),
      })
      .acceptOrThrow(201);
  };

  return { order };
};

export default useOrderFetch;
