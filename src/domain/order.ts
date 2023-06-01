import { ORDER_LIST_LOCAL_STORAGE_KEY } from '../constants/localStorage';
import { OrderData } from '../types';
import { getFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';

export const getOrderListData = () => {
  return getFromLocalStorage<OrderData[]>(ORDER_LIST_LOCAL_STORAGE_KEY) ?? [];
};

export const setOrderListData = (newOrderListData: OrderData[]) => {
  saveToLocalStorage(ORDER_LIST_LOCAL_STORAGE_KEY, newOrderListData);
};
