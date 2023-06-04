import { atom, selector } from 'recoil';
import { localStorageEffect } from '../utils/localStorage';
import { Member, Point } from '../types/types';
import { encrypt } from '../utils/authorization';
import { fetchMemberList } from '../api/fetcher';
import { serverState } from './serverAtom';

export const memberListState = atom<Member[]>({
  key: 'memberListState',
  default: selector({
    key: 'memberListState/Default',
    get: async ({ get }) => {
      const server = get(serverState);
      const response = await fetchMemberList({ server: server });

      const memberList = response.json();

      return memberList;
    },
  }),
});

export const memberIdState = atom<number>({
  key: 'memberState',
  default: selector({
    key: 'memberState/Default',
    get: ({ get }) => {
      const members = get(memberListState);
      return members[0].id;
    },
  }),
  effects: [localStorageEffect<number>('currentMemberId')],
});

export const memberAuthorization = selector<string>({
  key: 'memberAuthorization',
  get: ({ get }) => {
    const currentMemberId = get(memberIdState);
    const members = get(memberListState);
    const currentMemberInfo = members.find((member) => member.id === currentMemberId);

    if (!currentMemberInfo) return '';
    return encrypt(currentMemberInfo.email, currentMemberInfo?.password);
  },
});

export const memberPublicInformation = selector<Pick<Member, 'name' | 'email'>>({
  key: 'memberPublicInformation',
  get: ({ get }) => {
    const currentMemberId = get(memberIdState);
    const members = get(memberListState);
    const currentMemberInfo = members.find((member) => member.id === currentMemberId) as Pick<Member, 'name' | 'email'>;

    return { name: currentMemberInfo.name, email: currentMemberInfo.email };
  },
});

export const memberPointState = atom<Point | null>({
  key: 'memberPointState',
  default: null,
});
