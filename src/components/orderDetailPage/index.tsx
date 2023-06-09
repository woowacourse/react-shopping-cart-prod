import styled from 'styled-components';
import { getCommaAddedNumber } from '../../utils/number';
import { Loading } from '../common/Loading';
import { OrderGroup } from '../orderPage/OrderGroup';
import { Style as OrderStyle } from '../orderPage';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { orderDetailSelector } from '../../recoil/selectors/orderDetailSelector';

interface RouteState {
  state: {
    orderId: number;
  };
}

export const OrderDetailContent = () => {
  const { state } = useLocation() as RouteState;
  const { orderId } = state;

  const orderDetail = useRecoilValue(orderDetailSelector(orderId));

  return (
    <>
      {orderDetail ? (
        <>
          <OrderGroup
            orderId={orderDetail.orderId}
            orders={orderDetail?.orderInfos}
            isDetailPage={true}
          />
          <Style.Container>
            <Style.PriceSummaryContainer>
              <Style.PriceSummaryHeader>결제금액 정보</Style.PriceSummaryHeader>
              <Style.PriceSummaryContentContainer>
                <PriceCaption
                  title="총 상품 가격"
                  price={`${getCommaAddedNumber(orderDetail.originalPrice)} 원`}
                />
                <PriceCaption
                  title="총 배송비"
                  price={`+ ${getCommaAddedNumber(3000)} 원`}
                />
                <PriceCaption
                  title="사용한 적립금"
                  price={`${
                    orderDetail.usedPoint > 0 ? '-' : ''
                  } ${getCommaAddedNumber(orderDetail.usedPoint)} 원`}
                  isUsedPoint={true}
                />
                <PriceCaption
                  title="총 결제 금액"
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
          </Style.Container>
        </>
      ) : (
        <Loading />
      )}
    </>
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
  Container: styled.div`
    width: 100%;

    display: flex;
    justify-content: flex-end;
  `,
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
