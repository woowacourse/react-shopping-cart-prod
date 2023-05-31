import { ServerId } from "recoil/server";
import { SERVER_LIST, USER_TOKEN } from "./constants";
import { Product } from "./products";

export interface Orders {
  orderId: number;
  orderItems: Order[];
}

export interface Order {
  orderItemId: number;
  product: Product;
  total: number;
  quantity: number;
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
