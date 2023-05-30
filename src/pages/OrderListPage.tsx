import FlexBox from 'components/@common/FlexBox';
import OrderItem from 'components/OrderItem/OrderItem';
import styled from 'styled-components';

const orders = [
  {
    order_id: 1,
    products: [
      {
        name: '초코파이',
        price: 1200,
        quantity: 2,
        image_url: 'https://www.fooding.kr/files/attach/images/148/930/001/1.jpg',
      },
      {
        name: '딸기파이',
        price: 1400,
        quantity: 1,
        image_url: 'https://www.fooding.kr/files/attach/images/148/930/001/1.jpg',
      },
    ],
    total_price: 3800,
    used_point: 1200,
    ordered_at: '2021-08-01 12:00:00',
  },
  {
    order_id: 2,
    products: [
      {
        name: '사과파이',
        price: 1200,
        quantity: 3,
        image_url: 'https://www.fooding.kr/files/attach/images/148/930/001/1.jpg',
      },
      {
        name: '미트파이',
        price: 1600,
        quantity: 1,
        image_url: 'https://www.fooding.kr/files/attach/images/148/930/001/1.jpg',
      },
    ],
    total_price: 5800,
    used_point: 0,
    ordered_at: '2021-08-02 12:00:00',
  },
  {
    order_id: 3,
    products: [
      {
        name: '사과파이2',
        price: 2200,
        quantity: 1,
        image_url: 'https://www.fooding.kr/files/attach/images/148/930/001/1.jpg',
      },
      {
        name: '자두파이',
        price: 1700,
        quantity: 1,
        image_url: 'https://www.fooding.kr/files/attach/images/148/930/001/1.jpg',
      },
    ],
    total_price: 3900,
    used_point: 9000,
    ordered_at: '2021-08-03 11:04:00',
  },
];

const OrderListPage = () => {
  return (
    <OrderListPageContainer flexDirection="column">
      <PageTitle>주문 목록</PageTitle>
      {orders.map((order, index) => (
        <OrderItem key={index} order={order} type="list" />
      ))}
    </OrderListPageContainer>
  );
};

export default OrderListPage;

const OrderListPageContainer = styled(FlexBox)`
  width: 100%;
`;

const PageTitle = styled.h2`
  width: 100%;
  height: 80px;
  border-bottom: 3px solid #333333;
  font-size: 32px;
  text-align: center;
  margin-bottom: 20px;
`;
