import axios from 'axios';

const getServerResult = async (url, method, option = {}) => {
  try {
    const res = await axios[method](url, option);

    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getProducts = (page) =>
  getServerResult(`/products/${page}`, 'get');

export const getProduct = (productId) =>
  getServerResult(`/product/${productId}`, 'get');

export const getCart = (productId) =>
  getServerResult(`/cart/${productId}`, 'get');

export const getCarts = () => getServerResult('/carts', 'get');

export const addCart = (productId) =>
  getServerResult(`/addCart/${productId}`, 'post');

export const addMoreCart = (productId) =>
  getServerResult(`/addMoreCart/${productId}`, 'put');

export const downCart = (productId) =>
  getServerResult(`/downCart/${productId}`, 'put');

export const deleteCart = (productId) =>
  getServerResult(`/delete/Cart/${productId}`, 'delete');

export const deleteCarts = (productIds) =>
  getServerResult('/deleteCarts', 'delete', { data: productIds });

export const login = (user) =>
  getServerResult('/api/login', 'post', { data: user });

export const signUp = (user) =>
  getServerResult('/api/customer', 'post', { data: user });

export const getUser = () => getServerResult('/api/customer', 'get');

export const updateUser = (user) =>
  getServerResult('/api/customer', 'put', { data: user });

export const deleteUser = (password) =>
  getServerResult('/api/customer', 'delete', { data: { password } });

export const setToken = (accessToken) => {
  localStorage.setItem('accessToken', accessToken);
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
};

export const initToken = () => {
  const accessToken = localStorage.getItem('accessToken');
  accessToken && setToken(accessToken);
};

export const clearToken = () => {
  localStorage.removeItem('accessToken');
};
