import requestAsync from './RequestAsync';

const requestGetProductList = async () => requestAsync.get('products');
const requestGetProduct = async (id) => requestAsync.get(`products/${id}`);

const requestLogin = async (id, password) => requestAsync.post('login', { username: id, password });
const requestUserInfo = async () => requestAsync.get('customers/me', true);
const requestCheckDuplicatedId = async (id) =>
  requestAsync.get('customers/username/duplication', { username: id });

const requestSignUp = async (formData) => {
  const res = await requestAsync.post('customers', formData);
  return res;
};

const requestEditUserInfo = async (formData) => requestAsync.put('customers/me', formData, true);
const requestWithDrawUser = async () => requestAsync.delete('customers/me', true);
const requestEditUserPassword = async (formData) =>
  requestAsync.put('customers/me/password', formData, true);

const requestGetCartList = async () => requestAsync.get('cart', true);
const requestPostCartItem = async (id) => requestAsync.post(`cart/${id}`, true);
const requestAddCartItem = async (id, quantity) =>
  requestAsync.put(`cart/${id}/quantity`, quantity, true);
const requestDeleteCartItem = async (productList) =>
  requestAsync.delete('cart/products', productList, true);
const requestPurchaseCartItem = async (productList) =>
  requestAsync.post('orders', productList, true);

export {
  requestGetProductList,
  requestGetProduct,
  requestLogin,
  requestUserInfo,
  requestCheckDuplicatedId,
  requestSignUp,
  requestEditUserInfo,
  requestWithDrawUser,
  requestEditUserPassword,
  requestGetCartList,
  requestPostCartItem,
  requestAddCartItem,
  requestDeleteCartItem,
  requestPurchaseCartItem,
};
