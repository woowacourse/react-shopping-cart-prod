import { ORDERS_LOCAL_STORAGE_KEY } from '../constants/localStorage';
import { OrderCostsData, OrderData, OrderedItemData } from '../types/order';
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

const getOrderedItems = (cartItemIds: number[]): OrderedItemData[] => {
  const currentCartData = getCartData();

  return cartItemIds.map((cartItemId) => {
    const cartItemData = currentCartData.find((cartItem) => cartItemId === cartItem.id)!;
    const orderedItem = {
      quantity: cartItemData.quantity,
      ...cartItemData.product,
    };

    return orderedItem;
  });
};

const addOrder = (
  cartItemIds: number[],
  clientOrderCosts: OrderCostsData,
  orderList: OrderData[]
): OrderData[] | null => {
  const memberInformation = getMemberData();
  const orderedItems = getOrderedItems(cartItemIds);
  const serverOrderCosts = getCosts(orderedItems, memberInformation);
  const isValidOrder = areObjectsEqual(clientOrderCosts, serverOrderCosts);

  if (!isValidOrder) return null;

  const order = {
    id: Number(new Date()),
    orderedItems,
    orderedAt: new Date(),
    ...serverOrderCosts,
  };

  return [...orderList, order];
};

export { getOrderListData, setOrderListData, addOrder };
