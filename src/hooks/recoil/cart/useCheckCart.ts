import { useRecoilState, useRecoilValue } from 'recoil';
import cartState from '@recoil/cart/cartState';
import withTotalCheckedCount from '@recoil/cart/selector/withTotalCheckedCount';
import cartTotalPriceState from '@recoil/cart/selector/withTotalPrice';
import { allSelectCartItem, removeSelectedCartItem } from '@utils/cart/cart';

export const useCheckCart = () => {
  const [cart, setCart] = useRecoilState(cartState);
  const checkedCount = useRecoilValue(withTotalCheckedCount);
  const totalCartPrice = useRecoilValue(cartTotalPriceState);

  const isAllChecked = () => {
    return cart.length === checkedCount;
  };

  const toggleAllCartItem = (isCheck: boolean) => {
    const updatedCart = allSelectCartItem({ cart, isCheck });

    setCart(updatedCart);
  };

  const deleteCheckedItems = () => {
    const updatedCart = removeSelectedCartItem(cart);

    setCart(updatedCart);
  };

  return {
    checkedCount,
    totalCartPrice,
    isAllChecked,
    toggleAllCartItem,
    deleteCheckedItems,
  };
};
