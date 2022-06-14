// @ts-nocheck
import axios from 'axios';

const useProduct = () => {
  const getProductsAPI = async () => {
    const response = await axios.get('/products');

    return response.data;
  };

  const getProductAPI = async id => {
    const response = await axios.get(`/products/${id}`);

    return response.data;
  };

  return { getProductsAPI, getProductAPI };
};

export default useProduct;
