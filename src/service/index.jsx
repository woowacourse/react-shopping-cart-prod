import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

const getResult = async (url, method, option = {}) => {
  try {
    const res = await axios[method](url, option);

    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getProducts = (page) =>
  getResult(`/api/products?page=${page}`, 'get');

export const getProduct = (productId) =>
  getResult(`/api/products/${productId}`, 'get');

export const getCart = (productId) => getResult(`/cart/${productId}`, 'get');

export const getCarts = () => getResult('/api/customer/carts', 'get');

export const addCart = (productId) =>
  getResult(`/api/customer/carts`, 'post', { productId });

export const modifyCartQuantity = (productId, quantity) =>
  getResult(`/api/customer/carts`, 'put', { productId, quantity });

export const downCart = (productId) =>
  getResult(`/downCart/${productId}`, 'put');

export const deleteCart = (productId) =>
  getResult(`/delete/Cart/${productId}`, 'delete');

export const deleteCarts = (cartIds) =>
  getResult('/api/customer/carts', 'delete', { data: { cartIds } });

export const login = (user) => getResult('/api/login', 'post', user);

export const signUp = (user) => getResult('/api/customer', 'post', user);

export const getUser = () => getResult('/api/customer', 'get');

export const updateUser = (user) =>
  getResult('/api/customer/profile', 'put', user);

export const deleteUser = (password) =>
  getResult('/api/customer', 'delete', { data: { password } });

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
