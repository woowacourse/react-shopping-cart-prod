import { CartItemType, ServerCartItemType } from '@type/cartType';
import { ProductItemType } from '@type/productType';

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
    isSelect: true,
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

export const cartApiWrapper = (cart: ServerCartItemType[]): CartItemType[] => {
  return cart.map((cartItem) => {
    return {
      id: cartItem.id,
      quantity: cartItem.quantity,
      product: cartItem.product,
      isSelect: true,
    };
  });
};
