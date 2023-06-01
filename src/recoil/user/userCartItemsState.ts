import { selector } from 'recoil';
import cartItemsState from '../atoms/cartItemsState';
import clientState from '../atoms/clientState';

const userCartItemsState = selector({
  key: 'userCartItemsState',
  get: ({ get }) => {
    const client = get(clientState);

    return get(cartItemsState(client));
  },
});

export default userCartItemsState;
