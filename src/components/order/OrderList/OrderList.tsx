import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import serverNameState from '../../../globalState/atoms/serverName';
import ServerUtil from '../../../utils/ServerUrl';
import type { OrderInfo } from '../../../types/order';
import { USER_AUTH_TOKEN } from '../../../constant';
import useFetch from '../../../hooks/api/useFetch';
import OrderDetail from '../OrderDetail/OrderDetail';
import LinkButton from '../../common/LinkButton/LinkButton';

const OrderList = () => {
  const serverName = useRecoilValue(serverNameState);
  const url = ServerUtil.getOrderUrl(serverName);

  const { getData } = useFetch<{ orders: OrderInfo[] }>(url, USER_AUTH_TOKEN);
  const sortedOrders = getData()?.orders.sort((one, another) => another.id - one.id);

  return (
    <Section>
      {sortedOrders?.map(({ id, actualPrice, cartItems, deliveryFee, originalPrice }) => (
        <OrderDetail
          key={id}
          id={id}
          actualPrice={actualPrice}
          cartItems={cartItems}
          deliveryFee={deliveryFee || 3000}
          originalPrice={originalPrice}
        />
      ))}
      {!sortedOrders || sortedOrders.length ? (
        <EmptyCartView>
          아직 구매 기록이 없어요!
          <LinkButton to="/">초기 화면으로 가기</LinkButton>
        </EmptyCartView>
      ) : null}
    </Section>
  );
};

const Section = styled.section`
  margin: auto;
  width: 100%;
  max-width: 1320px;

  & > * {
    margin-bottom: 50px;
  }
`;

const EmptyCartView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  margin-top: 200px;

  font-weight: 500;
  font-size: 30px;
`;

export default OrderList;
