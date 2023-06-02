import { ServerId } from "recoil/server";
import { SERVER_LIST, USER_TOKEN } from "./constants";
import { Product } from "./products";
import { Coupon } from "./coupons";
import { CartItem } from "./cartItems";

export interface Order {
  orderId: number;
  deliveryFee: number;
  total: number;
  orderItems: OrderItem[];
}

export interface OrderItem {
  id: number;
  product: Product;
  coupons: Coupon[];
  total: number;
  quantity: number;
}

export interface PostOrderitem extends CartItem {
  coupons: Coupon[];
}

export interface PostOrder {
  deliveryFee: number;
  orderItems: PostOrderitem[];
}

export const getOrders = async (serverId: ServerId): Promise<Order[]> => {
  const response = await fetch(`${SERVER_LIST[serverId]}/orders`, {
    method: "GET",
    headers: {
      Authorization: `Basic ${USER_TOKEN}`,
    },
  });

  if (response.status !== 200) throw new Error(response.statusText);

  return response.json();
};

export const postOrder = async (serverId: ServerId, order: PostOrder) => {
  const response = await fetch(`${SERVER_LIST[serverId]}/orders`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${USER_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });

  return response.status === 204;
};
