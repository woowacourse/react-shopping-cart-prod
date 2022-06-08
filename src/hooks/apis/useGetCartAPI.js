// @ts-nocheck
import apiClient from 'apis/apiClient';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { doInitializeCartList } from 'reducers/cart.reducer';

// DONE 3. get 장바구니 목록 가져오기
const useGetCartAPI = () => {
  const [isCartLoading, setIsCartLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const getCart = useCallback(async () => {
    setIsCartLoading(true);

    try {
      const response = await apiClient.get('/cart');
      dispatch(doInitializeCartList({ shoppingCart: response.data }));
      setIsCartLoading(false);
    } catch (error) {
      setError(error);
      setIsCartLoading(false);
    }
  }, [dispatch]);

  return { getCart, isCartLoading, error };
};

export default useGetCartAPI;
