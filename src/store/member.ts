import { selector } from 'recoil';

import { getMemberAPI } from '../api/memberAPI';
import { currentServerState } from './server';

export const memberInformationState = selector({
  key: 'memberInformation',
  get: async ({ get }) => {
    const currentServer = get(currentServerState);
    const memberAPI = getMemberAPI(currentServer);

    const memberInformation = await memberAPI.getMember();

    return memberInformation;
  },
});
