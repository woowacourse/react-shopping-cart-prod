import { DISCOUNT_BOUNDARY, DISCOUNT_PERCENT } from '../constants/policy';

const getDiscountAmount = (totalProductAmount: number) => {
  if (totalProductAmount >= DISCOUNT_BOUNDARY)
    return totalProductAmount * (DISCOUNT_PERCENT / 100);
  return 0;
};

export default getDiscountAmount;
