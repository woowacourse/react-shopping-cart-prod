import { NOT_NUMBER_REGEX } from '../constants';

export const validatePointInput = (input: string, totalPrice: number, point: number) => {
  if (Number(input) > point) return true;
  if (Number(input) > totalPrice) return true;
  return !NOT_NUMBER_REGEX.test(input);
};
