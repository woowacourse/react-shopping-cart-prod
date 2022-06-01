import requestAsync from './RequestAsync';

const requestGetProductList = async () => requestAsync.get('products');
const requestGetProduct = async (id) => requestAsync.get(`product?id=${id}`);
const requestLogin = async (id, password) => requestAsync.post('login', { username: id, password });
const requestCheckDuplicatedId = async (id) =>
  requestAsync.get('customers/username/duplication', { username: id });

const requestSignUp = async (formData) => requestAsync.post('customers', formData);
const requestEditUserInfo = async (formData) => requestAsync.put('customers/me', formData);

export {
  requestGetProductList,
  requestGetProduct,
  requestLogin,
  requestCheckDuplicatedId,
  requestSignUp,
  requestEditUserInfo,
};
