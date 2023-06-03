import styled from 'styled-components';
import CheckOutProductSection from 'components/CheckOutProductSection/CheckOutProductSection';
import CheckOutPriceSection from 'components/CheckOutPriceSection/CheckOutPriceSection';
import { CheckOutPointCostProvider } from 'context/CheckOutPointCostProvider';
import Box from 'components/@common/Box';

const CheckOutPage = () => {
  return (
    <Box sizing={{ width: '100%' }} flex={{ flexDirection: 'column' }}>
      <PageTitle>주문서</PageTitle>
      <SectionContainer sizing={{ width: '100%' }} flex={{ align: 'flex-start', gap: '80px' }} role="region">
        <CheckOutPointCostProvider>
          <CheckOutProductSection />
          <CheckOutPriceSection />
        </CheckOutPointCostProvider>
      </SectionContainer>
    </Box>
  );
};

export default CheckOutPage;

const SectionContainer = styled(Box)`
  position: relative;

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
