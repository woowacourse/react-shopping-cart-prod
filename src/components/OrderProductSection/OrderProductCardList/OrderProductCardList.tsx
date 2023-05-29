import { useRecoilValue } from 'recoil';
import { getCheckedCartProductsState } from 'state/checkedCartProductIds';
import OrderProductCard from './OrderProductCard/OrderProductCard';
import styled from 'styled-components';
import Box from 'components/@common/Box';

const OrderProductCardList = () => {
  const checkedCartProducts = useRecoilValue(getCheckedCartProductsState);
  const totalOrderCountText = `(총 ${checkedCartProducts.length}개)`;

  return (
    <Container sizing={{ width: '100%' }} flex={{ flexDirection: 'column', align: 'flex-start' }} role="list">
      <Box sizing={{ width: '100%' }} flex={{ justify: 'flex-start' }}>
        <Title>주문상품</Title>
        <TotalOrderCount>{totalOrderCountText}</TotalOrderCount>
      </Box>
      {checkedCartProducts.map((checkedCartProduct) => (
        <OrderProductCard key={checkedCartProduct.product.id} checkedCartProduct={checkedCartProduct} />
      ))}
    </Container>
  );
};

export default OrderProductCardList;

const Container = styled(Box)`
  padding: 0 16px;
  margin-top: 20px;
`;

const Title = styled.span`
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 700;
  text-align: left;
`;

const TotalOrderCount = styled.span`
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 700;
  text-align: left;
`;
