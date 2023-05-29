import { MemberRank } from '../types/member';

const RANK = ['일반', '실버', '골드', '플래티넘', '다이아몬드'] as const;

const MEMBER_RANK_PURCHASE_CONDITION: Record<MemberRank, number> = {
  일반: 0,
  실버: 10_000,
  골드: 20_000,
  플래티넘: 30_000,
  다이아몬드: 50_000,
} as const;

const MEMBER_DISCOUNT_RATE: Record<MemberRank, number> = {
  일반: 0,
  실버: 5,
  골드: 10,
  플래티넘: 15,
  다이아몬드: 30,
} as const;

export { RANK, MEMBER_RANK_PURCHASE_CONDITION, MEMBER_DISCOUNT_RATE };
