import { BASE_SHIPPING_FEE, PERCENTAGE_OF_EARN_POINTS, SHIPPING_FEE_THRESHOLD } from 'constants/policy';
import useCartCheckBox from 'hooks/useCartCheckBox';
import { useCheckOutPointCostValueContext } from 'hooks/useContext/useCheckOutPointCostContext';
import { useRecoilValue } from 'recoil';
import { checkedCartProductsTotalPriceState } from 'state/cartProducts';

const useCheckOutPriceText = () => {
  const { checkedCartProductIds } = useCartCheckBox();
  const { pointCost } = useCheckOutPointCostValueContext();
  const cartTotalPrice = useRecoilValue(checkedCartProductsTotalPriceState);

  const isCheckedProductsExist = checkedCartProductIds.size > 0;
  const shippingFee = cartTotalPrice < SHIPPING_FEE_THRESHOLD ? BASE_SHIPPING_FEE : 0;
  const paymentAmount = cartTotalPrice + shippingFee - pointCost;
  const earnPoints = Math.ceil(paymentAmount / PERCENTAGE_OF_EARN_POINTS);

  const productTotalPriceText = `${cartTotalPrice.toLocaleString('ko-KR')}원`;
  const shippingFeeText = isCheckedProductsExist ? `${shippingFee.toLocaleString('ko-KR')}원` : '0원';
  const usedPointsText = pointCost > 0 ? `-${pointCost.toLocaleString('ko-KR')}원` : '0원';
  const paymentAmountText = isCheckedProductsExist ? `${paymentAmount.toLocaleString('ko-KR')}원` : '0원';
  const orderConfirmButtonText = isCheckedProductsExist
    ? `총 ${checkedCartProductIds.size}건 주문하기(${paymentAmount.toLocaleString('ko-KR')}원)`
    : '주문하기';
  const earnPointsText = isCheckedProductsExist ? `${earnPoints.toLocaleString('ko-KR')}P 적립 예정` : '';

  return {
    productTotalPriceText,
    shippingFeeText,
    usedPointsText,
    paymentAmountText,
    orderConfirmButtonText,
    earnPointsText,
  };
};

export default useCheckOutPriceText;
