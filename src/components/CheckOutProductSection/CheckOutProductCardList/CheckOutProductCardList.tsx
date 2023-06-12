import { useRecoilValue } from 'recoil';
import { getCheckedCartProductsState } from 'state/checkedCartProductIds';
import styled from 'styled-components';
import Box from 'components/@common/Box';
import Accordion from 'components/@common/Accordion';
import CheckOutProductCard from './CheckOutProductCard/CheckOutProductCard';

const CheckOutProductCardList = () => {
  const checkedCartProducts = useRecoilValue(getCheckedCartProductsState);
  const totalOrderCountText = `(총 ${checkedCartProducts.length}개)`;

  return (
    <Box sizing={{ width: '100%' }} flex={{ flexDirection: 'column', align: 'flex-start' }}>
      <Accordion.Root>
        <Wrapper>
          <Accordion.Trigger>
            <Box sizing={{ width: '100%', height: '60px' }} flex={{ justify: 'flex-start' }}>
              <Title>주문상품</Title>
              <TotalOrderCount>{totalOrderCountText}</TotalOrderCount>
            </Box>
          </Accordion.Trigger>
        </Wrapper>
        <Accordion.Content>
          <Box sizing={{ width: '100%' }} flex={{ flexDirection: 'column' }} role="list">
            {checkedCartProducts.map((checkedCartProduct) => (
              <CheckOutProductCard key={checkedCartProduct.product.id} checkedCartProduct={checkedCartProduct} />
            ))}
          </Box>
        </Accordion.Content>
      </Accordion.Root>
    </Box>
  );
};

export default CheckOutProductCardList;

const Wrapper = styled.div`
  position: sticky;
  top: calc(var(--header-height) - 1px);
  z-index: 10;
  background-color: var(--color-pure-white);
  width: 100%;
  border-bottom: 1px solid var(--color-grayscale-200);

  :hover {
    background-color: var(--color-grayscale-100);
  }
`;

const Title = styled.span`
  font-size: 18px;
  font-weight: 700;
  text-align: left;
`;

const TotalOrderCount = styled.span`
  font-size: 18px;
  font-weight: 700;
  text-align: left;
`;
