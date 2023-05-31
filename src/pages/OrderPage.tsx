import styled from 'styled-components';
import FlexBox from 'components/@common/FlexBox';
import OrderProductSection from 'components/OrderProductSection/OrderProductSection';
import OrderPriceSection from 'components/OrderPriceSection/OrderPriceSection';
import { OrderPointCostProvider } from 'context/OrderPointCostProvider';

const OrderPage = () => {
  return (
    <ShoppingCartPageContainer flexDirection="column">
      <PageTitle>주문서</PageTitle>
      <SectionContainer gap="80px" align="flex-start" role="region">
        <OrderPointCostProvider>
          <OrderProductSection />
          <OrderPriceSection />
        </OrderPointCostProvider>
      </SectionContainer>
    </ShoppingCartPageContainer>
  );
};

export default OrderPage;

const ShoppingCartPageContainer = styled(FlexBox)`
  width: 100%;
`;

const SectionContainer = styled(FlexBox)`
  position: relative;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 50px;
  }
`;

const PageTitle = styled.h2`
  width: 100%;
  height: 80px;
  border-bottom: 3px solid var(--color-grayscale-500);
  font-size: 32px;
  text-align: center;
`;
