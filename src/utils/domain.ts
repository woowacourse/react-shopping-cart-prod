import { fetchCartItems } from "../api";
import { MIN_QUANTITY } from "../constants";
import { CartItemType, LocalProductType, ProductType } from "../types/domain";

export const makeLocalProducts = async (
  products: ProductType[],
  serverOwner: string
): Promise<LocalProductType[]> => {
  try {
    const response = await fetchCartItems(serverOwner);
    if (!response.ok) throw new Error(response.status.toString());

    const cartItems = await response.json();

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
    console.log("^^");
    console.log(error);
    return [];
  }
};
