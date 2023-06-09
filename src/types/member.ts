import type { MEMBER_RANK } from '../constants/member';

interface MemberAuthorization {
  username: string;
  password: string;
}

type MemberRank = (typeof MEMBER_RANK)[keyof typeof MEMBER_RANK];

interface MemberInformation {
  id: number;
  rank: MemberRank;
  discountRate: number;
}

export type { MemberAuthorization, MemberRank, MemberInformation };
