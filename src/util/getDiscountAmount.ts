import { DISCOUNT, DISCOUNT_BOUNDARY } from '../constants/policy';

const getDiscountAmount = (totalProductAmount: number) => {
  if (totalProductAmount > DISCOUNT_BOUNDARY.SECOND) return DISCOUNT.OVER_50000;
  if (totalProductAmount > DISCOUNT_BOUNDARY.FIRST) return DISCOUNT.OVER_30000;
  return 0;
};

export default getDiscountAmount;
