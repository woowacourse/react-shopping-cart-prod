import { CartItem } from '../types/cart';
import { Order } from '../types/orders';

export const getLocalStorageItem = <T, Default = T>(
  key: string,
  defaultValue?: Default
): T | Default => {
  const value = localStorage.getItem(key);

  return value ? JSON.parse(value) : defaultValue;
};

export const setLocalStorageItem = (key: string, data: unknown) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getCart = (defaultValue?: CartItem[]) =>
  getLocalStorageItem<CartItem[]>('Cart', defaultValue ?? []);

export const setCart = (data: CartItem[]) => setLocalStorageItem('Cart', data);

export const getOrders = (defaultValue?: Order[]) =>
  getLocalStorageItem<Order[]>('Orders', defaultValue ?? []);

export const setOrders = (data: Order[]) => {
  setLocalStorageItem('Orders', data);
};
