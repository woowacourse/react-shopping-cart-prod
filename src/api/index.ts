import { getLocalStorage } from "../utils";
import {
  DEFAULT_VALUE_LOGIN_TOKEN,
  DEFAULT_VALUE_SERVER_OWNER,
  KEY_LOCALSTORAGE_LOGIN_TOKEN,
  KEY_LOCALSTORAGE_SERVER_OWNER,
  SERVERS,
} from "../constants";

const getProductsApi = () =>
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

const getCartItemsApi = async () =>
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

const getUserApi = () =>
  fetch(`${SERVERS["루카"]}/members/my`, {
    headers: {
      Authorization: `Basic ${getLocalStorage(
        KEY_LOCALSTORAGE_LOGIN_TOKEN,
        DEFAULT_VALUE_LOGIN_TOKEN
      )}`,
    },
  });

const getCouponsApi = (cartItemIds: number[]) => {
  const cartItemIdsQuery = cartItemIds
    .map((id) => "cartItemId=" + id.toString())
    .join("&");

  return fetch(
    `${
      SERVERS[
        getLocalStorage(
          KEY_LOCALSTORAGE_SERVER_OWNER,
          DEFAULT_VALUE_SERVER_OWNER
        )
      ]
    }/orders/coupons?${cartItemIdsQuery}`,
    {
      headers: {
        Authorization: `Basic ${getLocalStorage(
          KEY_LOCALSTORAGE_LOGIN_TOKEN,
          DEFAULT_VALUE_LOGIN_TOKEN
        )}`,
        "Content-Type": "application/json",
      },
    }
  );
};

const getOrdersApi = () =>
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
      },
    }
  );

const getOrderDetailApi = (orderId: number) =>
  fetch(
    `${
      SERVERS[
        getLocalStorage(
          KEY_LOCALSTORAGE_SERVER_OWNER,
          DEFAULT_VALUE_SERVER_OWNER
        )
      ]
    }/orders/${orderId}`,
    {
      headers: {
        Authorization: `Basic ${getLocalStorage(
          KEY_LOCALSTORAGE_LOGIN_TOKEN,
          DEFAULT_VALUE_LOGIN_TOKEN
        )}`,
      },
    }
  );

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

const postOrderApi = async (cartItemIds: number[], couponId: number) =>
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
      body: JSON.stringify({ cartItemIds: cartItemIds, couponId: couponId }),
    }
  );

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
  getProductsApi,
  getCartItemsApi,
  getCouponsApi,
  getUserApi,
  getOrdersApi,
  getOrderDetailApi,
  patchQuantityApi,
  postCartItemApi,
  postOrderApi,
  deleteCartItemApi,
};
