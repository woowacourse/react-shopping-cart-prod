import { atom, selector } from 'recoil';

import { getAuthorizedOptionHeaders } from '../api/authorizedOptionHeaders';
import { getMemberAPI } from '../api/memberAPI';
import { MemberAuthorization, MemberInformation } from '../types/member';
import { currentServerState } from './server';

const currentMemberState = atom<MemberAuthorization>({
  key: 'currentMember',
  default: {
    username: process.env.REACT_APP_API_USERNAME_1!,
    password: process.env.REACT_APP_API_PASSWORD_1!,
  },
});

const currentMemberInformationState = selector<MemberInformation>({
  key: 'currentMemberInformation',
  get: ({ get }) => {
    const currentServer = get(currentServerState);
    const currentMember = get(currentMemberState);
    const authorizedHeaders = getAuthorizedOptionHeaders(currentMember);

    const memberAPI = getMemberAPI(currentServer, authorizedHeaders);

    return memberAPI.getMemberInfo();
  },
});

export { currentMemberState, currentMemberInformationState };
