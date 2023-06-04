import styled from 'styled-components';
import type { OrderListEntity } from '../api/rest/ShoppingCartRestAPI';
import OrderList from '../components/OrderList';
import AwaitRecoilState from '../components/utils/AwaitRecoilState';
import { orderListState } from '../recoil/atoms/orderState';

const Title = styled.h1`
  display: flex;
  justify-content: center;

  width: 100%;
  padding: 30px 0;

  ${({ theme }) => theme.fonts.text}
  font-weight: 600;
  border-bottom: 10px solid ${({ theme }) => theme.colors.gray300};
`;

interface OrderListsProps {
  orderLists: OrderListEntity[];
}

const OrderListContainer = (props: OrderListsProps) => {
  const { orderLists } = props;

  return (
    <>
      {orderLists.map((orderList) => {
        return <OrderList orderList={orderList} key={orderList.id} />;
      })}
    </>
  );
};

const OrderListPage = () => {
  return (
    <>
      <Title>주문목록</Title>
      <AwaitRecoilState state={orderListState}>
        {(orderLists) => <OrderListContainer orderLists={orderLists} />}
      </AwaitRecoilState>
    </>
  );
};

export default OrderListPage;
