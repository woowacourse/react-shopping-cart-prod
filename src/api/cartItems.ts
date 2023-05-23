import { Product } from "types/domain";

interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}

export const getCartItems = async (): Promise<CartItem[]> => {
  const response = await fetch("/cart-items", {
    method: "GET",
  });

  return response.json();
};

export const addCartItem = async (productId: number) => {
  const response = await fetch("/cart-items", {
    method: "POST",
    body: JSON.stringify({ productId: productId }),
  });

  const cartItemId = response.headers.get("Location")?.split("/")[2];
  console.log("헤더: ", cartItemId);

  return response.status === 201 && cartItemId;
};

export const changeItemQuantity = async (cartItemId: number, quantity: number) => {
  const response = await fetch(`/cart-items/${cartItemId}`, {
    method: "PATCH",
    body: JSON.stringify({ quantity: Number(quantity) }),
  });

  return response.status === 200;
};

export const removeCartItem = async (cartItemId: number) => {
  const response = await fetch(`/cart-items/${cartItemId}`, {
    method: "DELETE",
  });

  return response.status === 204;
};
