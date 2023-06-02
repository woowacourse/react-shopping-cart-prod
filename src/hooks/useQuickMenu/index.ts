import { useRecoilState, useSetRecoilState } from 'recoil';

import { OrderItemType, Servers } from '@Types/index';

import useCartItems from '@Hooks/useCartItems';

import { fetchData } from '@Utils/api';

import orderListState from '@Atoms/orderListState';
import serverState from '@Atoms/serverState';

import { FETCH_METHOD, FETCH_URL } from '@Constants/servers';

export const useQuickMenu = () => {
  const { toggleServer } = useCartItems();
  const setOrderItems = useSetRecoilState(orderListState);
  const [server, setServer] = useRecoilState<Servers>(serverState);

  const handleClick = (value: Servers) => async () => {
    setServer(value);
    toggleServer(value);

    const fetchOrderList = await fetchData<OrderItemType[]>({
      url: FETCH_URL.orderList,
      method: FETCH_METHOD.GET,
      server,
    });
    setOrderItems(fetchOrderList);

    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return { handleClick, server };
};
