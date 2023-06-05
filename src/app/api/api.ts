import {
  CartItem,
  ProductItem,
  OriginalCartItem,
  User,
  ResponseCartItem,
  Coupon,
  Point,
  OrderedGroup,
  ResponseOrdered,
  NewOrder,
} from "../../types/types.ts";
import { url } from "./url.ts";
import { getSessionStorage } from "../utils/storage.ts";
import { SESSION_STORAGE_KEY_BASE64 } from "../keys.ts";

export const fetchAddCart = async (server: string, id: number) => {
  const base64 = getSessionStorage(SESSION_STORAGE_KEY_BASE64, "");
  const response = await fetch(`${url[server]}/cart-items`, {
    method: "POST",
    body: JSON.stringify({
      productId: id,
    }),
    headers: {
      Authorization: `Basic ${base64}`,
      "Content-Type": "application/json",
    },
  });
  console.log(response.ok);
};

export const fetchDeleteCart = async (server: string, id: number) => {
  const base64 = getSessionStorage(SESSION_STORAGE_KEY_BASE64, "");
  const response = await fetch(`${url[server]}/cart-items/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Basic ${base64}`,
    },
  });
  console.log(response);
};

export const fetchUpdateCart = async (
  server: string,
  id: number,
  quantity: number
) => {
  const base64 = getSessionStorage(SESSION_STORAGE_KEY_BASE64, "");
  const response = await fetch(`${url[server]}/cart-items/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      quantity,
    }),
    headers: {
      Authorization: `Basic ${base64}`,
      "Content-Type": "application/json",
    },
  });
  console.log(response.ok);
};

export const fetchCartList = async (server: string) => {
  try {
    const base64 = getSessionStorage(SESSION_STORAGE_KEY_BASE64, "");
    const response = await fetch(`${url[server]}/cart-items`, {
      headers: {
        Authorization: `Basic ${base64}`,
      },
    });
    const data: ResponseCartItem = await response.json();
    console.log("cart-list");
    console.log(data);
    const checkedCartItems: CartItem[] = data.cartItems.map(
      (cartItem: OriginalCartItem) => ({
        ...cartItem,
        checked: true,
      })
    );
    return checkedCartItems;
  } catch (error) {
    console.error(error);
    throw new Error();
  }
};

export const fetchProductList = async (server: string) => {
  try {
    const response = await fetch(`${url[server]}/products`);
    const data: ProductItem[] = await response.json();
    console.log("product-list");
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error();
  }
};

export const fetchMembers = async (server: string) => {
  try {
    const response = await fetch(`${url[server]}/members`);
    if (response.ok) {
      const data: User[] = await response.json();
      return data;
    } else {
      throw new Error();
      return [];
    }
  } catch (error) {
    console.error(error);
    throw new Error();
  }
};

export const fetchCoupons = async (server: string) => {
  try {
    const base64 = getSessionStorage(SESSION_STORAGE_KEY_BASE64, "");
    const response = await fetch(`${url[server]}/coupons`, {
      headers: {
        Authorization: `Basic ${base64}`,
      },
    });
    if (response.ok) {
      const data: Coupon[] = await response.json();
      return data;
    } else {
      throw new Error();
      return [];
    }
  } catch (error) {
    console.error(error);
    throw new Error();
  }
};

export const fetchPoint = async (server: string) => {
  try {
    const base64 = getSessionStorage(SESSION_STORAGE_KEY_BASE64, "");
    const response = await fetch(`${url[server]}/point`, {
      headers: {
        Authorization: `Basic ${base64}`,
      },
    });
    if (response.ok) {
      const data: Point = await response.json();
      return data;
    } else {
      throw new Error();
    }
  } catch (error) {
    console.error(error);
    throw new Error();
  }
};

export const fetchOrder = async (server: string, newOrder: NewOrder) => {
  try {
    const base64 = getSessionStorage(SESSION_STORAGE_KEY_BASE64, "");
    const response = await fetch(`${url[server]}/orders`, {
      method: "POST",
      body: JSON.stringify(newOrder),
      headers: {
        Authorization: `Basic ${base64}`,
      },
    });

    return response.ok;
  } catch (error) {
    console.error(error);
    throw new Error();
  }
};

export const fetchOrderedItem = async (server: string, orderId: string) => {
  try {
    const response = await fetch(`${url[server]}/orders/${orderId}`);
    if (response.ok) {
      const data: OrderedGroup = await response.json();
      return data;
    } else {
      throw new Error();
    }
  } catch (error) {
    console.error(error);
    throw new Error();
  }
};

export const fetchOrderedList = async (server: string) => {
  try {
    const response = await fetch(`${url[server]}/orders`);
    if (response.ok) {
      const data: ResponseOrdered = await response.json();
      return data;
    } else {
      throw new Error();
    }
  } catch (error) {
    console.error(error);
    throw new Error();
  }
};
