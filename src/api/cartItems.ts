import { ServerId } from "recoil/server";
import { Product } from "./products";
import { SERVER_LIST, USER_TOKEN } from "./constants";

export interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}

export const getCartItems = async (serverId: ServerId): Promise<CartItem[]> => {
  const response = await fetch(`${SERVER_LIST[serverId]}/cart-items`, {
    method: "GET",
    headers: {
      Authorization: `Basic ${USER_TOKEN}`,
    },
  });

  return response.json();
};

export const addCartItem = async (serverId: ServerId, productId: number) => {
  const response = await fetch(`${SERVER_LIST[serverId]}/cart-items`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${USER_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId: productId }),
  });

  const cartItemId = response.headers.get("Location")?.split("/")[2];

  return response.status === 201 && cartItemId;
};

export const changeItemQuantity = async (
  serverId: ServerId,
  cartItemId: number,
  quantity: number
) => {
  const response = await fetch(`${SERVER_LIST[serverId]}/cart-items/${cartItemId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Basic ${USER_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quantity: quantity }),
  });

  return response.status;
};

export const removeCartItem = async (serverId: ServerId, cartItemId: number) => {
  const response = await fetch(`${SERVER_LIST[serverId]}/cart-items/${cartItemId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Basic ${USER_TOKEN}`,
    },
  });

  return response.status === 204;
};
