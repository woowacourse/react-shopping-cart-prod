import { ServerId } from "recoil/server";
import { Product } from "types/domain";
import { SERVER_LIST, USER_TOKEN } from "./constants";

interface CartItem {
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

  const data = await response.json();

  if (!response.ok) throw new Error(data.error);

  return data;
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

  const data = await response.json();

  if (!response.ok) alert(data.error);

  return cartItemId;
};

export const changeItemQuantity = async (
  serverId: ServerId,
  cartItemId: number,
  quantity: number
) => {
  const response = await fetch(
    `${SERVER_LIST[serverId]}/cart-items/${cartItemId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Basic ${USER_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: quantity }),
    }
  );

  const data = await response.json();

  if (!response.ok) alert(data.error);

  return response.ok;
};

export const removeCartItem = async (
  serverId: ServerId,
  cartItemId: number
) => {
  const response = await fetch(
    `${SERVER_LIST[serverId]}/cart-items/${cartItemId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Basic ${USER_TOKEN}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) alert(data.error);

  return response.ok;
};
