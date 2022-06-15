// @ts-nocheck
import apiClient from 'apis/apiClient';
import { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initializeProductList } from 'reducers/cartReducer';

// DONE  1. get 상품 목록 가져오기
const useGetProductsAPI = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const { products } = useSelector(state => state.cartReducer);

  const getProducts = useCallback(async () => {
    if (products.length > 0) return;

    try {
      const response = await apiClient.get('/products');
      dispatch(initializeProductList({ products: response.data }));
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, products.length]);

  return { getProducts, products, isLoading, error };
};

export default useGetProductsAPI;
