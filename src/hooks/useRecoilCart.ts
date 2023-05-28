import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import cartState from '@recoil/cart/cartState';
import serverState from '@recoil/server/serverState';
import { addItemToCart, removeCartItem, updateCartItemQuantity } from '@utils/cart/cart';
import { getCartPath } from '@constants/urlConstants';
import { CartItemType, ProductItemType } from '@type/ProductType';
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
  const { data: originData, isLoading, error } = useFetch<CartItemType[]>(getCartPath(serverName));
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
        checked: true,
      };
    });

    setCart(clientCart);
  }, [originData]);

  return {
    cart,
    isLoading,
    error,
    updateCartListItemQuantity,
    deleteCartItem,
    addCartItem,
  };
};
