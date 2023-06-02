import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import type { OrderListEntity } from '../api/rest/ShoppingCartRestAPI';
import { orderListState } from '../recoil/atoms/orderState';
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

interface OrderListProps {
  orderList: OrderListEntity;
}

const OrderList = (props: OrderListProps) => {
  const { orderList } = props;
  const navigate = useNavigate();

  const moveToDetailPage = () => {
    navigate(`/order-detail/${orderList.id}`);
  };

  return (
    <Container>
      <TitleSection>
        주문번호 : {orderList.id}
        <DetailButton onClick={moveToDetailPage}>상세보기 ▷ </DetailButton>
      </TitleSection>
      {orderList.cartItems.map((item) => {
        return (
          <ItemContainer
            key={item.productId}
            productData={{
              name: item.name,
              image: item.imageUrl,
              price: item.price,
              quantity: item.quantity,
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
        );
      })}
    </Container>
  );
};

export default OrderList;
