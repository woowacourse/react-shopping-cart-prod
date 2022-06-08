// @ts-nocheck
import apiClient from 'apis/apiClient';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { doInitializeProductList } from 'reducers/cart.reducer';

// TODO  1. get 상품 목록 가져오기
const useGetProductsAPI = () => {
  const [isGetProductsLoading, setIsGetProductsLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const { products } = useSelector(state => state.cartReducer);

  const getProducts = async () => {
    if (products.length > 0) return;

    setIsGetProductsLoading(true);

    try {
      const response = await apiClient.get('/products');
      dispatch(doInitializeProductList({ products: response.data }));
      setIsGetProductsLoading(false);
    } catch (error) {
      setError(error);
      setIsGetProductsLoading(false);
    }
  };

  return { getProducts, products, isGetProductsLoading, error };
};

export default useGetProductsAPI;
