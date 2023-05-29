import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil';
import { baseURLSelector } from '../store/server';
import { AUTH } from '../constants/auth';
import { fetchedCartListSelector } from '../store/asyncSelector';

type FetchMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

const useFetch = () => {
  const baseURL = useRecoilValue(baseURLSelector);
  const refreshCartList = useRecoilRefresher_UNSTABLE(fetchedCartListSelector);

  const handleCartItems = async (
    method: FetchMethod,
    body: {},
    id?: number
  ) => {
    try {
      const response = await fetch(
        `${baseURL}/cart-items${id ? `/${id}` : ''}`,
        {
          method,
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
            authorization: `Basic ${AUTH}`,
          },
        }
      );

      if (!response.ok) throw new Error(`error code : ${response.status}`);
      refreshCartList();
    } catch (error) {
      alert(error);
    }
  };

  const addToCart = async (productId: number) => {
    handleCartItems('POST', { productId });
  };

  const updateCartItem = async (id: number, quantity: number) => {
    handleCartItems('PATCH', { quantity }, id);
  };

  const deleteCartItem = async (id: number) => {
    handleCartItems('DELETE', {}, id);
  };

  return { addToCart, updateCartItem, deleteCartItem };
};

export default useFetch;
