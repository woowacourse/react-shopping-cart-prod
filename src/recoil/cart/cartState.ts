import { useCallback, useMemo } from 'react';
import {
  atom,
  selector,
  useRecoilRefresher_UNSTABLE,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import serverState from '@recoil/server/serverState';
import { cartApiWrapper } from '@utils/cart/cart';
import { fetchGet } from '@utils/fetchUtils';
import { getCartPath } from '@constants/serverUrlConstants';
import { CartItemType } from '@type/cartType';

export const CartItemQuery = selector<CartItemType[]>({
  key: 'cartListWithInfoState/default',
  get: async ({ get }) => {
    const server = get(serverState);
    const cart: CartItemType[] = await fetchGet<CartItemType[]>(getCartPath(server));

    if (!cart) {
      throw new Error('리코일에서 장바구니 목록을 불러올 수 없습니다.');
    }

    return cartApiWrapper(cart);
  },
});

const cartState = atom<CartItemType[]>({
  key: 'cartListWithInfoState',
  default: CartItemQuery,
});

export default cartState;

export const useRefreshCartList = () => useRecoilRefresher_UNSTABLE(cartState);

export const useCartList = () => useRecoilValue(cartState);

export const useCheckCart = () => {
  const [cart, setCart] = useRecoilState(cartState);

  const toggleMap = useMemo<{ [id: number]: boolean }>(() => {
    return cart.reduce((acc, { product, isSelect }) => {
      const { id } = product;
      Object.assign(acc, { [id]: isSelect });
      return acc;
    }, {});
  }, [cart]);

  const isAllChecked = cart.every((cartItem) => cartItem.isSelect);

  const checkedCount = Object.values(toggleMap).reduce((acc, cur) => {
    if (cur) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);

  const isCheckedById = useCallback((id: number) => toggleMap[id], [toggleMap]);

  const toggleAllCartItem = useCallback(() => {
    setCart((prevCart) => {
      return prevCart.map((item) => ({ ...item, checked: !isAllChecked }));
    });
  }, [isAllChecked, setCart]);

  const deleteCheckedItems = () => {
    setCart(cart.filter((item) => item.isSelect === false));

    // 이 부분 확인 필요
  };

  return {
    isAllChecked,
    checkedCount,
    isCheckedById,
    toggleAllCartItem,
    deleteCheckedItems,
  };
};
