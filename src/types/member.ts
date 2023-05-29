import { MEMBER_RANK } from '../constants/member';

interface MemberAuthorization {
  username: string;
  password: string;
}

type MemberRank = (typeof MEMBER_RANK)[number];

interface MemberInformation {
  id: number;
  rank: MemberRank;
  discountRate: number;
}

export type { MemberAuthorization, MemberRank, MemberInformation };
