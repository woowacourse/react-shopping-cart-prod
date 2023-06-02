import { Container } from '@styles/style';
import { styled } from 'styled-components';

import { VscChevronRight } from 'react-icons/vsc';
const orderList = [
  {
    id: 1,
    totalItemsPrice: 60000,
    discountPrice: 0,
    deliveryFee: 0,
    orderItems: [
      {
        orderItemId: 1,
        name: '치킨',
        price: 10000,
        imageUrl:
          'https://cdn-mart.baemin.com/sellergoods/main/139412ef-c4f5-43e1-959d-a0ec7190b4c5.png?h=300&w=300',
        quantity: 4,
      },
      {
        orderItemId: 3,
        name: '통나무',
        price: 10000,
        imageUrl: 'http://placekitten.com/200/200',
        quantity: 2,
      },
    ],
  },
  {
    id: 2,
    totalItemsPrice: 30000,
    discountPrice: 2000,
    deliveryFee: 3000,
    orderItems: [
      {
        orderItemId: 3,
        name: '냄비',
        price: 10000,
        imageUrl: 'http://example.com/chicken.jpg',
        quantity: 2,
      },
      {
        orderItemId: 5,
        name: '찌개',
        price: 10000,
        imageUrl: 'http://example.com/chicken.jpg',
        quantity: 1,
      },
    ],
  },
];

function OrderPage() {
  return (
    <Container>
      <WrapperPage>
        {orderList.map((order) => (
          <OrderContainer>
            <WrapperTitle>
              <OrderNumber>주문번호: {order.id}</OrderNumber>
              <DetailItemButton>
                <VscChevronRight />
                <DetailItemSpan>상세보기</DetailItemSpan>
              </DetailItemButton>
            </WrapperTitle>
            {order.orderItems.map((item) => (
              <WrapperContent>
                <ItemImage src={item.imageUrl} />
                <ItemInfoWrapper>
                  <ItemTitle>{item.name}</ItemTitle>
                  <ItemInfo>
                    {item.price}원 / {item.quantity}개
                  </ItemInfo>
                </ItemInfoWrapper>
              </WrapperContent>
            ))}
          </OrderContainer>
        ))}
      </WrapperPage>
    </Container>
  );
}

export default OrderPage;

const ItemTitle = styled.div`
  font-size: 1.6rem;
`;

const ItemInfo = styled.div`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.secondaryColor};
`;

const ItemInfoWrapper = styled.div`
  display: flex;
  row-gap: 1rem;
  flex-direction: column;
`;

const OrderContainer = styled.div`
  margin-bottom: 5rem;
`;

const WrapperPage = styled.main`
  display: flex;
  flex-direction: column;
`;

export const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  aspect-ratio: 1/1;
  border-radius: 4px;

  object-fit: cover;
`;

const OrderNumber = styled.span`
  font-size: 1.6rem;

  color: ${({ theme }) => theme.darkColor};
  font-weight: 500;
  line-height: 1.3;
`;

const DetailItemButton = styled.button`
  font-size: 1.4rem;
  display: flex;
  align-items: center;

  color: ${({ theme }) => theme.secondaryColor};
`;

const DetailItemSpan = styled.span`
  line-height: 1.7;
`;

const WrapperTitle = styled.div`
  display: flex;

  justify-content: space-between;
  font-size: 1.6rem;

  color: ${({ theme }) => theme.darkColor};
  font-weight: 500;
  line-height: 1.3;
  padding-bottom: 1rem;
  padding-left: 0.5rem;
  margin-bottom: 1rem;

  border-bottom: ${({ theme }) => theme.primaryColor} 1.5px solid;
`;

const WrapperContent = styled.div`
  display: flex;
  column-gap: 2rem;
  padding-bottom: 2rem;
  margin-bottom: 2rem;

  border-bottom: ${({ theme }) => theme.secondaryColor} 1px solid;
`;
