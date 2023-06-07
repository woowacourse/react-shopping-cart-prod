import Button from '../../common/Button/Button';
import Spinner from '../../common/Spinner/Spinner';
import { Text } from '../../common/Text/Text.styles';
import * as S from './CartCheckoutBox.styles';

const CartCheckoutBoxSkeleton = () => {
  return (
    <S.CartCheckoutBoxWrapper>
      <S.CheckoutInformationContainer>
        <S.CheckoutInformationTextContainer>
          <Text>상품 금액</Text>
          <S.CheckoutValueText>0원</S.CheckoutValueText>
        </S.CheckoutInformationTextContainer>
        <S.CheckoutInformationSubTextContainer>
          <Text size="small">&#8735; 상품 할인 금액</Text>
          <S.CheckoutValueText size="small">0 원</S.CheckoutValueText>
        </S.CheckoutInformationSubTextContainer>
        <S.CheckoutInformationSubTextContainer>
          <Text size="small">&#8735; 등급 할인 금액</Text>
          <S.CheckoutValueText size="small">0 원</S.CheckoutValueText>
        </S.CheckoutInformationSubTextContainer>
        <S.CheckoutMembershipDiscountInformation>
          <S.MembershipRank>일반</S.MembershipRank>
          <Text size="small" as="span">
            0% 할인
          </Text>
        </S.CheckoutMembershipDiscountInformation>
        <S.CheckoutInformationTextContainer>
          <Text>배송비</Text>
          <S.CheckoutValueText>0원</S.CheckoutValueText>
        </S.CheckoutInformationTextContainer>
        <S.CheckoutTotalPriceContainer>
          <Text>결제 예정 금액</Text>
          <S.CheckoutTotalPriceValueText>0원</S.CheckoutTotalPriceValueText>
        </S.CheckoutTotalPriceContainer>
        <Button className="loading-button" aria-label="주문하기" variant="primary" disabled>
          <Spinner size={18} width={3} disabled />
        </Button>
      </S.CheckoutInformationContainer>
    </S.CartCheckoutBoxWrapper>
  );
};

export default CartCheckoutBoxSkeleton;
