import type { CartItem } from '../types/cart';
import type { DuplicateKeys } from '../types/common';
import type { Coupon, SpecificCoupon } from '../types/coupon';
import type { Order } from '../types/orders';
import type { Product } from '../types/products';

export type FetchQueryInstance = {
  [m in Lowercase<Method>]: <T>(
    path: string,
    config?: ExternalConfig
  ) => FetchQueryRes<T>;
};

export type FetchQueryRes<T> = Promise<HTTPResponse<T>>;
export type HTTPResponse<T> = {
  headers: Headers;
  data: T;
};

export type ExternalConfigKeys = 'baseURL' | 'body';
export type Method = 'GET' | 'POST' | 'PATCH' | 'DELETE';
export type QueryParams = Parameters<FetchQueryInstance[Lowercase<Method>]>;
export type QueryParamsWith<Config extends RequestInit> = [
  QueryParams[0],
  Config
];
export type InternalConfig = Omit<ExternalConfig, 'body'> & RequestInit;
export type ExternalConfig = Omit<
  RequestInit,
  DuplicateKeys<RequestInit, ExternalConfigKeys>
> & {
  baseURL?: string;
  body?: unknown;
};

export interface AddCartDataReq {
  productId: number;
}

export type FetchCartRes = CartItem[];

export interface AddCartDataRes {}

export interface UpdateCartItemRes {}

export interface DeleteCartItemRes {}

export interface FetchCouponsRes {
  allCoupons: Coupon[];
  specificCoupons: SpecificCoupon[];
}

export interface PostOrderRes {
  cartItemIds: number[];
  couponIds: number[];
}

export interface FetchOrdersRes {
  orders: Order[];
}

export type FetchDetailOrderRes = Order;

export type FetchProductDataRes = Product[];
