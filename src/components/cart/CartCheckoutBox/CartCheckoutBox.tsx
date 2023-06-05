import { useRecoilValue, useRecoilValueLoadable } from 'recoil';

import { SHIPPING_FEE } from '../../../constants';
import { CART_LIST_CHECKBOX_KEY } from '../../../constants/store';
import { useOrder } from '../../../hooks/useOrder';
import {
  cartListCheckedItemCostInformationState,
  checkedCartItemListState,
} from '../../../store/cart';
import { checkedListState } from '../../../store/checkbox';
import { getCartPriceInformation } from '../../../store/utils';
import { PostOrdersRequestBody } from '../../../types/api';
import { priceFormatter } from '../../../utils/formatter';
import Button from '../../common/Button/Button';
import Spinner from '../../common/Spinner/Spinner';
import { Text } from '../../common/Text/Text.styles';
import * as S from './CartCheckoutBox.styles';

const CartCheckoutBox = () => {
  const { orderCheckedCartItems } = useOrder();
  const checkedCartItemList = useRecoilValue(checkedCartItemListState);
  const checkedCartIdList = useRecoilValue(checkedListState(CART_LIST_CHECKBOX_KEY));
  const costs = getCartPriceInformation(checkedCartItemList);

  const cartItemsForOrder: PostOrdersRequestBody = {
    cartItemIds: [...checkedCartIdList],
    ...costs,
  };

  const cartListCheckedItemCostInformation = useRecoilValueLoadable<PostOrdersRequestBody>(
    cartListCheckedItemCostInformationState
  );
  const isLoading = cartListCheckedItemCostInformation.state === 'loading';
  const cartListCheckedItemCostInformationValue = cartListCheckedItemCostInformation.contents;

  const isCartEmpty = checkedCartIdList.size === 0;
  const totalItemPrice =
    cartListCheckedItemCostInformationValue.totalItemPrice > 0
      ? cartListCheckedItemCostInformationValue.totalItemPrice
      : 0;
  const totalItemDiscountAmount =
    cartListCheckedItemCostInformationValue.totalItemDiscountAmount > 0
      ? cartListCheckedItemCostInformationValue.totalItemDiscountAmount
      : 0;
  const totalMemberDiscountAmount =
    cartListCheckedItemCostInformationValue.totalMemberDiscountAmount > 0
      ? cartListCheckedItemCostInformationValue.totalMemberDiscountAmount
      : 0;
  const shippingFee =
    cartListCheckedItemCostInformationValue.shippingFee > 0
      ? cartListCheckedItemCostInformationValue.shippingFee
      : 0;
  const totalPrice =
    cartListCheckedItemCostInformationValue.totalPrice > 0
      ? cartListCheckedItemCostInformationValue.totalPrice
      : 0;

  return (
    <S.CartCheckoutBoxWrapper>
      <S.CheckoutInformationContainer>
        <S.CheckoutInformationTextContainer>
          <Text>총 상품 가격</Text>
          <S.CheckoutValueText>{priceFormatter(totalItemPrice)}</S.CheckoutValueText>
        </S.CheckoutInformationTextContainer>
        <S.CheckoutInformationTextContainer>
          <S.DiscountAmountText>ㄴ 상품 할인 금액</S.DiscountAmountText>
          <S.DiscountAmountText>
            {priceFormatter(totalItemDiscountAmount, true)}
          </S.DiscountAmountText>
        </S.CheckoutInformationTextContainer>
        <S.CheckoutInformationTextContainer>
          <S.DiscountAmountText>ㄴ 등급 할인 금액</S.DiscountAmountText>
          <S.DiscountAmountText>
            {priceFormatter(totalMemberDiscountAmount, true)}
          </S.DiscountAmountText>
        </S.CheckoutInformationTextContainer>
        <S.CheckoutInformationTextContainer>
          <Text>총 배송비</Text>
          <S.CheckoutValueText>{priceFormatter(shippingFee)}</S.CheckoutValueText>
        </S.CheckoutInformationTextContainer>
        <S.CheckoutTotalPriceContainer>
          <Text>결제 예상 금액</Text>
          <S.CheckoutTotalPriceValueText>
            {priceFormatter(totalPrice)}
          </S.CheckoutTotalPriceValueText>
        </S.CheckoutTotalPriceContainer>
        {isLoading ? (
          <Button className="loading-button" aria-label="주문하기" variant="primary" disabled>
            <Spinner size={18} width={3} disabled />
          </Button>
        ) : (
          <Button
            variant="primary"
            disabled={isCartEmpty}
            onClick={() => orderCheckedCartItems(cartItemsForOrder)}
          >
            {isCartEmpty ? '상품을 담아주세요' : '주문하기'}
          </Button>
        )}
      </S.CheckoutInformationContainer>
    </S.CartCheckoutBoxWrapper>
  );
};

export default CartCheckoutBox;
