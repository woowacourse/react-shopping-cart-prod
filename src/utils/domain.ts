import { fetchCartItems } from "../api";
import { MIN_QUANTITY } from "../constants";
import { CartItemType, LocalProductType, ProductType } from "../types/domain";

export const makeLocalProducts = async (products: ProductType[]) => {
  const cartItems = await fetchCartItems();

  return products.map((product: ProductType): LocalProductType => {
    const cartItem = cartItems.find(
      (cartItem: CartItemType) => cartItem.id === product.id
    );
    return {
      ...product,
      quantity: cartItem ? cartItem.quantity : MIN_QUANTITY,
      cartItemId: cartItem.id,
    };
  });
};
