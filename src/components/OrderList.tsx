import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import type { OrderListEntity } from '../api/rest/ShoppingCartRestAPI';
import { Image, ItemContainer, Name, Price, Quantity } from './common/ProductItem';

const Container = styled.section`
  width: 100%;
  margin-top: 10px;

  border-bottom: 10px solid ${({ theme }) => theme.colors.gray300};
`;

const TitleSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 50px;
  padding: 0 30px;

  ${({ theme }) => theme.fonts.text}
  font-weight: 800;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};

  & > div > strong {
    color: #0078ff;
  }
`;

const DetailButton = styled.button``;

const ColumnFlexBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  margin-left: 20px;
`;

const PointSection = styled.section`
  margin: 0 30px;

  ${({ theme }) => theme.fonts.description}
`;

const SavingRate = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  margin-bottom: 5px;

  color: #0078ff;
`;

const Point = styled.div`
  display: flex;
  justify-content: space-between;

  margin-bottom: 5px;
  width: 100%;
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
        <div>
          주문번호 <strong>{orderList.id}</strong>
        </div>
        <DetailButton onClick={moveToDetailPage}>〉</DetailButton>
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
            containerStyle={{ display: 'flex', padding: '20px 20px 20px 30px' }}
          >
            <Image />
            <ColumnFlexBox>
              <Name />
              <Quantity style={{ color: '#888888' }} />
              <Price style={{ fontSize: '16px' }} />
            </ColumnFlexBox>
          </ItemContainer>
        );
      })}
      <PointSection>
        <SavingRate>
          <p>적립율</p> <p>{orderList.savingRate}%</p>
        </SavingRate>
        <Point>
          <p>포인트</p> <p>{orderList.usedPoints.toLocaleString()}</p>
        </Point>
      </PointSection>
    </Container>
  );
};

export default OrderList;
