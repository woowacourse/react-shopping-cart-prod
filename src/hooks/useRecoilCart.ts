import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import cartState from '@recoil/cart/cartState';
import serverState from '@recoil/server/serverState';
import {
  addItemToCart,
  findCartItemById,
  removeCartItem,
  updateCartItemQuantity,
} from '@utils/cart/cart';
import { getCartPath } from '@constants/serverUrlConstants';
import { CartItemType, ServerCartItemType } from '@type/cartType';
import { ProductItemType } from '@type/productType';
import { useFetch } from './useFetch';

interface UpdateCartListItemQuantityParams {
  cartId: number;
  quantity: number;
}

interface AddCartItemParams {
  cartId: number;
  product: ProductItemType;
}

export const useRecoilCart = () => {
  const serverName = useRecoilValue(serverState);
  const {
    data: originData,
    isLoading,
    error,
  } = useFetch<ServerCartItemType[]>(getCartPath(serverName));
  const [cart, setCart] = useRecoilState<CartItemType[]>(cartState);

  const updateCartListItemQuantity = ({ cartId, quantity }: UpdateCartListItemQuantityParams) => {
    setCart(updateCartItemQuantity({ cart, cartId, quantity }));
  };

  const deleteCartItem = (cartId: number) => {
    setCart(removeCartItem({ cart, cartId }));
  };

  const addCartItem = ({ cartId, product }: AddCartItemParams) => {
    setCart(addItemToCart({ cart, cartId, product }));
  };

  const getCartItemQuantity = (productId: number) => {
    const cartId = findCartItemById({ cart, productId });
    const findCart = cart.find((cartItem) => cartItem.id === cartId);
    const serverCartItemQuantity = findCart ? findCart.quantity : 1;

    return serverCartItemQuantity;
  };

  useEffect(() => {
    if (!originData) return;
    const clientCart: CartItemType[] = originData.map((cartItem) => {
      return {
        id: cartItem.id,
        quantity: cartItem.quantity,
        product: {
          id: cartItem.product.id,
          name: cartItem.product.name,
          price: cartItem.product.price,
          imageUrl: cartItem.product.imageUrl,
        },
        isSelect: true,
      };
    });

    setCart(clientCart);
  }, [originData, setCart]);

  return {
    cart,
    isLoading,
    error,
    updateCartListItemQuantity,
    getCartItemQuantity,
    deleteCartItem,
    addCartItem,
  };
};
