import { useRecoilValue } from 'recoil';
import { useFetchData } from './useFetchData';
import { serverState } from '../store/ServerState';
import { ORDER_BASE_URL } from '../constants/url';
import { checkedItemsState } from '../store/CheckedItemsState';

export const useOrder = () => {
  const { api } = useFetchData();
  const serverUrl = useRecoilValue(serverState);
  const checkedItems = useRecoilValue(checkedItemsState);
  // const inputPointValue = useRecoilValue(inputPointValueState); 서버 완료되면 point 바꿔야함

  const orderToItems = () => {
    api.post(`${serverUrl}${ORDER_BASE_URL}`, { cartIds: checkedItems, point: 0 }, ORDER_BASE_URL);
  };

  return { orderToItems };
};
