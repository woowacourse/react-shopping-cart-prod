import { ORDERS_LOCAL_STORAGE_KEY } from '../constants/localStorage';
import { OrderCartItemsData, OrderData, OrderedItemData } from '../types';
import { getFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';
import { getCartData } from './cart';

const getOrderListData = () => {
  return getFromLocalStorage<OrderData[]>(ORDERS_LOCAL_STORAGE_KEY) ?? [];
};

const setOrderListData = (newOrderList: OrderData[]) => {
  saveToLocalStorage(ORDERS_LOCAL_STORAGE_KEY, newOrderList);
};

const getTotalOrderPrice = (orderedItems: OrderedItemData[]) => {
  const totalPrice = orderedItems.reduce((acc, orderedItem) => {
    return acc + orderedItem.quantity * orderedItem.product.price;
  }, 0);

  return totalPrice;
};

const getDiscountedTotalPrice = (orderedItems: OrderedItemData[]) => {
  const discountedTotalPrice = orderedItems.reduce((acc, orderedItems) => {
    if (orderedItems.product.discountRate > 0) {
      return acc + orderedItems.quantity * orderedItems.product.discountedPrice;
    }

    // if (member.rank > '일반') acc + (orderedItems.quantity * orderedItems.product) * member.discountRate / 100

    return acc + orderedItems.quantity * orderedItems.product.price;
  }, 0);

  return discountedTotalPrice;
};

const addOrder = (orderList: OrderData[], orderedCartItems: OrderCartItemsData[]) => {
  const currentCartData = getCartData();

  const newOrderId = Number(new Date());
  const orderedItems = orderedCartItems.map((orderedCartItem) => {
    const cartItemData = currentCartData.find(
      (cartItem) => orderedCartItem.cartItemId === cartItem.id
    )!;
    const { id: cartItemId, ...orderedItem } = cartItemData;

    return orderedItem;
  });
  const totalPrice = getTotalOrderPrice(orderedItems);
  const discountedTotalPrice = getDiscountedTotalPrice(orderedItems);

  const order = {
    id: newOrderId,
    orderedItems,
    createdAt: new Date(),
    totalPrice,
    discountedTotalPrice,
  };

  return [...orderList, order];
};

export { getOrderListData, setOrderListData, addOrder };
