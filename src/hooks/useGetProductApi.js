// @ts-nocheck
import apiClient from 'apis/apiClient';
import { useCallback, useState } from 'react';

// DONE  2. get 특정 상품 가져오기
const useGetProductAPI = () => {
  const [isProductLoading, setIsProductLoading] = useState(true);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState();

  const getProduct = useCallback(async id => {
    console.log('id', id);

    try {
      console.log(id);
      const response = await apiClient.get(`/products/${id}`);
      setProduct(response.data);
      setIsProductLoading(false);
    } catch (error) {
      setError(error);
      setIsProductLoading(false);
    }
  }, []);

  return { getProduct, product, isProductLoading, error };
};

export default useGetProductAPI;
