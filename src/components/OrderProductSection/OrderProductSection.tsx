import styled from 'styled-components';
import OrderProductCardList from './OrderProductCardList/OrderProductCardList';
import OrderPointTab from './OrderPointTab/OrderPointTab';
import Box from 'components/@common/Box';

const OrderProductSection = () => {
  return (
    <ProductSection flex={{ flexDirection: 'column', align: 'flex-start', gap: '50px' }}>
      <OrderProductCardList />
      <OrderPointTab />
    </ProductSection>
  );
};

export default OrderProductSection;

const ProductSection = styled(Box)`
  width: 60%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;
