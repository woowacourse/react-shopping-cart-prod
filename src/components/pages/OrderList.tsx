import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { PATH } from '../../constants';
import { useQuery } from '../../hooks/useQuery';
import { useApiBaseUrlValue } from '../../recoils/recoilApiBaseUrl';
import { UserOrdersType } from '../../types';

import { Layout } from '../common/Layout';
import { OrderedProductList } from '../OrderedProductList';

export const OrderList = () => {
  const baseUrl = useApiBaseUrlValue();
  const { data } = useQuery<UserOrdersType[]>(baseUrl + '/orders', {
    Authorization: `Basic ${btoa(process.env.REACT_APP_API_CREDENTIAL!)}`,
  });

  if (!data) return <></>;

  return (
    <Layout>
      <Style.OrderListWrapper>
        <Style.PageTitle>주문 목록</Style.PageTitle>
        <Style.Main>
          {data.length !== 0 ? (
            data.map((order) => <OrderedProductList key={order.orderId} order={order} isDetail={false}/>)
          ) : (
            <Style.NoExistItemsMessage>
              <p>장바구니에 등록된 상품이 존재하지 않아요🥲</p>
              <Link to={PATH.HOME}>상품 보러가기🚀</Link>
            </Style.NoExistItemsMessage>
          )}
        </Style.Main>
      </Style.OrderListWrapper>
    </Layout>
  );
};

const Style = {
  OrderListWrapper: styled.div`
    width: 100%;
    padding: 0 10%;

    margin-bottom: 140px;
  `,

  PageTitle: styled.div`
    text-align: center;

    margin-bottom: 30px;
    padding: 0 0 30px 0;

    font-size: 32px;
    font-weight: 700;

    border-bottom: 4px solid var(--grey-400);

    @media screen and (max-width: 500px) {
      font-size: 20px;
      padding: 16px 0;
    }
  `,

  Main: styled.div`
    display: flex;
    flex-direction: column;
    @media screen and (min-width: 501px) {
      justify-content: space-between;
    }

    @media screen and (max-width: 500px) {
      font-size: 20px;

      margin-bottom: 80px;
    }
  `,

  NoExistItemsMessage: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    height: 200px;

    color: var(--grey-300);

    & > p {
      font-size: 20px;
      margin-bottom: 30px;

      line-height: 25px;
    }

    & > a {
      color: var(--grey-400);
      border-bottom: 3px solid var(--grey-400);
    }
  `,
};
