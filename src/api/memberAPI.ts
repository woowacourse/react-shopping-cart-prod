import { API_ENDPOINT, AUTHORIZED_FETCH_OPTION_HEADERS } from '../constants/api';
import { MemberInformation } from '../types';
import { fetchAPI } from './fetchAPI';

const getMemberAPI = (baseUrl: string) => {
  const getMemberInfo = async (): Promise<MemberInformation> => {
    return await fetchAPI(`${baseUrl}${API_ENDPOINT.MEMBER}`, {
      method: 'GET',
      headers: { ...AUTHORIZED_FETCH_OPTION_HEADERS },
    });
  };

  const getMemberOrders = async (memberId: number) => {
    return await fetchAPI(`${baseUrl}${API_ENDPOINT.MEMBERS}/${memberId}${API_ENDPOINT.ORDERS}`, {
      method: 'GET',
      headers: { ...AUTHORIZED_FETCH_OPTION_HEADERS },
    });
  };

  const getMemberOrderDetail = async (memberId: number, orderId: number) => {
    return await fetchAPI(
      `${baseUrl}${API_ENDPOINT.MEMBERS}/${memberId}${API_ENDPOINT.ORDERS}/${orderId}`,
      {
        method: 'GET',
        headers: { ...AUTHORIZED_FETCH_OPTION_HEADERS },
      }
    );
  };

  return { getMemberInfo, getMemberOrders, getMemberOrderDetail };
};

export { getMemberAPI };
