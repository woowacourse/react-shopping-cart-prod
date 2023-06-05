import { selector } from 'recoil';
import cartItemsState from './cartItemsState';
import clientState from './clientState';
import syncCartItemState, { syncCartItemStateKey } from './syncCartItemState';

const cartItemIdState = selector({
  key: 'cartItemIdState',
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    return cartItems.map((item) =>
      get(syncCartItemState(syncCartItemStateKey(get(clientState), item.product.id))),
    );
  },
});

export default cartItemIdState;
