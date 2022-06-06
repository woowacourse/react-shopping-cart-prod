import requestAsync from './RequestAsync';

export const requestGetCartList = async () => requestAsync.get('cart');
export const requestAddCartItem = async (productId) =>
  requestAsync.post(`cart/${productId}`, null, true);
export const requestSetCartItemQuantity = async (productId, quantity) =>
  requestAsync.put(`cart/${productId}/quantity`, { quantity }, true);
export const requestDeleteCartItems = async (productIds) =>
  requestAsync.delete('cart/products', { productIds }, true);
export const requestDeleteAllCartItem = async () => requestAsync.delete('cart', null, true);
export const requestOrderCartItem = async (productIds) =>
  requestAsync.post('orders', { productIds }, true);
