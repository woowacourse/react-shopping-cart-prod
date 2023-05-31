import { API_ENDPOINT, AUTHORIZED_FETCH_OPTION_HEADERS } from '../constants/api';
import { MemberInformation } from '../types/member';
import { fetchAPI } from './utils/fetchAPI';

const getMemberAPI = (baseUrl: string) => {
  const getMemberInfo = async (): Promise<MemberInformation> => {
    return await fetchAPI(`${baseUrl}${API_ENDPOINT.MEMBER}`, {
      method: 'GET',
      headers: AUTHORIZED_FETCH_OPTION_HEADERS,
    });
  };

  return { getMemberInfo };
};

export { getMemberAPI };
