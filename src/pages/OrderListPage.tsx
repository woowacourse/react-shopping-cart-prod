import { styled } from 'styled-components';
import { WIDTH } from '../constants/mediaQuery';
import { useRecoilValue } from 'recoil';
import OrderCard from '../components/OrderCard/OrderCard';
import { orderAtom } from '../store/order';
import Title from '../components/common/Title';

const OrderListPage = () => {
  const orders = useRecoilValue(orderAtom);

  return (
    <Wrapper>
      <Title>주문 목록</Title>
      <OrderListContainer>
        {orders.map((order) => {
          const {
            id,
            items,
            productPrice,
            discountPrice,
            deliveryFee,
            totalPrice,
          } = order;

          return (
            <OrderCard
              key={id}
              id={id}
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
