import { SERVERS } from "../constants";
import { getLocalStorage } from "../utils";

const DEV_BASE_URL = "";
const username = "a@a.com";
const password = "1234";

// Base64로 인코딩
const base64 = btoa(username + ":" + password);

export const fetchProducts = () =>
  fetch(`${DEV_BASE_URL}${SERVERS[getLocalStorage("owner", "애쉬")]}/products`);

export const fetchCartItems = async () =>
  fetch(
    `${DEV_BASE_URL}${SERVERS[getLocalStorage("owner", "애쉬")]}/cart-items`,
    {
      headers: {
        Authorization: `Basic ${base64}`,
      },
    }
  );

export const changeQuantity = async (cartItemId: number, newQuantity: number) =>
  fetch(
    `${DEV_BASE_URL}${
      SERVERS[getLocalStorage("owner", "애쉬")]
    }/cart-items/${cartItemId}`,
    {
      headers: {
        Authorization: `Basic ${base64}`,
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({ quantity: newQuantity }),
    }
  );

export const addCartItem = async (productId: number) =>
  fetch(
    `${DEV_BASE_URL}${SERVERS[getLocalStorage("owner", "애쉬")]}/cart-items`,
    {
      headers: {
        Authorization: `Basic ${base64}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ productId: productId }),
    }
  );

export const deleteCartItem = async (cartItemId: number) =>
  fetch(
    `${DEV_BASE_URL}${
      SERVERS[getLocalStorage("owner", "애쉬")]
    }/cart-items/${cartItemId}`,
    {
      headers: {
        Authorization: `Basic ${base64}`,
      },
      method: "DELETE",
    }
  );
