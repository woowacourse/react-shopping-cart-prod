// @ts-nocheck
import apiClient from 'apis/apiClient';
import { useCallback, useState } from 'react';

// TODO  2. get 특정 상품 가져오기
const useGetProductAPI = id => {
  const [isProductLoading, setIsProductLoading] = useState(false);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState();

  const getProduct = useCallback(async id => {
    setIsProductLoading(true);

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
