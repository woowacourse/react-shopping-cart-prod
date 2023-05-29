import { RANK } from '../constants/member';

interface MemberAuthorization {
  username: string;
  password: string;
}

type MemberRank = (typeof RANK)[number];

interface MemberInformation {
  id: number;
  rank: MemberRank;
  discountRate: number;
}

export type { MemberAuthorization, MemberRank, MemberInformation };
