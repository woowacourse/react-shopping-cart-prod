import type { CartItem } from '../types/cart';
import { waitFor, WaitForOptions } from '../utils/waitFor';
import { authFetchQuery } from './api';
import type {
  AddCartDataReq,
  AddCartDataRes,
  DeleteCartItemRes,
  FetchCartRes,
  FetchQueryRes,
  UpdateCartItemRes,
} from './api.type';

export const fetchCart = (options?: WaitForOptions<FetchCartRes>) => {
  const promise = authFetchQuery.get<FetchCartRes>(`/cart-items`);

  return waitFor(promise, options);
};

export const addToCart: (
  payload: AddCartDataReq
) => FetchQueryRes<AddCartDataRes> = ({ productId }) => {
  return authFetchQuery.post<AddCartDataRes>(`/cart-items`, {
    body: { productId },
  });
};

export const updateCartItem: (
  payload: UpdateCartItemReq
) => FetchQueryRes<UpdateCartItemRes> = ({ cartId, quantity }) => {
  return authFetchQuery.patch<UpdateCartItemRes>(`/cart-items/${cartId}`, {
    body: { quantity },
  });
};

export const deleteCartItem: (
  id: CartItem['id']
) => FetchQueryRes<DeleteCartItemRes> = (id) => {
  return authFetchQuery.delete<DeleteCartItemRes>(`/cart-items/${id}`);
};

export interface UpdateCartItemReq {
  cartId: number;
  quantity: number;
}
