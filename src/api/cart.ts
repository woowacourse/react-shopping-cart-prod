import { api } from 'api';
import { Coupon, DeliveryPolicy, PriceResult } from 'types/api/carts';

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

export const getCoupons = async (server: string): Promise<Coupon[]> => {
  const data = await api.get(`${server}/coupons`);
  return data;
};

export const getDeliveryPolicy = async (
  server: string
): Promise<DeliveryPolicy> => {
  const data = await api.get(`${server}/delivery-policy`);
  return data;
};

export const getPriceResult =
  (couponId: string) =>
  async (server: string): Promise<PriceResult> => {
    const data = await api.get(`${server}/cart-items/coupon/${couponId}`);
    return data;
  };
