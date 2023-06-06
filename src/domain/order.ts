import { ORDERS_LOCAL_STORAGE_KEY } from '../constants/localStorage';
import type { OrderCostsData, OrderData, OrderedItemData } from '../types/order';
import type { OrderCartItemsData } from '../types/order';
import { getCosts } from '../utils/costs';
import { getFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';
import { areObjectsEqual } from '../utils/validator';
import { getCartData } from './cart';
import { getMemberData } from './member';

const getOrderListData = () => {
  return getFromLocalStorage<OrderData[]>(ORDERS_LOCAL_STORAGE_KEY) ?? [];
};

const setOrderListData = (newOrderList: OrderData[]) => {
  saveToLocalStorage(ORDERS_LOCAL_STORAGE_KEY, newOrderList);
};

const getOrderedItems = (cartItemIds: OrderCartItemsData['cartItemIds']): OrderedItemData[] => {
  const currentCartData = getCartData();

  return cartItemIds.map((cartItemId) => {
    const cartItemData = currentCartData.find((cartItem) => cartItemId === cartItem.id)!;

    return {
      quantity: cartItemData.quantity,
      ...cartItemData.product,
    };
  });
};

const addOrder = (
  cartItemIds: OrderCartItemsData['cartItemIds'],
  clientOrderCosts: OrderCostsData,
  orderList: OrderData[]
): OrderData[] | null => {
  const memberInformation = getMemberData();
  const orderedItems = getOrderedItems(cartItemIds);
  const serverOrderCosts = getCosts(orderedItems, memberInformation);
  const isValidOrder = areObjectsEqual(clientOrderCosts, serverOrderCosts);

  if (!isValidOrder) return null;

  const newOrder = {
    id: Number(new Date()),
    orderedItems,
    orderedAt: new Date(),
    ...serverOrderCosts,
  };

  return [...orderList, newOrder];
};

export { getOrderListData, setOrderListData, addOrder };
