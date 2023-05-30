import FlexBox from 'components/@common/FlexBox';
import ROUTE_PATH from 'constants/routePath';
import useCartCheckBox from 'hooks/useCartCheckBox';
import useOrderPriceSection from 'hooks/useOrderPriceSection';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const SHIPPING_FEE = 3000;
export const FREE_SHIPPING_FEE = 50000;

const OrderPriceSection = () => {
  const { checkedProducts } = useCartCheckBox();
  const {
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
  } = useOrderPriceSection(checkedProducts);

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
