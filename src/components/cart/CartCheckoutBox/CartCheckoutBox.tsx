import { useCallback } from 'react';
import { useRecoilValue } from 'recoil';

import { useCart } from '../../../hooks/useCart';
import { cartListCheckoutCostsState } from '../../../store/cart';
import { checkedCartIdListState } from '../../../store/cartCheckbox';
import { currentMemberInformationState } from '../../../store/member';
import { priceFormatter } from '../../../utils/formatter';
import Button from '../../common/Button/Button';
import { Text } from '../../common/Text/Text.styles';
import * as S from './CartCheckoutBox.styles';

const CartCheckoutBox = () => {
  const checkedIdList = useRecoilValue(checkedCartIdListState);
  const cartListCheckoutCosts = useRecoilValue(cartListCheckoutCostsState);
  const memberInformation = useRecoilValue(currentMemberInformationState);
  const { orderCheckedItems } = useCart();

  const isCartEmpty = checkedIdList.size === 0;

  const handleOrder = useCallback(() => {
    orderCheckedItems([...checkedIdList]);
  }, [checkedIdList, orderCheckedItems]);

  return (
    <S.CartCheckoutBoxWrapper>
      <S.CheckoutInformationContainer>
        <S.CheckoutInformationTextContainer>
          <Text>상품 금액</Text>
          <S.CheckoutValueText>
            {priceFormatter(cartListCheckoutCosts.totalItemPrice)}원
          </S.CheckoutValueText>
        </S.CheckoutInformationTextContainer>
        <S.CheckoutInformationSubTextContainer>
          <Text size="small">&#8735; 상품 할인 금액</Text>
          <S.CheckoutValueText size="small">
            {cartListCheckoutCosts.totalItemDiscountAmount < 0
              ? priceFormatter(cartListCheckoutCosts.totalItemDiscountAmount)
              : priceFormatter(-cartListCheckoutCosts.totalItemDiscountAmount)}
            원
          </S.CheckoutValueText>
        </S.CheckoutInformationSubTextContainer>
        <S.CheckoutInformationSubTextContainer>
          <Text size="small">&#8735; 등급 할인 금액</Text>
          <S.CheckoutValueText size="small">
            {cartListCheckoutCosts.totalMemberDiscountAmount < 0
              ? priceFormatter(cartListCheckoutCosts.totalMemberDiscountAmount)
              : priceFormatter(-cartListCheckoutCosts.totalMemberDiscountAmount)}
            원
          </S.CheckoutValueText>
        </S.CheckoutInformationSubTextContainer>
        <S.CheckoutMembershipDiscountInformation>
          <S.MembershipRank>{memberInformation.rank}</S.MembershipRank>
          <Text size="small" as="span">
            {memberInformation.discountRate}% 할인
          </Text>
        </S.CheckoutMembershipDiscountInformation>
        <S.CheckoutInformationTextContainer>
          <Text>배송비</Text>
          <S.CheckoutValueText>
            {priceFormatter(cartListCheckoutCosts.shippingFee)}원
          </S.CheckoutValueText>
        </S.CheckoutInformationTextContainer>
        <S.CheckoutTotalPriceContainer>
          <Text>결제 예정 금액</Text>
          <S.CheckoutTotalPriceValueText>
            {priceFormatter(cartListCheckoutCosts.totalPrice)}원
          </S.CheckoutTotalPriceValueText>
        </S.CheckoutTotalPriceContainer>
        <Button variant="primary" disabled={isCartEmpty} onClick={handleOrder}>
          {isCartEmpty ? '상품을 담아주세요' : '주문하기'}
        </Button>
      </S.CheckoutInformationContainer>
    </S.CartCheckoutBoxWrapper>
  );
};

export default CartCheckoutBox;
