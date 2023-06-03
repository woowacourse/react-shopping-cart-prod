import styled from 'styled-components';
import CheckOutProductCardList from './CheckOutProductCardList/CheckOutProductCardList';
import CheckOutPointTab from './CheckOutPointTab/CheckOutPointTab';
import Box from 'components/@common/Box';

const CheckOutProductSection = () => {
  return (
    <ProductSection sizing={{ width: '60%' }} flex={{ flexDirection: 'column', align: 'flex-start', gap: '50px' }}>
      <CheckOutProductCardList />
      <CheckOutPointTab />
    </ProductSection>
  );
};

export default CheckOutProductSection;

const ProductSection = styled(Box)`
  @media (max-width: 768px) {
    width: 100%;
  }
`;
