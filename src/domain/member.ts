import { MEMBER_INFORMATION_LOCAL_STORAGE_KEY } from '../constants/localStorage';
import { MEMBER_DISCOUNT_RATE, MEMBER_RANK_PURCHASE_CONDITION, RANK } from '../constants/member';
import { MemberInformation, MemberRank, OrderData } from '../types';
import { getFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';

const getMemberData = () => {
  const newMember: MemberInformation = {
    id: Number(new Date()),
    rank: '일반',
    discountRate: MEMBER_DISCOUNT_RATE['일반'],
  };

  return getFromLocalStorage<MemberInformation>(MEMBER_INFORMATION_LOCAL_STORAGE_KEY) ?? newMember;
};

const seMemberData = (newMemberInformation: MemberInformation) => {
  saveToLocalStorage(MEMBER_INFORMATION_LOCAL_STORAGE_KEY, newMemberInformation);
};

const updateMemberInformation = (orderList: OrderData[]) => {
  const memberInformation = getMemberData();
  const currentMemberRankIndex = RANK.indexOf(memberInformation.rank);
  const accumulatedPurchases = orderList.reduce((acc, curr) => acc + curr.totalPrice, 0);

  const newRank = Object.entries(MEMBER_RANK_PURCHASE_CONDITION).reduce(
    (foundRank: MemberRank | null, [memberRank, purchaseCondition], index): MemberRank | null => {
      if (index > currentMemberRankIndex && accumulatedPurchases >= purchaseCondition) {
        return memberRank as MemberRank;
      }

      return foundRank;
    },
    null
  );

  return newRank
    ? { ...memberInformation, rank: newRank, discountRate: MEMBER_DISCOUNT_RATE[newRank] }
    : { ...memberInformation };
};

export { getMemberData, seMemberData, updateMemberInformation };
