// @ts-nocheck
import apiClient from 'apis/apiClient';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { initializeCartList } from 'reducers/cartReducer';

// DONE 3. get 장바구니 목록 가져오기
const useGetCartAPI = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const getCart = useCallback(async () => {
    try {
      const response = await apiClient.get('/cart');
      dispatch(initializeCartList({ shoppingCart: response.data }));
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  return { getCart, isLoading, error };
};

export default useGetCartAPI;
