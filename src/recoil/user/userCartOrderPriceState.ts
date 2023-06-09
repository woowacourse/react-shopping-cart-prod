import { selector } from 'recoil';
import cartOrderPriceState from '../atoms/cartOrderPriceState';
import clientState from '../atoms/clientState';

const userCartOrderPriceState = selector({
  key: 'userCartOrderPriceState',
  get: ({ get }) => {
    const client = get(clientState);

    return get(cartOrderPriceState(client));
  },
});

export default userCartOrderPriceState;
