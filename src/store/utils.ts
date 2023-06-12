import { SHIPPING_FEE, SHIPPING_FEE_FREE_MINIMUM_PRICE } from '../constants';
import { getMember } from '../domain/member';
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
  const member = getMember();
  const discountRate = member.discountRate;

  return orderedItemList.reduce((prev, curr) => {
    if (!(curr.product.discountRate > 0)) {
      return prev + curr.product.price * (discountRate / 100);
    }
    return prev;
  }, 0);
};

const getTotalItemPrice = (orderedItemList: CartItemData[]) => {
  return orderedItemList.reduce((prev, curr) => {
    return prev + curr.quantity * curr.product.price;
  }, 0);
};

const getDiscountedTotalItemPrice = (orderedItemList: CartItemData[]) => {
  return (
    getTotalItemPrice(orderedItemList) -
    getTotalItemDiscountAmount(orderedItemList) -
    getTotalMemberDiscountAmount(orderedItemList)
  );
};

const getShippingFee = (orderedItemList: CartItemData[]) => {
  if (getDiscountedTotalItemPrice(orderedItemList) === 0) return 0;

  return getDiscountedTotalItemPrice(orderedItemList) >= SHIPPING_FEE_FREE_MINIMUM_PRICE
    ? 0
    : SHIPPING_FEE;
};

const getTotalPrice = (orderedItemList: CartItemData[]) => {
  return getDiscountedTotalItemPrice(orderedItemList) + getShippingFee(orderedItemList);
};

export const getCartPriceInformation = (orderedItemList: CartItemData[]): CartPriceData => ({
  totalItemDiscountAmount: getTotalItemDiscountAmount(orderedItemList),
  totalMemberDiscountAmount: getTotalMemberDiscountAmount(orderedItemList),
  totalItemPrice: getTotalItemPrice(orderedItemList),
  discountedTotalItemPrice: getDiscountedTotalItemPrice(orderedItemList),
  shippingFee: getShippingFee(orderedItemList),
  totalPrice: getTotalPrice(orderedItemList),
});
