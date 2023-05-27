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

  return { addToCart };
};

export default useFetch;
