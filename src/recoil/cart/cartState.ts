import { useCallback, useMemo } from 'react';
import {
  atom,
  selector,
  useRecoilRefresher_UNSTABLE,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import serverState from '@recoil/server/serverState';
import { fetchGet } from '@utils/fetchUtils';
import { getCartPath } from '@constants/urlConstants';
import type { CartItemType } from '@type/ProductType';

export const CartItemQuery = selector({
  key: 'cartListWithInfoState/default',
  get: async ({ get }) => {
    const server = get(serverState);
    const cartProducts: CartItemType[] | null = await fetchGet(getCartPath(server));

    if (!cartProducts) {
      throw new Error('리코일에서 장바구니 목록을 불러올 수 없습니다.');
    }

    return cartProducts.map((cartProduct) => {
      cartProduct.checked = true;
      return cartProduct;
    });
  },
});

const cartState = atom<CartItemType[]>({
  key: 'cartListWithInfoState',
  default: [],
});

export default cartState;

export const useRefreshCartList = () => useRecoilRefresher_UNSTABLE(cartState);

export const useCartList = () => useRecoilValue(cartState);

export const useCheckCart = () => {
  const [cart, setCart] = useRecoilState(cartState);

  const toggleMap = useMemo<{ [id: number]: boolean }>(() => {
    return cart.reduce((acc, { product, checked }) => {
      const { id } = product;
      Object.assign(acc, { [id]: checked });
      return acc;
    }, {});
  }, [cart]);

  const isAllChecked = cart.every((cartItem) => cartItem.checked);

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
    setCart(cart.filter((item) => item.checked === false));

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
