import { useRecoilState, useRecoilValue } from 'recoil';

import { CartItemType } from '@Types/index';

import { fetchData } from '@Utils/api';

import cartItemsState from '@Atoms/cartItemsState';
import serverState from '@Atoms/serverState';

import { FETCH_METHOD, FETCH_URL } from '@Constants/servers';

const useOrderItems = () => {
  const server = useRecoilValue(serverState);
  const [cartItems, setCartItems] = useRecoilState<CartItemType[]>(cartItemsState);

  const orderCartItems = async (totalOrderPrice: string) => {
    const selectedCartItems = cartItems.filter((cartItem) => cartItem.isSelected).map((cartItem) => cartItem.id);

    if (!selectedCartItems.length) return alert('선택된 상품이 없습니다.');

    const price = Number(totalOrderPrice.replace(/,|원|\s/g, ''));
    const body = JSON.stringify({
      id: selectedCartItems,
      price,
    });

    await fetchData<{ ok: boolean }>({ url: FETCH_URL.orders, method: FETCH_METHOD.POST, body, server });
    setCartItems(cartItems.filter((cartItem) => !cartItem.isSelected));
  };

  return { orderCartItems };
};

export default useOrderItems;
