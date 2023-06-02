import { atom, selector } from 'recoil';
import { localStorageEffect } from '../utils/localStorage';
import { fetchMemberList } from '../api/auth';
import { serverState } from './serverAtom';
import { Member } from '../types/types';

export const memberState = atom<Member>({
  key: 'memberState',
  default: selector({
    key: 'memberState/Default',
    get: async ({ get }) => {
      const serverOwner = get(serverState);

      const memberList = (await fetchMemberList(serverOwner)) as Member[];
      return memberList[0];
    },
  }),
});

export const memberPublicState = atom({
  key: 'memberPublicState',
  default: selector({
    key: 'memberPublicState/Default',
    get: ({ get }) => {
      const member = get(memberState);

      return { name: member.name, email: member.email };
    },
  }),
  effects: [localStorageEffect<Pick<Member, 'email' | 'name'>>('member')],
});
