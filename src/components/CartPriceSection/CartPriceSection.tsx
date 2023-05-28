import FlexBox from 'components/@common/FlexBox';
import ROUTE_PATH from 'constants/routePath';
import useCartCheckBox from 'hooks/useCartCheckBox';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { checkedCartProductsTotalPrice } from 'state/cartProducts';
import styled from 'styled-components';

const SHIPPING_FEE = 3000;

const CartPriceSection = () => {
  const { checkedProducts } = useCartCheckBox();
  const cartTotalPrice = useRecoilValue(checkedCartProductsTotalPrice(checkedProducts));
  const navigate = useNavigate();

  const isCheckedProductsExist = checkedProducts.size > 0;
  const cartTotalPriceWithFee = cartTotalPrice + SHIPPING_FEE;

  const productTotalPriceText = `${cartTotalPrice.toLocaleString('ko-KR')}원`;
  const shippingFeeText = isCheckedProductsExist ? `+${SHIPPING_FEE.toLocaleString('ko-KR')}원` : '0원';
  const cartTotalPriceText = isCheckedProductsExist ? `${cartTotalPriceWithFee.toLocaleString('ko-KR')}원` : '0원';
  const orderConfirmButtonText = isCheckedProductsExist
    ? `총 ${checkedProducts.size}건 주문하기(${cartTotalPriceWithFee.toLocaleString('ko-KR')}원)`
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
      <Container justify="space-between">
        <SubTitle>예상 주문금액</SubTitle>
        <CartTotalPrice>{cartTotalPriceText}</CartTotalPrice>
      </Container>
      <OrderConfirmButton onClick={() => navigate(ROUTE_PATH.ORDER)} isActive={isCheckedProductsExist}>
        {orderConfirmButtonText}
      </OrderConfirmButton>
    </PriceSection>
  );
};

export default CartPriceSection;

const PriceSection = styled(FlexBox)`
  position: sticky;
  top: 140px;
  width: 40%;
  margin-top: 60px;
  padding: 20px 26px;
  border: 1px solid var(--color-grayscale-200);
  background-color: var(--color-grayscale-100);

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
  border-bottom: solid 1px var(--color-grayscale-200);
`;

const SubTitle = styled.span`
  font-size: 18px;
  font-weight: 700;
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
`;

const OrderConfirmButton = styled.button<{ isActive: boolean }>`
  width: 100%;
  height: 50px;
  margin-top: 20px;
  border: none;
  color: ${({ isActive }) => (isActive ? 'var(--color-pure-white)' : 'var(--color-grayscale-500)')};
  font-size: 18px;
  font-weight: 700;
  background-color: ${({ isActive }) => (isActive ? 'var(--color-primary-tone-down)' : 'var(--color-grayscale-200)')};
  cursor: pointer;
  pointer-events: ${({ isActive }) => (isActive ? 'initial' : 'none')};
  user-select: none;

  :hover {
    filter: brightness(1.2);
    transition: background-color 100ms ease;
  }

  @media (max-width: 430px) {
    margin: 0;
  }
`;
