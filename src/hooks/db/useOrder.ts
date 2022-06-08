// @ts-nocheck
import axios from 'axios';
import { getCookie } from 'utils/cookie';

const useOrder = () => {
  const postOrderAPI = async productIds => {
    const accessToken = getCookie('accessToken');

    if (!accessToken) return;

    const response = await axios.post(
      `/orders`,
      {
        productIds,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response;
  };

  const getOrderAPI = async id => {
    const accessToken = getCookie('accessToken');

    if (!accessToken) return;

    const response = await axios.get(`/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  };

  return { postOrderAPI, getOrderAPI };
};

export default useOrder;
