import requestAsync from './RequestAsync';

const requestGetProductList = async () => requestAsync.get('products');
const requestGetProduct = async (id) => requestAsync.get(`product?id=${id}`);
const requestLogin = async (id, password) => requestAsync.post('login', { username: id, password });

export { requestGetProductList, requestGetProduct, requestLogin };
