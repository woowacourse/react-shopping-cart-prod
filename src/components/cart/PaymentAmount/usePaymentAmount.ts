import { useRecoilValue } from 'recoil';
import { useCheckedCartListValue } from '../../../provider/CheckedListProvider';
import cartState from '../../../globalState/atoms/cartState';

const usePaymentAmount = () => {
  const cartList = useRecoilValue(cartState);
  const { checkedCartList } = useCheckedCartListValue();

  const paymentAmount = cartList
    .filter((cartItem) => checkedCartList.includes(cartItem.id))
    .reduce((acc, cartItem) => acc + cartItem.product.price * cartItem.quantity, 0);

  const deliveryFee = checkedCartList.length ? 3000 : 0;

  return { paymentAmount, deliveryFee };
};

export default usePaymentAmount;
