import styled from 'styled-components';
import { Link } from 'react-router-dom';
import CartPriceSection from 'components/CartPriceSection/CartPriceSection';
import CartProductSection from 'components/CartProductSection/CartProductSection';
import FlexBox from 'components/@common/FlexBox';
import useShoppingCart from 'hooks/useShoppingCart';
import emptyCartImg from 'assets/empty-cart.png';
import ROUTE_PATH from 'constants/routePath';

const ShoppingCartPage = () => {
  const { cartProducts } = useShoppingCart();

  return (
    <ShoppingCartPageContainer flexDirection="column">
      <PageTitle>장바구니</PageTitle>
      {cartProducts.size ? (
        <SectionContainer gap="80px" align="flex-start" role="region">
          <CartProductSection />
          <CartPriceSection />
        </SectionContainer>
      ) : (
        <EmptyCartImgBackground flexDirection="column" gap="20px">
          <EmptyCartImg src={emptyCartImg} alt="장바구니가 텅 비었습니다." />
          <EmptyCartMessage>장바구니에 담긴 상품이 없습니다.</EmptyCartMessage>
          <GoHomeLink to={ROUTE_PATH.ROOT}>홈으로 가기</GoHomeLink>
        </EmptyCartImgBackground>
      )}
    </ShoppingCartPageContainer>
  );
};

export default ShoppingCartPage;

const ShoppingCartPageContainer = styled(FlexBox)`
  width: 100%;
`;

const SectionContainer = styled(FlexBox)`
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const PageTitle = styled.h2`
  width: 100%;
  height: 80px;
  border-bottom: 3px solid var(--color-grayscale-500);
  font-size: 32px;
  text-align: center;
`;

const EmptyCartImgBackground = styled(FlexBox)`
  width: 100%;
  background-color: var(--color-grayscale-100);
  padding: 20px 0;
`;

const EmptyCartImg = styled.img`
  width: 150px;
  height: 150px;
`;

const EmptyCartMessage = styled.p`
  font-size: 20px;
  font-weight: 700;
`;

const GoHomeLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 50px;
  border-radius: 4px;
  background-color: var(--color-primary);
  font-size: 16px;
  font-weight: 700;
  color: var(--color-pure-white);
  cursor: pointer;
`;
