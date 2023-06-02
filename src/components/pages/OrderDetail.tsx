import { styled } from 'styled-components';
import { useQuery } from '../../hooks/useQuery';
import { useApiBaseUrlValue } from '../../recoils/recoilApiBaseUrl';
import { useOrderDetailValue } from '../../recoils/recoilOrderDetail';
import { UserOrdersType } from '../../types';

import { Layout } from '../common/Layout';
import { OrderedProductList } from '../OrderedProductList';
import { OrderedProductTotalPrice } from '../OrderedProductTotalPrice';

export const OrderDetail = () => {
  const baseUrl = useApiBaseUrlValue();
  const { data } = useQuery<UserOrdersType[]>(baseUrl + '/orders', {
    Authorization: `Basic ${btoa(process.env.REACT_APP_API_CREDENTIAL!)}`,
  });

  const orderNumber = useOrderDetailValue();

  if (!data) return <></>;

  const orderDetail = data.filter((order) => order.orderId === orderNumber);

  return (
    <Layout>
      <Style.OrderDetailWrapper>
        <Style.PageTitle>주문 내역 상세</Style.PageTitle>
        <Style.Main>
          <OrderedProductList order={orderDetail[0]} />
        </Style.Main>
        <Style.Price>
          <OrderedProductTotalPrice totalPrice={orderDetail[0].totalProductsPrice} />
        </Style.Price>
      </Style.OrderDetailWrapper>
    </Layout>
  );
};

const Style = {
  OrderDetailWrapper: styled.div`
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

  Price: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    margin-top: 28px;
  `,
};
