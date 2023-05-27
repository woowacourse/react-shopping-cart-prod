import { useCallback } from 'react';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';

import { SHIPPING_FEE } from '../../../constants';
import { CART_LIST_CHECKBOX_KEY } from '../../../constants/store';
import { useCart } from '../../../hooks/useCart';
import { cartListSubTotalState } from '../../../store/cart';
import { checkedListState } from '../../../store/checkbox';
import { priceFormatter } from '../../../utils/formatter';
import Button from '../../common/Button/Button';
import Spinner from '../../common/Spinner/Spinner';
import { Text } from '../../common/Text/Text.styles';
import * as S from './CartCheckoutBox.styles';

const CartCheckoutBox = () => {
  const cartListSubTotal = useRecoilValueLoadable(cartListSubTotalState);
  const checkedIdList = useRecoilValue(checkedListState(CART_LIST_CHECKBOX_KEY));
  const { orderCheckedItems } = useCart();

  const isLoading = cartListSubTotal.state === 'loading';
  const isCartEmpty = cartListSubTotal.contents === 0;
  const subTotal = cartListSubTotal.contents > 0 ? cartListSubTotal.contents : 0;
  const shippingFee = cartListSubTotal.contents > 0 ? SHIPPING_FEE : 0;
  const totalPrice = subTotal + shippingFee ?? 0;

  const handleOrder = useCallback(() => {
    orderCheckedItems([...checkedIdList]);
  }, [checkedIdList, orderCheckedItems]);

  return (
    <S.CartCheckoutBoxWrapper>
      <S.CheckoutInformationContainer>
        <S.CheckoutInformationTextContainer>
          <Text>총 상품 가격</Text>
          <S.CheckoutValueText>{priceFormatter(subTotal)}원</S.CheckoutValueText>
        </S.CheckoutInformationTextContainer>
        <S.CheckoutInformationTextContainer>
          <Text>총 배송비</Text>
          <S.CheckoutValueText>{priceFormatter(shippingFee)}원</S.CheckoutValueText>
        </S.CheckoutInformationTextContainer>
        <S.CheckoutTotalPriceContainer>
          <Text>결제 예상 금액</Text>
          <S.CheckoutTotalPriceValueText>
            {priceFormatter(totalPrice)}원
          </S.CheckoutTotalPriceValueText>
        </S.CheckoutTotalPriceContainer>
        {isLoading ? (
          <Button className="loading-button" aria-label="주문하기" variant="primary" disabled>
            <Spinner size={18} width={3} disabled />
          </Button>
        ) : (
          <Button variant="primary" disabled={isCartEmpty} onClick={handleOrder}>
            {isCartEmpty ? '상품을 담아주세요' : '주문하기'}
          </Button>
        )}
      </S.CheckoutInformationContainer>
    </S.CartCheckoutBoxWrapper>
  );
};

export default CartCheckoutBox;
