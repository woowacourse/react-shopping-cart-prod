import { API_ENDPOINT, CART_FETCH_OPTION_HEADERS } from '../constants/api';
import { Member } from '../types';
import { fetchAPI } from './fetchAPI';

export const getMemberAPI = (baseUrl: string) => {
  const getMember = async (): Promise<Member> => {
    return await fetchAPI(`${baseUrl}${API_ENDPOINT.MEMBER}`, {
      method: 'GET',
      headers: { ...CART_FETCH_OPTION_HEADERS },
    });
  };

  return { getMember };
};
