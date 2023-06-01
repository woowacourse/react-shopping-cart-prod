import { selector } from 'recoil';
import type { CartPoints } from '../../types/CartPoints';
import clientState from '../atoms/clientState';
import cartPointsQuery from '../queries/cartPointsQuery';

const userCartPointsState = selector<CartPoints>({
  key: 'userCartPointsState',
  get: ({ get }) => {
    const client = get(clientState);

    return get(cartPointsQuery({ client }));
  },
});

export default userCartPointsState;
