import requestAsync from './RequestAsync';

export const requestGetProductList = async () => requestAsync.get('products');
export const requestGetProduct = async (id) => requestAsync.get(`products/${id}`);
