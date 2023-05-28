import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil';
import { baseURLSelector } from '../store/server';
import { AUTH } from '../constants/auth';
import { fetchedCartListSelector } from '../store/asyncSelector';

const useFetch = () => {
  const baseURL = useRecoilValue(baseURLSelector);
  const refreshCartList = useRecoilRefresher_UNSTABLE(fetchedCartListSelector);

  const addToCart = async (productId: number) => {
    try {
      const response = await fetch(`${baseURL}/cart-items`, {
        method: 'POST',
        body: JSON.stringify({ productId }),
        headers: {
          'Content-Type': 'application/json',
          authorization: `Basic ${AUTH}`,
        },
      });

      if (!response.ok) throw new Error(`error code : ${response.status}`);
      refreshCartList();
    } catch (error) {
      alert(error);
    }
  };

  const updateCartItem = async (id: number, quantity: number) => {
    try {
      const response = await fetch(`${baseURL}/cart-items/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Basic ${AUTH}`,
        },
        body: JSON.stringify({ quantity }),
      });

      if (!response.ok) throw new Error(`error code : ${response.status}`);
      refreshCartList();
    } catch (error) {
      alert(error);
    }
  };

  const deleteCartItem = async (id: number) => {
    try {
      const response = await fetch(`${baseURL}/cart-items/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Basic ${AUTH}`,
        },
      });

      if (!response.ok) throw new Error(`error code : ${response.status}`);
      refreshCartList();
    } catch (error) {
      alert(error);
    }
  };

  return { addToCart, updateCartItem, deleteCartItem };
};

export default useFetch;
