import { selector } from 'recoil';
import clientState from '../atoms/clientState';
import cartPointsQuery from '../queries/cartPointsQuery';

const userCartPointsState = selector({
  key: 'userCartPointsState',
  get: ({ get }) => {
    const client = get(clientState);

    return get(cartPointsQuery({ client }));
  },
});

export default userCartPointsState;
