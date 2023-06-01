import { selector } from 'recoil';
import clientState from '../atoms/clientState';
import remoteCartItemsState from '../atoms/remoteCartItemsState';

const userRemoteCartItemsState = selector({
  key: 'userRemoteCartItemsState',
  get: ({ get }) => {
    const client = get(clientState);

    return get(remoteCartItemsState(client));
  },
});

export default userRemoteCartItemsState;
