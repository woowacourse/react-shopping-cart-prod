import { SHIPPING_FEE, SHIPPING_FEE_EXEMPTION_CONDITION } from '../constants';
import { MEMBER_RANK } from '../constants/member';
import { CartItemData } from '../types/cart';
import { MemberInformation } from '../types/member';
import { OrderedItemData } from '../types/order';

const getTotalItemDiscountAmount = (itemList: (CartItemData | OrderedItemData)[]) => {
  return itemList.reduce((acc, curr) => {
    const price = 'product' in curr ? curr.product.price : curr.price;
    const discountRate = 'product' in curr ? curr.product.discountRate : curr.discountRate;

    if (discountRate > 0) {
      return acc + curr.quantity * price * (discountRate / 100);
    }

    return acc;
  }, 0);
};

const getTotalMemberDiscountAmount = (
  itemList: (CartItemData | OrderedItemData)[],
  memberInformation: MemberInformation
) => {
  return itemList.reduce((acc, curr) => {
    const price = 'product' in curr ? curr.product.price : curr.price;
    const discountRate = 'product' in curr ? curr.product.discountRate : curr.discountRate;

    if (memberInformation.rank === MEMBER_RANK[0] || discountRate > 0) {
      return acc;
    }

    return acc + curr.quantity * price * (memberInformation.discountRate / 100);
  }, 0);
};

const getTotalItemPrice = (itemList: (CartItemData | OrderedItemData)[]) => {
  return itemList.reduce((acc, curr) => {
    const price = 'product' in curr ? curr.product.price : curr.price;

    return acc + curr.quantity * price;
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

const getCosts = (
  itemList: (CartItemData | OrderedItemData)[],
  memberInformation: MemberInformation
) => {
  const totalItemDiscountAmount = getTotalItemDiscountAmount(itemList);
  const totalMemberDiscountAmount = getTotalMemberDiscountAmount(itemList, memberInformation);
  const totalItemPrice = getTotalItemPrice(itemList);
  const discountedTotalItemPrice = getDiscountedTotalItemPrice(
    totalItemDiscountAmount,
    totalMemberDiscountAmount,
    totalItemPrice
  );
  const shippingFee = getShippingFee(discountedTotalItemPrice);
  const totalPrice = discountedTotalItemPrice + shippingFee;

  return {
    totalItemDiscountAmount,
    totalMemberDiscountAmount,
    totalItemPrice,
    discountedTotalItemPrice,
    shippingFee,
    totalPrice,
  };
};

export {
  getTotalItemDiscountAmount,
  getTotalMemberDiscountAmount,
  getTotalItemPrice,
  getDiscountedTotalItemPrice,
  getShippingFee,
  getCosts,
};
