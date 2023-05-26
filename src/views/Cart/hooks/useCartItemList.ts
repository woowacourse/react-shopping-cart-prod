import cartState from '@views/Cart/recoil/cartState';
import { useRecoilState } from 'recoil';
import { CartItemType, ProductItemType } from 'types/ProductType';
import { addItemToCart, removeCartItem, updateCartItemQuantity } from '../utils/cart';

interface UpdateCartListItemQuantityParams {
  cartId: number;
  quantity: number;
}

interface AddCartItemParams {
  cartId: number;
  product: ProductItemType;
}

export const useCartItemList = () => {
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

  return { cart, updateCartListItemQuantity, deleteCartItem, addCartItem };
};
