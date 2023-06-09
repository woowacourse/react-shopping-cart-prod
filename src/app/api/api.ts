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
import {url} from "./url.ts";
import {getSessionStorage} from "../utils/storage.ts";
import {SESSION_STORAGE_KEY_BASE64} from "../keys.ts";

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
};

export const fetchDeleteCart = async (server: string, id: number) => {
  const base64 = getSessionStorage(SESSION_STORAGE_KEY_BASE64, "");
  const response = await fetch(`${url[server]}/cart-items/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Basic ${base64}`,
    },
  });
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
    const checkedCartItems: CartItem[] = data.cartItems.map(
      (cartItem: OriginalCartItem) => ({
        ...cartItem,
        checked: true,
      })
    );
    return checkedCartItems;
  } catch (error) {
    throw new Error();
  }
};

export const fetchProductList = async (server: string) => {
  try {
    const response = await fetch(`${url[server]}/products`);
    const data: ProductItem[] = await response.json();
    return data;
  } catch (error) {
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
        "Content-Type": "application/json",
      },
    });

    return response.ok;
  } catch (error) {
    throw new Error();
  }
};
