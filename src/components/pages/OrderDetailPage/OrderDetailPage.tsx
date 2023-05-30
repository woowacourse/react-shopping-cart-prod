import { styled } from 'styled-components';
import OrderTableList from '../../order/OrderTableList/OrderTableList';

const orderInfos = [
  {
    id: 123,
    price: 40000,
    orderDate: '2023-10-20T23:01:59',
    orders: [
      {
        id: 3942,
        quantity: 2,
        product: {
          id: 2543,
          name: '우코우 피자',
          price: 15000,
          imageUrl:
            'https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg',
        },
      },
      {
        id: 1029,
        quantity: 5,
        product: {
          id: 2543,
          name: '도우밥 만두',
          price: 3000,
          imageUrl:
            'https://cdn.pixabay.com/photo/2016/02/17/10/41/dumplings-1204814_1280.jpg',
        },
      },
    ],
  },
];

const OrderDetailPage = () => {
  return (
    <Container>
      <TitleWrapper>
        <Title>주문 내역 상세</Title>
      </TitleWrapper>
      <OrderTableList orderInfos={orderInfos} />
      <OrderTotal>
        <OrderTotalHeader>결제금액 정보</OrderTotalHeader>
        <OrderTotalPrice>
          <span>총 결제금액</span>
          <span>325,600원</span>
        </OrderTotalPrice>
      </OrderTotal>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 28px;
`;

const TitleWrapper = styled.div`
  height: 67px;
  border-bottom: 4px solid #333;
`;

const Title = styled.h2`
  font-family: 'Noto Sans KR';
  font-weight: 700;
  font-size: 32px;
  line-height: 37px;
  text-align: center;
  letter-spacing: 0.5px;
  color: #333;
`;

const OrderTotal = styled.div`
  width: 560px;
  height: 207px;
  margin-left: auto;
  border: 1px solid #aaa;
`;

const OrderTotalHeader = styled.div`
  display: flex;
  align-items: center;
  height: 92px;
  padding: 0 30px;
  background: #f6f6f6;
  border-bottom: 1px solid #aaa;
  font-family: 'Noto Sans KR';
  font-weight: 700;
  font-size: 28px;
  line-height: 28px;
  letter-spacing: 0.5px;
  color: #333;
`;

const OrderTotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 115px;
  padding: 0 30px;
  font-family: 'Noto Sans KR';
  font-weight: 700;
  font-size: 24px;
  line-height: 24px;
  letter-spacing: 0.5px;
  color: #333;
`;

export default OrderDetailPage;
