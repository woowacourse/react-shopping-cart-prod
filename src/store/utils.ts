import { CartItemData, CartPriceData } from '../types';

const getTotalItemDiscountAmount = (orderedItemList: CartItemData[]) => {
  return orderedItemList.reduce((prev, curr) => {
    if (curr.product.discountRate > 0) {
      return prev + curr.quantity * (curr.product.price * (curr.product.discountRate / 100));
    }
    return prev;
  }, 0);
};

const getTotalMemberDiscountAmount = (orderedItemList: CartItemData[]) => {
  return (
    getTotalItemPrice(orderedItemList) -
    getDiscountedTotalItemPrice(orderedItemList) -
    getTotalItemDiscountAmount(orderedItemList)
  );
};

const getTotalItemPrice = (orderedItemList: CartItemData[]) => {
  return orderedItemList.reduce((prev, curr) => {
    return prev + curr.quantity * curr.product.price;
  }, 0);
};

const getDiscountedTotalItemPrice = (orderedItemList: CartItemData[]) => {
  return orderedItemList.reduce((prev, curr) => {
    return prev + +curr.quantity * curr.product.discountedPrice;
  }, 0);
};

const getShippingFee = (orderedItemList: CartItemData[]) => {
  if (getDiscountedTotalItemPrice(orderedItemList) === 0) return 0;

  return getDiscountedTotalItemPrice(orderedItemList) >= 50000 ? 0 : 3000;
};

const getTotalPrice = (orderedItemList: CartItemData[]) => {
  return getDiscountedTotalItemPrice(orderedItemList) + getShippingFee(orderedItemList);
};

export const getCartPriceInformation = (orderedItemList: CartItemData[]): CartPriceData => {
  return {
    totalItemDiscountAmount: getTotalItemDiscountAmount(orderedItemList),
    totalMemberDiscountAmount: getTotalMemberDiscountAmount(orderedItemList),
    totalItemPrice: getTotalItemPrice(orderedItemList),
    discountedTotalItemPrice: getDiscountedTotalItemPrice(orderedItemList),
    shippingFee: getShippingFee(orderedItemList),
    totalPrice: getTotalPrice(orderedItemList),
  };
};
