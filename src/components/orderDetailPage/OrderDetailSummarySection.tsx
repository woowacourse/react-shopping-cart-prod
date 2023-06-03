import styled from 'styled-components';
import { getCommaAddedNumber } from '../../utils/number';
import { useRecoilValue } from 'recoil';
import { useLocation } from 'react-router-dom';
import { orderDetailSelector } from '../../recoil/selectors/orderDetailSelector';

export const OrderDetailSummarySection = () => {
  const location = useLocation();

  const orderDetail = useRecoilValue(orderDetailSelector(location.state));

  return (
    <Style.Container>
      <Style.Header>
        <Style.HeaderTitle>결제 금액 정보</Style.HeaderTitle>
      </Style.Header>
      <Style.Content>
        <Style.TotalPriceSummary>
          <Style.Caption>총 상품 금액</Style.Caption>
          <Style.Caption>
            {getCommaAddedNumber(orderDetail.originalPrice)}원
          </Style.Caption>
        </Style.TotalPriceSummary>

        <Style.PointInputContainer>
          <Style.Caption>사용 적립금</Style.Caption>
          <Style.Caption>
            {getCommaAddedNumber(orderDetail.usedPoint)}원
          </Style.Caption>
        </Style.PointInputContainer>

        <Style.TotalOrderPriceSummary>
          <Style.Caption>할인 합계</Style.Caption>
          <Style.Caption>
            {getCommaAddedNumber(
              orderDetail.usedPoint ? -orderDetail.usedPoint : 0
            )}
            원
          </Style.Caption>
        </Style.TotalOrderPriceSummary>
        <Style.TotalDeliveryPriceSummary>
          <Style.Caption>배송비</Style.Caption>
          <Style.Caption>3,000원</Style.Caption>
        </Style.TotalDeliveryPriceSummary>
        <Style.TotalPriceSummary>
          <Style.Caption>총 주문 금액</Style.Caption>
          <Style.Caption>
            {getCommaAddedNumber(
              orderDetail.originalPrice + 3000 - orderDetail.usedPoint
            )}
            원
          </Style.Caption>
        </Style.TotalPriceSummary>
        <Style.TotalPriceSummary>
          <Style.Caption>적립 금액</Style.Caption>
          <Style.Caption>
            {getCommaAddedNumber(orderDetail.pointToAdd)}원
          </Style.Caption>
        </Style.TotalPriceSummary>
      </Style.Content>
    </Style.Container>
  );
};

const StyledSummary = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Style = {
  Container: styled.section`
    width: 348px;
    height: 100%;
    margin-top: 49px;

    border: 1px solid #dddddd;
    position: sticky;
    top: 120px;
    border-radius: 6px;

    @media (max-width: 1080px) {
      width: 100%;
    }
  `,
  Header: styled.div`
    width: 348px;
    height: 81px;

    padding: 30px 20px;

    border-bottom: 3px solid #dddddd;
    @media (max-width: 1080px) {
      width: 100%;
    }
  `,
  HeaderTitle: styled.h2`
    font-size: 24px;
  `,
  Content: styled.div`
    width: 348px;

    display: flex;
    flex-direction: column;
    align-items: end;

    padding: 34px 30px 0;
    @media (max-width: 1080px) {
      width: 100%;
    }
  `,
  TotalPriceSummary: styled(StyledSummary)`
    margin-bottom: 19px;
  `,
  TotalDeliveryPriceSummary: styled(StyledSummary)`
    margin-bottom: 30px;
  `,
  PointInputContainer: styled(StyledSummary)`
    margin-bottom: 10px;
  `,
  PointInput: styled.input`
    border-bottom: 1px solid #333333;
    text-align: end;
    width: 100px;
    font-size: 14px;
    @media (max-width: 1080px) {
      width: 50%;
    }
    @media (max-width: 480px) {
      width: 100px;
    }
  `,
  UsingAllPoint: styled.div`
    padding: 10px;
    display: flex;
    align-items: center;
    font-size: 12px;
    border: 1px solid #333333;
    text-align: center;
    cursor: pointer;
  `,
  AvailablePoint: styled.div`
    font-size: 14px;
    margin-bottom: 20px;
  `,
  TotalOrderPriceSummary: styled(StyledSummary)`
    margin-bottom: 20px;
  `,
  Caption: styled.span`
    font-size: 18px;
  `,
  OrderButton: styled.button`
    width: 100%;
    height: 53px;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: #333333;
    font-size: 24px;
    color: #ffffff;

    padding: 12px;
    margin-bottom: 20px;
    border-radius: 8px;
  `,

  PointToAdd: styled(StyledSummary)`
    margin-bottom: 45px;
  `,
};
