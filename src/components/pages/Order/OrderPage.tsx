import styled from '@emotion/styled';
import ErrorBox from '../../common/ErrorBox/ErrorBox';
import PageTemplate from '../../templates/PageTemplate';
import DetailList from '../../list/DetailList/DetailList';
import useOrderFetch from '../../../hooks/useOrderFetch';
import { useEffect } from 'react';

const OrderPage = () => {
  useEffect(() => {
    orderListRefetch();
  }, []);

  const { orderListData, orderListRefetch } = useOrderFetch();

  if (!orderListData) {
    return <ErrorBox errorType="emptyList" />;
  }

  return (
    <PageTemplate
      title="장바구니 미션- 주문목록 페이지"
      description="우아한 테크코스 레벨 2 장바구니 미션의 주문목록 페이지입니다."
    >
      <DetailPageWrapper>
        <DetailWrapper>
          {orderListData
            ?.slice(0)
            .reverse()
            .map((order) => {
              return <DetailList key={order.id} order={order} />;
            })}
        </DetailWrapper>
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
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  height: auto;
`;

export default OrderPage;
