interface CreateOrderRequestBodyParams {
  cartItemIds: number[];
  couponId?: number;
}

export const createOrderRequestBody = ({ cartItemIds, couponId }: CreateOrderRequestBodyParams) => {
  if (!couponId) {
    return { orderItemIds: cartItemIds };
  }

  return {
    orderItemIds: cartItemIds,
    couponId,
  };
};
