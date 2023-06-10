import { useRecoilValue } from 'recoil';
import { useFetchData } from './useFetchData';
import { serverState } from '../store/ServerState';
import { ORDER_BASE_URL } from '../constants/url';
import { checkedItemsState } from '../store/CheckedItemsState';
import { inputPointValueState } from '../store/InputPointValueState';
import { DELIVERY_FEE } from '../constants';

export const useOrder = () => {
  const { api } = useFetchData();
  const serverUrl = useRecoilValue(serverState);
  const checkedItems = useRecoilValue(checkedItemsState);
  const inputPointValue = useRecoilValue(inputPointValueState);

  const orderToItems = () => {
    api.post(
      `${serverUrl}${ORDER_BASE_URL}`,
      { cartIds: checkedItems, point: inputPointValue, deliveryFee: DELIVERY_FEE },
      ORDER_BASE_URL,
    );
  };

  return { orderToItems };
};
