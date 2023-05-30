import { useRecoilValue } from 'recoil';
import {
  cartPriceSelector,
  finalPriceSelector,
} from '../../../recoil/selectors';
import { formatPrice } from '../../../utils/formatPrice';

interface PurchaseVerdict {
  isPurchasePossible: boolean;
  buttonMessage: string;
}

const usePurchaseChecker = () => {
  const cartPrice = useRecoilValue(cartPriceSelector);
  const finalPrice = useRecoilValue(finalPriceSelector);

  const checkPurchasePossible = (): PurchaseVerdict => {
    if (cartPrice <= 0) {
      return {
        isPurchasePossible: false,
        buttonMessage: '장바구니에 상품을 담아주세요',
      };
    }

    if (finalPrice < 0) {
      return {
        isPurchasePossible: false,
        buttonMessage: '결제 금액 이하의 포인트를 사용해주세요',
      };
    }

    return {
      isPurchasePossible: true,
      buttonMessage: `주문하기 (총 ${formatPrice(finalPrice)})`,
    };
  };

  const { isPurchasePossible, buttonMessage } = checkPurchasePossible();

  return {
    cartPrice: formatPrice(cartPrice),
    finalPrice: formatPrice(finalPrice),
    isPurchasePossible,
    buttonMessage,
  };
};

export default usePurchaseChecker;
