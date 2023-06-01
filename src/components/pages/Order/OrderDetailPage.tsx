import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import PageTemplate from '../../templates/PageTemplate';
import ErrorBox from '../../common/ErrorBox/ErrorBox';
import PriceBox from '../../box/TotalPriceBox/PriceBox';
import DetailList from '../../list/DetailList/DetailList';
import useOrderDetailFetch from '../../../hooks/useOrderDetailFetch';
import { useEffect } from 'react';

const OrderDetailPage = () => {
  const orderId = useParams().orderId;
  const { orderDetailData, deleteOrderDataAPI, confirmOrderDataAPI, refetch } = useOrderDetailFetch(
    Number(orderId),
  );

  useEffect(() => {
    refetch();
  }, []);

  if (!orderDetailData) {
    return <ErrorBox errorType="emptyList" />;
  }
  const { originalPrice, discountPrice: finalPrice, coupon, ...order } = orderDetailData;
  return (
    <PageTemplate
      title="장바구니 미션- 주문 상세보기 페이지"
      description="우아한 테크코스 레벨 2 장바구니 미션의 주문 상세보기 페이지입니다."
    >
      <DetailPageWrapper>
        <DetailWrapper>
          <DetailList
            onConfirm={confirmOrderDataAPI}
            onDelete={deleteOrderDataAPI}
            order={order}
            isList={false}
          />
        </DetailWrapper>
        <PriceBox
          originalPrice={originalPrice}
          finalPrice={finalPrice}
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
  gap: 20px;

  @media screen and (max-width: 1320px) {
    width: 940px;
  }

  @media screen and (max-width: 1000px) {
    width: 620px;
  }

  @media screen and (max-width: 660px) {
    width: 500px;
  }

  @media screen and (max-width: 510px) {
    width: 300px;
  }
`;
const DetailWrapper = styled.div`
  width: 100%;
  height: auto;
`;
export default OrderDetailPage;
