import { MEMBER_INFORMATION_LOCAL_STORAGE_KEY } from '../constants/localStorage';
import {
  MEMBER_DISCOUNT_RATE,
  MEMBER_RANK,
  MEMBER_RANK_PURCHASE_CONDITION,
} from '../constants/member';
import type { MemberInformation, MemberRank } from '../types/member';
import type { OrderData } from '../types/order';
import { getFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';

const getMemberData = () => {
  const newMember: MemberInformation = {
    id: Number(new Date()),
    rank: MEMBER_RANK.NORMAL,
    discountRate: MEMBER_DISCOUNT_RATE[MEMBER_RANK.NORMAL],
  };

  return getFromLocalStorage<MemberInformation>(MEMBER_INFORMATION_LOCAL_STORAGE_KEY) ?? newMember;
};

const setMemberData = (newMemberInformation: MemberInformation) => {
  saveToLocalStorage(MEMBER_INFORMATION_LOCAL_STORAGE_KEY, newMemberInformation);
};

const updateMemberInformation = (orderList: OrderData[]) => {
  const memberInformation = getMemberData();
  const currentMemberRankIndex = Object.keys(MEMBER_RANK).indexOf(memberInformation.rank);
  const accumulatedPurchases = orderList.reduce((acc, curr) => acc + curr.totalPrice, 0);

  const newRank = Object.entries(MEMBER_RANK_PURCHASE_CONDITION).reduce(
    (foundRank: MemberRank | null, [memberRank, purchaseCondition], index): MemberRank | null => {
      if (index > currentMemberRankIndex && accumulatedPurchases >= purchaseCondition) {
        console.log(accumulatedPurchases, purchaseCondition, memberRank);
        return memberRank as MemberRank;
      }

      return foundRank;
    },
    null
  );

  return newRank !== null
    ? {
        ...memberInformation,
        rank: newRank,
        discountRate: MEMBER_DISCOUNT_RATE[newRank],
      }
    : { ...memberInformation };
};

export { getMemberData, setMemberData, updateMemberInformation };
