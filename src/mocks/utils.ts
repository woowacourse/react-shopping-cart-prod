import { OrderedItem } from '../types';

export const getTotalItemDiscountAmount = (orderedItemList: OrderedItem[]) => {
  return orderedItemList.reduce((prev, curr) => {
    if (curr.product.discountRate > 0) {
      return prev + curr.quantity * (curr.product.price * (curr.product.discountRate / 100));
    }
    return prev;
  }, 0);
};

export const getTotalMemberDiscountAmount = (orderedItemList: OrderedItem[]) => {
  return (
    getTotalItemPrice(orderedItemList) -
    getDiscountedTotalItemPrice(orderedItemList) -
    getTotalItemDiscountAmount(orderedItemList)
  );
};

export const getTotalItemPrice = (orderedItemList: OrderedItem[]) => {
  return orderedItemList.reduce((prev, curr) => {
    return prev + curr.product.price;
  }, 0);
};

export const getDiscountedTotalItemPrice = (orderedItemList: OrderedItem[]) => {
  return orderedItemList.reduce((prev, curr) => {
    return prev + curr.product.discountedPrice;
  }, 0);
};

export const getShippingFee = (orderedItemList: OrderedItem[]) => {
  return getDiscountedTotalItemPrice(orderedItemList) >= 50000 ? 0 : 3000;
};

export const getTotalPrice = (orderedItemList: OrderedItem[]) => {
  return getDiscountedTotalItemPrice(orderedItemList) + getShippingFee(orderedItemList);
};
