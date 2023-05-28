import { CartItemType, ProductItemType } from 'types/ProductType';

interface CreateCartItemParams {
  cartId: number;
  product: ProductItemType;
}

interface AddItemToCartParams {
  cart: CartItemType[];
  cartId: number;
  product: ProductItemType;
}
interface UpdateCartItemQuantityParams {
  cart: CartItemType[];
  cartId: number;
  quantity: number;
}

interface RemoveCartItemParams {
  cart: CartItemType[];
  cartId: number;
}

export const createCartItem = ({ cartId, product }: CreateCartItemParams): CartItemType => {
  return {
    id: cartId,
    quantity: 1,
    checked: true,
    product,
  };
};

export const addItemToCart = ({ cart, cartId, product }: AddItemToCartParams) => {
  return [...cart, createCartItem({ cartId, product })];
};

export const updateCartItemQuantity = ({
  cart,
  cartId,
  quantity,
}: UpdateCartItemQuantityParams) => {
  return cart.map((cartItem) => {
    if (cartItem.id === cartId) {
      return {
        ...cartItem,
        quantity,
      };
    }

    return cartItem;
  });
};
export const removeCartItem = ({ cart, cartId }: RemoveCartItemParams) => {
  return cart.filter((cartItem) => cartItem.id !== cartId);
};
