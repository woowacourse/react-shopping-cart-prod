import axios from 'axios';

axios.defaults.baseURL = 'https://hitalittle.ga';

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
  getServerResult('/deleteCarts', 'delete', productIds);

export const login = (user) => getServerResult('/login', 'post', user);

export const signUp = (user) => getServerResult('/customer', 'post', user);

export const getUser = () => getServerResult('/customer', 'get');

export const updateUser = (user) => getServerResult('/customer', 'put', user);

export const deleteUser = (password) =>
  getServerResult('/customer', 'delete', { password });

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
