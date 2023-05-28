import { atom } from 'recoil';
import { base64 } from '../../constants/user';

export const userAtomState = atom({
  key: 'userAtomState',
  default: 0,
  effects: [
    ({ setSelf, trigger }) => {
      const getUserPoint = async () => {
        const response = await fetch('/point', {
          method: 'GET',
          headers: {
            Authorization: `Basic ${base64}`,
          },
        });
        const userPointData = await response.json();

        setSelf(userPointData.point ? Number(userPointData.point) : 0);
      };

      if (trigger === 'get') {
        getUserPoint();
      }
    },
  ],
});
