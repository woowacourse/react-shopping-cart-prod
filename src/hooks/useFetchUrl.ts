import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from 'recoil';

import { orderListState } from '../store/order';
import { originState } from '../store/origin';
import productListState from '../store/product';
import { ProductItemType } from '../types';
import { tokenized } from './../constants/index';
import { cartListState, cartTotalAmountState } from './../store/cart';
import { couponListState } from './../store/coupon';
import { OrderItemType } from './../store/order';
import { CartItemType, CouponItemType } from './../types/index';

const useGetFetchData = <T>(query: string, setState: SetterOrUpdater<T>) => {
  const origin = useRecoilValue(originState);
  const { data } = useQuery<T>({
    queryKey: [origin, query],
    queryFn: async () => {
      const response = await fetch(`${origin}${query}`);
      if (!response.ok) {
        throw new Error(`${response.status} Response was not ok`);
      }
      return response.json();
    },
    onSuccess(data) {
      setState(data);
    },
  });

  return data;
};

const useGetAuthFetchData = <T>(query: string, setState: SetterOrUpdater<T>) => {
  const origin = useRecoilValue(originState);
  const { data } = useQuery<T>({
    queryKey: [origin, query],

    queryFn: async () => {
      const response = await fetch(`${origin}${query}`, {
        method: 'GET',
        headers: {
          'Content-Type': `application/json`,
          Authorization: `Basic ${tokenized}`,
        },
      });

      if (!response.ok) {
        throw new Error(`${response.status} Response was not ok`);
      }
      return response.json();
    },

    onSuccess(data) {
      setState(data);
    },
  });

  return data;
};

export const useFetchMutaionFn = <T>(query: string, setState: SetterOrUpdater<T>) => {
  const origin = useRecoilValue(originState);
  const queryClient = useQueryClient();

  const requestFn = async ({
    method,
    body,
    headers,
  }: {
    method: string;
    body: string;
    headers?: HeadersInit;
  }) => {
    const data: RequestInit = { method, body: JSON.stringify(body), headers };

    return await fetch(`${origin}${query}`, data);
  };

  const mutation = useMutation({
    mutationFn: requestFn,
    onSuccess: (data, variable) => {
      queryClient.invalidateQueries({ queryKey: [query] });
    },
  });

  return mutation;
};

export const useGetProductList = () => {
  const setProducts = useSetRecoilState(productListState);
  return useGetFetchData<ProductItemType[]>('products', setProducts);
};

export const useCouponList = (type: 'all' | 'usable') => {
  const setCoupons = useSetRecoilState(couponListState);
  const cartTotalAmount = useRecoilValue(cartTotalAmountState);
  const targetQuery = type === 'all' ? `coupons` : `coupons/active?total=${cartTotalAmount}`;
  const data = useGetAuthFetchData<CouponItemType[]>(targetQuery, setCoupons);

  return data;
};

export const useGetCartList = () => {
  const setCartList = useSetRecoilState(cartListState);
  return useGetAuthFetchData<CartItemType[]>('cart-items', setCartList);
};

export const useOrderList = () => {
  const setOrderList = useSetRecoilState(orderListState);
  return useGetAuthFetchData<OrderItemType[]>('orders', setOrderList);
};
