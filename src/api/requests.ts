import { api } from 'api';
import { PostPaymentRequest } from 'types/api';

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

export const getCoupons = async (server: string) => {
  const data = await api.get(`${server}/coupons`);
  return data;
};

export const getDeliveryPolicy = async (server: string) => {
  const data = await api.get(`${server}/delivery-policy`);
  return data;
};

export const getCouponApplied =
  (couponIds: number[]) => async (server: string) => {
    const params = couponIds.length === 0 ? '' : '/' + couponIds.join(',');
    const data = await api.get(`${server}/cart-items/coupon${params}`);
    return data;
  };

export const postPayments =
  (payload: PostPaymentRequest) => async (server: string) => {
    const response = await api.post(`${server}/payments`, payload);
    return response;
  };

export const getOrderList = async (server: string) => {
  const data = await api.get(`${server}/orders`);
  return data;
};

export const getOrderDetail = (orderId: number) => async (server: string) => {
  const data = await api.get(`${server}/orders/${orderId}`);
  return data;
};
