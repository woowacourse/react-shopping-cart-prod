import { BOX_SIZE } from '@Constants/index';
import { FETCH_METHOD, SERVERS_NAMES } from '@Constants/servers';

export type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};

export type CartItemType = {
  id: number;
  quantity: number;
  product: Product;
  isSelected: boolean;
};

export type OrderItemType = {
  id: number;
  cartItems: CartItemType[];
  date: Date;
  price: number;
};

export type CouponType = {
  id: number;
  name: string;
  discountAmount: number;
  description: string;
};

export type MyCouponType = CouponType & { isUsed: boolean };

export type fetchMethod = keyof typeof FETCH_METHOD;

export type UpdateCartItem = (url: string, method: fetchMethod, body?: BodyInit | null | undefined) => void;

export type FetchArgs = {
  url: string;
  method: fetchMethod;
  body?: BodyInit | null | undefined;
  server: Servers;
};

export type BoxSize = keyof typeof BOX_SIZE;

export type Servers = (typeof SERVERS_NAMES)[number];
