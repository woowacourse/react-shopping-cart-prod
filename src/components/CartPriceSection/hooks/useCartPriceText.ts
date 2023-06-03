import { useRecoilValue } from 'recoil';
import { BASE_SHIPPING_FEE, SHIPPING_FEE_THRESHOLD } from 'constants/policy';
import useCartCheckBox from 'hooks/useCartCheckBox';
import { checkedCartProductsTotalPriceState } from 'state/cartProducts';

const useCartPriceText = () => {
  const { checkedCartProductIds } = useCartCheckBox();
  const cartTotalPrice = useRecoilValue(checkedCartProductsTotalPriceState);

  const isCheckedProductsExist = checkedCartProductIds.size > 0;
  const shippingFee = cartTotalPrice < SHIPPING_FEE_THRESHOLD ? BASE_SHIPPING_FEE : 0;
  const paymentAmount = cartTotalPrice + shippingFee;

  const productTotalPriceText = `${cartTotalPrice.toLocaleString('ko-KR')}원`;
  const shippingFeeText = isCheckedProductsExist ? `${shippingFee.toLocaleString('ko-KR')}원` : '0원';
  const paymentAmountText = isCheckedProductsExist ? `${paymentAmount.toLocaleString('ko-KR')}원` : '0원';
  const orderConfirmButtonText = isCheckedProductsExist
    ? `총 ${checkedCartProductIds.size}건 주문하기(${paymentAmount.toLocaleString('ko-KR')}원)`
    : '주문하기';

  return { productTotalPriceText, shippingFeeText, paymentAmountText, orderConfirmButtonText };
};

export default useCartPriceText;
