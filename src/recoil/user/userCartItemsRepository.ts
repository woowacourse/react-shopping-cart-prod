import { selector } from 'recoil';
import clientState from '../atoms/clientState';
import cartItemsRepository from '../repositories/cartItemsRepository';

const userCartItemsRepository = selector({
  key: 'userCartItemsRepository',
  get: ({ get }) => {
    const client = get(clientState);

    return get(cartItemsRepository(client));
  },
});

export default userCartItemsRepository;
