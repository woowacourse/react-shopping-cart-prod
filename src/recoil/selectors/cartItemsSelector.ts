import { selector } from 'recoil';
import { cartItemsState, selectedCartIdListState } from '../atoms/cartAtom';
import { APIAtom } from '../atoms/serverAtom';

export const cartItemsLengthSelector = selector({
  key: 'cartIdListLengthState',
  get: ({ get }) => {
    const apiEndPoint = get(APIAtom);
    const cartItems = get(cartItemsState(apiEndPoint));

    return cartItems.length;
  },
});

export const selectedCartItemsSelector = selector({
  key: 'selectedCartItems',
  get: ({ get }) => {
    const apiEndPoint = get(APIAtom);
    const cartItems = get(cartItemsState(apiEndPoint));
    const selectedCartItemIds = get(selectedCartIdListState(apiEndPoint));

    return cartItems.filter((cartItem) =>
      selectedCartItemIds.includes(cartItem.id)
    );
  },
});

export const checkBoxSelector = selector({
  key: 'isAllCheckBoxSelectedState',
  get: ({ get }) => {
    const apiEndPoint = get(APIAtom);
    const cartItems = get(cartItemsState(apiEndPoint));
    const selectedCartIdList = get(selectedCartIdListState(apiEndPoint));
    const isAllCheckBoxChecked = cartItems.every(
      (cartItem) => !selectedCartIdList.includes(cartItem.id)
    );
    return { isAllCheckBoxChecked };
  },
});
