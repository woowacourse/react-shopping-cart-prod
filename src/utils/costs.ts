import { SHIPPING_FEE, SHIPPING_FEE_EXEMPTION_CONDITION } from '../constants';
import { MEMBER_RANK } from '../constants/member';
import { CartItemData } from '../types/cart';
import { MemberInformation } from '../types/member';
import { OrderedItemData } from '../types/order';

const getTotalItemDiscountAmount = (itemList: (CartItemData | OrderedItemData)[]) => {
  return itemList.reduce((acc, curr) => {
    if (curr.product.discountRate > 0) {
      return acc + curr.quantity * curr.product.price * (curr.product.discountRate / 100);
    }

    return acc;
  }, 0);
};

const getTotalMemberDiscountAmount = (
  itemList: (CartItemData | OrderedItemData)[],
  memberInformation: MemberInformation
) => {
  return itemList.reduce((acc, curr) => {
    if (memberInformation.rank === MEMBER_RANK[0] || curr.product.discountRate > 0) {
      return acc;
    }

    return acc + curr.quantity * curr.product.price * (memberInformation.discountRate / 100);
  }, 0);
};

const getTotalItemPrice = (itemList: (CartItemData | OrderedItemData)[]) => {
  return itemList.reduce((acc, curr) => {
    return acc + curr.quantity * curr.product.price;
  }, 0);
};

const getDiscountedTotalItemPrice = (
  totalItemDiscountAmount: number,
  totalMemberDiscountAmount: number,
  totalItemPrice: number
) => {
  return totalItemPrice - totalItemDiscountAmount - totalMemberDiscountAmount;
};

const getShippingFee = (discountedTotalItemPrice: number) => {
  return discountedTotalItemPrice > SHIPPING_FEE_EXEMPTION_CONDITION ? 0 : SHIPPING_FEE;
};

export {
  getTotalItemDiscountAmount,
  getTotalMemberDiscountAmount,
  getTotalItemPrice,
  getDiscountedTotalItemPrice,
  getShippingFee,
};
