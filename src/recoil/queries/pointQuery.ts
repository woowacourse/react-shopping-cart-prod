import { selector } from 'recoil';
import clientState from '../atoms/clientState';

const pointQuery = selector({
  key: 'pointQuery',
  get: ({ get }) => {
    const client = get(clientState);
    return client
      .get('/cart-points')
      .acceptOrThrow(200)
      .then((response) => response.data);
  },
});

export default pointQuery;
