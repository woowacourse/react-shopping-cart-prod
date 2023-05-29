import { useRecoilValue } from 'recoil';
import { Layout } from '../layout';
import { orderListState } from '../recoil/atoms/orderAtom';
import styled from 'styled-components';
import { OrderGroup } from '../components/OrderPage/OrderGroup';

export const Order = () => {
  const orderList = useRecoilValue(orderListState);

  console.log(orderList);

  return (
    <Layout>
      <Style.HeaderContainer>
        <Style.Header>주문 목록</Style.Header>
      </Style.HeaderContainer>
      <Style.ContentContainer>
        {orderList.map((order) => (
          <OrderGroup
            key={order.orderId}
            orders={order.orderInfo}
            orderId={order.orderId}
          />
        ))}
      </Style.ContentContainer>
    </Layout>
  );
};

const Style = {
  HeaderContainer: styled.div`
    width: 1320px;
    height: 69px;

    display: flex;
    justify-content: center;
    align-items: flex-start;

    border-bottom: 4px solid #333333;

    @media screen and (max-width: 480px) {
      width: 90vw;
    }
  `,
  Header: styled.h1`
    font-size: 32px;
  `,
  ContentContainer: styled.div`
    width: 1320px;
    height: max-content;

    display: flex;
    flex-direction: column;
    gap: 50px;

    padding-top: 28px;

    @media screen and (max-width: 480px) {
      width: 90vw;
    }
  `,
};
