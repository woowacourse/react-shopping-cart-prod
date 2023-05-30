import { getLocalStorage } from "../utils";
import {
  DEFAULT_VALUE_LOGIN_TOKEN,
  DEFAULT_VALUE_SERVER_OWNER,
  KEY_LOCALSTORAGE_LOGIN_TOKEN,
  KEY_LOCALSTORAGE_SERVER_OWNER,
  SERVERS,
} from "../constants";

export const fetchProducts = () =>
  fetch(
    `${
      SERVERS[
        getLocalStorage(
          KEY_LOCALSTORAGE_SERVER_OWNER,
          DEFAULT_VALUE_SERVER_OWNER
        )
      ]
    }/products`
  );

export const fetchCartItems = async () =>
  fetch(
    `${
      SERVERS[
        getLocalStorage(
          KEY_LOCALSTORAGE_SERVER_OWNER,
          DEFAULT_VALUE_SERVER_OWNER
        )
      ]
    }/cart-items`,
    {
      headers: {
        Authorization: `Basic ${getLocalStorage(
          KEY_LOCALSTORAGE_LOGIN_TOKEN,
          DEFAULT_VALUE_LOGIN_TOKEN
        )}`,
      },
    }
  );

export const changeQuantity = async (cartItemId: number, newQuantity: number) =>
  fetch(
    `${
      SERVERS[
        getLocalStorage(
          KEY_LOCALSTORAGE_SERVER_OWNER,
          DEFAULT_VALUE_SERVER_OWNER
        )
      ]
    }/cart-items/${cartItemId}`,
    {
      headers: {
        Authorization: `Basic ${getLocalStorage(
          KEY_LOCALSTORAGE_LOGIN_TOKEN,
          DEFAULT_VALUE_LOGIN_TOKEN
        )}`,
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({ quantity: newQuantity }),
    }
  );

export const addCartItem = async (productId: number) =>
  fetch(
    `${
      SERVERS[
        getLocalStorage(
          KEY_LOCALSTORAGE_SERVER_OWNER,
          DEFAULT_VALUE_SERVER_OWNER
        )
      ]
    }/cart-items`,
    {
      headers: {
        Authorization: `Basic ${getLocalStorage(
          KEY_LOCALSTORAGE_LOGIN_TOKEN,
          DEFAULT_VALUE_LOGIN_TOKEN
        )}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ productId: productId }),
    }
  );

export const deleteCartItem = async (cartItemId: number) =>
  fetch(
    `${
      SERVERS[
        getLocalStorage(
          KEY_LOCALSTORAGE_SERVER_OWNER,
          DEFAULT_VALUE_SERVER_OWNER
        )
      ]
    }/cart-items/${cartItemId}`,
    {
      headers: {
        Authorization: `Basic ${getLocalStorage(
          KEY_LOCALSTORAGE_LOGIN_TOKEN,
          DEFAULT_VALUE_LOGIN_TOKEN
        )}`,
      },
      method: "DELETE",
    }
  );
