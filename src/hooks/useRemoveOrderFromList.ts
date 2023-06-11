import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ORDER_URL } from '../constants/url';
import { orderListState, serverState } from '../recoil';
import { useFetchData } from './useFetchData';

export const useRemoveOrderFromList = (orderId: number) => {
  const server = useRecoilValue(serverState);
  const { api } = useFetchData();

  const setOrderList = useSetRecoilState(orderListState);

  const handleOrderRemoveFromList = () => {
    api
      .delete(`${server}${ORDER_URL}/${orderId}`)
      .then(() => {
        setOrderList((prev) => prev.filter((list) => list.orderId !== orderId));
      })
      .catch((error) => alert(error.message));
  };

  return handleOrderRemoveFromList;
};
