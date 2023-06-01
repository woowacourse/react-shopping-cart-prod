import { ServerId } from "recoil/server";
import { SERVER_LIST, USER_TOKEN } from "./constants";
import { Product } from "./products";
import { Coupon } from "./coupons";

export interface Orders {
  orderId: number;
  orderItems: Order[];
}

export interface Order {
  orderItemId: number;
  product: Product;
  coupons: Coupon[];
  total: number;
  quantity: number;
}

export interface PostOrderItem {
  cartItemId: number;
  product: Product;
  quantity: number;
  couponIds: number[];
}

export const getOrders = async (serverId: ServerId): Promise<Orders[]> => {
  const response = await fetch(`${SERVER_LIST[serverId]}/orders`, {
    method: "GET",
    headers: {
      Authorization: `Basic ${USER_TOKEN}`,
    },
  });

  return response.json();
};

export const postOrder = async (serverId: ServerId, orderItem: PostOrderItem[]) => {
  const response = await fetch(`${SERVER_LIST[serverId]}/orders`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${USER_TOKEN}`,
    },
    body: JSON.stringify(orderItem),
  });

  return response.status === 204;
};
