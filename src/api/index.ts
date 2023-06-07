import { getLocalStorage } from "../utils";
import {
  DEFAULT_VALUE_LOGIN_TOKEN,
  DEFAULT_VALUE_SERVER_OWNER,
  KEY_LOCALSTORAGE_LOGIN_TOKEN,
  KEY_LOCALSTORAGE_SERVER_OWNER,
  SERVERS,
} from "../constants";
import { LocalProductType } from "../types/domain";

export const api = {
  get: (path: string, isAuthRequired?: boolean) => {
    return isAuthRequired
      ? fetch(
          `${
            SERVERS[
              getLocalStorage(
                KEY_LOCALSTORAGE_SERVER_OWNER,
                DEFAULT_VALUE_SERVER_OWNER
              )
            ]
          }${path}`,
          {
            headers: {
              Authorization: `Basic ${getLocalStorage(
                KEY_LOCALSTORAGE_LOGIN_TOKEN,
                DEFAULT_VALUE_LOGIN_TOKEN
              )}`,
            },
          }
        )
      : fetch(
          `${
            SERVERS[
              getLocalStorage(
                KEY_LOCALSTORAGE_SERVER_OWNER,
                DEFAULT_VALUE_SERVER_OWNER
              )
            ]
          }${path}`
        );
  },

  // post: (path: string, payload: Object<T> )  => {},
};

const patchQuantityApi = async (cartItemId: number, newQuantity: number) =>
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

const postLoginApi = async () =>
  fetch(
    `${
      SERVERS[
        getLocalStorage(
          KEY_LOCALSTORAGE_SERVER_OWNER,
          DEFAULT_VALUE_SERVER_OWNER
        )
      ]
    }/auth/login`,
    {
      headers: {
        Authorization: `Basic ${getLocalStorage(
          KEY_LOCALSTORAGE_LOGIN_TOKEN,
          DEFAULT_VALUE_LOGIN_TOKEN
        )}`,
        "Content-Type": "application/json",
      },
      method: "POST",
    }
  );

const postCartItemApi = async (productId: number) =>
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

const postOrderApi = async (
  cartItems: Omit<LocalProductType, "id">[],
  couponId: number | null
) =>
  fetch(
    `${
      SERVERS[
        getLocalStorage(
          KEY_LOCALSTORAGE_SERVER_OWNER,
          DEFAULT_VALUE_SERVER_OWNER
        )
      ]
    }/orders`,
    {
      headers: {
        Authorization: `Basic ${getLocalStorage(
          KEY_LOCALSTORAGE_LOGIN_TOKEN,
          DEFAULT_VALUE_LOGIN_TOKEN
        )}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ products: cartItems, couponId: couponId }),
    }
  );

const postCouponApi = async (couponId: number) => {
  const now = new Date();
  now.setMonth(now.getMonth() + 1);

  return fetch(
    `${
      SERVERS[
        getLocalStorage(
          KEY_LOCALSTORAGE_SERVER_OWNER,
          DEFAULT_VALUE_SERVER_OWNER
        )
      ]
    }/coupons/${couponId}`,
    {
      headers: {
        Authorization: `Basic ${getLocalStorage(
          KEY_LOCALSTORAGE_LOGIN_TOKEN,
          DEFAULT_VALUE_LOGIN_TOKEN
        )}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ expiredAt: now }),
    }
  );
};

const deleteCartItemApi = async (cartItemId: number) =>
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

export {
  patchQuantityApi,
  postLoginApi,
  postCartItemApi,
  postOrderApi,
  postCouponApi,
  deleteCartItemApi,
};
