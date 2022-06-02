import axios from 'axios';

const getResult = async (url, method, option = {}) => {
  try {
    const res = await axios[method](url, option);

    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getProducts = (page) => getResult(`/products/${page}`, 'get');

export const getProduct = (productId) =>
  getResult(`/product/${productId}`, 'get');

export const getCart = (productId) => getResult(`/cart/${productId}`, 'get');

export const getCarts = () => getResult('/carts', 'get');

export const addCart = (productId) =>
  getResult(`/addCart/${productId}`, 'post');

export const addMoreCart = (productId) =>
  getResult(`/addMoreCart/${productId}`, 'put');

export const downCart = (productId) =>
  getResult(`/downCart/${productId}`, 'put');

export const deleteCart = (productId) =>
  getResult(`/delete/Cart/${productId}`, 'delete');

export const deleteCarts = (productIds) =>
  getResult('/deleteCarts', 'delete', { data: productIds });

export const login = (user) => getResult('/api/login', 'post', { data: user });

export const signUp = (user) =>
  getResult('/api/customer', 'post', { data: user });

export const getUser = () => getResult('/api/customer', 'get');

export const updateUser = (user) =>
  getResult('/api/customer', 'put', { data: user });

export const setToken = (accessToken) => {
  localStorage.setItem('accessToken', accessToken);
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
};
