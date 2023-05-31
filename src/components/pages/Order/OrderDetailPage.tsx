import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import styled from '@emotion/styled';
import PageTemplate from '../../templates/PageTemplate';
import ErrorBox from '../../common/ErrorBox/ErrorBox';
import PriceBox from '../../box/TotalPriceBox/PriceBox';
import { OrderDetailType } from '../../../types/types';

const OrderDetailPage = () => {
  const orderId = useParams().orderId;

  const { data: orderDetailData, refetch } = useQuery<OrderDetailType>(
    'orderDetail',
    async () => {
      const res = await fetch(`/orders/${orderId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      return data;
    },
    {
      onError: (e) => {
        console.log(e);
      },
    },
  );

  if (!orderDetailData) {
    return <ErrorBox errorType="emptyList" />;
  }
  const { originalPrice, discountPrice, coupon, ...order } = orderDetailData;
  return (
    <PageTemplate
      title="장바구니 미션- 주문 상세보기 페이지"
      description="우아한 테크코스 레벨 2 장바구니 미션의 주문 상세보기 페이지입니다."
    >
      <DetailPageWrapper>
        <DetailWrapper>{orderId}디테일페이지로 이동했습니다.</DetailWrapper>
        <PriceBox
          originalPrice={originalPrice}
          discountPrice={discountPrice}
          shippingFee={3000}
          coupon={coupon}
        />
      </DetailPageWrapper>
    </PageTemplate>
  );
};

const DetailPageWrapper = styled.div`
  width: 1140px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  @media screen and (max-width: 1320px) {
    width: 940px;
  }

  @media screen and (max-width: 1000px) {
    width: 620px;
  }

  @media screen and (max-width: 660px) {
    width: 500px;
  }
`;
const DetailWrapper = styled.div`
  width: 100%;
  height: auto;
`;
export default OrderDetailPage;
