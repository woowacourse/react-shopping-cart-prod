import FlexBox from 'components/@common/FlexBox';
import ROUTE_PATH from 'constants/routePath';
import useCartCheckBox from 'hooks/useCartCheckBox';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { checkedCartProductsTotalPrice } from 'state/cartProducts';
import { pointUsageState } from 'state/pointUsageState';
import styled from 'styled-components';

const SHIPPING_FEE = 3000;
const FREE_SHIPPING_FEE = 50000;

const OrderPriceSection = () => {
  const { checkedProducts } = useCartCheckBox();
  const point = useRecoilValue(pointUsageState);

  const cartTotalPrice = useRecoilValue(checkedCartProductsTotalPrice(checkedProducts)); // 장바구니에 담긴 물품 총합

  const isShippingFeeFree = cartTotalPrice >= FREE_SHIPPING_FEE; // 5만원 이상 무료 배송
  const isCheckedProductsExist = checkedProducts.size > 0;
  const isDiscounted = point.appliedPoint > 0 || isShippingFeeFree; // 할인 여부

  const cartTotalPriceWithFee = cartTotalPrice + (isCheckedProductsExist ? SHIPPING_FEE : 0); // 배송비 포함한 총합

  const productTotalPriceText = `${cartTotalPrice.toLocaleString('ko-KR')}원`;
  const shippingFeeText = isCheckedProductsExist ? `+${SHIPPING_FEE.toLocaleString('ko-KR')}원` : '0원';
  const discountShippingFee = `-${SHIPPING_FEE.toLocaleString('ko-KR')}원`;

  const totalDiscountPrice = isShippingFeeFree ? point.appliedPoint + SHIPPING_FEE : point.appliedPoint; // 포인트 사용 + 배송비 할인
  const totalDiscountPriceText = `-${totalDiscountPrice.toLocaleString('ko-KR')}원`;

  const cartTotalPriceWithDiscount = cartTotalPriceWithFee - totalDiscountPrice;

  const savePoint = Math.floor(cartTotalPriceWithDiscount * 0.01); // 적립 포인트
  const savePointText = `+${savePoint.toLocaleString('ko-KR')}원`;

  const cartTotalPriceText = isCheckedProductsExist ? `${cartTotalPriceWithDiscount.toLocaleString('ko-KR')}원` : '0원';

  const orderConfirmButtonText = isCheckedProductsExist
    ? `총 ${checkedProducts.size}건 주문하기(${cartTotalPriceWithDiscount.toLocaleString('ko-KR')}원)`
    : '주문하기';

  return (
    <PriceSection flexDirection="column" gap="10px">
      <Container justify="space-between">
        <SubTitle>총 상품가격</SubTitle>
        <ProductTotalPrice>{productTotalPriceText}</ProductTotalPrice>
      </Container>
      <Container justify="space-between">
        <SubTitle>배송비</SubTitle>
        <ShippingFee>{shippingFeeText}</ShippingFee>
      </Container>
      {point.appliedPoint > 0 && (
        <Container justify="space-between">
          <DiscountSubTitle>포인트 사용</DiscountSubTitle>
          <DiscountPrice>-{point.appliedPoint.toLocaleString('ko-KR')}원</DiscountPrice>
        </Container>
      )}
      {isShippingFeeFree && (
        <Container justify="space-between">
          <DiscountSubTitle>배송비 할인</DiscountSubTitle>
          <DiscountPrice>{discountShippingFee}</DiscountPrice>
        </Container>
      )}
      {isDiscounted && (
        <Container justify="space-between">
          <DiscountSubTitle>총 할인금액</DiscountSubTitle>
          <DiscountPrice>{totalDiscountPriceText}</DiscountPrice>
        </Container>
      )}
      <Container justify="space-between">
        <SubTitle>총 결제금액</SubTitle>
        <TotalPriceContainer flexDirection="column" align="flex-end">
          <CartTotalPrice>{cartTotalPriceText}</CartTotalPrice>
          <SavePoint>{savePointText} 적립예정</SavePoint>
        </TotalPriceContainer>
      </Container>

      <StyledLink to={ROUTE_PATH.orderSheet}>
        <OrderConfirmButton isActive={isCheckedProductsExist}>{orderConfirmButtonText}</OrderConfirmButton>
      </StyledLink>
    </PriceSection>
  );
};

export default OrderPriceSection;

const PriceSection = styled(FlexBox)`
  position: sticky;
  top: 140px;
  width: 40%;
  margin-top: 60px;
  padding: 20px 26px;
  border: 1px solid #dddddd;
  background-color: #f2f2f2;

  @media (max-width: 1280px) {
    span {
      font-size: 16px;
    }
  }

  @media (max-width: 768px) {
    position: sticky;
    bottom: 0;
    width: 100%;
    height: 250px;
    margin: 0;
  }

  @media (max-width: 430px) {
    height: 100%;

    div {
      display: none;
    }
  }
`;

const Container = styled(FlexBox)`
  width: 100%;
  height: 50px;
  border-bottom: solid 1px #dddddd;
`;

const TotalPriceContainer = styled(FlexBox)``;

const SubTitle = styled.span`
  font-size: 18px;
  font-weight: 700;
`;

const DiscountSubTitle = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: rgb(130, 130, 130);
`;

const ProductTotalPrice = styled.span`
  font-size: 18px;
  font-weight: 700;
`;

const ShippingFee = styled.span`
  font-size: 18px;
  font-weight: 700;
`;

const CartTotalPrice = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: #2ac1bc;
`;

const DiscountPrice = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: rgb(130, 130, 130);
`;

const SavePoint = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: rgb(130, 130, 130);
`;

const StyledLink = styled(Link)`
  width: 100%;
`;

const OrderConfirmButton = styled.button<{ isActive: boolean }>`
  width: 100%;
  height: 50px;
  margin-top: 20px;
  border: none;
  color: ${({ isActive }) => (isActive ? '#fff' : '#b1b3b5')};
  font-size: 18px;
  font-weight: 700;
  background-color: ${({ isActive }) => (isActive ? '#2ac1bc' : '#0000000d')};
  cursor: pointer;
  pointer-events: ${({ isActive }) => (isActive ? 'initial' : 'none')};

  @media (max-width: 430px) {
    margin: 0;
  }
`;
