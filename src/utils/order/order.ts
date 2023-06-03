import { CartItemType } from '@type/cartType';

interface CreateOrderRequestBodyParams {
  cartItems: CartItemType[];
  couponId?: number;
}

export const createOrderRequestBody = ({ cartItems, couponId }: CreateOrderRequestBodyParams) => {
  if (!couponId) {
    return { orderItemIds: cartItems.map((cartItem) => cartItem.id) };
  }

  return {
    orderItemIds: cartItems.map((cartItem) => cartItem.id),
    couponId,
  };
};
