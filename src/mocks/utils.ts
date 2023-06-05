import { getMember } from '../domain/member';
import { CartItemData, CartPriceData, OrderedItemData } from '../types';

export const getTotalItemDiscountAmount = (orderedItemList: OrderedItemData[]) => {
  return orderedItemList.reduce((prev, curr) => {
    if (curr.discountRate > 0) {
      return prev + curr.quantity * (curr.price * (curr.discountRate / 100));
    }
    return prev;
  }, 0);
};

export const getTotalMemberDiscountAmount = (orderedItemList: OrderedItemData[]) => {
  const member = getMember();
  const discountRate = member.discountRate;

  return orderedItemList.reduce((prev, curr) => {
    if (!(curr.discountRate > 0)) {
      return prev + curr.price * (discountRate / 100);
    }
    return prev;
  }, 0);
};

export const getTotalItemPrice = (orderedItemList: OrderedItemData[]) => {
  return orderedItemList.reduce((prev, curr) => {
    return prev + curr.quantity * curr.price;
  }, 0);
};

export const getDiscountedTotalItemPrice = (orderedItemList: OrderedItemData[]) => {
  return (
    getTotalItemPrice(orderedItemList) -
    getTotalItemDiscountAmount(orderedItemList) -
    getTotalMemberDiscountAmount(orderedItemList)
  );
};

export const getShippingFee = (orderedItemList: OrderedItemData[]) => {
  if (getDiscountedTotalItemPrice(orderedItemList) === 0) return 0;

  return getDiscountedTotalItemPrice(orderedItemList) >= 50000 ? 0 : 3000;
};

export const getTotalPrice = (orderedItemList: OrderedItemData[]) => {
  return getDiscountedTotalItemPrice(orderedItemList) + getShippingFee(orderedItemList);
};

export const getCartPriceInformation = (orderedItemList: OrderedItemData[]): CartPriceData => {
  return {
    totalItemDiscountAmount: getTotalItemDiscountAmount(orderedItemList),
    totalMemberDiscountAmount: getTotalMemberDiscountAmount(orderedItemList),
    totalItemPrice: getTotalItemPrice(orderedItemList),
    discountedTotalItemPrice: getDiscountedTotalItemPrice(orderedItemList),
    shippingFee: getShippingFee(orderedItemList),
    totalPrice: getTotalPrice(orderedItemList),
  };
};
