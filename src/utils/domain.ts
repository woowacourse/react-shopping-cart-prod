import { api } from "../api";
import { MIN_QUANTITY } from "../constants";
import { CartItemType, LocalProductType, ProductType } from "../types/domain";

export const makeLocalProducts = async (): Promise<LocalProductType[]> => {
  try {
    const products = await api.get("/products");
    const cartItems = await api.get("/cart-items");

    return products.map((product: ProductType) => {
      const cartItem = cartItems.find(
        (cartItem: CartItemType) => cartItem.product.id === product.id
      );
      return {
        ...product,
        quantity: cartItem ? cartItem.quantity : MIN_QUANTITY,
        cartItemId: cartItem ? cartItem.id : null,
      };
    });
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const makeProducts = async (): Promise<LocalProductType[]> => {
  try {
    const products = await api.get("/products");

    return products.map((product: ProductType) => {
      return {
        ...product,
        quantity: MIN_QUANTITY,
        cartItemId: null,
      };
    });
  } catch (error) {
    console.error(error);
    return [];
  }
};
