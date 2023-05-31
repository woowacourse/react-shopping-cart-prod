import { ORDERS_LOCAL_STORAGE_KEY } from '../constants/localStorage';
import { OrderData } from '../types/order';
import {
  getDiscountedTotalItemPrice,
  getShippingFee,
  getTotalItemDiscountAmount,
  getTotalItemPrice,
  getTotalMemberDiscountAmount,
} from '../utils/costs';
import { getFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';
import { getCartData } from './cart';
import { getMemberData } from './member';

const getOrderListData = () => {
  return getFromLocalStorage<OrderData[]>(ORDERS_LOCAL_STORAGE_KEY) ?? [];
};

const setOrderListData = (newOrderList: OrderData[]) => {
  saveToLocalStorage(ORDERS_LOCAL_STORAGE_KEY, newOrderList);
};

const addOrder = (orderList: OrderData[], cartItemIds: number[]): OrderData[] => {
  const currentCartData = getCartData();
  const memberInformation = getMemberData();

  const newOrderId = Number(new Date());
  const orderedItems = cartItemIds.map((cartItemId) => {
    const cartItemData = currentCartData.find((cartItem) => cartItemId === cartItem.id)!;
    const { id, ...orderedItem } = cartItemData;

    return orderedItem;
  });

  const totalItemDiscountAmount = getTotalItemDiscountAmount(orderedItems);
  const totalMemberDiscountAmount = getTotalMemberDiscountAmount(orderedItems, memberInformation);
  const totalItemPrice = getTotalItemPrice(orderedItems);
  const discountedTotalItemPrice = getDiscountedTotalItemPrice(
    totalItemDiscountAmount,
    totalMemberDiscountAmount,
    totalItemPrice
  );
  const shippingFee = getShippingFee(discountedTotalItemPrice);

  const order = {
    id: newOrderId,
    orderedItems,
    orderedAt: new Date(),
    totalItemDiscountAmount,
    totalMemberDiscountAmount,
    totalItemPrice,
    discountedTotalItemPrice,
    shippingFee,
    totalPrice: discountedTotalItemPrice + shippingFee,
  };

  return [...orderList, order];
};

export { getOrderListData, setOrderListData, addOrder };
