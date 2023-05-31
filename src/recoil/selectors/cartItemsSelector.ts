import { selector } from 'recoil';
import { cartItemsState, selectedCartIdListState } from '../atoms/cartAtom';

export const cartItemsLengthSelector = selector({
  key: 'cartIdListLengthState',
  get: ({ get }) => {
    const cartItems = get(cartItemsState);

    return cartItems.length;
  },
});

export const selectedCartItemsSelector = selector({
  key: 'selectedCartItems',
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    const selectedCartItemIds = get(selectedCartIdListState);

    return cartItems.filter((cartItem) =>
      selectedCartItemIds.includes(cartItem.id)
    );
  },
});

export const checkBoxSelector = selector({
  key: 'isAllCheckBoxSelectedState',
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    const selectedCartIdList = get(selectedCartIdListState);
    const isAllCheckBoxChecked =
      cartItems.filter((cartItem) => !selectedCartIdList.includes(cartItem.id))
        .length === 0;

    return { isAllCheckBoxChecked };
  },
});
