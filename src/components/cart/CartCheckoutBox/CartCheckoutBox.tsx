import { useCallback } from 'react';
import { useRecoilValueLoadable } from 'recoil';

import { useCart } from '../../../hooks/useCart';
import { cartListCheckoutPriceState } from '../../../store/cart';
import { checkedCartIdListState } from '../../../store/cartCheckbox';
import { currentMemberInformationState } from '../../../store/member';
import { priceFormatter } from '../../../utils/formatter';
import Button from '../../common/Button/Button';
import Spinner from '../../common/Spinner/Spinner';
import { Text } from '../../common/Text/Text.styles';
import * as S from './CartCheckoutBox.styles';

const CartCheckoutBox = () => {
  const checkedIdList = useRecoilValueLoadable(checkedCartIdListState);
  const cartListCheckoutPrice = useRecoilValueLoadable(cartListCheckoutPriceState);
  const memberInformation = useRecoilValueLoadable(currentMemberInformationState);
  const { orderCheckedItems } = useCart();

  const isLoading = cartListCheckoutPrice.state === 'loading';
  const isCartEmpty = checkedIdList.contents.size === 0;

  const handleOrder = useCallback(() => {
    orderCheckedItems([...checkedIdList.contents]);
  }, [checkedIdList, orderCheckedItems]);

  return (
    <S.CartCheckoutBoxWrapper>
      <S.CheckoutInformationContainer>
        <S.CheckoutInformationTextContainer>
          <Text>상품 금액</Text>
          <S.CheckoutValueText>
            {isLoading ? 0 : priceFormatter(cartListCheckoutPrice.contents.subTotal)}원
          </S.CheckoutValueText>
        </S.CheckoutInformationTextContainer>
        <S.CheckoutInformationSubTextContainer>
          <Text size="small">&#8735; 상품 할인 금액</Text>
          <S.CheckoutValueText size="small">
            {isLoading ? 0 : priceFormatter(cartListCheckoutPrice.contents.totalItemDiscountAmount)}
            원
          </S.CheckoutValueText>
        </S.CheckoutInformationSubTextContainer>
        <S.CheckoutInformationSubTextContainer>
          <Text size="small">&#8735; 등급 할인 금액</Text>
          <S.CheckoutValueText size="small">
            {isLoading ? 0 : priceFormatter(cartListCheckoutPrice.contents.memberDiscountAmount)}원
          </S.CheckoutValueText>
        </S.CheckoutInformationSubTextContainer>
        <S.CheckoutMembershipDiscountInformation>
          <S.MembershipRank>{memberInformation.contents.rank ?? ''}</S.MembershipRank>
          <Text size="small" as="span">
            {memberInformation.contents.discountRate ?? 0}% 할인
          </Text>
        </S.CheckoutMembershipDiscountInformation>
        <S.CheckoutInformationTextContainer>
          <Text>배송비</Text>
          <S.CheckoutValueText>
            {isLoading ? 0 : priceFormatter(cartListCheckoutPrice.contents.shippingFee)}원
          </S.CheckoutValueText>
        </S.CheckoutInformationTextContainer>
        <S.CheckoutTotalPriceContainer>
          <Text>결제 예정 금액</Text>
          <S.CheckoutTotalPriceValueText>
            {isLoading ? 0 : priceFormatter(cartListCheckoutPrice.contents.totalPrice)}원
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
