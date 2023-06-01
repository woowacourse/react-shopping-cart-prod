import styled from 'styled-components';
import FlexBox from 'components/@common/FlexBox';
import CheckOutProductSection from 'components/CheckOutProductSection/CheckOutProductSection';
import CheckOutPriceSection from 'components/CheckOutPriceSection/CheckOutPriceSection';
import { CheckOutPointCostProvider } from 'context/CheckOutPointCostProvider';

const CheckOutPage = () => {
  return (
    <ShoppingCartPageContainer flexDirection="column">
      <PageTitle>주문서</PageTitle>
      <SectionContainer gap="80px" align="flex-start" role="region">
        <CheckOutPointCostProvider>
          <CheckOutProductSection />
          <CheckOutPriceSection />
        </CheckOutPointCostProvider>
      </SectionContainer>
    </ShoppingCartPageContainer>
  );
};

export default CheckOutPage;

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
