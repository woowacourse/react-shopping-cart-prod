import { productApiWrapper } from '@utils/productList/productList';
import { CartItemType, ServerCartItemType } from '@type/cartType';
import { ProductItemType } from '@type/productType';

interface CreateCartItemParams {
  cartId: number;
  product: ProductItemType;
}

export const createCartItem = ({ cartId, product }: CreateCartItemParams): CartItemType => {
  return {
    id: cartId,
    quantity: 1,
    isSelect: true,
    product,
  };
};

interface AddItemToCartParams {
  cart: CartItemType[];
  cartId: number;
  product: ProductItemType;
}

export const addItemToCart = ({ cart, cartId, product }: AddItemToCartParams) => {
  return [...cart, createCartItem({ cartId, product })];
};

interface UpdateCartItemQuantityParams {
  cart: CartItemType[];
  cartId: number;
  quantity: number;
}

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

interface RemoveCartItemParams {
  cart: CartItemType[];
  cartId: number;
}

export const removeCartItem = ({ cart, cartId }: RemoveCartItemParams) => {
  return cart.filter((cartItem) => cartItem.id !== cartId);
};

export const cartApiWrapper = (cart: ServerCartItemType[]): CartItemType[] => {
  return cart.map((cartItem) => {
    return {
      id: cartItem.id,
      quantity: cartItem.quantity,
      product: productApiWrapper(cartItem.product),
      isSelect: true,
    };
  });
};

interface toggleSelectCartItemParams {
  cart: CartItemType[];
  cartId: number;
}

export const toggleSelectCartItem = ({ cart, cartId }: toggleSelectCartItemParams) => {
  return cart.map((cartItem) => {
    if (cartItem.id === cartId) {
      return { ...cartItem, isSelect: !cartItem.isSelect };
    }

    return cartItem;
  });
};

interface AllSelectCartItemParams {
  cart: CartItemType[];
  isCheck: boolean;
}

export const allSelectCartItem = ({ cart, isCheck }: AllSelectCartItemParams) => {
  return cart.map((cartItem) => {
    return { ...cartItem, isSelect: isCheck };
  });
};

export const calculateSelectCartTotalPrice = (cart: CartItemType[]) => {
  return cart.reduce((accumulator, currentValue) => {
    if (currentValue.isSelect) {
      return accumulator + currentValue.quantity * currentValue.product.price;
    }

    return accumulator;
  }, 0);
};

export const cartItemSelectedById = (cart: CartItemType[]) => {
  return cart.filter((cartItem) => cartItem.isSelect === true).map((cartItem) => cartItem.id);
};

export const removeSelectedCartItem = (cart: CartItemType[]) => {
  return cart.filter((cartItem) => cartItem.isSelect === false);
};
