import styled from 'styled-components';
import { Image, ItemContainer, Name, Price, Quantity } from './common/ProductItem';

const Container = styled.section`
  width: 100%;
  margin-top: 28px;

  border: 1px solid ${({ theme }) => theme.colors.gray200};
`;

const TitleSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 92px;
  padding: 0 30px;

  background-color: ${({ theme }) => theme.colors.gray300};
`;

const DetailButton = styled.button``;

const ColumnFlexBox = styled.div`
  display: flex;
  flex-direction: column;

  margin-left: 33px;
`;

const RowFlexBox = styled.div`
  display: flex;

  margin-top: 10px;

  color: ${({ theme }) => theme.colors.gray400};
`;

const OrderList = () => {
  return (
    <Container>
      <TitleSection>
        주문번호 : 1<DetailButton>상세보기 ▷ </DetailButton>
      </TitleSection>
      <ItemContainer
        productData={{
          name: '친환경 실링용기-ECO 1915',
          image: 'public/images/products/1.png',
          price: 0,
          quantity: 0,
        }}
        containerStyle={{ display: 'flex', padding: '20px' }}
      >
        <Image imageStyle={{ height: '141px', width: '141px' }} />
        <ColumnFlexBox>
          <Name fontStyle="name" />
          <RowFlexBox>
            <Price fontStyle="price" />/
            <Quantity fontStyle="price" />
          </RowFlexBox>
        </ColumnFlexBox>
      </ItemContainer>
    </Container>
  );
};

export default OrderList;
