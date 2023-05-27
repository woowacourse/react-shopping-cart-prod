import { Member } from '../types';

const getAuthorizedOptionHeaders = ({ username, password }: Member): HeadersInit => {
  const base64 = btoa(username + ':' + password);

  return {
    'Content-Type': 'application/json',
    Authorization: `Basic ${base64}`,
  };
};

export { getAuthorizedOptionHeaders };
