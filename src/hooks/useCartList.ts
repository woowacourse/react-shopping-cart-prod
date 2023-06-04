import { useRecoilState } from 'recoil';

import { cartListState } from '../store/cart';

export const useCartList = () => {
  const [cartList, setCartList] = useRecoilState(cartListState);

  const resetCartCheckStatusToTrue = () => {
    setCartList(
      cartList.map((item) => {
        return {
          id: item.id,
          quantity: item.quantity,
          product: item.product,
          isChecked: true,
        };
      })
    );
  };

  const resetCartCheckStatusToFalse = () => {
    setCartList(
      cartList.map((item) => {
        return {
          id: item.id,
          quantity: item.quantity,
          product: item.product,
          isChecked: false,
        };
      })
    );
  };

  const cartListCheckedLength = () => {
    const isAllChecked = cartList.filter((item) => {
      return item.isChecked === true;
    });
    return isAllChecked.length;
  };

  const reverseCheckCartItem = (id: number) => {
    setCartList(
      cartList.map((item) => {
        if (item.id !== id) return item;
        return {
          id,
          quantity: item.quantity,
          product: item.product,
          isChecked: !item.isChecked,
        };
      })
    );
  };

  return {
    cartList,
    reverseCheckCartItem,
    cartListCheckedLength,
    resetCartCheckStatusToTrue,
    resetCartCheckStatusToFalse,
  };
};
