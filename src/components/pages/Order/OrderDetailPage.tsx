import { Link, useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import PageTemplate from '../../templates/PageTemplate';
import ErrorBox from '../../common/ErrorBox/ErrorBox';
import PriceBox from '../../box/TotalPriceBox/PriceBox';
import DetailList from '../../list/DetailList/DetailList';
import useOrderDetailFetch from '../../../hooks/useOrderDetailFetch';
import { Text } from '../../common/Text/Text';
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
import { NUM, URL } from '../../../abstract/constants';

const OrderDetailPage = () => {
  const orderId = useParams().orderId;
  const {
    orderDetailData,
    deleteOrderDataAPI,
    confirmOrderDataAPI,
    orderDetailFetchError,
    isFetching,
  } = useOrderDetailFetch(Number(orderId));

  if (isFetching) {
    return (
      <PageTemplate
        title="장바구니 미션- 주문목록 페이지"
        description="우아한 테크코스 레벨 2 장바구니 미션의 주문목록 페이지입니다."
      >
        <LoadingSpinner />
      </PageTemplate>
    );
  }

  if (orderDetailFetchError || !orderDetailData) {
    return (
      <PageTemplate
        title="장바구니 미션- 주문 상세보기 페이지"
        description="우아한 테크코스 레벨 2 장바구니 미션의 주문 상세보기 페이지입니다."
      >
        <ErrorBox errorType="emptyOrder" />
      </PageTemplate>
    );
  }

  const { originalPrice, discountPrice: finalPrice, coupon, ...order } = orderDetailData;

  return (
    <PageTemplate
      title="장바구니 미션- 주문 상세보기 페이지"
      description="우아한 테크코스 레벨 2 장바구니 미션의 주문 상세보기 페이지입니다."
    >
      <DetailPageWrapper>
        <DetailPageHead>
          <BackButton to={URL.ORDER}>{'<'}</BackButton>
          <Text size="extraLarge" weight="bold">
            주문 상세보기
          </Text>
        </DetailPageHead>
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
          shippingFee={NUM.SHIPPING_FEE}
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

const DetailPageHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 20px 0;
  gap: 40px;
  margin-bottom: 8px;
  border-bottom: 4px solid #333;
`;

const DetailWrapper = styled.div`
  width: 100%;
  height: auto;
`;

const BackButton = styled(Link)`
  display: flex;
  align-items: center;
  height: 45px;
  font-weight: bold;
  font-size: 45px;
`;
export default OrderDetailPage;
