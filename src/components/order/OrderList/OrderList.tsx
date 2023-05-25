import { styled } from 'styled-components';
import OrderListItem from '../OrderListItem/OrderListItem';
import type { CartItem } from '../../../types/product';

const sample = {
  id: 0,
  quantity: 1,
  product: {
    id: 1,
    name: '순살치킨 1KG',
    price: 9900,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/c6f2f083-a8b8-4799-834b-444b5eaeb532.png?h=400&w=400',
  },
} satisfies CartItem;

const OrderList = () => {
  return (
    <Container>
      <ListHeader>
        <span>주문번호: 1</span>
        <DetailButton>상세보기 &gt;</DetailButton>
      </ListHeader>
      <OrderListItem item={sample} />
      <OrderListItem item={sample} />
      <OrderListItem item={sample} />
    </Container>
  );
};

const Container = styled.ul`
  border: 1px solid #aaa;

  & > li {
    border-bottom: 1px solid #aaa;
  }
`;

const ListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 92px;
  padding: 0 30px;
  background-color: #f6f6f6;
  border-bottom: 1px solid #aaa;
  font-family: 'Noto Sans KR';
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.5px;
  color: #333;
`;

const DetailButton = styled.button`
  font-family: 'Noto Sans KR';
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.5px;
  color: #333;
`;

export default OrderList;
