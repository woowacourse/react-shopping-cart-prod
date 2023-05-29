import { MemberAuthorization } from '../types/member';

const getAuthorizedOptionHeaders = ({ username, password }: MemberAuthorization): HeadersInit => {
  const base64 = btoa(username + ':' + password);

  return {
    'Content-Type': 'application/json',
    Authorization: `Basic ${base64}`,
  };
};

export { getAuthorizedOptionHeaders };
