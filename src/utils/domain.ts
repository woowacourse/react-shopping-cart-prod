import { fetchCartItems, fetchProducts } from "../api";
import { MIN_QUANTITY } from "../constants";
import { CartItemType, LocalProductType, ProductType } from "../types/domain";

export const makeLocalProducts = async (): Promise<LocalProductType[]> => {
  try {
    const productsResponse = await fetchProducts();
    const cartItemsresponse = await fetchCartItems();
    if (!productsResponse.ok)
      throw new Error(productsResponse.status.toString());
    if (!cartItemsresponse.ok)
      throw new Error(cartItemsresponse.status.toString());

    const products = await productsResponse.json();
    const cartItems = await cartItemsresponse.json();

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
    console.log(error);
    return [];
  }
};

export const makeProducts = async (): Promise<LocalProductType[]> => {
  try {
    const productsResponse = await fetchProducts();

    if (!productsResponse.ok)
      throw new Error(productsResponse.status.toString());

    const products = await productsResponse.json();

    return products.map((product: ProductType) => {
      return {
        ...product,
        quantity: MIN_QUANTITY,
        cartItemId: null,
      };
    });
  } catch (error) {
    console.log(error);
    return [];
  }
};
