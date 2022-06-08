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

  const putCartAPI = async (id, quantity) => {
    const accessToken = getCookie('accessToken');

    if (!accessToken) return;

    const response = await axios.put(
      `/cart/products/${id}`,
      {
        quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.data;
  };

  const deleteCartAPI = async productIds => {
    const accessToken = getCookie('accessToken');

    if (!accessToken) return;

    const response = await axios.delete('/cart', {
      data: {
        productIds,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  };

  return { getCartAPI, putCartAPI, deleteCartAPI };
};

export default useCart;
