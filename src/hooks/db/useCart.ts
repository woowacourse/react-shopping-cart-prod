// @ts-nocheck
import axios from 'axios';
import { getCookie } from 'utils/cookie';

const useCart = () => {
  const getCartAPI = async () => {
    const accessToken = getCookie('accessToken');

    if (!accessToken) return;

    const response = await axios.get('/cart', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  };

  return { getCartAPI };
};

export default useCart;
