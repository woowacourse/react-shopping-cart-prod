import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import OrderItem from '../components/OrderItem';
import Price from '../components/Price';
import { ORDER_URL } from '../constants/url';
import useFetchData from '../hooks/useFetchData';
import { serverState } from '../recoil';
import { OrderDetail } from '../types';

const OrderDetailPage = () => {
  const server = useRecoilValue(serverState);
  const [orderDetail, setOrderDetail] = useState<OrderDetail | null>(null);
  const { id } = useParams();
  const { api, isLoading } = useFetchData();

  useEffect(() => {
    api
      .get(`${server}${ORDER_URL}/${id}`)
      .then((data) => setOrderDetail(data))
      .catch((error) => alert(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [server, id]);

  if (isLoading) return null;

  if (!orderDetail) return <div>없는 주문 번호입니다.</div>;

  const { deliveryFee, totalPrice, coupon, totalPayments } = orderDetail;

  return (
    <Main>
      <Title>주문 내역 상세</Title>
      <Flex>
        <OrderItem {...orderDetail} />
        <S.Wrapper>
          <S.Title>결제금액 정보</S.Title>
          <S.List>
            <Price price={totalPrice} tag="li" description="상품금액" />
            <Price price={deliveryFee} tag="li" description="배송비" />
            {coupon ? <Price price={-coupon.priceDiscount} tag="li" description={coupon.name} /> : null}
            <Price price={totalPayments} tag="li" description="총 결제금액" />
          </S.List>
        </S.Wrapper>
      </Flex>
    </Main>
  );
};

export default OrderDetailPage;

const S = {
  Wrapper: styled.section`
    width: 400px;
    max-width: 448px;
    height: 280px;
    max-height: 410px;
    margin-top: 40px;
    padding-bottom: 38px;
    border: 1px solid var(--gray-color-300);
  `,

  Title: styled.h3`
    padding: 24px 30px;
    margin-bottom: 44px;
    border-bottom: 1px solid var(--gray-color-300);
    font-size: 20px;

    @media (max-width: 548px) {
      margin-bottom: 32px;
      font-size: 18px;
    }
  `,

  List: styled.ul`
    & > li {
      display: flex;
      justify-content: space-between;
      margin: 0 30px 20px;
      font-size: 18px;
      font-weight: 600;

      & span {
        font-weight: 500;
      }

      @media (max-width: 548px) {
        flex-direction: column;
        font-size: 15px;
        font-weight: 600;
        text-align: center;
        line-height: 1.4;
      }
    }
  `,
};

const Main = styled.main`
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: 1270px) {
    padding: 0 36px;
  }

  @media (max-width: 420px) {
    padding: 0 28px;
  }
`;

const Title = styled.h2`
  width: 100%;
  padding-bottom: 30px;
  border-bottom: 4px solid var(--text-color);
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  color: var(--text-color);
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 36px 30px 0 0;
  gap: 30px;

  @media (max-width: 1270px) {
    flex-direction: column;
    margin-right: 0;

    & section {
      max-width: 100%;
    }

    & section:last-child {
      margin: 30px 0 80px;
    }
  }
`;
