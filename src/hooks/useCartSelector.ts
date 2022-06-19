import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

import { CartItem } from '@/types';

const selectCartItemById = (state: RootState, targetId: number) => {
  return state.cart.items.find((item) => item.id === targetId);
};

const getSelectedItemAmount = (state: RootState) => {
  return state.cart.items
    .filter((item) => item.isSelected)
    .reduce((acc: number, cur: CartItem) => acc + cur.quantity * cur.price, 0);
};

const useCartSelector = () => useSelector((state: RootState) => state.cart);

const useCartItemSelector = (id: number) =>
  useSelector((state: RootState) => selectCartItemById(state, id));

const useCartAmount = () => useSelector((state: RootState) => getSelectedItemAmount(state));

export { useCartItemSelector, useCartSelector, useCartAmount };
