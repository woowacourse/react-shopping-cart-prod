import { atom, selector } from 'recoil';
import { Cart } from '../types/response';
import { fetchedCartListSelector } from './asyncSelector';

export const cartAtom = atom<Cart[]>({
  key: 'cart/cart-list',
  default: fetchedCartListSelector,
});

export const cartSelector = selector({
  key: 'cart/selector',
  get: ({ get }) => {
    const cartList = get(cartAtom);

    const cartsQuantity = cartList.length;

    return { cartsQuantity };
  },
});

export const checkedValue = selector({
  key: 'cart/checked-value',
  get: ({ get }) => {
    const cartList = get(cartAtom);

    const NO_CHECKED = cartList.map((item) => ({
      id: item.id,
      isSelected: false,
      order: {
        id: item.product.id,
        quantity: item.quantity,
      },
    }));

    const ALL_CHECKED = cartList.map((item) => ({
      id: item.id,
      isSelected: true,
      order: {
        id: item.product.id,
        quantity: item.quantity,
      },
    }));

    return { NO_CHECKED, ALL_CHECKED };
  },
});

type SelectedItem = {
  id: number;
  isSelected: boolean;
  order: { id: number; quantity: number };
};

export const selectedItemListAtom = atom<SelectedItem[]>({
  key: 'selected-item',
  default: [],
});

export const selectedItemSelector = selector({
  key: 'cart/selected-item',
  get: ({ get }) => {
    const selectedItemList = get(selectedItemListAtom);
    const selectedItemCount = selectedItemList.filter(
      (item) => item.isSelected === true
    ).length;

    return { selectedItemCount };
  },
});
