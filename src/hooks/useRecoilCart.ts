import { useRecoilState, useRecoilValue } from 'recoil';
import cartState from '@recoil/cart/cartState';
import serverState from '@recoil/server/serverState';
import userState from '@recoil/user/userState';
import {
  addItemToCart,
  cartApiWrapper,
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
  const userInfo = useRecoilValue(userState);
  const serverName = useRecoilValue(serverState);
  const { isLoading, error, fetchData } = useFetch<ServerCartItemType[]>(getCartPath(serverName),userInfo);
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

    if (!findCart) {
      return 1;
    }

    return findCart.quantity;
  };

  const cartFetchData = async () => {
    const originData = await fetchData();

    if (!originData) return;

    const clientCart: CartItemType[] = cartApiWrapper(originData);

    setCart(clientCart);
  };

  return {
    cart,
    isLoading,
    error,
    updateCartListItemQuantity,
    getCartItemQuantity,
    deleteCartItem,
    addCartItem,
    cartFetchData,
  };
};
