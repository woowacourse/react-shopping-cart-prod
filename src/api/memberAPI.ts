import { API_ENDPOINT } from '../constants/api';
import { MemberInformation } from '../types';
import { fetchAPI } from './fetchAPI';

const getMemberAPI = (baseUrl: string, headers: HeadersInit) => {
  const getMemberInfo = async (): Promise<MemberInformation> => {
    return await fetchAPI(`${baseUrl}${API_ENDPOINT.MEMBER}`, {
      method: 'GET',
      headers,
    });
  };

  const getMemberOrders = async (memberId: number) => {
    return await fetchAPI(`${baseUrl}${API_ENDPOINT.MEMBERS}/${memberId}${API_ENDPOINT.ORDERS}`, {
      method: 'GET',
      headers,
    });
  };

  const getMemberOrderDetail = async (memberId: number, orderId: number) => {
    return await fetchAPI(
      `${baseUrl}${API_ENDPOINT.MEMBERS}/${memberId}${API_ENDPOINT.ORDERS}/${orderId}`,
      {
        method: 'GET',
        headers,
      }
    );
  };

  return { getMemberInfo, getMemberOrders, getMemberOrderDetail };
};

export { getMemberAPI };
