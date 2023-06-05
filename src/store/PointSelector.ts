import { selector } from 'recoil';
import { memberState } from './MemberState';

export const pointSelector = selector<number>({
  key: 'pointSelector',
  get: ({ get }) => {
    const member = get(memberState);

    if (!member) return 0;

    return member.point;
  },
});
