import { styled } from 'styled-components';
import { WIDTH } from '../styles/mediaQuery';
import { useRecoilValue } from 'recoil';
import OrderCard from '../components/OrderCard/OrderCard';
import { orderAtom } from '../store/order';

const OrderListPage = () => {
  const orders = useRecoilValue(orderAtom);

  return (
    <Wrapper>
      <Title>주문 목록</Title>
      <OrderListContainer>
        {Array.from(orders).map((order) => {
          const {
            orderId,
            items,
            productPrice,
            discountPrice,
            deliveryFee,
            totalPrice,
          } = order;

          return (
            <OrderCard
              key={orderId}
              orderId={orderId}
              items={items}
              productPrice={productPrice}
              discountPrice={discountPrice}
              deliveryFee={deliveryFee}
              totalPrice={totalPrice}
              showDetailButton={true}
            />
          );
        })}
      </OrderListContainer>
    </Wrapper>
  );
};

export default OrderListPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  @media (max-width: ${WIDTH.LG}) {
    justify-content: start;
  }
`;

const Title = styled.div`
  width: 70%;

  padding: 16px;

  text-align: center;
  font-weight: 300;
  font-size: 32px;

  border-bottom: 1px solid #333333;

  @media (max-width: ${WIDTH.LG}) {
    padding: 4px;
    font-size: 24px;
  }
`;

const OrderListContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: 42px;

  width: 70%;

  padding: 32px 0px;

  @media (max-width: ${WIDTH.LG}) {
    gap: 0;
    padding: 12px 0px;
  }
`;
