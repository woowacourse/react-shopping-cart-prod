import { useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import { orderAtom } from '../../recoil/orderProductData';
import OrderProductList from './OrderProductList';

const OrderList = () => {
  const orders = useRecoilValue(orderAtom);
  if (orders.length === 0)
    return (
      <EmptyOrder>
        주문 내역이 없어요!
        <Link to='/'>
          <MovePageBtn>상품 둘러보기</MovePageBtn>
        </Link>
      </EmptyOrder>
    );

  return (
    <Wrapper>
      {orders &&
        [...orders]
          .reverse()
          .map((order) => (
            <OrderProductList order={order} isDetailed={false} />
          ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
`;

const EmptyOrder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 70px;

  font-size: 20px;

  margin: 40px 0;
`;

const MovePageBtn = styled.button`
  display: flex;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
  padding: 20px;

  font-size: 24px;
  font-weight: 500;

  @media (max-width: 420px) {
    margin-top: 4px;
    font-size: 13px;
  }
`;

export default OrderList;
