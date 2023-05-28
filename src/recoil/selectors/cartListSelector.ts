import { selector } from 'recoil';
import { cartItemsState, selectedCartIdListState } from '../atoms/cartAtom';

export const cartItemsLengthState = selector({
  key: 'cartIdListLengthState',
  get: ({ get }) => {
    const cartItems = get(cartItemsState);

    return cartItems.length;
  },
});

export const selectedCartItemsState = selector({
  key: 'selectedCartItems',
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    const selectedCartItemIds = get(selectedCartIdListState);

    return cartItems.filter((cartItem) =>
      selectedCartItemIds.includes(cartItem.id)
    );
  },
});

export const isAllCheckBoxSelectedState = selector({
  key: 'isAllCheckBoxSelectedState',
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    const selectedCartIdList = get(selectedCartIdListState);

    return (
      cartItems.filter((cartItem) => !selectedCartIdList.includes(cartItem.id))
        .length === 0
    );
  },
});
