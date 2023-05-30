import { selector } from 'recoil';

import { getMemberAPI } from '../api/memberAPI';
import { MemberInformation } from '../types/member';
import { currentServerState } from './server';

const currentMemberInformationState = selector<MemberInformation>({
  key: 'currentMemberInformation',
  get: ({ get }) => {
    const currentServer = get(currentServerState);
    const memberAPI = getMemberAPI(currentServer);

    return memberAPI.getMemberInfo();
  },
});

export { currentMemberInformationState };
