import { FREE_SHIPPING_FEE, SHIPPING_FEE } from 'components/OrderPriceSection/OrderPriceSection';
import { useRecoilValue } from 'recoil';
import { checkedCartProductsTotalPrice } from 'state/cartProducts';
import { pointUsageState } from 'state/pointUsageState';
import { CheckedCartProducts } from 'types/product';

const useOrderPriceSection = (checkedProducts: CheckedCartProducts) => {
  const point = useRecoilValue(pointUsageState);
  const cartTotalPrice = useRecoilValue(checkedCartProductsTotalPrice(checkedProducts));
  const isShippingFeeFree = cartTotalPrice >= FREE_SHIPPING_FEE;
  const isCheckedProductsExist = checkedProducts.size > 0;

  const cartTotalPriceWithFee = cartTotalPrice + (isCheckedProductsExist ? SHIPPING_FEE : 0);

  const generateText = (value: number) => (value >= 0 ? `${value.toLocaleString('ko-KR')}원` : `-${Math.abs(value).toLocaleString('ko-KR')}원`);

  const totalDiscountPrice = isShippingFeeFree ? point.appliedPoint + SHIPPING_FEE : point.appliedPoint;

  const cartTotalPriceWithDiscount = cartTotalPriceWithFee - totalDiscountPrice;
  const savePoint = Math.floor(cartTotalPriceWithDiscount * 0.01);

  const productTotalPriceText = generateText(cartTotalPrice);
  const shippingFeeText = generateText(isCheckedProductsExist ? SHIPPING_FEE : 0);
  const discountShippingFee = generateText(-SHIPPING_FEE);
  const totalDiscountPriceText = generateText(-totalDiscountPrice);
  const cartTotalPriceText = generateText(cartTotalPriceWithDiscount);
  const savePointText = `+${savePoint.toLocaleString('ko-KR')}원`;

  const isDiscounted = point.appliedPoint > 0 || isShippingFeeFree;

  const orderConfirmButtonText = isCheckedProductsExist
    ? `총 ${checkedProducts.size}건 주문하기(${generateText(cartTotalPriceWithDiscount)})`
    : '주문하기';

  return {
    point,
    isShippingFeeFree,
    isCheckedProductsExist,
    productTotalPriceText,
    shippingFeeText,
    discountShippingFee,
    totalDiscountPriceText,
    cartTotalPriceText,
    savePointText,
    isDiscounted,
    orderConfirmButtonText,
  };
};

export default useOrderPriceSection;
