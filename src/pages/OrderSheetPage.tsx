import FlexBox from 'components/@common/FlexBox';
import CartPriceSection from 'components/CartPriceSection/CartPriceSection';
import SheetLeftSection from 'components/SheetLeftSection/SheetLefttSection';
import styled from 'styled-components';

const OrderSheetPage = () => {
  return (
    <OrderSheetPageContainer flexDirection="column">
      <PageTitle>주문서</PageTitle>
      <SectionContainer gap="80px" align="flex-start" role="region">
        <SheetLeftSection />
        <CartPriceSection />
      </SectionContainer>
    </OrderSheetPageContainer>
  );
};

export default OrderSheetPage;

const OrderSheetPageContainer = styled(FlexBox)`
  width: 100%;
`;

const PageTitle = styled.h2`
  width: 100%;
  height: 80px;
  border-bottom: 3px solid #333333;
  font-size: 32px;
  text-align: center;
`;

const SectionContainer = styled(FlexBox)`
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;
