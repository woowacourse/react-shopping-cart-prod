import { api } from 'api';

export const getProductList = async (server: string) => {
  const data = await api.get(`${server}/products`);
  return data;
};

export const getCartList = async (server: string) => {
  const data = await api.get(`${server}/cart-items`);
  return data;
};

export const postCartItem =
  (payload: { productId: number }) => async (server: string) => {
    const response = await api.post(`${server}/cart-items`, payload);
    return response;
  };

export const patchCartItemQuantity =
  (cartId: number, payload: { quantity: number }) => async (server: string) => {
    const response = await api.patch(`${server}/cart-items/${cartId}`, payload);
    return response;
  };

export const deleteCartItem = (cartId: number) => async (server: string) => {
  const response = await api.delete(`${server}/cart-items/${cartId}`);
  return response;
};
