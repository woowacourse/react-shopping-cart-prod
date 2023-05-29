import { useLocation } from 'react-router-dom';
import { Layout } from '../layout';

import { Fragment, useEffect, useState } from 'react';
import { useOrderFetch } from '../hooks/fetch/useOrderFetch';
import { OrderProductInfo } from '../recoil/atoms/orderAtom';
import { OrderGroup } from '../components/OrderPage/OrderGroup';
import { Loading } from '../components/common/Loading';
import { Style as OrderStyle } from './Order';
import styled from 'styled-components';
import { getCommaAddedNumber } from '../utils/number';

interface OrderDetailType {
  orderId: number;
  orderInfo: OrderProductInfo[];
  originalPrice: number;
  pointToAdd: number;
  usedPoint: number;
}

export const OrderDetail = () => {
  const { state } = useLocation();
  const { orderId } = state;

  const { getOrderDetail } = useOrderFetch();

  const [orderDetail, setOrderDetail] = useState<OrderDetailType>();

  useEffect(() => {
    if (orderId) getOrderDetail(orderId).then((data) => setOrderDetail(data));
  }, []);

  return (
    <Layout>
      <Style.HeaderContainer>
        <Style.Header>주문 내역 상세</Style.Header>
      </Style.HeaderContainer>
      <Style.ContentContainer>
        {orderDetail ? (
          <Fragment>
            <OrderGroup
              orderId={orderDetail.orderId}
              orders={orderDetail?.orderInfo}
              isDetailPage={true}
            />
            <Style.PriceSummaryContainer>
              <Style.PriceSummaryHeader>결제금액 정보</Style.PriceSummaryHeader>
              <Style.PriceSummaryContentContainer>
                <PriceCaption
                  title="총 상품 가격"
                  price={`+ ${getCommaAddedNumber(
                    orderDetail.originalPrice
                  )} 원`}
                />
                <PriceCaption
                  title="총 배송비"
                  price={`+ ${getCommaAddedNumber(3000)} 원`}
                />
                <PriceCaption
                  title="사용한 적립금"
                  price={`- ${getCommaAddedNumber(orderDetail.usedPoint)} 원`}
                  isUsedPoint={true}
                />
                <PriceCaption
                  title="총 배송비"
                  price={`${getCommaAddedNumber(
                    orderDetail.originalPrice + 3000 - orderDetail.usedPoint
                  )} 원`}
                />
                <PriceCaption
                  title="적립된 적립금"
                  price={`+ ${getCommaAddedNumber(orderDetail.pointToAdd)} 원`}
                  isPoint={true}
                />
              </Style.PriceSummaryContentContainer>
            </Style.PriceSummaryContainer>
          </Fragment>
        ) : (
          <Loading />
        )}
      </Style.ContentContainer>
    </Layout>
  );
};

interface PriceCaptionProps {
  title: string;
  price: string;
  isPoint?: boolean;
  isUsedPoint?: boolean;
}

const PriceCaption = ({
  title,
  price,
  isPoint,
  isUsedPoint,
}: PriceCaptionProps) => {
  return (
    <Style.PriceSummaryCaptionContainer>
      <Style.Caption $isTitle={true}>{title}</Style.Caption>
      <Style.Caption $isPoint={isPoint} $isUsedPoint={isUsedPoint}>
        {price}
      </Style.Caption>
    </Style.PriceSummaryCaptionContainer>
  );
};

const Style = {
  ...OrderStyle,
  PriceSummaryContainer: styled.div`
    width: 560px;
    height: max-content;

    display: flex;
    flex-direction: column;

    @media screen and (max-width: 480px) {
      width: 90vw;
    }
  `,
  PriceSummaryHeader: styled.div`
    width: 560px;
    height: 92px;

    display: flex;
    align-items: center;

    padding-left: 30px;
    font-size: 28px;
    color: #333333;
    background-color: rgba(246, 246, 246, 1);
    border: 1px solid #aaaaaa;

    @media screen and (max-width: 480px) {
      width: 90vw;
      height: 70px;

      font-size: 23px;
      padding-left: 15px;
    }
  `,
  PriceSummaryContentContainer: styled.div`
    width: 560px;
    height: max-content;
    padding: 40px 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;

    border: 1px solid #aaaaaa;
    border-top: none;

    @media screen and (max-width: 480px) {
      width: 90vw;
    }
  `,
  PriceSummaryCaptionContainer: styled.div`
    width: 497px;

    display: flex;
    justify-content: space-between;

    @media screen and (max-width: 480px) {
      width: 80vw;
    }
  `,
  Caption: styled.span<{
    $isPoint?: boolean;
    $isTitle?: boolean;
    $isUsedPoint?: boolean;
  }>`
    font-size: 24px;
    color: ${(props) =>
      props.$isPoint === true
        ? 'rgb(42, 193, 188)'
        : props.$isTitle === true
        ? 'rgb(95, 95, 95)'
        : props.$isUsedPoint === true
        ? '#ff7d7d'
        : 'black'};

    @media screen and (max-width: 480px) {
      font-size: 20px;
    }
  `,
};
