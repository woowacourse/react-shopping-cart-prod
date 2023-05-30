import { useSetCartState } from '../recoils/recoilCart';

import { QUANTITY } from '../constants';

import { ProductType } from '../types';

export const useUpdateRecoilCart = () => {
  const setCart = useSetCartState();

  const addRecoilCartItem = (cartItemId: number, product: ProductType) => {
    setCart((prev) => [
      ...prev,
      {
        id: cartItemId,
        quantity: 1,
        product,
      },
    ]);
  };

  const increaseRecoilProductQuantity = (cartItemId: number, quantity: number) => {
    setCart((prev) => {
      return prev.map((item) => {
        if (item.id === cartItemId) return { ...item, quantity };

        return item;
      });
    });
  };

  const decreaseRecoilProductQuantity = (cartItemId: number, quantity: number) => {
    setCart((prev) => {
      return prev.map((item) => {
        if (item.id === cartItemId) return { ...item, quantity };

        return item;
      });
    });
  };

  const updateRecoilProductQuantity = (cartItemId: number, quantity: number) => {
    const count = quantity > QUANTITY.MAX ? QUANTITY.MAX : quantity;

    setCart((prev) => {
      return prev.map((item) => {
        if (item.id === cartItemId) {
          return { ...item, quantity: count };
        }
        return item;
      });
    });
  };

  const deleteRecoilCartItem = (...cartId: number[]) => {
    setCart((prev) => prev.filter((item) => !cartId.includes(item.id)));
  };

  return {
    addRecoilCartItem,
    deleteRecoilCartItem,
    increaseRecoilProductQuantity,
    decreaseRecoilProductQuantity,
    updateRecoilProductQuantity,
  };
};
