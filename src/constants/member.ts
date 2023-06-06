import type { MemberRank } from '../types/member';

const MEMBER_RANK = {
  NORMAL: '일반',
  SILVER: '실버',
  GOLD: '골드',
  PLATINUM: '플래티넘',
  DIAMOND: '다이아몬드',
} as const;

const MEMBER_RANK_PURCHASE_CONDITION: Record<MemberRank, number> = {
  [MEMBER_RANK.NORMAL]: 0,
  [MEMBER_RANK.SILVER]: 100000,
  [MEMBER_RANK.GOLD]: 200000,
  [MEMBER_RANK.PLATINUM]: 300000,
  [MEMBER_RANK.DIAMOND]: 500000,
} as const;

const MEMBER_DISCOUNT_RATE: Record<MemberRank, number> = {
  [MEMBER_RANK.NORMAL]: 0,
  [MEMBER_RANK.SILVER]: 5,
  [MEMBER_RANK.GOLD]: 10,
  [MEMBER_RANK.PLATINUM]: 15,
  [MEMBER_RANK.DIAMOND]: 30,
} as const;

export { MEMBER_RANK, MEMBER_RANK_PURCHASE_CONDITION, MEMBER_DISCOUNT_RATE };
