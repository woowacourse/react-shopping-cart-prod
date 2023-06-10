import useCartService from '../../../hooks/useCartService';
import { useCheckedCartListValue } from '../../../provider/CheckedListProvider';

const usePaymentAmount = () => {
  const { cartList } = useCartService();
  const { checkedCartIdList } = useCheckedCartListValue();

  const paymentAmount = cartList
    .filter((cartItem) => checkedCartIdList.includes(cartItem.id))
    .reduce(
      (acc, cartItem) => acc + cartItem.product.price * cartItem.quantity,
      0,
    );

  const getDeliveryFee = () => {
    if (!checkedCartIdList.length) {
      return 0;
    }

    return 3000;
  };

  return { paymentAmount, getDeliveryFee };
};

export default usePaymentAmount;
