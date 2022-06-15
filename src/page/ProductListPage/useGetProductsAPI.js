// @ts-nocheck
import apiClient from 'apis/apiClient';
import { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { doInitializeProductList } from 'reducers/cartReducer';

// DONE  1. get 상품 목록 가져오기
const useGetProductsAPI = () => {
  const [isProductsLoading, setIsProductsLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const { products } = useSelector(state => state.cartReducer);

  const getProducts = useCallback(async () => {
    if (products.length > 0) return;

    setIsProductsLoading(true);

    try {
      const response = await apiClient.get('/products');
      dispatch(doInitializeProductList({ products: response.data }));
      setIsProductsLoading(false);
    } catch (error) {
      setError(error);
      setIsProductsLoading(false);
    }
  }, [dispatch, products.length]);

  return { getProducts, products, isProductsLoading, error };
};

export default useGetProductsAPI;
