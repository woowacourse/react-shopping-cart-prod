import {
  DEFAULT_VALUE_SERVER_OWNER,
  KEY_LOCALSTORAGE_SERVER_OWNER,
  SERVERS,
} from "../constants";
import { LocalProductType } from "../types/domain";
import { getLocalStorage } from "../utils";
import { parseOrderListData } from "../utils/domain";

// Base64로 인코딩
const base64 = btoa(
  process.env.REACT_APP_USERNAME + ":" + process.env.REACT_APP_PASSWORD
);

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
        Authorization: `Basic ${base64}`,
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
        Authorization: `Basic ${base64}`,
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
        Authorization: `Basic ${base64}`,
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
        Authorization: `Basic ${base64}`,
      },
      method: "DELETE",
    }
  );

export const fetchCoupons = async (cartItemIdList: number[]) => {
  const orderQuery = cartItemIdList
    .map((el) => {
      return `cartItemId=${el}`;
    })
    .join("&");

  return fetch(
    `${
      SERVERS[
        getLocalStorage(
          KEY_LOCALSTORAGE_SERVER_OWNER,
          DEFAULT_VALUE_SERVER_OWNER
        )
      ]
    }/orders/coupons?${orderQuery}`,
    {
      headers: {
        Authorization: `Basic ${base64}`,
      },
    }
  );
};

export const fetchAddOrderList = async (
  orderListData: LocalProductType[],
  couponId: number | null
) => {
  const parsedOrderListData = parseOrderListData(couponId, orderListData);

  return fetch(
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
        Authorization: `Basic ${base64}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(parsedOrderListData),
    }
  );
};

export const fetchOrderList = (orderId?: number) => {
  return fetch(
    `${
      SERVERS[
        getLocalStorage(
          KEY_LOCALSTORAGE_SERVER_OWNER,
          DEFAULT_VALUE_SERVER_OWNER
        )
      ]
    }/orders/${orderId ?? ''}`,
    {
      headers: {
        Authorization: `Basic ${base64}`,
      },
    }
  );
};
