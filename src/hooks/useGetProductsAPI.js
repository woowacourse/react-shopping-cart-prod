// @ts-nocheck
import apiClient from 'apis/apiClient';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { doInitializeProductList } from 'reducers/cart.reducer';
import useSnackbar from './useSnackbar';

// TODO  1. get 상품 목록 가져오기
const useGetProductsAPI = () => {
  const [isProductsLoading, setIsProductsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [renderSnackbar] = useSnackbar();

  const dispatch = useDispatch();
  const { products } = useSelector(state => state.cartReducer);

  const getProducts = async () => {
    if (products.length > 0) return;

    setIsProductsLoading(true);

    try {
      const response = await apiClient.get('/products');
      dispatch(doInitializeProductList({ products: response.data }));
      setIsProductsLoading(false);
    } catch (error) {
      setError(error);
      renderSnackbar(error);
      setIsProductsLoading(false);
    }
  };

  return { getProducts, products, isProductsLoading, error };
};

export default useGetProductsAPI;
