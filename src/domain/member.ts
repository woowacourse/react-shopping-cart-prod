import { MEMBER_STORAGE_KEY } from '../constants/localStorage';
import { DISCOUNT_RATE, Member, RANK } from '../types';
import { getFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';

export const getMember = () => {
  const member = getFromLocalStorage<Member>(MEMBER_STORAGE_KEY);

  if (!member) {
    const initialMember = { id: 'b', rank: RANK.normal, discountRate: DISCOUNT_RATE[RANK.normal] };
    setMember(initialMember);

    return initialMember;
  }
  return member;
};

export const setMember = (member: Member) => {
  saveToLocalStorage(MEMBER_STORAGE_KEY, member);
};
