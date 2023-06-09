import { ServerOrderType } from '@type/orderType';

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

export const orderListApiWrapper = (orderList: ServerOrderType[]) => {
  return orderList.map((order) => orderDetailApiWrapper(order));
};

export const orderDetailApiWrapper = (orderDetail: ServerOrderType) => {
  return {
    id: orderDetail.id,
    totalItemsPrice: orderDetail.totalItemsPrice,
    discountPrice: orderDetail.discountPrice,
    deliveryFee: orderDetail.deliveryFee,
    orderItems: orderDetail.orderItems.map((orderItem) => ({
      orderItemId: orderItem.orderItemId,
      name: orderItem.name,
      price: orderItem.price,
      imageUrl: orderItem.imageUrl,
      quantity: orderItem.quantity,
    })),
  };
};
