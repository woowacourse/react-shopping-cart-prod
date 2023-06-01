import { api } from 'api';
import { CartItem, Coupon, DeliveryPolicy, PriceResult } from 'types/api/carts';
import { Order } from 'types/api/orders';
import { ProductItem } from 'types/api/products';

const BASE_URL = 'api';

export const getMockProductList = async (): Promise<ProductItem[]> => {
  const data = await api.get(`${BASE_URL}/products`);
  return data;
};

export const getMockCartList = async (): Promise<CartItem[]> => {
  const data = await api.get(`${BASE_URL}/cart-items`);
  return data;
};

export const getCoupons = async (): Promise<Coupon[]> => {
  const data = await api.get(`${BASE_URL}/coupons`);
  return data;
};

export const getMockOrders = async (): Promise<Order[]> => {
  const data = await api.get(`${BASE_URL}/orders`);
  return data;
};

export const getMockOrderDetail = (id: number) => async () => {
  const data = await api.get(`${BASE_URL}/orders/${id}`);
  return data;
};

export const getMockDeliveryPolicy = async (): Promise<DeliveryPolicy> => {
  const data = await api.get(`${BASE_URL}/delivery-policy`);
  return data;
};

export const getPriceResult =
  (couponId: number) => async (): Promise<PriceResult> => {
    const data = await api.get(`${BASE_URL}/cart-items/coupon/${couponId}`);
    return data;
  };
