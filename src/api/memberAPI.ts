import { API_ENDPOINT } from '../constants/api';
import { Member } from '../types';
import { JsonAPI } from './fetchAPI';

export const getMemberAPI = (baseUrl: string) => {
  const getMember = (): Promise<Member> => JsonAPI.get(`${baseUrl}${API_ENDPOINT.MEMBER}`);

  return { getMember };
};
