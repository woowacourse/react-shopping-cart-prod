import { CartItem, ProductItem, ReceivedCartItem } from "../types/types";

export const fetchAddCart = async (url: string, id: number) => {
  const response = await fetch(`${url}/cart-items`, {
    method: "POST",
    body: JSON.stringify({
      productId: id,
    }),
  });
  const result = await response.json();
  console.log(result);
};

export const fetchDeleteCart = async (url: string, id: number) => {
  const response = await fetch(`${url}/cart-items/${id}`, {
    method: "DELETE",
  });
  console.log(response);
};

export const fetchUpdateCart = async (url: string, id: number, quantity: number) => {
  const response = await fetch(`${url}/cart-items/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      quantity,
    }),
  });
  const result = await response.json();
  console.log(result);
};

export const fetchCartList = async (url: string) => {
  try {
    const response = await fetch(`${url}/cart-items`);
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

export const fetchProductList = async (url: string) => {
  try {
    const response = await fetch("/products");
    const data: ProductItem[] = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error();
  }
};
