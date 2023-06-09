import { useRecoilState, useRecoilValue } from 'recoil';
import cartState from '@recoil/cart/cartState';
import withCartTotalPrice from '@recoil/cart/selector/withCartTotalPrice';
import withTotalCheckedCount from '@recoil/cart/selector/withTotalCheckedCount';
import serverState from '@recoil/server/serverState';
import userState from '@recoil/user/userState';
import { useRecoilCart } from '@hooks/useRecoilCart';
import { allSelectCartItem, cartItemSelectedById, removeSelectedCartItem } from '@utils/cart/cart';
import { removeCartItemApi } from '@utils/cart/fetchCart';

export const useCheckCart = () => {
  const serverName = useRecoilValue(serverState);
  const userInfo = useRecoilValue(userState);
  const [cart, setCart] = useRecoilState(cartState);
  const { cartFetchData } = useRecoilCart();
  const checkedCount = useRecoilValue(withTotalCheckedCount);
  const totalCartPrice = useRecoilValue(withCartTotalPrice);

  const isAllChecked = () => {
    return cart.length === checkedCount;
  };

  const toggleAllCartItem = (isCheck: boolean) => {
    const updatedCart = allSelectCartItem({ cart, isCheck });

    setCart(updatedCart);
  };

  const deleteCheckedItems = async () => {
    const updatedCart = removeSelectedCartItem(cart);

    setCart(updatedCart);

    const selectedCartIds = cartItemSelectedById(cart);

    for (const cartId of selectedCartIds) {
      try {
        await removeCartItemApi({ cartId, serverName, userInfo });
      } catch (error) {
        console.error(error);
        cartFetchData();
      }
    }
  };

  return {
    checkedCount,
    totalCartPrice,
    isAllChecked,
    toggleAllCartItem,
    deleteCheckedItems,
  };
};
