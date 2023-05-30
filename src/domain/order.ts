import { SHIPPING_FEE, SHIPPING_FEE_EXEMPTION_CONDITION } from '../constants';
import { ORDERS_LOCAL_STORAGE_KEY } from '../constants/localStorage';
import { MemberInformation } from '../types/member';
import { OrderCartItemsData, OrderData, OrderedItemData } from '../types/order';
import { getFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';
import { getCartData } from './cart';
import { getMemberData } from './member';

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

const getDiscountedTotalPrice = (
  orderedItems: OrderedItemData[],
  memberInformation: MemberInformation
) => {
  const discountedTotalPrice = orderedItems.reduce((acc, orderedItems) => {
    if (orderedItems.product.discountRate > 0) {
      return acc + orderedItems.quantity * orderedItems.product.discountedPrice;
    }

    if (memberInformation.rank !== '일반') {
      return (
        acc +
        orderedItems.quantity *
          orderedItems.product.price *
          (1 - memberInformation.discountRate / 100)
      );
    }

    return acc + orderedItems.quantity * orderedItems.product.price;
  }, 0);

  return discountedTotalPrice;
};

const getShippingFee = (discountedTotalItemPrice: number) => {
  return discountedTotalItemPrice > SHIPPING_FEE_EXEMPTION_CONDITION ? 0 : SHIPPING_FEE;
};

const addOrder = (orderList: OrderData[], orderedCartItems: OrderCartItemsData[]): OrderData[] => {
  const currentCartData = getCartData();
  const memberInformation = getMemberData();

  const newOrderId = Number(new Date());
  const orderedItems = orderedCartItems.map((orderedCartItem) => {
    const cartItemData = currentCartData.find(
      (cartItem) => orderedCartItem.cartItemId === cartItem.id
    )!;
    const { id: cartItemId, ...orderedItem } = cartItemData;

    return orderedItem;
  });
  const totalItemPrice = getTotalOrderPrice(orderedItems);
  const discountedTotalItemPrice = getDiscountedTotalPrice(orderedItems, memberInformation);
  const shippingFee = getShippingFee(discountedTotalItemPrice);

  const order = {
    id: newOrderId,
    orderedItems,
    orderedAt: new Date(),
    totalItemPrice,
    discountedTotalItemPrice,
    shippingFee,
    totalPrice: discountedTotalItemPrice + shippingFee,
  };

  return [...orderList, order];
};

export { getOrderListData, setOrderListData, getDiscountedTotalPrice, addOrder };
