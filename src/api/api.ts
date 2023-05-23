import { CartItem, ProductItem, ReceivedCartItem } from "../types/types";
import { url } from "./url";

export const fetchAddCart = async (server: string, id: number) => {
  const response = await fetch(`${url[server]}/cart-items`, {
    method: "POST",
    body: JSON.stringify({
      productId: id,
    }),
  });
  const result = await response.json();
  console.log(result);
};

export const fetchDeleteCart = async (server: string, id: number) => {
  const response = await fetch(`${url[server]}/cart-items/${id}`, {
    method: "DELETE",
  });
  console.log(response);
};

export const fetchUpdateCart = async (server: string, id: number, quantity: number) => {
  const response = await fetch(`${url[server]}/cart-items/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      quantity,
    }),
  });
  const result = await response.json();
  console.log(result);
};

export const fetchCartList = async (server: string) => {
  try {
    const response = await fetch(`${url[server]}/cart-items`);
    const data = await response.json();
    const checkedCartItems: CartItem[] = data.map(
      (cartItem: ReceivedCartItem) => ({
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
    return data;
  } catch (error) {
    console.error(error);
    throw new Error();
  }
};
