import { useCallback } from 'react';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';

import { SHIPPING_FEE } from '../../../constants';
import { CART_LIST_CHECKBOX_KEY } from '../../../constants/store';
import { useCart } from '../../../hooks/useCart';
import {
  cartListMemberDiscountAmountState,
  cartListSubTotalState,
  cartListTotalItemDiscountAmountState,
} from '../../../store/cart';
import { checkedListState } from '../../../store/checkbox';
import { currentMemberInformationState } from '../../../store/member';
import { priceFormatter } from '../../../utils/formatter';
import Button from '../../common/Button/Button';
import Spinner from '../../common/Spinner/Spinner';
import { Text } from '../../common/Text/Text.styles';
import * as S from './CartCheckoutBox.styles';

const CartCheckoutBox = () => {
  const checkedIdList = useRecoilValue(checkedListState(CART_LIST_CHECKBOX_KEY));
  const cartListSubTotal = useRecoilValueLoadable(cartListSubTotalState);
  const cartListTotalItemDiscountAmount = useRecoilValueLoadable(
    cartListTotalItemDiscountAmountState
  );
  const cartListMemberDiscountAmount = useRecoilValueLoadable(cartListMemberDiscountAmountState);
  const memberInformation = useRecoilValueLoadable(currentMemberInformationState);
  const { orderCheckedItems } = useCart();

  const isLoading = cartListSubTotal.state === 'loading';
  const isCartEmpty = cartListSubTotal.contents === 0;
  const subTotal = cartListSubTotal.contents > 0 ? cartListSubTotal.contents : 0;
  const totalItemDiscountAmount =
    cartListTotalItemDiscountAmount.contents > 0 ? -cartListTotalItemDiscountAmount.contents : 0;
  const memberDiscountAmount =
    cartListMemberDiscountAmount.contents > 0 ? -cartListMemberDiscountAmount.contents : 0;
  const shippingFee = cartListSubTotal.contents > 0 ? SHIPPING_FEE : 0;
  const totalPrice = subTotal - totalItemDiscountAmount - memberDiscountAmount + shippingFee ?? 0;

  const handleOrder = useCallback(() => {
    orderCheckedItems([...checkedIdList]);
  }, [checkedIdList, orderCheckedItems]);

  return (
    <S.CartCheckoutBoxWrapper>
      <S.CheckoutInformationContainer>
        <S.CheckoutInformationTextContainer>
          <Text>상품 금액</Text>
          <S.CheckoutValueText>{priceFormatter(subTotal)}원</S.CheckoutValueText>
        </S.CheckoutInformationTextContainer>
        <S.CheckoutInformationSubTextContainer>
          <Text size="small">&#8735; 상품 할인 금액</Text>
          <S.CheckoutValueText size="small">
            {priceFormatter(totalItemDiscountAmount)}원
          </S.CheckoutValueText>
        </S.CheckoutInformationSubTextContainer>
        <S.CheckoutInformationSubTextContainer>
          <Text size="small">&#8735; 등급 할인 금액</Text>
          <S.CheckoutValueText size="small">
            {priceFormatter(memberDiscountAmount)}원
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
          <S.CheckoutValueText>{priceFormatter(shippingFee)}원</S.CheckoutValueText>
        </S.CheckoutInformationTextContainer>
        <S.CheckoutTotalPriceContainer>
          <Text>결제 예정 금액</Text>
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
