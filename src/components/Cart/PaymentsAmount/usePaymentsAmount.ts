import { CartItem } from 'types/domain';

export const usePaymentsAmount = (cartList: CartItem[]) => {
  const totalPrice = cartList
    .filter(item => item.checked)
    .reduce((amount, item) => {
      return amount + item.price * item.quantity;
    }, 0);

  return { totalPrice };
};
