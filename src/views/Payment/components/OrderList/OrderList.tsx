import { styled } from 'styled-components';
import { VscChevronRight } from 'react-icons/vsc';
import { OrderItemList } from '../OrderItemList';

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

function OrderList() {
  return (
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
          <OrderItemList orderItems={order.orderItems} />
        </OrderContainer>
      ))}
    </WrapperPage>
  );
}

export default OrderList;

const OrderContainer = styled.div`
  margin-bottom: 5rem;
`;

const WrapperPage = styled.main`
  display: flex;
  flex-direction: column;
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
