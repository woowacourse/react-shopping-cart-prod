import { atom, selector, selectorFamily } from 'recoil';
import { CartItem } from '../types/types';

export const cartState = atom<CartItem[]>({
  key: 'cartState',
  default: [],
});

export const cartCountSelector = selector({
  key: 'cartCountSelector',
  get: ({ get }) => {
    const cartList = get(cartState);
    return cartList.length;
  },
});

export const quantityByProductIdSelector = selectorFamily({
  key: 'quantityByProductIdSelector',
  get:
    (productId: number) =>
    ({ get }) => {
      const cartList = get(cartState);
      const targetCart = cartList.find((cart) => cart.product.id === productId);

      return targetCart?.quantity ?? 0;
    },
});

export const checkedCartCountSelector = selector({
  key: 'checkedCartCountSelector',
  get: ({ get }) => {
    const checkedItemIdList = get(checkedItemIdListState);

    return checkedItemIdList.length;
  },
});

export const allCartCheckedSelector = selector({
  key: 'allCartCheckedSelector',
  get: ({ get }) => {
    const cartList = get(cartState);
    const checkedItemIdList = get(checkedItemIdListState);

    return cartList.length === checkedItemIdList.length;
  },
});

export const totalPriceSelector = selector({
  key: 'totalPriceSelector',
  get: ({ get }) => {
    const cartList = get(cartState);
    const checkedItemIdList = get(checkedItemIdListState);
    const checkedCartList = cartList.filter((cartItem) => checkedItemIdList.includes(cartItem.id));

    return checkedCartList.reduce((acc, { product, quantity }) => acc + product.price * quantity, 0);
  },
});

export const checkedItemIdListState = atom<number[]>({
  key: 'checkedItemIdListState',
  default: selector({
    key: 'checkedItemIdListState/default',
    get: ({ get }) => {
      const cartList = get(cartState);

      return cartList.map((cartItem) => cartItem.id);
    },
  }),
});

export const checkedItemListState = selector({
  key: 'checkedItemListState',
  get: ({ get }) => {
    const cartList = get(cartState);
    const checkedItemIdList = get(checkedItemIdListState);

    return cartList.filter((item) => checkedItemIdList.includes(item.id));
  },
});

export const switchCartCheckboxSelector = selector<number>({
  key: 'switchCartCheckboxSelector',
  get: () => {
    // 오류 방지를 위해 아무 값이나 리턴
    return -1;
  },
  set: ({ get, set }, id) => {
    const checkedItemIdList = get(checkedItemIdListState);

    if (checkedItemIdList.find((cartItemId) => cartItemId === id))
      set(checkedItemIdListState, (prev) => prev.filter((itemId) => itemId !== id));
    else set(checkedItemIdListState, (prev) => [...prev, id as number]);
  },
});

export const switchAllCartCheckboxSelector = selector<undefined>({
  key: 'switchAllCartCheckboxSelector',
  get: () => {
    // 오류 방지를 위해 아무 값이나 리턴
    return undefined;
  },
  set: ({ get, set }) => {
    const cartList = [...get(cartState)];
    const isAllCartItemChecked = get(allCartCheckedSelector);

    set(checkedItemIdListState, isAllCartItemChecked ? [] : cartList.map((cartItem) => cartItem.id));
  },
});
