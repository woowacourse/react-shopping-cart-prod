import { MEMBER_STORAGE_KEY } from '../constants/localStorage';
import { DISCOUNT_RATE, Member, RANK } from '../types';
import { getFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';

const member = getFromLocalStorage<Member>(MEMBER_STORAGE_KEY);

export const getMember = () => {
  if (!member) {
    const initialMember = {
      id: 'b',
      rank: RANK.diamond,
      discountRate: DISCOUNT_RATE[RANK.diamond],
    };
    setMember(initialMember);

    return initialMember;
  }
  return member;
};

export const setMember = (member: Member) => {
  saveToLocalStorage(MEMBER_STORAGE_KEY, member);
};
