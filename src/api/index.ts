import { SERVERS } from "../constants";

const DEV_BASE_URL = "";
const username = "a@a.com";
const password = "1234";

// Base64로 인코딩
const base64 = btoa(username + ":" + password);

export const fetchProducts = (serverOwner: string) =>
  fetch(`${DEV_BASE_URL}${SERVERS[serverOwner]}/products`);

export const fetchCartItems = async (serverOwner: string) =>
  fetch(`${DEV_BASE_URL}${SERVERS[serverOwner]}/cart-items`, {
    headers: {
      Authorization: `Basic ${base64}`,
    },
  });

export const changeQuantity = async (
  cartItemId: number,
  newQuantity: number,
  serverOwner: string
) =>
  fetch(`${DEV_BASE_URL}${SERVERS[serverOwner]}/cart-items/${cartItemId}`, {
    headers: {
      Authorization: `Basic ${base64}`,
      "Content-Type": "application/json",
    },
    method: "PATCH",
    body: JSON.stringify({ quantity: newQuantity }),
  });

export const addCartItem = async (productId: number, serverOwner: string) =>
  fetch(`${DEV_BASE_URL}${SERVERS[serverOwner]}/cart-items`, {
    headers: {
      Authorization: `Basic ${base64}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ productId: productId }),
  });

export const deleteCartItem = async (cartItemId: number, serverOwner: string) =>
  fetch(`${DEV_BASE_URL}${SERVERS[serverOwner]}/cart-items/${cartItemId}`, {
    headers: {
      Authorization: `Basic ${base64}`,
    },
    method: "DELETE",
  });
