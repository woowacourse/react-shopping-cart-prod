import styled from 'styled-components';
import CartPriceSection from 'components/CartPriceSection/CartPriceSection';
import CartProductSection from 'components/CartProductSection/CartProductSection';
import useShoppingCart from 'hooks/useShoppingCart';
import Box from 'components/@common/Box';
import EmptyDataCard from 'components/EmptyCartSection/EmptyDataCard';

const ShoppingCartPage = () => {
  const { cartProducts } = useShoppingCart();

  return (
    <Box sizing={{ width: '100%' }} flex={{ flexDirection: 'column' }}>
      <PageTitle>장바구니</PageTitle>
      {cartProducts.size ? (
        <SectionContainer sizing={{ width: '100%' }} flex={{ gap: '80px', align: 'flex-start' }} role="region">
          <CartProductSection />
          <CartPriceSection />
        </SectionContainer>
      ) : (
        <EmptyDataCard>장바구니가 비어있어요</EmptyDataCard>
      )}
    </Box>
  );
};

export default ShoppingCartPage;

const SectionContainer = styled(Box)`
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const PageTitle = styled.h2`
  width: 100%;
  height: 80px;
  font-size: 32px;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;
